// BlockStmtNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node }   from '../../node';
    import { StmtNode }     from '../../level-1/StmtNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class BlockStmtNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'block' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public stmts        : StmtNode[],
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return this.stmts ? this.stmts : [];
            }

            clone(newSpan?: Span): BlockStmtNode {
                return new BlockStmtNode(
                    newSpan ?? this.span,
                    this.stmts
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, stmts?: StmtNode[]): BlockStmtNode {
                return new BlockStmtNode(span, stmts ?? []);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝