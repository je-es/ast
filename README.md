<!----------------------------------- BEG ----------------------------------->
<br>
<div align="center">
    <p>
        <img src="./assets/img/logo.png" alt="ast-Logo" style="" height="50" />
    </p>
</div>


<div align="center">
    <p align="center" style="font-style:italic; color:gray;">
        A library for building and managing AST.
        <br>
    </p>
    <img src="https://img.shields.io/badge/Version-0.0.8-black"/>
    <a href="https://github.com/je-es"><img src="https://img.shields.io/badge/Part_of-@je--es-black"/></a>
    <a href="https://github.com/kemet-lang"><img src="https://img.shields.io/badge/Built_for-@kemet--lang-black"/></a>
</div>


<div align="center">
    <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/>
    <br>
</div>

<!--------------------------------------------------------------------------->



<!----------------------------------- HMM ----------------------------------->

## [4] [`@je-es/ast`](https://github.com/je-es/ast) 🚀

> _To understand the full context, please refer to [these documents](https://github.com/kemet-lang/.github/blob/main/profile/roadmap/MVP.md)._

```bash
# install using npm
npm install @je-es/ast
```

```ts
// import using typescript
import * as AST from "@je-es/ast";
```

> Example:

```rust
// suppose we want to represent an abstract syntax tree for this statement:
pub let mut x: i32 = 42
```

```ts
const my_let_stmt = AST.StmtNode.asLet(
    // span
    { start: 0, end: 23 },

    // Public/Static/Private
    {
        kind: 'Public',
        span: { start: 0, end: 3 },
    }

    // Comptime/Runtime
    {
        kind: 'Runtime', // default
        // span: undefined,
    }

    // Mutable/Immutable
    {
        kind: 'Mutable',
        span: { start: 8, end: 11 },
    }

    // ident
    AST.IdentNode.create({ start: 12, end: 13 }, 'x'),

    // type
    AST.TypeNode.asSigned({ start: 15, end: 18 }, 'i32'),

    // init
    AST.ExprNode.asInteger({ start: 21, end: 23 }, 42)
);
```

---


> #### 1. [@je-es/lexer](https://github.com/je-es/lexer)

> #### 2. [@je-es/parser](https://github.com/je-es/parser)

> #### 3. [@je-es/syntax](https://github.com/je-es/syntax)

> #### 4. [`@je-es/ast`](https://github.com/je-es/ast)

> #### 5. [@je-es/ast-analyzer](https://github.com/je-es/ast-analyzer)

> #### 6. [@je-es/project](https://github.com/je-es/project)

> #### 7. [@je-es/lsp](https://github.com/je-es/lsp)

> #### 8. [@je-es/codegen](https://github.com/je-es/codegen)

> #### 9. [@je-es/compiler](https://github.com/je-es/compiler)

<div align="center">
    <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/>
</div>

<p align="center">
    <b>
        <br>
        <i style="color: gray;">"
        Currently I'm working on a larger project, so I'll skip writing documentation for now due to time constraints.
        "</i>
        <br>
    </b>
</p>

<div align="center">
    <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/>
</div>

<!--------------------------------------------------------------------------->



<!----------------------------------- END ----------------------------------->

<br>
<div align="center">
    <a href="https://github.com/maysara-elshewehy">
        <img src="https://img.shields.io/badge/by-Maysara-blue"/>
    </a>
</div>

<!-------------------------------------------------------------------------->