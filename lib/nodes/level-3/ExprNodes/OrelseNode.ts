// OrelseNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }     from '../../level-2/ExprNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class OrelseNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 3;
            public kind = 'orelse';

            constructor(
                public span         : Span,
                public left         : ExprNode,
                public right        : ExprNode,
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return [this.left, this.right];
            }

            clone(newSpan?: Span): OrelseNode {
                return new OrelseNode(
                    newSpan ?? this.span,
                    this.left,
                    this.right
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, left: ExprNode, right: ExprNode): OrelseNode {
                return new OrelseNode(span, left, right);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝