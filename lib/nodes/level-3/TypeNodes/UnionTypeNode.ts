// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { TypeNode }     from '../../level-2/TypeNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class UnionTypeNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'union' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public types        : TypeNode[],
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(...this.types);

                return children;
            }

            clone(newSpan?: Span): UnionTypeNode {
                const cloned = new UnionTypeNode(newSpan || this.span, this.types);
                return cloned;
            }

            toString(): string {
                return `union`;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐


        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, types: TypeNode[]): UnionTypeNode {
                return new UnionTypeNode(span, types);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝