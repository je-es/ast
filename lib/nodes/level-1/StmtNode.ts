// StmtNode.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node, MutabilityInfo, VisibilityInfo, ComptimeInfo, NameInfo }
                                        from '../node';
    import { ExprNode }                 from '../level-2/ExprNode';
    import { BlockStmtNode }            from '../level-3/StmtNodes/BlockStmtNode';
    import { SectionStmtNode }          from '../level-3/StmtNodes/SectionStmtNode';
    import { LetStmtNode }              from '../level-3/StmtNodes/LetStmtNode';
    import { FuncStmtNode }             from '../level-3/StmtNodes/FuncStmtNode';
    import { UseStmtNode }              from '../level-3/StmtNodes/UseStmtNode';
    import { DefStmtNode }              from '../level-3/StmtNodes/DefStmtNode';
    import { ForStmtNode }              from '../level-3/StmtNodes/ForStmtNode';
    import { WhileStmtNode }            from '../level-3/StmtNodes/WhileStmtNode';
    import { DoStmtNode }               from '../level-3/StmtNodes/DoStmtNode';
    import { TypeNode }                 from '../level-2/TypeNode';
    import { FieldNode }                from '../level-5/common/FieldNode';
    import { IdentNode }                from '../level-4/CommonNodes/IdentNode';
    import { TestStmtNode }             from '../level-3/StmtNodes/TestStmtNode';
    import { BreakStmtNode }            from '../level-3/StmtNodes/BreakStmtNode';
    import { ContinueStmtNode }         from '../level-3/StmtNodes/ContinueStmtNode';
    import { ReturnStmtNode }           from '../level-3/StmtNodes/ReturnStmtNode';
    import { DeferStmtNode }            from '../level-3/StmtNodes/DeferStmtNode';
    import { ThrowStmtNode }            from '../level-3/StmtNodes/ThrowStmtNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export type StmtKind =
    | 'unset'       | 'expression'  | 'block'       | 'use'         | 'def'
    | 'let'         | 'func'        | 'for'         | 'while'       | 'return'
    | 'break'       | 'continue'    | 'defer'       | 'throw'       | 'do'
    | 'test'        | 'section';

    export type StmtTypes =
    | ExprNode      | BlockStmtNode     | TestStmtNode  | LetStmtNode   | FuncStmtNode
    | UseStmtNode   | DefStmtNode       | ForStmtNode   | WhileStmtNode | DoStmtNode
    | BreakStmtNode | ContinueStmtNode  | ReturnStmtNode| DeferStmtNode | ThrowStmtNode
    | SectionStmtNode;

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class StmtNode extends Node {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public level = 1;

            constructor(
                public kind         : StmtKind,
                public span         : Span,
                public source       : StmtTypes,
            ) { super(); }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── NODE ──────────────────────────────┐

            public getChildrenNodes(): Node[] {
                const children: Node[] = [];

                if (this.is('block')) {
                    children.push(...this.getBlock()!.getChildrenNodes());
                } else if (this.is('section')) {
                    children.push(...this.getSection()!.getChildrenNodes());
                } else if (this.source instanceof Node) {
                    children.push(this.source);
                }

                return children;
            }

            clone(newSpan?: Span): StmtNode {
                return new StmtNode(this.kind, newSpan ?? this.span, this.source);
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            getExpr(): ExprNode | undefined {
                if (this.is('expression')) {
                    return this.source as ExprNode;
                }
                return undefined;
            }

            getBlock(): BlockStmtNode | undefined {
                if (this.is('block')) {
                    return this.source as BlockStmtNode;
                }
                return undefined;
            }

            getSection(): SectionStmtNode | undefined {
                if (this.is('section')) {
                    return this.source as SectionStmtNode;
                }
                return undefined;
            }

            getTest(): TestStmtNode | undefined {
                if (this.is('test')) {
                    return this.source as TestStmtNode;
                }
                return undefined;
            }

            getUse(): UseStmtNode | undefined {
                if (this.is('use')) {
                    return this.source as UseStmtNode;
                }
                return undefined;
            }

            getDef(): DefStmtNode | undefined {
                if (this.is('def')) {
                    return this.source as DefStmtNode;
                }
                return undefined;
            }

            getLet(): LetStmtNode | undefined {
                if (this.is('let')) {
                    return this.source as LetStmtNode;
                }
                return undefined;
            }

            getFunc(): FuncStmtNode | undefined {
                if (this.is('func')) {
                    return this.source as FuncStmtNode;
                }
                return undefined;
            }


            getFor(): ForStmtNode | undefined {
                if (this.is('for')) {
                    return this.source as ForStmtNode;
                }
                return undefined;
            }

            getWhile(): WhileStmtNode | undefined {
                if (this.is('while')) {
                    return this.source as WhileStmtNode;
                }
                return undefined;
            }


            getDo(): DoStmtNode | undefined {
                if (this.is('do')) {
                    return this.source as DoStmtNode;
                }
                return undefined;
            }

            getReturn(): ReturnStmtNode | undefined {
                if (this.is('return')) {
                    return this.source as ReturnStmtNode;
                }
                return undefined;
            }

            getDefer(): DeferStmtNode | undefined {
                if (this.is('defer')) {
                    return this.source as DeferStmtNode;
                }
                return undefined;
            }

            getThrow(): ThrowStmtNode | undefined {
                if (this.is('throw')) {
                    return this.source as ThrowStmtNode;
                }
                return undefined;
            }

            getBreak(): BreakStmtNode | undefined {
                if (this.is('break')) {
                    return this.source as BreakStmtNode;
                }
                return undefined;
            }

            getContinue(): ContinueStmtNode | undefined {
                if (this.is('continue')) {
                    return this.source as ContinueStmtNode;
                }
                return undefined;
            }

            getStmtName(): string | undefined {
                if (this.is('use')) {
                    return (this.source as UseStmtNode).alias?.name ?? (this.source as UseStmtNode).path ?? 'unknown-use';
                } else if (this.is('def')) {
                    return (this.source as DefStmtNode).ident.name;
                } else if (this.is('let')) {
                    return (this.source as LetStmtNode).field.ident.name;
                } else if (this.is('func')) {
                    return (this.source as FuncStmtNode).ident.name;
                }
                return undefined;
            }

            getStmtNameSpan(): Span | undefined {
                if (this.is('use')) {
                    return (this.source as UseStmtNode).span;
                } else if (this.is('def')) {
                    return (this.source as DefStmtNode).ident.span;
                } else if (this.is('let')) {
                    return (this.source as LetStmtNode).field.ident.span;
                } else if (this.is('func')) {
                    return (this.source as FuncStmtNode).ident.span;
                }
                return undefined;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(kind: StmtKind, span: Span, data: StmtTypes): StmtNode {
                return new StmtNode(kind, span, data);
            }

            static asExpr(span: Span, expr: ExprNode): StmtNode {
                return StmtNode.create('expression', span, expr);
            }

            static asBlock(span: Span, stmts: StmtNode[]): StmtNode {
                return StmtNode.create('block', span, BlockStmtNode.create(span, stmts));
            }

            static asSection(span: Span, nameInfo: NameInfo, indent: number, stmts: StmtNode[]): StmtNode {
                return StmtNode.create('section', span, SectionStmtNode.create(span, nameInfo, indent, stmts));
            }

            static asUse(span: Span, visibility: VisibilityInfo, targetArr: IdentNode[] | undefined, alias?: IdentNode, path?: string, pathSpan?: Span, documents?: string[]): StmtNode {
                return StmtNode.create('use', span, UseStmtNode.create(span, visibility, targetArr, alias, path, pathSpan, documents));
            }

            static asDefine(span: Span, visibility: VisibilityInfo, ident: IdentNode, type: TypeNode, documents?: string[]): StmtNode {
                return StmtNode.create('def', span, DefStmtNode.create(span, visibility, ident, type, documents));
            }

            static asLet(span: Span, visibility: VisibilityInfo, comptime: ComptimeInfo, mutability: MutabilityInfo, ident: IdentNode, type?: TypeNode, initializer?: ExprNode, documents?: string[]): StmtNode {
                return StmtNode.create('let', span, LetStmtNode.create(span, visibility, comptime, mutability, ident, type, initializer, documents));
            }

            static asFunc(span: Span, visibility: VisibilityInfo, comptime: ComptimeInfo, isInline: boolean, ident: IdentNode, parameters: FieldNode[], errorType: TypeNode | undefined, returnType: TypeNode | undefined, body: StmtNode, documents?: string[]): StmtNode {
                return StmtNode.create('func', span, FuncStmtNode.create(span, visibility, comptime, isInline, ident, parameters, body, errorType, returnType, documents));
            }

            static asFor(span: Span, expr: ExprNode, stmt: StmtNode): StmtNode {
                return StmtNode.create('for', span, ForStmtNode.create(span, expr, stmt));
            }

            static asWhile(span: Span, expr: ExprNode, stmt: StmtNode): StmtNode {
                return StmtNode.create('while', span, WhileStmtNode.create(span, expr, stmt));
            }

            static asDo(span: Span, expr: ExprNode, stmt: StmtNode): StmtNode {
                return StmtNode.create('do', span, DoStmtNode.create(span, expr, stmt));
            }

            static asReturn(span: Span, expr?: ExprNode): StmtNode {
                return StmtNode.create('return', span, ReturnStmtNode.create(span, expr));
            }

            static asDefer(span: Span, expr: ExprNode): StmtNode {
                return StmtNode.create('defer', span, DeferStmtNode.create(span, expr));
            }

            static asThrow(span: Span, expr: ExprNode): StmtNode {
                return StmtNode.create('throw', span, ThrowStmtNode.create(span, expr));
            }

            static asBreak(span: Span): StmtNode {
                return StmtNode.create('break', span, BreakStmtNode.create(span));
            }

            static asContinue(span: Span): StmtNode {
                return StmtNode.create('continue', span, ContinueStmtNode.create(span));
            }

            static asTest(span: Span, nameInfo: NameInfo | undefined, block: BlockStmtNode, documents?: string[]): StmtNode {
                return StmtNode.create('test', span, TestStmtNode.create(span, nameInfo, block, documents));
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── IS_X ──────────────────────────────┐

            is(kind: StmtKind): boolean {
                return this.kind === kind;
            }


        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝