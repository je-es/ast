// LetStmtNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node, VisibilityInfo, MutabilityInfo, ComptimeInfo } from '../../node';
    import { ExprNode }                 from '../../level-2/ExprNode';
    import { TypeNode }                 from '../../level-2/TypeNode';
    import { IdentNode }                from '../../level-4/CommonNodes/IdentNode';
    import { FieldNode }                from '../../../ast';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class LetStmtNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Let' as const;
            public level = 3;

            constructor(
                public span             : Span,
                public field            : FieldNode,
                public documents        : string[] = [],
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return this.field.getChildrenNodes();
            }

            clone(newSpan?: Span): LetStmtNode {
                return new LetStmtNode(
                    newSpan ?? this.span,
                    this.field.clone(newSpan),
                );
            }

            // for factory
            getField(): FieldNode {
                return this.field;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, visibility: VisibilityInfo, comptime: ComptimeInfo, mutability: MutabilityInfo, ident: IdentNode, type?: TypeNode, initializer?: ExprNode, documents?: string[]): LetStmtNode {
                const field = FieldNode.create(span, visibility, comptime, mutability, ident, type, initializer, documents);
                return new LetStmtNode(span, field);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝