import * as Path from 'path';
import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new FileNamePatterWalker(sourceFile, this.getOptions()));
    }
}

// tslint:disable-next-line:max-classes-per-file
class FileNamePatterWalker extends Lint.RuleWalker {
    private static FAILURE_STRING = 'FileName does not match to pattern:';
    protected _regex: RegExp;
    constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
        super(sourceFile, options);
        let regexString = options.ruleArguments.map(x => `(${x})`).join('|');
        this._regex = new RegExp(regexString,'m');
    }
    protected visitSourceFile(node: ts.SourceFile): void {
        if (!this._regex.test(Path.basename(node.fileName))) {
            this.addFailureAt(node.getStart(), node.getEnd(), FileNamePatterWalker.FAILURE_STRING + ' ' + this._regex.source);
        }
        super.visitSourceFile(node);
    }
}
