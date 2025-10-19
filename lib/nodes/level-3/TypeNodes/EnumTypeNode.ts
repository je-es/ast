// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }       from '../../node';
    import { EnumVariantNode } from '../../../ast';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class EnumTypeNode extends Node  {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'enum' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public variants     : EnumVariantNode[],
                public name         : string = 'Anonymous',
                public metadata     : Record<string, unknown>,
            ) {
                super();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                children.push(...this.variants);

                return children;
            }

            clone(newSpan?: Span): EnumTypeNode {
                const cloned = new EnumTypeNode(newSpan || this.span, this.variants, this.name, this.metadata);
                return cloned;
            }

            toString(): string {
                return `enum`;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐


        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, variants: EnumVariantNode[], name: string = 'Anonymous', metadata: Record<string, unknown> = {}): EnumTypeNode {
                return new EnumTypeNode(span, variants, name, metadata);
            }

        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝