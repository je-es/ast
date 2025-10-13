// EnumVariantNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node } from '../../node';
    import { TypeNode } from '../../level-2/TypeNode';
import { IdentNode } from '../../../ast';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class EnumVariantNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'EnumVariant' as const;
            public level = 5;

            constructor(
                public span         : Span,
                public ident        : IdentNode,
                public type?        : TypeNode,
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return this.type ? [this.type] : [];
            }

            clone(newSpan?: Span): EnumVariantNode {
                return new EnumVariantNode(
                    newSpan ?? this.span,
                    this.ident,
                    this.type
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            hasType(): boolean {
                return this.type !== undefined;
            }

            isUnit(): boolean {
                return this.type === undefined;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, ident: IdentNode, type?: TypeNode): EnumVariantNode {
                return new EnumVariantNode(span, ident, type);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝