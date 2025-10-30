// PrefixNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }     from '../../level-2/ExprNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export type PrefixKind =
    | 'Increment'    | 'Decrement'       | 'Reference'   | 'UnaryMinus'
    | 'UnaryPlus'    | 'LogicalNot'      | 'BitwiseNot';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class PrefixNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 3;

            constructor(
                public kind         : PrefixKind,
                public span         : Span,
                public expr         : ExprNode,
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(this.expr);

                return children;
            }

            clone(newSpan?: Span): PrefixNode {
                const cloned = new PrefixNode(this.kind, newSpan || this.span, this.expr);
                return cloned;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            is(kind: PrefixKind): boolean {
                return this.kind === kind;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(kind: PrefixKind, span: Span, expr: ExprNode): PrefixNode {
                return new PrefixNode(kind, span, expr);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝