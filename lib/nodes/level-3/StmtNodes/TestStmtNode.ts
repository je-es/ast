// TestStmtNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node, NameInfo } from '../../node';
    import { BlockStmtNode }        from './BlockStmtNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class TestStmtNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Test' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public name         : NameInfo | undefined,
                public block        : BlockStmtNode,
                public documents    : string[] = [],
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return [this.block];
            }

            clone(newSpan?: Span): TestStmtNode {
                return new TestStmtNode(
                    newSpan ?? this.span,
                    this.name,
                    this.block
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, name: NameInfo | undefined, block: BlockStmtNode, documents?: string[]): TestStmtNode {
                return new TestStmtNode(span, name, block, documents);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝