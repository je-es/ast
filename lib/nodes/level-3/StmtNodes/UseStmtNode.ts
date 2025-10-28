// UseStmtNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node, VisibilityInfo } from '../../node';
    import { IdentNode } from '../../level-4/CommonNodes/IdentNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class UseStmtNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Use' as const;
            public level = 3;

            constructor(
                public span         : Span,
                public visibility   : VisibilityInfo,
                public targetArr    : IdentNode[] | undefined,
                public alias?       : IdentNode,
                public path?        : string,
                public pathSpan?    : Span,
                public documents    : string[] = [],
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                return []; // No child nodes for UseNode
            }

            clone(newSpan?: Span): UseStmtNode {
                return new UseStmtNode(
                    newSpan ?? this.span,
                    this.visibility,
                    this.targetArr,
                    this.alias,
                    this.path,
                    this.pathSpan
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, visibility: VisibilityInfo, targetArr: IdentNode[] | undefined, alias?: IdentNode, path?: string, pathSpan?: Span, documents?: string[]): UseStmtNode {
                return new UseStmtNode(span, visibility, targetArr, alias, path, pathSpan, documents);
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            isAllModule(): boolean {
                return this.targetArr === undefined;
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝