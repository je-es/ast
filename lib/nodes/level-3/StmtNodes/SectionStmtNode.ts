// SectionStmtNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node, NameInfo }   from '../../node';
    import { StmtNode }     from '../../level-1/StmtNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class SectionStmtNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Section' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public name         : NameInfo,
                public indent       : number,
                public stmts        : StmtNode[],
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return this.stmts ? this.stmts : [];
            }

            clone(newSpan?: Span): SectionStmtNode {
                return new SectionStmtNode(
                    newSpan ?? this.span,
                    this.name,
                    this.indent,
                    this.stmts
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, name: NameInfo, indent: number, stmts?: StmtNode[]): SectionStmtNode {
                return new SectionStmtNode(span, name, indent, stmts ?? []);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝