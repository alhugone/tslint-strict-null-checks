import * as Path from 'path';
import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoUninitializedWalker(sourceFile, this.getOptions()));
    }
}

// tslint:disable-next-line:max-classes-per-file
class NoUninitializedWalker extends Lint.RuleWalker {

    isUndefinedInTypeDomain(type: ts.TypeNode): boolean {
        if (type === undefined) {
            return false;
        }
        if ([ts.SyntaxKind.UnionType, ts.SyntaxKind.IntersectionType].indexOf(type.kind) !== -1) {
            const unionOrIntersection = <ts.UnionOrIntersectionTypeNode>type
            return unionOrIntersection.types.some(this.isUndefinedInTypeDomain)
        }
        return [ts.SyntaxKind.UndefinedKeyword].indexOf(type.kind) !== -1
    }

    protected visitVariableDeclaration(node: ts.VariableDeclaration) {
        super.visitVariableDeclaration(node);
        if (super.hasOption('variable')) {
            if (node.initializer === undefined && !this.isUndefinedInTypeDomain(node.type!)) {
                super.addFailureAt(node.getStart(), node.getEnd(), node.parent!.getText() + ' is uninitialized.');
            }
        }
    }
}
