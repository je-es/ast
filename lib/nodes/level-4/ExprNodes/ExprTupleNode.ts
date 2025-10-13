// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node } from '../../node';
    import { ExprNode } from '../../level-2/ExprNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class ExprTupleNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Tuple' as const;
            public level = 4;

            constructor(
                public span         : Span,
                public fields       : ExprNode[],
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(...this.fields);

                return children;
            }

            clone(newSpan?: Span): ExprTupleNode {
                const cloned = new ExprTupleNode(newSpan || this.span, this.fields);
                return cloned;
            }

            toString(): string {
                return `{ ${this.fields.map(f => `f${f.getIdent()!.name}`).join(', ') } }`;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, fields: ExprNode[]): ExprTupleNode {
                return new ExprTupleNode(span, fields);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝