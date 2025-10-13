// ..?
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Span, Node, MutabilityInfo, VisibilityInfo, ComptimeInfo, NameInfo }
                                        from '../node';
    import { ExprNode }                 from '../level-2/ExprNode';
    import { BlockStmtNode }            from '../level-3/StmtNodes/BlockStmtNode';
    import { LetStmtNode }              from '../level-3/StmtNodes/LetStmtNode';
    import { FuncStmtNode }             from '../level-3/StmtNodes/FuncStmtNode';
    import { UseStmtNode }              from '../level-3/StmtNodes/UseStmtNode';
    import { DefStmtNode }              from '../level-3/StmtNodes/DefStmtNode';
    import { LoopStmtNode }             from '../level-3/StmtNodes/LoopStmtNode';
    import { ControlFlowStmtNode }      from '../level-3/StmtNodes/ControlFlowStmtNode';
    import { TypeNode }                 from '../level-2/TypeNode';
    import { FieldNode }                from '../level-5/common/FieldNode';
    import { IdentNode }                from '../level-4/CommonNodes/IdentNode';
    import { TestStmtNode }             from '../level-3/StmtNodes/TestStmtNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export type StmtKind =
    | 'Unset'       | 'Expression'  | 'Block'       | 'Use'         | 'Def'
    | 'Let'         | 'Func'        | 'For'         | 'While'       | 'Return'
    | 'Break'       | 'Continue'    | 'Defer'       | 'Throw'       | 'Do'
    | 'Test';

    export type StmtTypes =
    | ExprNode      | BlockStmtNode | TestStmtNode  | LetStmtNode   | FuncStmtNode
    | UseStmtNode   | DefStmtNode   | LoopStmtNode  | ControlFlowStmtNode;

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

                if (this.is('Block')) {
                    children.push(...this.getBlock()!.getChildrenNodes());
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
                if (this.is('Expression')) {
                    return this.source as ExprNode;
                }
                return undefined;
            }

            getBlock(): BlockStmtNode | undefined {
                if (this.is('Block')) {
                    return this.source as BlockStmtNode;
                }
                return undefined;
            }

            getTest(): TestStmtNode | undefined {
                if (this.is('Test')) {
                    return this.source as TestStmtNode;
                }
                return undefined;
            }

            getUse(): UseStmtNode | undefined {
                if (this.is('Use')) {
                    return this.source as UseStmtNode;
                }
                return undefined;
            }

            getDef(): DefStmtNode | undefined {
                if (this.is('Def')) {
                    return this.source as DefStmtNode;
                }
                return undefined;
            }

            getLet(): LetStmtNode | undefined {
                if (this.is('Let')) {
                    return this.source as LetStmtNode;
                }
                return undefined;
            }

            getFunc(): FuncStmtNode | undefined {
                if (this.is('Func')) {
                    return this.source as FuncStmtNode;
                }
                return undefined;
            }

            getLoop(): LoopStmtNode | undefined {
                if (this.is('For') || this.is('While') || this.is('Do')) {
                    return this.source as LoopStmtNode;
                }
                return undefined;
            }

            getFor(): LoopStmtNode | undefined {
                if (this.is('For')) {
                    return this.source as LoopStmtNode;
                }
                return undefined;
            }

            getWhile(): LoopStmtNode | undefined {
                if (this.is('While')) {
                    return this.source as LoopStmtNode;
                }
                return undefined;
            }


            getDo(): LoopStmtNode | undefined {
                if (this.is('Do')) {
                    return this.source as LoopStmtNode;
                }
                return undefined;
            }

            getCtrlflow(): ControlFlowStmtNode | undefined {
                if (this.is('Return') || this.is('Defer') || this.is('Throw') || this.is('Break') || this.is('Continue')) {
                    return this.source as ControlFlowStmtNode;
                }
                return undefined;
            }

            getReturn(): ControlFlowStmtNode | undefined {
                if (this.is('Return')) {
                    return this.source as ControlFlowStmtNode;
                }
                return undefined;
            }

            getDefer(): ControlFlowStmtNode | undefined {
                if (this.is('Defer')) {
                    return this.source as ControlFlowStmtNode;
                }
                return undefined;
            }

            getThrow(): ControlFlowStmtNode | undefined {
                if (this.is('Throw')) {
                    return this.source as ControlFlowStmtNode;
                }
                return undefined;
            }

            getBreak(): ControlFlowStmtNode | undefined {
                if (this.is('Break')) {
                    return this.source as ControlFlowStmtNode;
                }
                return undefined;
            }

            getContinue(): ControlFlowStmtNode | undefined {
                if (this.is('Continue')) {
                    return this.source as ControlFlowStmtNode;
                }
                return undefined;
            }

            getStmtName(): string | undefined {
                if (this.is('Use')) {
                    return (this.source as UseStmtNode).alias?.name ?? (this.source as UseStmtNode).path ?? 'unknown-use';
                } else if (this.is('Def')) {
                    return (this.source as DefStmtNode).ident.name;
                } else if (this.is('Let')) {
                    return (this.source as LetStmtNode).field.ident.name;
                } else if (this.is('Func')) {
                    return (this.source as FuncStmtNode).ident.name;
                }
                return undefined;
            }

            getStmtNameSpan(): Span | undefined {
                if (this.is('Use')) {
                    return (this.source as UseStmtNode).span;
                } else if (this.is('Def')) {
                    return (this.source as DefStmtNode).ident.span;
                } else if (this.is('Let')) {
                    return (this.source as LetStmtNode).field.ident.span;
                } else if (this.is('Func')) {
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
                return StmtNode.create('Expression', span, expr);
            }

            static asBlock(span: Span, stmts: StmtNode[]): StmtNode {
                return StmtNode.create('Block', span, BlockStmtNode.create(span, stmts));
            }

            static asUse(span: Span, visibility: VisibilityInfo, targetArr: IdentNode[] | undefined, alias?: IdentNode, path?: string, pathSpan?: Span): StmtNode {
                return StmtNode.create('Use', span, UseStmtNode.create(span, visibility, targetArr, alias, path, pathSpan));
            }

            static asDefine(span: Span, visibility: VisibilityInfo, ident: IdentNode, type: TypeNode): StmtNode {
                return StmtNode.create('Def', span, DefStmtNode.create(span, visibility, ident, type));
            }

            static asLet(span: Span, visibility: VisibilityInfo, comptime: ComptimeInfo, mutability: MutabilityInfo, ident: IdentNode, type?: TypeNode, initializer?: ExprNode): StmtNode {
                return StmtNode.create('Let', span, LetStmtNode.create(span, visibility, comptime, mutability, ident, type, initializer));
            }

            static asFunc(span: Span, visibility: VisibilityInfo, comptime: ComptimeInfo, isInline: boolean, ident: IdentNode, parameters: FieldNode[], errorType: TypeNode | undefined, returnType: TypeNode | undefined, body: StmtNode): StmtNode {
                return StmtNode.create('Func', span, FuncStmtNode.create(span, visibility, comptime, isInline, ident, parameters, body, errorType, returnType));
            }

            static asFor(span: Span, expr: ExprNode, stmt: StmtNode): StmtNode {
                return StmtNode.create('For', span, LoopStmtNode.createFor(span, expr, stmt));
            }

            static asWhile(span: Span, expr: ExprNode, stmt: StmtNode): StmtNode {
                return StmtNode.create('While', span, LoopStmtNode.createWhile(span, expr, stmt));
            }

            static asDo(span: Span, expr: ExprNode, stmt: StmtNode): StmtNode {
                return StmtNode.create('Do', span, LoopStmtNode.createDo(span, expr, stmt));
            }

            static asReturn(span: Span, value?: ExprNode): StmtNode {
                return StmtNode.create('Return', span, ControlFlowStmtNode.asReturn(span, value));
            }

            static asDefer(span: Span, value?: ExprNode): StmtNode {
                return StmtNode.create('Defer', span, ControlFlowStmtNode.asDefer(span, value));
            }

            static asThrow(span: Span, value?: ExprNode): StmtNode {
                return StmtNode.create('Throw', span, ControlFlowStmtNode.asThrow(span, value));
            }

            static asBreak(span: Span): StmtNode {
                return StmtNode.create('Break', span, ControlFlowStmtNode.asBreak(span));
            }

            static asContinue(span: Span): StmtNode {
                return StmtNode.create('Continue', span, ControlFlowStmtNode.asContinue(span));
            }

            static asTest(span: Span, nameInfo: NameInfo | undefined, block: BlockStmtNode): StmtNode {
                return StmtNode.create('Test', span, TestStmtNode.create(span, nameInfo, block));
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── IS_X ──────────────────────────────┐

            is(kind: StmtKind): boolean {
                return this.kind === kind;
            }


        // └────────────────────────────────────────────────────────────────────┘
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝