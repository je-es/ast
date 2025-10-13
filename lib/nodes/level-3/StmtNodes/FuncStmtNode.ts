// FuncStmtNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node, VisibilityInfo, ComptimeInfo } from '../../node';
    import { TypeNode }                 from '../../level-2/TypeNode';
    import { FieldNode }                from '../../level-5/common/FieldNode';
    import { IdentNode }                from '../../level-4/CommonNodes/IdentNode';
    import { StmtNode }                 from '../../level-1/StmtNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class FuncStmtNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public kind = 'Function' as const;
            public level = 3;

            constructor(
                public span             : Span,
                public visibility       : VisibilityInfo,
                public comptime         : ComptimeInfo,
                public isInline         : boolean,
                public ident            : IdentNode,
                public parameters       : FieldNode[],
                public body             : StmtNode,
                public errorType?       : TypeNode,
                public returnType?      : TypeNode,
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                // Add parameters
                for (const param of this.parameters) {
                    children.push(param);
                }

                if (this.errorType) {children.push(this.errorType);}
                if (this.returnType) {children.push(this.returnType);}
                if (this.body) {children.push(this.body);}

                return children;
            }

            clone(newSpan?: Span): FuncStmtNode {
                return new FuncStmtNode(
                    newSpan ?? this.span,
                    this.visibility,
                    this.comptime,
                    this.isInline,
                    this.ident,
                    this.parameters,
                    this.body,
                    this.errorType,
                    this.returnType,
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(span: Span, visibility: VisibilityInfo, comptime: ComptimeInfo, isInline: boolean, ident: IdentNode, parameters: FieldNode[], body: StmtNode, errorType?: TypeNode, returnType?: TypeNode): FuncStmtNode {
                return new FuncStmtNode(span, visibility, comptime, isInline, ident, parameters, body, errorType, returnType);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝