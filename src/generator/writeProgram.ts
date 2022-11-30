import { ASTExpression, ASTStatement } from "../ast/ast";
import { CompilerContext } from "../ast/context";
import { getExpType } from "../types/resolveExpressionType";
import { getAllStaticFunctions, getType } from "../types/resolveTypeDescriptors";
import { FunctionDescription, TypeDescription } from "../types/TypeDescription";
import { Writer } from "./Writer";

function resolveFunCType(descriptor: TypeDescription): string {
    if (descriptor.kind === 'primitive') {
        if (descriptor.name === 'Int') {
            return 'int';
        } else if (descriptor.name === 'Bool') {
            return 'int';
        } else if (descriptor.name === 'Slice') {
            return 'slice';
        } else if (descriptor.name === 'Cell') {
            return 'cell';
        } else {
            throw Error('Unknown primitive type: ' + descriptor.name);
        }
    } else if (descriptor.kind === 'struct') {
        return '[' + descriptor.fields.map((k) => resolveFunCType(k.type)).join(', ') + ']';
    }

    throw Error('Unknown type: ' + descriptor.kind);
}

function writeExpression(ctx: CompilerContext, f: ASTExpression): string {
    if (f.kind === 'boolean') {
        return f.value ? 'true' : 'false';
    } else if (f.kind === 'number') {
        return f.value.toString(10);
    } else if (f.kind === 'id') {
        return f.value;
    } else if (f.kind === 'op_binary') {
        let op: string;
        if (f.op === '*') {
            op = '__tact_mul';
        } else if (f.op === '/') {
            op = '__tact_div';
        } else if (f.op === '+') {
            op = '__tact_add';
        } else if (f.op === '-') {
            op = '__tact_sub';
        } else if (f.op === '==') {
            op = '__tact_eq';
        } else if (f.op === '!=') {
            op = '__tact_neq';
        } else if (f.op === '<') {
            op = '__tact_lt';
        } else if (f.op === '<=') {
            op = '__tact_lte';
        } else if (f.op === '>') {
            op = '__tact_gt';
        } else if (f.op === '>=') {
            op = '__tact_gte';
        } else if (f.op === '||') {
            op = '__tact_or';
        } else if (f.op === '&&') {
            op = '__tact_and';
        } else {
            throw Error('Unknown binary operator: ' + f.op);
        }
        return op + '(' + writeExpression(ctx, f.left) + ', ' + writeExpression(ctx, f.right) + ')';
    } else if (f.kind === 'op_unary') {
        // if (f.op === '!') {
        //     return '!' + writeExpression(ctx, f.expression);
        // } else if (f.op === '-') {
        //     return '-' + writeExpression(ctx, f.expression);
        // } else {
        //     throw Error('Unknown unary operator: ' + f.op);
        // }
    } else if (f.kind === 'op_field') {
        let src = getExpType(ctx, f.src);
        let index = src.fields.findIndex((v) => v.name === f.name);
        return '__tact_get(' + writeExpression(ctx, f.src) + ', ' + index + ')';
    } else if (f.kind === 'op_static_call') {
        return f.name + '(' + f.args.map((a) => writeExpression(ctx, a)).join(', ') + ')';
    } else if (f.kind === 'op_call') {
        let src = getExpType(ctx, f.src);
        let index = src.functions.findIndex((v) => v.name === f.name);
        return '__tact_call(' + writeExpression(ctx, f.src) + ', ' + index + ', [' + f.args.map((a) => writeExpression(ctx, a)).join(', ') + '])';
    }
    throw Error('Unknown expression kind: ' + f.kind);
}

function writeStatement(ctx: CompilerContext, f: ASTStatement, w: Writer) {
    if (f.kind === 'statement_return') {
        w.append('return ' + writeExpression(ctx, f.expression) + ';');
        return;
    } else if (f.kind === 'statement_let') {
        w.append(resolveFunCType(getType(ctx, f.type)) + ' ' + f.name + ' = ' + writeExpression(ctx, f.expression) + ';');
        return;
    } else if (f.kind === 'statement_assign') {
        w.append(f.name + ' = ' + writeExpression(ctx, f.expression) + ';');
        return;
    }
    throw Error('Unknown statement kind: ' + f.kind);
}

function writeFunction(ctx: CompilerContext, f: FunctionDescription, w: Writer) {

    // Do not write native functions
    if (f.ast.kind === 'def_native_function') {
        return;
    }
    const fd = f.ast;

    // Write function header
    w.append((f.returns ? resolveFunCType(f.returns) : '()') + ' ' + f.name + '(' + f.args.map((a) => resolveFunCType(a.type) + ' ' + a.name).join(', ') + ') {');
    w.inIndent(() => {
        for (let s of fd.statements) {
            writeStatement(ctx, s, w);
        }
    });
    w.append("}");
}

export function writeProgram(ctx: CompilerContext) {
    const writer = new Writer();

    // Static functions
    let sf = getAllStaticFunctions(ctx);
    for (let k in sf) {
        let f = sf[k];
        writeFunction(ctx, f, writer);
    }

    // Types
    // TODO: Implement

    return writer.end();
}