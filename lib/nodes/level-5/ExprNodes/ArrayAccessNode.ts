// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node } from '../../node';
    import { ExprNode } from '../../level-2/ExprNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class ArrayAccessNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'ArrayAccess' as const;
            public level = 5;

            constructor(
                public span         : Span,
                public base         : ExprNode,
                public index        : ExprNode,
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(this.base);
                children.push(this.index);

                return children;
            }

            clone(newSpan?: Span): ArrayAccessNode {
                const cloned = new ArrayAccessNode(newSpan || this.span, this.base, this.index);
                return cloned;
            }

            toString(): string {
                return `${this.base.toString()}[${this.index.toString()}]`;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, base: ExprNode, index: ExprNode): ArrayAccessNode {
                return new ArrayAccessNode(span, base, index);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝