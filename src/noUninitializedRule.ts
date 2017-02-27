import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        let result = new Array<Lint.RuleFailure>();
        return this.applyWithWalker(new NoUninitializedVariableWalker(sourceFile, this.getOptions()))
            .concat(this.applyWithWalker(new NoUninitializedPropertiesWalker(sourceFile, this.getOptions())));

    }
}

function isUndefinedInTypeDomain(type: ts.TypeNode): boolean {
    if (type === undefined) {
        return false;
    }
    if ([ts.SyntaxKind.UnionType, ts.SyntaxKind.IntersectionType].indexOf(type.kind) !== -1) {
        const unionOrIntersection = <ts.UnionOrIntersectionTypeNode>type
        return unionOrIntersection.types.some(isUndefinedInTypeDomain)
    }
    return [ts.SyntaxKind.UndefinedKeyword].indexOf(type.kind) !== -1
}

// tslint:disable-next-line:max-classes-per-file
class NoUninitializedVariableWalker extends Lint.RuleWalker {

    protected visitVariableDeclaration(node: ts.VariableDeclaration) {
        super.visitVariableDeclaration(node);
        if (super.hasOption('variable')) {
            if (node.initializer === undefined && !isUndefinedInTypeDomain(node.type!)) {
                super.addFailureAt(node.getStart(), node.getEnd(), node.parent!.getText() + ' is uninitialized.');
            }
        }
    }
}

class NoUninitializedPropertiesWalker extends Lint.RuleWalker {

    private _initializedProperties: string[][] = []

    find<T>(collection: T[], predicate: (it: T) => boolean): T | null {
        for (const item of collection) {
            if (predicate(item)) {
                return item
            }
        }
        return null
    }
    visitClassDeclaration(node: ts.ClassDeclaration) {
        if (!super.hasOption('properties')) {
            return;
        }
        const _currentClassInitializedProperties: string[] = []
        const constructor = <ts.ConstructorDeclaration>this.find(node.members, it => it.kind === ts.SyntaxKind.Constructor)
        if (constructor && constructor.body) {
            for (const statement of constructor.body.statements) {
                if (statement.kind !== ts.SyntaxKind.ExpressionStatement) {
                    continue
                }
                const expressionStatement = <ts.ExpressionStatement>statement
                if (expressionStatement.expression.kind !== ts.SyntaxKind.BinaryExpression) {
                    continue
                }
                const binaryExpression = <ts.BinaryExpression>expressionStatement.expression
                if (binaryExpression.left.kind !== ts.SyntaxKind.PropertyAccessExpression) {
                    continue
                }
                const leftExpression = <ts.PropertyAccessExpression>binaryExpression.left
                if (leftExpression.expression.kind === ts.SyntaxKind.ThisKeyword) {
                    _currentClassInitializedProperties.push(leftExpression.name.getText())
                }
            }
        }
        this._initializedProperties.push(_currentClassInitializedProperties)
        super.visitClassDeclaration(node)
        this._initializedProperties.pop()
    }

    visitPropertyDeclaration(node: ts.PropertyDeclaration) {
        super.visitPropertyDeclaration(node)
        if (!super.hasOption('type-assertion')) {
            return;
        }
        const nodeName = node.name.getText()
        const isAssigned = this._initializedProperties[this._initializedProperties.length - 1].indexOf(nodeName) !== -1
        if (!node.initializer && !node.questionToken && !isUndefinedInTypeDomain(node.type!) && !isAssigned) {
            this.addFailureAt(node.getStart(), node.getEnd(), `Property '${node.name.getText()}' is never initialized`)
        }
    }
}
