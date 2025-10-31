// BinaryNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }     from '../../level-2/ExprNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export type BinaryKind =
    | 'unset'         | 'power'           | 'additive'    | 'multiplicative'
    | 'shift'         | 'relational'      | 'equality'    | 'bitwise'
    | 'logical'       | 'bitwiseAnd'      | 'bitwiseOr'   | 'bitwiseXor'
    | 'logicalAnd'    | 'logicalOr'       | 'conditional' | 'assignment';

    const op_table: Record<string, BinaryKind> = {
        '**': 'power',

        '*' : 'multiplicative',
        '/' : 'multiplicative',
        '%' : 'multiplicative',

        '+' : 'additive',
        '-' : 'additive',

        '<<': 'shift',
        '>>': 'shift',

        '<' : 'relational',
        '<=': 'relational',
        '>' : 'relational',
        '>=': 'relational',

        '==': 'equality',
        '!=': 'equality',

        '&' : 'bitwiseAnd',
        '^' : 'bitwiseXor',
        '|' : 'bitwiseOr',

        'and': 'logicalAnd',
        'or' : 'logicalOr',

        '=' : 'assignment',
        '+=': 'assignment',
        '-=': 'assignment',
        '*=': 'assignment',
        '/=': 'assignment',
        '%=': 'assignment'
    };

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class BinaryNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 3;

            constructor(
                public kind         : BinaryKind,
                public span         : Span,
                public left         : ExprNode,
                public operator     : string,
                public right        : ExprNode,
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(this.left);
                children.push(this.right);

                return children;
            }

            clone(newSpan?: Span): BinaryNode {
                const cloned = new BinaryNode(this.kind, newSpan || this.span, this.left, this.operator, this.right);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            is(kind: BinaryKind): boolean {
                return this.kind === kind;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, left: ExprNode, operator: string, right: ExprNode): BinaryNode {
                const kind : BinaryNode["kind"] = op_table[operator as keyof typeof op_table];
                if (!kind) {
                    throw new Error(`Unknown operator: ${operator}`);
                }
                return new BinaryNode(kind, span, left, operator, right);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝