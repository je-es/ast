// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { IdentNode }        from '../../../ast';
    import { Span, Node }       from '../../node';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class ErrsetTypeNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'errset' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public members      : IdentNode[],
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(...this.members);

                return children;
            }

            clone(newSpan?: Span): ErrsetTypeNode {
                const cloned = new ErrsetTypeNode(newSpan || this.span, this.members);
                return cloned;
            }

            toString(): string {
                return `error`;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, members: IdentNode[]): ErrsetTypeNode {
                return new ErrsetTypeNode(span, members);
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐


        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝