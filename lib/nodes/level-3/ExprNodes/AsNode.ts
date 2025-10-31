// AsNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { ExprNode }     from '../../level-2/ExprNode';
    import { TypeNode }     from '../../level-2/TypeNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class AsNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 3;
            public kind = 'as';

            constructor(
                public span         : Span,
                public base         : ExprNode,
                public type         : TypeNode,
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return [this.base, this.type];
            }

            clone(newSpan?: Span): AsNode {
                return new AsNode(
                    newSpan ?? this.span,
                    this.base,
                    this.type
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, left: ExprNode, type: TypeNode): AsNode {
                return new AsNode(span, left, type);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝