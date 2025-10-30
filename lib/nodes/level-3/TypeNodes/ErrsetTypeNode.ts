// ErrsetTypeNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node, NameInfo } from '../../node';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class ErrsetTypeNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'errset' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public members      : NameInfo[],
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];
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

            static create(span: Span, members: NameInfo[]): ErrsetTypeNode {
                return new ErrsetTypeNode(span, members);
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐


        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝