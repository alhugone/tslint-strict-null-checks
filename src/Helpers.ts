import * as Lint from 'tslint';
import * as ts from 'typescript';

export function canNotBeUndefined(node?: ts.PropertyDeclaration): boolean {
    return !(node !== undefined && (node.questionToken !== undefined || isUndefinedInDomainOf(node.type)));
}

export function findConstructor(collection: ts.NodeArray<ts.ClassElement>): ts.ConstructorDeclaration | undefined {
    for (const item of collection) {
        if (item.kind === ts.SyntaxKind.Constructor) {
            return item as ts.ConstructorDeclaration;
        }
    }
    return undefined;
}

export function isUndefinedInDomainOf(type?: ts.TypeNode): boolean {
    if (type === undefined) {
        return false;
    }
    if ([ts.SyntaxKind.UnionType, ts.SyntaxKind.IntersectionType].indexOf(type.kind) !== -1) {
        const unionOrIntersection = <ts.UnionOrIntersectionTypeNode>type;
        return unionOrIntersection.types.some(isUndefinedInDomainOf);
    }
    return [ts.SyntaxKind.UndefinedKeyword].indexOf(type.kind) !== -1;
}
