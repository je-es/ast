// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { TypeNode }     from '../../level-2/TypeNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class TupleTypeNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'tuple' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public fields       : TypeNode[],
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return [...this.fields];
            }

            clone(newSpan?: Span): TupleTypeNode {
                const cloned = new TupleTypeNode(newSpan || this.span, this.fields);
                return cloned;
            }

            toString(): string {
                return `(${this.fields.join(', ')})`;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐


        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, fields: TypeNode[]): TupleTypeNode {
                return new TupleTypeNode(span, fields);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝