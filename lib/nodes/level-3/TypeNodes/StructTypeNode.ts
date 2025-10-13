// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }       from '../../node';
    import { StructMemberNode } from '../../../ast';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class StructTypeNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Struct' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public members      : StructMemberNode[],
                public name         : string = 'Anonymous',
                public metadata     : Record<string, unknown>,
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

            clone(newSpan?: Span): StructTypeNode {
                const cloned = new StructTypeNode(newSpan || this.span, this.members, this.name, this.metadata);
                return cloned;
            }

            toString(): string {
                return `struct`;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐


        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, members: StructMemberNode[], name: string = 'Anonymous', metadata: Record<string, unknown> = {}): StructTypeNode {
                return new StructTypeNode(span, members, name, metadata);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝