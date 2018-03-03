// tslint:disable:max-classes-per-file
import * as Lint from 'tslint';
import * as ts from 'typescript';
import { canNotBeUndefined, findConstructor, isDeclaredInCatch, isDeclaredInForStatement, isUndefinedInDomainOf } from './Helpers';

export class Options {
    static VARIABLES = 'variables';
    static PROPERTIES = 'properties';
}

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        let result = new Array<Lint.RuleFailure>();
        return this.applyWithWalker(new NoUninitializedVariableWalker(sourceFile, this.getOptions()))
            .concat(this.applyWithWalker(new NoUninitializedPropertiesWalker(sourceFile, this.getOptions())));

    }
}

class NoUninitializedVariableWalker extends Lint.RuleWalker {
    protected visitModuleDeclaration(node: ts.ModuleDeclaration): void {
        // By doing nothing and not calling the super implementation, this prevents anything within a
        // module declaration from being considered by this rule.
        // Module declarations are "ambient contexts" where initializations are not allowed, so it is
        // nonsense to check for uninitialized variables within such a context.
        return;
    }

    protected visitVariableDeclaration(node: ts.VariableDeclaration) {
        super.visitVariableDeclaration(node);
        if (super.hasOption(Options.VARIABLES)) {
            if (node.initializer === undefined
                && !isUndefinedInDomainOf(node.type)
                && !isDeclaredInForStatement(node)
                && !isDeclaredInCatch(node)) {
                super.addFailureAt(
                    node.getStart(),
                    node.getEnd(),
                    `Variable '${node.name.getText()}' is uninitialized. 'undefined' is not assignable to its type.`);
            }
        }
    }
}

class NoUninitializedPropertiesWalker extends Lint.RuleWalker {

    private _initializedProperties: string[][] = [];
    
    protected visitModuleDeclaration(node: ts.ModuleDeclaration): void {
        // By doing nothing and not calling the super implementation, this prevents anything within a
        // module declaration from being considered by this rule.
        // Module declarations are "ambient contexts" where initializations are not allowed, so it is
        // nonsense to check for uninitialized properties within such a context.
        return;
    }
    
    private visitClassLikeDeclaration(
        node: ts.ClassDeclaration | ts.ClassExpression,
        superMethodName: 'visitClassDeclaration' | 'visitClassExpression',
    ): void {
        if (!super.hasOption(Options.PROPERTIES)) {
            return;
        }
        const _currentClassInitializedProperties: string[] = [];
        const constructor = findConstructor(node.members);
        if (constructor && constructor.body) {
            for (const statement of constructor.body.statements) {
                if (statement.kind !== ts.SyntaxKind.ExpressionStatement) {
                    continue;
                }
                const expressionStatement = <ts.ExpressionStatement> statement;
                if (expressionStatement.expression.kind !== ts.SyntaxKind.BinaryExpression) {
                    continue;
                }
                const binaryExpression = <ts.BinaryExpression> expressionStatement.expression;
                if (binaryExpression.left.kind !== ts.SyntaxKind.PropertyAccessExpression) {
                    continue;
                }
                const leftExpression = <ts.PropertyAccessExpression> binaryExpression.left;
                if (leftExpression.expression.kind === ts.SyntaxKind.ThisKeyword) {
                    _currentClassInitializedProperties.push(leftExpression.name.getText());
                }
            }
        }
        this._initializedProperties.push(_currentClassInitializedProperties);
        // Casting is necessary because the compiler believes there may be a mismatch
        // between the super method's signature and the type of 'node'.
        // Casting is safe because the overloaded signatures guarantee that this method
        // cannot be called (within typescript code) with a mismatch.
        (super[superMethodName] as (node: ts.ClassLikeDeclaration) => void)(node);
        this._initializedProperties.pop();
    }

    visitClassDeclaration(node: ts.ClassDeclaration) {
        this.visitClassLikeDeclaration(node, 'visitClassDeclaration');
    }

    visitClassExpression(node: ts.ClassExpression) {
        this.visitClassLikeDeclaration(node, 'visitClassExpression');
    }

    visitPropertyDeclaration(node: ts.PropertyDeclaration) {
        super.visitPropertyDeclaration(node);
        if (!super.hasOption(Options.PROPERTIES)) {
            return;
        }
        if (this.isNotInitialized(node) && canNotBeUndefined(node)) {
            this.addFailureAt(
                node.getStart(),
                node.getEnd(),
                `Property '${node.name.getText()}' is never initialized. 'undefined' is not assignable to its type.`);
        }
    }

    private isNotInitialized(node: ts.PropertyDeclaration) {
        const isNotAssigned = !(this._initializedProperties[this._initializedProperties.length - 1].indexOf(node.name.getText()) !== -1);
        return !node.initializer && isNotAssigned;
    }
}
