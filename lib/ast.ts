// ast.ts — Defines the central Abstract Syntax Tree (AST) used for analysis, transformation, and code generation.
//
// repo   : https://github.com/je-es/ast
// author : https://github.com/maysara-elshewehy
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    // Components
    export { Module }               from './components/Module';
    export { Program }              from './components/Program';

    // Base Nodes
    export { Node}                  from './nodes/node';
    export type {
        Span,
        VisibilityInfo, VisibilityKind,
        MutabilityInfo, MutabilityKind,
        ComptimeInfo, ComptimeKind,
        NameInfo, ModuleDocsInfo
    }                               from './nodes/node';

    // Common
    export { IdentNode }            from './nodes/level-4/CommonNodes/IdentNode';

    // Statement
    export { StmtNode }             from './nodes/level-1/StmtNode';

    export { BlockStmtNode }        from './nodes/level-3/StmtNodes/BlockStmtNode';
    export { SectionStmtNode }      from './nodes/level-3/StmtNodes/SectionStmtNode';
    export { TestStmtNode }         from './nodes/level-3/StmtNodes/TestStmtNode';

    export { ReturnStmtNode }       from './nodes/level-3/StmtNodes/ReturnStmtNode';
    export { ThrowStmtNode }        from './nodes/level-3/StmtNodes/ThrowStmtNode';
    export { DeferStmtNode }        from './nodes/level-3/StmtNodes/DeferStmtNode';
    export { BreakStmtNode }        from './nodes/level-3/StmtNodes/BreakStmtNode';
    export { ContinueStmtNode }     from './nodes/level-3/StmtNodes/ContinueStmtNode';

    export { DefStmtNode }          from './nodes/level-3/StmtNodes/DefStmtNode';
    export { FuncStmtNode }         from './nodes/level-3/StmtNodes/FuncStmtNode';
    export { ForStmtNode }          from './nodes/level-3/StmtNodes/ForStmtNode';
    export { WhileStmtNode }        from './nodes/level-3/StmtNodes/WhileStmtNode';
    export { DoStmtNode }           from './nodes/level-3/StmtNodes/DoStmtNode';
    export { UseStmtNode }          from './nodes/level-3/StmtNodes/UseStmtNode';
    export { LetStmtNode }          from './nodes/level-3/StmtNodes/LetStmtNode';

    // Expression
    export { ExprNode }             from './nodes/level-2/ExprNode';

    export { BinaryNode }           from './nodes/level-3/ExprNodes/BinaryNode';
    export { CatchNode }            from './nodes/level-3/ExprNodes/CatchNode';
    export { ConditionalNode }      from './nodes/level-3/ExprNodes/ConditionalNode';
    export { IfNode }               from './nodes/level-3/ExprNodes/IfNode';
    export { OrelseNode }           from './nodes/level-3/ExprNodes/OrelseNode';
    export { PostfixNode }          from './nodes/level-3/ExprNodes/PostfixNode';
    export { PrefixNode }           from './nodes/level-3/ExprNodes/PrefixNode';
    export { PrimaryNode }          from './nodes/level-3/ExprNodes/PrimaryNode';
    export { RangeNode }            from './nodes/level-3/ExprNodes/RangeNode';
    export { MatchNode }            from './nodes/level-3/ExprNodes/MatchNode';
    export { TryNode }              from './nodes/level-3/ExprNodes/TryNode';
    export { AsNode }               from './nodes/level-3/ExprNodes/AsNode';

    export { TypeofNode }           from './nodes/level-3/ExprNodes/TypeofNode';
    export { SizeofNode }           from './nodes/level-3/ExprNodes/SizeofNode';

    export { LiteralNode }          from './nodes/level-4/ExprNodes/LiteralNode';
    export { ObjectNode }           from './nodes/level-4/ExprNodes/ObjectNode';
    export { ParenNode }            from './nodes/level-4/ExprNodes/ParenNode';
    export { ExprTupleNode }        from './nodes/level-4/ExprNodes/ExprTupleNode';

    export { ArrayAccessNode }      from './nodes/level-5/ExprNodes/ArrayAccessNode';
    export { CallNode }             from './nodes/level-5/ExprNodes/CallNode';
    export { CaseNode }             from './nodes/level-5/ExprNodes/CaseNode';
    export { DefaultNode }          from './nodes/level-5/ExprNodes/DefaultNode';
    export { EnumVariantNode }      from './nodes/level-5/ExprNodes/EnumVariantNode';
    export { MemberAccessNode }     from './nodes/level-5/ExprNodes/MemberAccessNode';
    export { FieldNode }            from './nodes/level-5/common/FieldNode';
    export { PropNode }             from './nodes/level-5/ExprNodes/PropNode';
    export { StructMemberNode }     from './nodes/level-5/ExprNodes/StructMemberNode';

    // Type
    export { TypeNode }             from './nodes/level-2/TypeNode';

    export { PrimitiveTypeNode }    from './nodes/level-3/TypeNodes/PrimitiveTypeNode';
    export { ErrsetTypeNode }       from './nodes/level-3/TypeNodes/ErrsetTypeNode'
    export { ArrayTypeNode }        from './nodes/level-3/TypeNodes/ArrayTypeNode';
    export { OptionalTypeNode }     from './nodes/level-3/TypeNodes/OptionalTypeNode';
    export { PointerTypeNode }      from './nodes/level-3/TypeNodes/PointerTypeNode';
    export { TupleTypeNode }        from './nodes/level-3/TypeNodes/TupleTypeNode';
    export { FunctionTypeNode }     from './nodes/level-3/TypeNodes/FunctionTypeNode';
    export { EnumTypeNode }         from './nodes/level-3/TypeNodes/EnumTypeNode';
    export { StructTypeNode }       from './nodes/level-3/TypeNodes/StructTypeNode';
    export { UnionTypeNode }        from './nodes/level-3/TypeNodes/UnionTypeNode';
    export { ParenTypeNode }        from './nodes/level-3/TypeNodes/ParenTypeNode';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝