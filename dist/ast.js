"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/ast.ts
var ast_exports = {};
__export(ast_exports, {
  ArrayAccessNode: () => ArrayAccessNode,
  ArrayTypeNode: () => ArrayTypeNode,
  AsNode: () => AsNode,
  BinaryNode: () => BinaryNode,
  BlockStmtNode: () => BlockStmtNode,
  BreakStmtNode: () => BreakStmtNode,
  CallNode: () => CallNode,
  CaseNode: () => CaseNode,
  CatchNode: () => CatchNode,
  ConditionalNode: () => ConditionalNode,
  ContinueStmtNode: () => ContinueStmtNode,
  DefStmtNode: () => DefStmtNode,
  DefaultNode: () => DefaultNode,
  DeferStmtNode: () => DeferStmtNode,
  DoStmtNode: () => DoStmtNode,
  EnumTypeNode: () => EnumTypeNode,
  EnumVariantNode: () => EnumVariantNode,
  ErrsetTypeNode: () => ErrsetTypeNode,
  ExprNode: () => ExprNode,
  ExprTupleNode: () => ExprTupleNode,
  FieldNode: () => FieldNode,
  ForStmtNode: () => ForStmtNode,
  FuncStmtNode: () => FuncStmtNode,
  FunctionTypeNode: () => FunctionTypeNode,
  IdentNode: () => IdentNode,
  IfNode: () => IfNode,
  LetStmtNode: () => LetStmtNode,
  LiteralNode: () => LiteralNode,
  MatchNode: () => MatchNode,
  MemberAccessNode: () => MemberAccessNode,
  Module: () => Module,
  Node: () => Node,
  ObjectNode: () => ObjectNode,
  OptionalTypeNode: () => OptionalTypeNode,
  OrelseNode: () => OrelseNode,
  ParenNode: () => ParenNode,
  ParenTypeNode: () => ParenTypeNode,
  PointerTypeNode: () => PointerTypeNode,
  PostfixNode: () => PostfixNode,
  PrefixNode: () => PrefixNode,
  PrimaryNode: () => PrimaryNode,
  PrimitiveTypeNode: () => PrimitiveTypeNode,
  Program: () => Program,
  PropNode: () => PropNode,
  RangeNode: () => RangeNode,
  ReturnStmtNode: () => ReturnStmtNode,
  SectionStmtNode: () => SectionStmtNode,
  SizeofNode: () => SizeofNode,
  StmtNode: () => StmtNode,
  StructMemberNode: () => StructMemberNode,
  StructTypeNode: () => StructTypeNode,
  TestStmtNode: () => TestStmtNode,
  ThrowStmtNode: () => ThrowStmtNode,
  TryNode: () => TryNode,
  TupleTypeNode: () => TupleTypeNode,
  TypeNode: () => TypeNode,
  TypeofNode: () => TypeofNode,
  UnionTypeNode: () => UnionTypeNode,
  UseStmtNode: () => UseStmtNode,
  WhileStmtNode: () => WhileStmtNode
});
module.exports = __toCommonJS(ast_exports);

// lib/components/Module.ts
var Module = class _Module {
  // ┌──────────────────────────────── INIT ──────────────────────────────┐
  constructor(name, statements, exports2, imports, metadata) {
    this.name = name;
    this.statements = statements;
    this.exports = exports2;
    this.imports = imports;
    this.metadata = metadata;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(name, stmts, metadata) {
    return new _Module(name, stmts || [], [], [], metadata || {});
  }
  validate() {
    try {
      if (!this.name.trim()) {
        return false;
      }
      return this.statements.every((stmt) => stmt.validate());
    } catch (e) {
      return false;
    }
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── FIND ──────────────────────────────┐
  findStatements(predicate) {
    return this.statements.filter(predicate);
  }
  findStatement(predicate) {
    return this.statements.find(predicate);
  }
  findStatementsByKind(kind) {
    return this.statements.filter((stmt) => stmt.kind === kind);
  }
  findFunction(name) {
    for (const stmt of this.statements) {
      if (stmt.is("func") && stmt.getFunc().ident.name === name) {
        return stmt.getFunc();
      }
    }
    return void 0;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── CTRL ──────────────────────────────┐
  removeStatement(index) {
    if (index < 0 || index >= this.statements.length) {
      throw new Error(`Statement index ${index} out of bounds (0-${this.statements.length - 1})`);
    }
    const newStatements = [...this.statements];
    newStatements.splice(index, 1);
    return new _Module(
      this.name,
      newStatements,
      [...this.exports],
      [...this.imports],
      __spreadValues({}, this.metadata)
    );
  }
  insertStatement(index, statement) {
    if (index < 0 || index > this.statements.length) {
      throw new Error(`Statement index ${index} out of bounds (0-${this.statements.length})`);
    }
    const newStatements = [...this.statements];
    newStatements.splice(index, 0, statement);
    return new _Module(
      this.name,
      newStatements,
      [...this.exports],
      [...this.imports],
      __spreadValues({}, this.metadata)
    );
  }
  replaceStatement(index, statement) {
    if (index < 0 || index >= this.statements.length) {
      throw new Error(`Statement index ${index} out of bounds (0-${this.statements.length - 1})`);
    }
    const newStatements = [...this.statements];
    newStatements[index] = statement;
    return new _Module(
      this.name,
      newStatements,
      [...this.exports],
      [...this.imports],
      __spreadValues({}, this.metadata)
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── ---- ──────────────────────────────┐
  isEmpty() {
    return this.statements.length === 0;
  }
  hasStatement(statement) {
    return this.statements.includes(statement);
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── ---- ──────────────────────────────┐
  getStatementCount() {
    return this.statements.length;
  }
  getTotalNodes() {
    let count = 1;
    for (const statement of this.statements) {
      const countt = 0;
      statement.traverse(() => void count++);
      count += countt;
    }
    return count;
  }
  getStatementAt(index) {
    if (index < 0 || index >= this.statements.length) {
      return void 0;
    }
    return this.statements[index];
  }
  getStatementIndex(statement) {
    return this.statements.indexOf(statement);
  }
  getPublicStatements() {
    const arr = [];
    for (const stmt of this.statements) {
      if (stmt.is("let") && stmt.getLet().field.visibility.kind !== "Private" || stmt.is("def") && stmt.getDef().visibility.kind !== "Private" || stmt.is("func") && stmt.getFunc().visibility.kind !== "Private") {
        arr.push(stmt);
      }
    }
    return arr;
  }
  getPath() {
    var _a;
    return ((_a = this.metadata) == null ? void 0 : _a.path) || "";
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/components/Program.ts
var Program = class _Program {
  // ┌──────────────────────────────── INIT ──────────────────────────────┐
  constructor(modules, metadata) {
    this.modules = modules;
    this.metadata = metadata;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(modules, metadata) {
    const modulesMap = /* @__PURE__ */ new Map();
    for (const module2 of modules || []) {
      modulesMap.set(module2.name, module2);
    }
    return new _Program(modulesMap, metadata);
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── FIND ──────────────────────────────┐
  findModules(predicate) {
    const results = [];
    for (const [name, module2] of this.modules) {
      if (predicate(module2, name)) {
        results.push([name, module2]);
      }
    }
    return results;
  }
  findModule(predicate) {
    for (const [name, module2] of this.modules) {
      if (predicate(module2, name)) {
        return [name, module2];
      }
    }
    return void 0;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── CTRL ──────────────────────────────┐
  removeModule(name) {
    if (!this.modules.has(name)) {
      return this;
    }
    const newModules = new Map(this.modules);
    newModules.delete(name);
    return new _Program(newModules, this.metadata);
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── ---- ──────────────────────────────┐
  isEmpty() {
    return this.modules.size === 0 || Array.from(this.modules.values()).every((m) => m.statements.length === 0);
  }
  hasModule(name) {
    return this.modules.has(name);
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── ---- ──────────────────────────────┐
  getModule(name) {
    return this.modules.get(name);
  }
  getModuleNames() {
    return Array.from(this.modules.keys());
  }
  getTotalModules() {
    return this.modules.size;
  }
  getTotalStatements() {
    return Array.from(this.modules.values()).reduce((total, module2) => total + module2.statements.length, 0);
  }
  getTotalNodes() {
    let count = this.modules.size;
    for (const module2 of this.modules.values()) {
      count += module2.getTotalNodes();
    }
    return count;
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/node.ts
var DEF_SPAN = { start: -1, end: -1 };
var Node = class _Node {
  findAll(predicate) {
    const results = [];
    this.traverse((node) => {
      if (predicate(node)) {
        results.push(node);
      }
    });
    return results;
  }
  find(predicate) {
    let result = null;
    this.traverse((node) => {
      if (!result && predicate(node)) {
        result = node;
        return "stop";
      }
    });
    return result;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌────────────────────────────── TRAVERSE ────────────────────────────┐
  // Depth-first traversal with early termination support and enhanced error handling
  traverse(visitor) {
    var _a, _b, _c, _d, _e;
    try {
      const result = visitor(this);
      if (result === "stop") {
        return;
      }
      let children;
      try {
        children = this.getChildrenNodes();
      } catch (error) {
        throw new Error(`Failed to get children from ${this.kind} node: ${error}`);
      }
      if (!Array.isArray(children)) {
        throw new Error(`getChildrenNodes() returned non-array from ${this.kind} node: ${typeof children}`);
      }
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child) {
          console.warn(`Child ${i} is null/undefined in ${this.kind} node`);
          continue;
        }
        if (typeof child !== "object") {
          console.warn(`Child ${i} is not an object in ${this.kind} node: ${typeof child}`);
          continue;
        }
        if (!("traverse" in child) || typeof child.traverse !== "function") {
          console.error(`Child ${i} (${((_a = child.constructor) == null ? void 0 : _a.name) || "unknown"}) of ${this.kind} node is missing traverse method`);
          console.error("Child object keys:", Object.keys(child));
          console.error("Child prototype:", Object.getPrototypeOf(child));
          throw new Error(`Child node ${((_b = child.constructor) == null ? void 0 : _b.name) || "unknown"} missing traverse method`);
        }
        if (!(child instanceof _Node)) {
          console.error(`Child ${i} of ${this.kind} node is not a Node instance:`, (_c = child.constructor) == null ? void 0 : _c.name);
          throw new Error(`Child ${((_d = child.constructor) == null ? void 0 : _d.name) || "unknown"} is not a Node instance`);
        }
        try {
          child.traverse(visitor);
        } catch (error) {
          throw new Error(`Traversal failed at child ${i} (${((_e = child.constructor) == null ? void 0 : _e.name) || "unknown"}) of ${this.kind} node: ${error}`);
        }
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("Traversal failed")) {
        throw error;
      }
      throw new Error(`Traversal failed at ${this.kind} node: ${error}`);
    }
  }
  // Pre-order traversal (visit parent before children)
  traversePreOrder(visitor) {
    this.traverse(visitor);
  }
  // Post-order traversal (visit children before parent)
  traversePostOrder(visitor) {
    const visitPostOrder = (node) => {
      for (const child of node.getChildrenNodes()) {
        const result = visitPostOrder(child);
        if (result === "stop") {
          return "stop";
        }
      }
      return visitor(node);
    };
    visitPostOrder(this);
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  // Check if this node has any children
  hasChildren() {
    try {
      return this.getChildrenNodes().length > 0;
    } catch (e) {
      return false;
    }
  }
  // Check if this node is a leaf (no children)
  isLeaf() {
    return !this.hasChildren();
  }
  // Get the depth of this node (maximum distance to any leaf)
  getDepth() {
    if (this.isLeaf()) {
      return 0;
    }
    let maxDepth = 0;
    try {
      for (const child of this.getChildrenNodes()) {
        maxDepth = Math.max(maxDepth, child.getDepth());
      }
    } catch (error) {
      console.warn(`Error getting depth for ${this.kind} node:`, error);
      return 0;
    }
    return maxDepth + 1;
  }
  // Count total number of descendant nodes (including self)
  getNodeCount() {
    let count = 1;
    try {
      this.traverse((node) => {
        if (node !== this) {
          count++;
        }
      });
    } catch (error) {
      console.warn(`Error counting nodes for ${this.kind} node:`, error);
    }
    return count;
  }
  // Get all ancestor kind's in the tree
  getNodeKinds() {
    const types = /* @__PURE__ */ new Set();
    try {
      this.traverse((node) => {
        types.add(node.kind);
      });
    } catch (error) {
      console.warn(`Error getting node types for ${this.kind} node:`, error);
      types.add(this.kind);
    }
    return types;
  }
  // Create a deep clone of the entire subtree
  deepClone(newSpan) {
    const cloned = this.clone(newSpan);
    return cloned;
  }
  // Validation method that subclasses can override
  validate() {
    try {
      const children = this.getChildrenNodes();
      for (const child of children) {
        if (!child || !child.validate()) {
          return false;
        }
      }
      return true;
    } catch (error) {
      console.warn(`Validation error for ${this.kind} node:`, error);
      return false;
    }
  }
  // Pretty print the AST structure with better error handling
  printTree(indent = 0) {
    const spaces = "  ".repeat(indent);
    const nodeInfo = `${spaces}${this.kind} (${this.span.start}-${this.span.end})`;
    try {
      if (this.isLeaf()) {
        return nodeInfo;
      }
      const children = this.getChildrenNodes().map((child) => {
        var _a;
        try {
          return child.printTree(indent + 1);
        } catch (error) {
          return `${spaces}  ERROR: ${((_a = child == null ? void 0 : child.constructor) == null ? void 0 : _a.name) || "unknown"} - ${error}`;
        }
      }).join("\n");
      return `${nodeInfo}
${children}`;
    } catch (error) {
      return `${nodeInfo} [ERROR: ${error}]`;
    }
  }
  // Check structural equality with another node (ignoring spans)
  structurallyEquals(other) {
    if (this.kind !== other.kind) {
      return false;
    }
    try {
      const thisChildren = this.getChildrenNodes();
      const otherChildren = other.getChildrenNodes();
      if (thisChildren.length !== otherChildren.length) {
        return false;
      }
      return thisChildren.every(
        (child, index) => child.structurallyEquals(otherChildren[index])
      );
    } catch (e) {
      return false;
    }
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-4/CommonNodes/IdentNode.ts
var IdentNode = class _IdentNode extends Node {
  constructor(span, name, builtin) {
    super();
    this.span = span;
    this.name = name;
    this.builtin = builtin;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "Ident";
    this.level = 4;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    return children;
  }
  clone(newSpan) {
    const cloned = new _IdentNode(newSpan != null ? newSpan : this.span, this.name, this.builtin);
    return cloned;
  }
  validate() {
    return this.name.trim().length > 0;
  }
  toString() {
    return `${this.builtin ? "@" : ""}${this.name}`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, name, builtin = false) {
    return new _IdentNode(span, name, builtin);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/BlockStmtNode.ts
var BlockStmtNode = class _BlockStmtNode extends Node {
  constructor(span, stmts) {
    super();
    this.span = span;
    this.stmts = stmts;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "block";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return this.stmts ? this.stmts : [];
  }
  clone(newSpan) {
    return new _BlockStmtNode(
      newSpan != null ? newSpan : this.span,
      this.stmts
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, stmts) {
    return new _BlockStmtNode(span, stmts != null ? stmts : []);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/SectionStmtNode.ts
var SectionStmtNode = class _SectionStmtNode extends Node {
  constructor(span, name, indent, stmts) {
    super();
    this.span = span;
    this.name = name;
    this.indent = indent;
    this.stmts = stmts;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "Section";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return this.stmts ? this.stmts : [];
  }
  clone(newSpan) {
    return new _SectionStmtNode(
      newSpan != null ? newSpan : this.span,
      this.name,
      this.indent,
      this.stmts
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, name, indent, stmts) {
    return new _SectionStmtNode(span, name, indent, stmts != null ? stmts : []);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/LetStmtNode.ts
var LetStmtNode = class _LetStmtNode extends Node {
  constructor(span, field, documents = []) {
    super();
    this.span = span;
    this.field = field;
    this.documents = documents;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "Let";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return this.field.getChildrenNodes();
  }
  clone(newSpan) {
    return new _LetStmtNode(
      newSpan != null ? newSpan : this.span,
      this.field.clone(newSpan)
    );
  }
  // for factory
  getField() {
    return this.field;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, visibility, comptime, mutability, ident, type, initializer, documents) {
    const field = FieldNode.create(span, visibility, comptime, mutability, ident, type, initializer, documents);
    return new _LetStmtNode(span, field);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/FuncStmtNode.ts
var FuncStmtNode = class _FuncStmtNode extends Node {
  constructor(span, visibility, comptime, isInline, ident, parameters, body, errorType, returnType, documents = []) {
    super();
    this.span = span;
    this.visibility = visibility;
    this.comptime = comptime;
    this.isInline = isInline;
    this.ident = ident;
    this.parameters = parameters;
    this.body = body;
    this.errorType = errorType;
    this.returnType = returnType;
    this.documents = documents;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "Function";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    for (const param of this.parameters) {
      children.push(param);
    }
    if (this.errorType) {
      children.push(this.errorType);
    }
    if (this.returnType) {
      children.push(this.returnType);
    }
    if (this.body) {
      children.push(this.body);
    }
    return children;
  }
  clone(newSpan) {
    return new _FuncStmtNode(
      newSpan != null ? newSpan : this.span,
      this.visibility,
      this.comptime,
      this.isInline,
      this.ident,
      this.parameters,
      this.body,
      this.errorType,
      this.returnType
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, visibility, comptime, isInline, ident, parameters, body, errorType, returnType, documents) {
    return new _FuncStmtNode(span, visibility, comptime, isInline, ident, parameters, body, errorType, returnType, documents);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/UseStmtNode.ts
var UseStmtNode = class _UseStmtNode extends Node {
  constructor(span, visibility, targetArr, alias, path, pathSpan, documents = []) {
    super();
    this.span = span;
    this.visibility = visibility;
    this.targetArr = targetArr;
    this.alias = alias;
    this.path = path;
    this.pathSpan = pathSpan;
    this.documents = documents;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "Use";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [];
  }
  clone(newSpan) {
    return new _UseStmtNode(
      newSpan != null ? newSpan : this.span,
      this.visibility,
      this.targetArr,
      this.alias,
      this.path,
      this.pathSpan
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, visibility, targetArr, alias, path, pathSpan, documents) {
    return new _UseStmtNode(span, visibility, targetArr, alias, path, pathSpan, documents);
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  isAllModule() {
    return this.targetArr === void 0;
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/DefStmtNode.ts
var DefStmtNode = class _DefStmtNode extends Node {
  constructor(span, visibility, ident, type, documents = []) {
    super();
    this.span = span;
    this.visibility = visibility;
    this.ident = ident;
    this.type = type;
    this.documents = documents;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "Def";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [this.type];
  }
  clone(newSpan) {
    return new _DefStmtNode(
      newSpan != null ? newSpan : this.span,
      this.visibility,
      this.ident,
      this.type
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, visibility, ident, type, documents) {
    return new _DefStmtNode(span, visibility, ident, type, documents);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/ForStmtNode.ts
var ForStmtNode = class _ForStmtNode extends Node {
  constructor(span, expr, stmt) {
    super();
    this.span = span;
    this.expr = expr;
    this.stmt = stmt;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
    this.kind = "for";
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [this.expr, this.stmt];
  }
  clone(newSpan) {
    return new _ForStmtNode(
      newSpan != null ? newSpan : this.span,
      this.expr,
      this.stmt
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, expr, stmt) {
    return new _ForStmtNode(span, expr, stmt);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/WhileStmtNode.ts
var WhileStmtNode = class _WhileStmtNode extends Node {
  constructor(span, expr, stmt) {
    super();
    this.span = span;
    this.expr = expr;
    this.stmt = stmt;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
    this.kind = "while";
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [this.expr, this.stmt];
  }
  clone(newSpan) {
    return new _WhileStmtNode(
      newSpan != null ? newSpan : this.span,
      this.expr,
      this.stmt
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, expr, stmt) {
    return new _WhileStmtNode(span, expr, stmt);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/DoStmtNode.ts
var DoStmtNode = class _DoStmtNode extends Node {
  constructor(span, expr, stmt) {
    super();
    this.span = span;
    this.expr = expr;
    this.stmt = stmt;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
    this.kind = "do";
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [this.expr, this.stmt];
  }
  clone(newSpan) {
    return new _DoStmtNode(
      newSpan != null ? newSpan : this.span,
      this.expr,
      this.stmt
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, expr, stmt) {
    return new _DoStmtNode(span, expr, stmt);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/TestStmtNode.ts
var TestStmtNode = class _TestStmtNode extends Node {
  constructor(span, name, block, documents = []) {
    super();
    this.span = span;
    this.name = name;
    this.block = block;
    this.documents = documents;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "Test";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [this.block];
  }
  clone(newSpan) {
    return new _TestStmtNode(
      newSpan != null ? newSpan : this.span,
      this.name,
      this.block
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, name, block, documents) {
    return new _TestStmtNode(span, name, block, documents);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/BreakStmtNode.ts
var BreakStmtNode = class _BreakStmtNode extends Node {
  constructor(span) {
    super();
    this.span = span;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
    this.kind = "break";
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [];
  }
  clone(newSpan) {
    return new _BreakStmtNode(
      newSpan != null ? newSpan : this.span
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span) {
    return new _BreakStmtNode(span);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/ContinueStmtNode.ts
var ContinueStmtNode = class _ContinueStmtNode extends Node {
  constructor(span) {
    super();
    this.span = span;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
    this.kind = "continue";
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [];
  }
  clone(newSpan) {
    return new _ContinueStmtNode(
      newSpan != null ? newSpan : this.span
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span) {
    return new _ContinueStmtNode(span);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/ReturnStmtNode.ts
var ReturnStmtNode = class _ReturnStmtNode extends Node {
  constructor(span, expr) {
    super();
    this.span = span;
    this.expr = expr;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
    this.kind = "return";
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return this.expr ? [this.expr] : [];
  }
  clone(newSpan) {
    return new _ReturnStmtNode(
      newSpan != null ? newSpan : this.span,
      this.expr
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, expr) {
    return new _ReturnStmtNode(span, expr);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/DeferStmtNode.ts
var DeferStmtNode = class _DeferStmtNode extends Node {
  constructor(span, expr) {
    super();
    this.span = span;
    this.expr = expr;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
    this.kind = "defer";
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [this.expr];
  }
  clone(newSpan) {
    return new _DeferStmtNode(
      newSpan != null ? newSpan : this.span,
      this.expr
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, expr) {
    return new _DeferStmtNode(span, expr);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/StmtNodes/ThrowStmtNode.ts
var ThrowStmtNode = class _ThrowStmtNode extends Node {
  constructor(span, expr) {
    super();
    this.span = span;
    this.expr = expr;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
    this.kind = "throw";
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [this.expr];
  }
  clone(newSpan) {
    return new _ThrowStmtNode(
      newSpan != null ? newSpan : this.span,
      this.expr
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, expr) {
    return new _ThrowStmtNode(span, expr);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-1/StmtNode.ts
var StmtNode = class _StmtNode extends Node {
  constructor(kind, span, source) {
    super();
    this.kind = kind;
    this.span = span;
    this.source = source;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 1;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    if (this.is("block")) {
      children.push(...this.getBlock().getChildrenNodes());
    } else if (this.is("section")) {
      children.push(...this.getSection().getChildrenNodes());
    } else if (this.source instanceof Node) {
      children.push(this.source);
    }
    return children;
  }
  clone(newSpan) {
    return new _StmtNode(this.kind, newSpan != null ? newSpan : this.span, this.source);
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  getExpr() {
    if (this.is("expression")) {
      return this.source;
    }
    return void 0;
  }
  getBlock() {
    if (this.is("block")) {
      return this.source;
    }
    return void 0;
  }
  getSection() {
    if (this.is("section")) {
      return this.source;
    }
    return void 0;
  }
  getTest() {
    if (this.is("test")) {
      return this.source;
    }
    return void 0;
  }
  getUse() {
    if (this.is("use")) {
      return this.source;
    }
    return void 0;
  }
  getDef() {
    if (this.is("def")) {
      return this.source;
    }
    return void 0;
  }
  getLet() {
    if (this.is("let")) {
      return this.source;
    }
    return void 0;
  }
  getFunc() {
    if (this.is("func")) {
      return this.source;
    }
    return void 0;
  }
  getFor() {
    if (this.is("for")) {
      return this.source;
    }
    return void 0;
  }
  getWhile() {
    if (this.is("while")) {
      return this.source;
    }
    return void 0;
  }
  getDo() {
    if (this.is("do")) {
      return this.source;
    }
    return void 0;
  }
  getReturn() {
    if (this.is("return")) {
      return this.source;
    }
    return void 0;
  }
  getDefer() {
    if (this.is("defer")) {
      return this.source;
    }
    return void 0;
  }
  getThrow() {
    if (this.is("throw")) {
      return this.source;
    }
    return void 0;
  }
  getBreak() {
    if (this.is("break")) {
      return this.source;
    }
    return void 0;
  }
  getContinue() {
    if (this.is("continue")) {
      return this.source;
    }
    return void 0;
  }
  getStmtName() {
    var _a, _b, _c;
    if (this.is("use")) {
      return (_c = (_b = (_a = this.source.alias) == null ? void 0 : _a.name) != null ? _b : this.source.path) != null ? _c : "unknown-use";
    } else if (this.is("def")) {
      return this.source.ident.name;
    } else if (this.is("let")) {
      return this.source.field.ident.name;
    } else if (this.is("func")) {
      return this.source.ident.name;
    }
    return void 0;
  }
  getStmtNameSpan() {
    if (this.is("use")) {
      return this.source.span;
    } else if (this.is("def")) {
      return this.source.ident.span;
    } else if (this.is("let")) {
      return this.source.field.ident.span;
    } else if (this.is("func")) {
      return this.source.ident.span;
    }
    return void 0;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(kind, span, data) {
    return new _StmtNode(kind, span, data);
  }
  static asExpr(span, expr) {
    return _StmtNode.create("expression", span, expr);
  }
  static asBlock(span, stmts) {
    return _StmtNode.create("block", span, BlockStmtNode.create(span, stmts));
  }
  static asSection(span, nameInfo, indent, stmts) {
    return _StmtNode.create("section", span, SectionStmtNode.create(span, nameInfo, indent, stmts));
  }
  static asUse(span, visibility, targetArr, alias, path, pathSpan, documents) {
    return _StmtNode.create("use", span, UseStmtNode.create(span, visibility, targetArr, alias, path, pathSpan, documents));
  }
  static asDefine(span, visibility, ident, type, documents) {
    return _StmtNode.create("def", span, DefStmtNode.create(span, visibility, ident, type, documents));
  }
  static asLet(span, visibility, comptime, mutability, ident, type, initializer, documents) {
    return _StmtNode.create("let", span, LetStmtNode.create(span, visibility, comptime, mutability, ident, type, initializer, documents));
  }
  static asFunc(span, visibility, comptime, isInline, ident, parameters, errorType, returnType, body, documents) {
    return _StmtNode.create("func", span, FuncStmtNode.create(span, visibility, comptime, isInline, ident, parameters, body, errorType, returnType, documents));
  }
  static asFor(span, expr, stmt) {
    return _StmtNode.create("for", span, ForStmtNode.create(span, expr, stmt));
  }
  static asWhile(span, expr, stmt) {
    return _StmtNode.create("while", span, WhileStmtNode.create(span, expr, stmt));
  }
  static asDo(span, expr, stmt) {
    return _StmtNode.create("do", span, DoStmtNode.create(span, expr, stmt));
  }
  static asReturn(span, expr) {
    return _StmtNode.create("return", span, ReturnStmtNode.create(span, expr));
  }
  static asDefer(span, expr) {
    return _StmtNode.create("defer", span, DeferStmtNode.create(span, expr));
  }
  static asThrow(span, expr) {
    return _StmtNode.create("throw", span, ThrowStmtNode.create(span, expr));
  }
  static asBreak(span) {
    return _StmtNode.create("break", span, BreakStmtNode.create(span));
  }
  static asContinue(span) {
    return _StmtNode.create("continue", span, ContinueStmtNode.create(span));
  }
  static asTest(span, nameInfo, block, documents) {
    return _StmtNode.create("test", span, TestStmtNode.create(span, nameInfo, block, documents));
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── IS_X ──────────────────────────────┐
  is(kind) {
    return this.kind === kind;
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-4/ExprNodes/LiteralNode.ts
var LiteralNode = class _LiteralNode extends Node {
  constructor(kind, span, value) {
    super();
    this.kind = kind;
    this.span = span;
    this.value = value;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 4;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    if (this.kind === "Array" && Array.isArray(this.value)) {
      children.push(...this.value);
    }
    return children;
  }
  clone(newSpan) {
    const cloned = new _LiteralNode(this.kind, newSpan != null ? newSpan : this.span, this.value);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HHLP ──────────────────────────────┐
  is(kind) {
    return this.kind === kind;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(kind, span, value) {
    return new _LiteralNode(kind, span, value);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-4/ExprNodes/ObjectNode.ts
var ObjectNode = class _ObjectNode extends Node {
  constructor(span, props, ident) {
    super();
    this.span = span;
    this.props = props;
    this.ident = ident;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "Object";
    this.level = 4;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(...this.props);
    return children;
  }
  clone(newSpan) {
    const cloned = new _ObjectNode(newSpan || this.span, this.props, this.ident);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, props, ident) {
    return new _ObjectNode(span, props, ident);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-4/ExprNodes/ParenNode.ts
var ParenNode = class _ParenNode extends Node {
  constructor(span, source) {
    super();
    this.span = span;
    this.source = source;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "Paren";
    this.level = 4;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.source);
    return children;
  }
  clone(newSpan) {
    const cloned = new _ParenNode(newSpan || this.span, this.source);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, source) {
    return new _ParenNode(span, source);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/TypeNodes/PrimitiveTypeNode.ts
var PrimitiveTypeNode = class _PrimitiveTypeNode extends Node {
  constructor(kind, span, text, width) {
    super();
    this.kind = kind;
    this.span = span;
    this.text = text;
    this.width = width;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [];
  }
  clone(newSpan) {
    const cloned = new _PrimitiveTypeNode(this.kind, newSpan || this.span, this.text, this.width);
    return cloned;
  }
  toString() {
    switch (this.kind) {
      case "void":
        return "void";
      case "type":
        return "type";
      case "bool":
        return "bool";
      case "signed":
        return "i" + this.width;
      case "unsigned":
        return "u" + this.width;
      case "float":
        return "f" + this.width;
      case "und":
        return "undefined";
      case "null":
        return "null";
      case "cint":
        return "cint";
      case "cflt":
        return "cflt";
      case "any":
        return "any";
      case "err":
        return "err";
      case "noreturn":
        return "noreturn";
    }
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  is(kind) {
    return this.kind === kind;
  }
  isVoid() {
    return this.is("void");
  }
  isType() {
    return this.is("type");
  }
  isNull() {
    return this.is("null");
  }
  isUndefined() {
    return this.is("und");
  }
  isBool() {
    return this.is("bool");
  }
  isSigned() {
    return this.is("signed");
  }
  isUnsigned() {
    return this.is("unsigned");
  }
  isFloat() {
    return this.is("float");
  }
  isInteger() {
    return this.is("signed") || this.is("unsigned") || this.is("cint");
  }
  isComptimeInt() {
    return this.is("cint");
  }
  isComptimeFloat() {
    return this.is("cflt");
  }
  isNumeric() {
    return this.is("signed") || this.is("unsigned") || this.is("float") || this.is("cint") || this.is("cflt");
  }
  isAny() {
    return this.is("any");
  }
  isErr() {
    return this.is("err");
  }
  isNoreturn() {
    return this.is("noreturn");
  }
  static calcWidth(prefix, text) {
    if (!text.startsWith(prefix)) {
      return 0;
    }
    const numericPart = text.slice(prefix.length);
    const width = parseInt(numericPart, 10);
    if (isNaN(width)) {
      return 0;
    }
    return width;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(kind, span, text, width) {
    return new _PrimitiveTypeNode(kind, span, text, width);
  }
  static asVoid(span) {
    return _PrimitiveTypeNode.create("void", span || DEF_SPAN);
  }
  static asType(span) {
    return _PrimitiveTypeNode.create("type", span || DEF_SPAN);
  }
  static asNull(span) {
    return _PrimitiveTypeNode.create("null", span || DEF_SPAN);
  }
  static asUndefined(span) {
    return _PrimitiveTypeNode.create("und", span || DEF_SPAN);
  }
  static asAny(span) {
    return _PrimitiveTypeNode.create("any", span || DEF_SPAN);
  }
  static asErr(span, text) {
    return _PrimitiveTypeNode.create("err", span || DEF_SPAN, text);
  }
  static asBool(span) {
    return _PrimitiveTypeNode.create("bool", span || DEF_SPAN);
  }
  static asSigned(span, text, width) {
    return _PrimitiveTypeNode.create("signed", span || DEF_SPAN, text, width);
  }
  static asUnsigned(span, text, width) {
    return _PrimitiveTypeNode.create("unsigned", span || DEF_SPAN, text, width);
  }
  static asFloat(span, text, width) {
    return _PrimitiveTypeNode.create("float", span || DEF_SPAN, text, width);
  }
  static asComptimeInt(span, text) {
    return _PrimitiveTypeNode.create("cint", span || DEF_SPAN, text, 64);
  }
  static asComptimeFloat(span, text) {
    return _PrimitiveTypeNode.create("cflt", span || DEF_SPAN, text, 64);
  }
  static asNoreturn(span) {
    return _PrimitiveTypeNode.create("noreturn", span || DEF_SPAN);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/TypeNodes/OptionalTypeNode.ts
var OptionalTypeNode = class _OptionalTypeNode extends Node {
  constructor(span, target) {
    super();
    this.span = span;
    this.target = target;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "optional";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [this.target];
  }
  clone(newSpan) {
    const cloned = new _OptionalTypeNode(newSpan || this.span, this.target);
    return cloned;
  }
  toString() {
    return `?${this.target.toString()}`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, target) {
    return new _OptionalTypeNode(span, target);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/TypeNodes/PointerTypeNode.ts
var PointerTypeNode = class _PointerTypeNode extends Node {
  constructor(span, target, mutable) {
    super();
    this.span = span;
    this.target = target;
    this.mutable = mutable;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "pointer";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [this.target];
  }
  clone(newSpan) {
    const cloned = new _PointerTypeNode(newSpan || this.span, this.target, this.mutable);
    return cloned;
  }
  toString() {
    return `*${this.mutable ? "mut " : ""}${this.target.toString()}`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, target, mutable = false) {
    return new _PointerTypeNode(span, target, mutable);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/TypeNodes/ArrayTypeNode.ts
var ArrayTypeNode = class _ArrayTypeNode extends Node {
  constructor(span, target, size, mutable) {
    super();
    this.span = span;
    this.target = target;
    this.size = size;
    this.mutable = mutable;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "array";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.target);
    if (this.size) {
      children.push(this.size);
    }
    return children;
  }
  clone(newSpan) {
    const cloned = new _ArrayTypeNode(newSpan || this.span, this.target, this.size, this.mutable);
    return cloned;
  }
  toString() {
    return `[]${this.target.toString()}`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  isU8Array() {
    var _a;
    return (_a = this.target.getPrimitive() && this.target.getPrimitive().kind === "unsigned" && this.target.getPrimitive().width === 8) != null ? _a : false;
  }
  isU16Array() {
    var _a;
    return (_a = this.target.getPrimitive() && this.target.getPrimitive().kind === "unsigned" && this.target.getPrimitive().width === 16) != null ? _a : false;
  }
  isU32Array() {
    var _a;
    return (_a = this.target.getPrimitive() && this.target.getPrimitive().kind === "unsigned" && this.target.getPrimitive().width === 32) != null ? _a : false;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, target, size, mutable = false) {
    return new _ArrayTypeNode(span, target, size, mutable);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/TypeNodes/TupleTypeNode.ts
var TupleTypeNode = class _TupleTypeNode extends Node {
  constructor(span, fields) {
    super();
    this.span = span;
    this.fields = fields;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "tuple";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [...this.fields];
  }
  clone(newSpan) {
    const cloned = new _TupleTypeNode(newSpan || this.span, this.fields);
    return cloned;
  }
  toString() {
    return `(${this.fields.join(", ")})`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, fields) {
    return new _TupleTypeNode(span, fields);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/TypeNodes/FunctionTypeNode.ts
var FunctionTypeNode = class _FunctionTypeNode extends Node {
  constructor(span, params, returnType, errorType) {
    super();
    this.span = span;
    this.params = params;
    this.returnType = returnType;
    this.errorType = errorType;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "function";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(...this.params);
    if (this.returnType) {
      children.push(this.returnType);
    }
    if (this.errorType) {
      children.push(this.errorType);
    }
    return children;
  }
  clone(newSpan) {
    const cloned = new _FunctionTypeNode(newSpan || this.span, this.params, this.returnType, this.errorType);
    return cloned;
  }
  toString() {
    return `function`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, params, returnType, errorType) {
    return new _FunctionTypeNode(span, params, returnType, errorType);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/TypeNodes/StructTypeNode.ts
var StructTypeNode = class _StructTypeNode extends Node {
  constructor(span, members, name = "Anonymous", metadata) {
    super();
    this.span = span;
    this.members = members;
    this.name = name;
    this.metadata = metadata;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "struct";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(...this.members);
    return children;
  }
  clone(newSpan) {
    const cloned = new _StructTypeNode(newSpan || this.span, this.members, this.name, this.metadata);
    return cloned;
  }
  toString() {
    return `struct`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, members, name = "Anonymous", metadata = {}) {
    return new _StructTypeNode(span, members, name, metadata);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/TypeNodes/EnumTypeNode.ts
var EnumTypeNode = class _EnumTypeNode extends Node {
  constructor(span, variants, name = "Anonymous", metadata) {
    super();
    this.span = span;
    this.variants = variants;
    this.name = name;
    this.metadata = metadata;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "enum";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(...this.variants);
    return children;
  }
  clone(newSpan) {
    const cloned = new _EnumTypeNode(newSpan || this.span, this.variants, this.name, this.metadata);
    return cloned;
  }
  toString() {
    return `enum`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, variants, name = "Anonymous", metadata = {}) {
    return new _EnumTypeNode(span, variants, name, metadata);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/TypeNodes/UnionTypeNode.ts
var UnionTypeNode = class _UnionTypeNode extends Node {
  constructor(span, types) {
    super();
    this.span = span;
    this.types = types;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "union";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(...this.types);
    return children;
  }
  clone(newSpan) {
    const cloned = new _UnionTypeNode(newSpan || this.span, this.types);
    return cloned;
  }
  toString() {
    return `union`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, types) {
    return new _UnionTypeNode(span, types);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/TypeNodes/ErrsetTypeNode.ts
var ErrsetTypeNode = class _ErrsetTypeNode extends Node {
  constructor(span, members) {
    super();
    this.span = span;
    this.members = members;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "errset";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    return children;
  }
  clone(newSpan) {
    const cloned = new _ErrsetTypeNode(newSpan || this.span, this.members);
    return cloned;
  }
  toString() {
    return `error`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, members) {
    return new _ErrsetTypeNode(span, members);
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/TypeNodes/ParenTypeNode.ts
var ParenTypeNode = class _ParenTypeNode extends Node {
  constructor(span, type) {
    super();
    this.span = span;
    this.type = type;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "paren";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [this.type];
  }
  clone(newSpan) {
    const cloned = new _ParenTypeNode(newSpan || this.span, this.type);
    return cloned;
  }
  toString() {
    return `paren`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, type) {
    return new _ParenTypeNode(span, type);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-2/TypeNode.ts
var TypeNode = class _TypeNode extends Node {
  constructor(span, kind, source) {
    super();
    this.span = span;
    this.kind = kind;
    this.source = source;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 2;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return this.source ? this.source.getChildrenNodes() : [];
  }
  clone(newSpan) {
    return new _TypeNode(newSpan != null ? newSpan : this.span, this.kind, this.source);
  }
  toString() {
    var _a;
    return ((_a = this.source) == null ? void 0 : _a.toString()) || `Type(${this.kind})`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  is(kind) {
    return this.kind === kind;
  }
  isPrimitive() {
    return this.is("primitive");
  }
  isVoid() {
    return this.isPrimitive() && this.getPrimitive().isVoid();
  }
  isType() {
    return this.isPrimitive() && this.getPrimitive().isType();
  }
  isNull() {
    return this.isPrimitive() && this.getPrimitive().isNull();
  }
  isUndefined() {
    return this.isPrimitive() && this.getPrimitive().isUndefined();
  }
  isAny() {
    return this.isPrimitive() && this.getPrimitive().isAny();
  }
  isErr() {
    return this.isPrimitive() && this.getPrimitive().isErr();
  }
  isSigned() {
    return this.isPrimitive() && this.getPrimitive().isSigned();
  }
  isUnsigned() {
    return this.isPrimitive() && this.getPrimitive().isUnsigned();
  }
  isComptimeInt() {
    return this.isPrimitive() && this.getPrimitive().isComptimeInt();
  }
  isInteger() {
    return this.isPrimitive() && this.getPrimitive().isInteger();
  }
  isComptimeFloat() {
    return this.isPrimitive() && this.getPrimitive().isComptimeFloat();
  }
  isFloat() {
    return this.isPrimitive() && this.getPrimitive().isFloat();
  }
  isNumeric() {
    return this.isPrimitive() && this.getPrimitive().isNumeric();
  }
  isBool() {
    return this.isPrimitive() && this.getPrimitive().isBool();
  }
  isNoreturn() {
    return this.isPrimitive() && this.getPrimitive().isNoreturn();
  }
  isIdent() {
    return this.is("ident");
  }
  isPointer() {
    return this.kind === "pointer";
  }
  isOptional() {
    return this.kind === "optional";
  }
  isArray() {
    return this.kind === "array";
  }
  isU8Array() {
    return this.isArray() && this.getArray().isU8Array();
  }
  isU16Array() {
    return this.isArray() && this.getArray().isU16Array();
  }
  isU32Array() {
    return this.isArray() && this.getArray().isU32Array();
  }
  isTuple() {
    return this.kind === "tuple";
  }
  isFunction() {
    return this.kind === "function";
  }
  isStruct() {
    return this.kind === "struct";
  }
  isErrset() {
    return this.kind === "errset";
  }
  isEnum() {
    return this.kind === "enum";
  }
  isUnion() {
    return this.kind === "union";
  }
  isParen() {
    return this.kind === "paren";
  }
  getPrimitive() {
    return this.is("primitive") ? this.source : void 0;
  }
  getOptional() {
    return this.is("optional") ? this.source : void 0;
  }
  getPointer() {
    return this.is("pointer") ? this.source : void 0;
  }
  getArray() {
    return this.is("array") ? this.source : void 0;
  }
  getTuple() {
    return this.is("tuple") ? this.source : void 0;
  }
  getFunction() {
    return this.is("function") ? this.source : void 0;
  }
  getStruct() {
    return this.is("struct") ? this.source : void 0;
  }
  getErrset() {
    return this.is("errset") ? this.source : void 0;
  }
  getEnum() {
    return this.is("enum") ? this.source : void 0;
  }
  getUnion() {
    return this.is("union") ? this.source : void 0;
  }
  getParen() {
    return this.is("paren") ? this.source : void 0;
  }
  getIdent() {
    return this.is("ident") ? this.source : void 0;
  }
  getErrName() {
    return this.is("primitive") ? this.getPrimitive().text : void 0;
  }
  getErrSpan() {
    return this.is("primitive") ? this.getPrimitive().span : void 0;
  }
  getWidth() {
    return this.is("primitive") ? this.getPrimitive().width : void 0;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static asUnset(span) {
    return new _TypeNode(span || DEF_SPAN, "unset", null);
  }
  static asPrimitive(span, kind, text, width) {
    return new _TypeNode(span || DEF_SPAN, "primitive", PrimitiveTypeNode.create(kind, span || DEF_SPAN, text, width));
  }
  static asVoid(span) {
    return _TypeNode.asPrimitive(span || DEF_SPAN, "void");
  }
  static asBool(span) {
    return _TypeNode.asPrimitive(span || DEF_SPAN, "bool");
  }
  static asSigned(span, text, width) {
    return _TypeNode.asPrimitive(span || DEF_SPAN, "signed", text, width != null ? width : PrimitiveTypeNode.calcWidth("i", text));
  }
  static asUnsigned(span, text, width) {
    return _TypeNode.asPrimitive(span || DEF_SPAN, "unsigned", text, width != null ? width : PrimitiveTypeNode.calcWidth("u", text));
  }
  static asFloat(span, text, width) {
    return _TypeNode.asPrimitive(span || DEF_SPAN, "float", text, width != null ? width : PrimitiveTypeNode.calcWidth("f", text));
  }
  static asNull(span) {
    return _TypeNode.asPrimitive(span || DEF_SPAN, "null");
  }
  static asUndefined(span) {
    return _TypeNode.asPrimitive(span || DEF_SPAN, "und");
  }
  static asAny(span) {
    return _TypeNode.asPrimitive(span || DEF_SPAN, "any");
  }
  static asErr(span, text) {
    return _TypeNode.asPrimitive(span || DEF_SPAN, "err", text);
  }
  static asType(span) {
    return _TypeNode.asPrimitive(span || DEF_SPAN, "type");
  }
  static asComptimeInt(span, text) {
    return _TypeNode.asPrimitive(span || DEF_SPAN, "cint", text, 64);
  }
  static asComptimeFloat(span, text) {
    return _TypeNode.asPrimitive(span || DEF_SPAN, "cflt", text, 64);
  }
  static asNoreturn(span) {
    return _TypeNode.asPrimitive(span || DEF_SPAN, "noreturn");
  }
  static asIdentifier(span, name) {
    return new _TypeNode(span || DEF_SPAN, "ident", IdentNode.create(span || DEF_SPAN, name));
  }
  static asPointer(span, target, mutable = false) {
    return new _TypeNode(span || DEF_SPAN, "pointer", PointerTypeNode.create(span || DEF_SPAN, target, mutable));
  }
  static asOptional(span, target) {
    return new _TypeNode(span || DEF_SPAN, "optional", OptionalTypeNode.create(span || DEF_SPAN, target));
  }
  static asArray(span, target, size, mutable = false) {
    return new _TypeNode(span || DEF_SPAN, "array", ArrayTypeNode.create(span || DEF_SPAN, target, size, mutable));
  }
  static asU8Array(span, mutable = false) {
    return new _TypeNode(span || DEF_SPAN, "array", ArrayTypeNode.create(span || DEF_SPAN, _TypeNode.asUnsigned(span, "u8", 8), void 0, mutable));
  }
  static asU16Array(span, mutable = false) {
    return new _TypeNode(span || DEF_SPAN, "array", ArrayTypeNode.create(span || DEF_SPAN, _TypeNode.asUnsigned(span, "u16", 16), void 0, mutable));
  }
  static asU32Array(span, mutable = false) {
    return new _TypeNode(span || DEF_SPAN, "array", ArrayTypeNode.create(span || DEF_SPAN, _TypeNode.asUnsigned(span, "u32", 32), void 0, mutable));
  }
  static asTuple(span, fields) {
    return new _TypeNode(span || DEF_SPAN, "tuple", TupleTypeNode.create(span || DEF_SPAN, fields));
  }
  static asFunction(span, params, returnType, errorType) {
    return new _TypeNode(span || DEF_SPAN, "function", FunctionTypeNode.create(span || DEF_SPAN, params, returnType, errorType));
  }
  static asErrset(span, members) {
    return new _TypeNode(span || DEF_SPAN, "errset", ErrsetTypeNode.create(span || DEF_SPAN, members));
  }
  static asStruct(span, members, name = "Anonymous") {
    return new _TypeNode(span || DEF_SPAN, "struct", StructTypeNode.create(span || DEF_SPAN, members, name));
  }
  static asEnum(span, variants, name = "Anonymous") {
    return new _TypeNode(span || DEF_SPAN, "enum", EnumTypeNode.create(span || DEF_SPAN, variants, name));
  }
  static asUnion(span, types) {
    return new _TypeNode(span || DEF_SPAN, "union", UnionTypeNode.create(span || DEF_SPAN, types));
  }
  static asParen(span, type) {
    return new _TypeNode(span || DEF_SPAN, "paren", ParenTypeNode.create(span || DEF_SPAN, type));
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/ExprNodes/PrimaryNode.ts
var PrimaryNode = class _PrimaryNode extends Node {
  constructor(kind, span, source) {
    super();
    this.kind = kind;
    this.span = span;
    this.source = source;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.source);
    return children;
  }
  clone(newSpan) {
    const cloned = new _PrimaryNode(this.kind, newSpan || this.span, this.source);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  is(kind) {
    return this.kind === kind;
  }
  getLiteral() {
    return this.source;
  }
  getIdent() {
    return this.source;
  }
  getObject() {
    return this.source;
  }
  getParen() {
    return this.source;
  }
  getTuple() {
    return this.source;
  }
  getType() {
    return this.source;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(kind, span, source) {
    if (kind === "ident" && !(source instanceof IdentNode)) {
      throw new Error(`Invalid kind for primary: ${kind}`);
    }
    if (kind === "literal" && !(source instanceof LiteralNode)) {
      throw new Error(`Invalid kind for primary: ${kind}`);
    }
    if (kind === "object" && !(source instanceof ObjectNode)) {
      throw new Error(`Invalid kind for primary: ${kind}`);
    }
    if (kind === "paren" && !(source instanceof ParenNode)) {
      throw new Error(`Invalid kind for primary: ${kind}`);
    }
    if (kind === "tuple" && !(source instanceof ExprTupleNode)) {
      throw new Error(`Invalid kind for primary: ${kind}`);
    }
    if (kind === "type" && !(source instanceof TypeNode)) {
      throw new Error(`Invalid kind for primary: ${kind}`);
    }
    return new _PrimaryNode(kind, span, source);
  }
  static asIdent(span, name, builtin = false) {
    return this.create("ident", span, IdentNode.create(span, name, builtin));
  }
  static asLiteral(kind, span, value) {
    return this.create("literal", span, LiteralNode.create(kind, span, value));
  }
  static asParen(span, source) {
    return this.create("paren", span, ParenNode.create(span, source));
  }
  static asObject(span, props, ident) {
    return this.create("object", span, ObjectNode.create(span, props, ident));
  }
  static asTuple(span, exprs) {
    return this.create("tuple", span, ExprTupleNode.create(span, exprs));
  }
  static asType(span, type) {
    return this.create("type", span, type);
  }
  static asUnreachable(span) {
    return this.create("unreachable", span);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-5/ExprNodes/MemberAccessNode.ts
var MemberAccessNode = class _MemberAccessNode extends Node {
  constructor(span, base, target, optional) {
    super();
    this.span = span;
    this.base = base;
    this.target = target;
    this.optional = optional;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "MemberAccess";
    this.level = 5;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.base);
    children.push(this.target);
    return children;
  }
  clone(newSpan) {
    const cloned = new _MemberAccessNode(newSpan || this.span, this.base, this.target, this.optional);
    return cloned;
  }
  toString() {
    return `${this.base.toString()}${this.optional ? "?." : "."}${this.target.toString()}`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, base, target, optional = false) {
    return new _MemberAccessNode(span, base, target, optional);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-5/ExprNodes/ArrayAccessNode.ts
var ArrayAccessNode = class _ArrayAccessNode extends Node {
  constructor(span, base, index) {
    super();
    this.span = span;
    this.base = base;
    this.index = index;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "ArrayAccess";
    this.level = 5;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.base);
    children.push(this.index);
    return children;
  }
  clone(newSpan) {
    const cloned = new _ArrayAccessNode(newSpan || this.span, this.base, this.index);
    return cloned;
  }
  toString() {
    return `${this.base.toString()}[${this.index.toString()}]`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, base, index) {
    return new _ArrayAccessNode(span, base, index);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-5/ExprNodes/CallNode.ts
var CallNode = class _CallNode extends Node {
  constructor(span, base, args) {
    super();
    this.span = span;
    this.base = base;
    this.args = args;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "Call";
    this.level = 5;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.base);
    children.push(...this.args);
    return children;
  }
  clone(newSpan) {
    const cloned = new _CallNode(newSpan || this.span, this.base, this.args);
    return cloned;
  }
  toString() {
    const argsStr = this.args.map((arg) => arg.toString()).join(", ");
    return `${this.base.toString()}(${argsStr})`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, base, args) {
    return new _CallNode(span, base, args);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/ExprNodes/PostfixNode.ts
var PostfixNode = class _PostfixNode extends Node {
  constructor(kind, span, expr) {
    super();
    this.kind = kind;
    this.span = span;
    this.expr = expr;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.expr);
    return children;
  }
  clone(newSpan) {
    const cloned = new _PostfixNode(this.kind, newSpan || this.span, this.expr);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  is(kind) {
    return this.kind === kind;
  }
  getCall() {
    return this.expr;
  }
  getMemberAccess() {
    return this.expr;
  }
  getArrayAccess() {
    return this.expr;
  }
  getAsExprNode() {
    if (this.is("increment") || this.is("decrement") || this.is("dereference")) {
      return this.expr;
    }
    return void 0;
  }
  toString() {
    switch (this.kind) {
      case "increment":
        return `${this.expr.toString()}++`;
      case "decrement":
        return `${this.expr.toString()}--`;
      case "dereference":
        return `*${this.expr.toString()}`;
      case "memberAccess":
        return this.getMemberAccess().toString();
      case "arrayAccess":
        return this.getArrayAccess().toString();
      case "call":
        return this.getCall().toString();
      default:
        return `${this.expr.toString()}/* unknown postfix */`;
    }
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(kind, span, expr) {
    return new _PostfixNode(kind, span, expr);
  }
  static asIncrement(span, base) {
    return _PostfixNode.create("increment", span, base);
  }
  static asDecrement(span, base) {
    return _PostfixNode.create("decrement", span, base);
  }
  static asDereference(span, base) {
    return _PostfixNode.create("dereference", span, base);
  }
  static asMember(span, base, target, optional = false) {
    const memberExpr = MemberAccessNode.create(span, base, target, optional);
    return _PostfixNode.create("memberAccess", span, memberExpr);
  }
  static asArrayAccess(span, base, index) {
    const arrayExpr = ArrayAccessNode.create(span, base, index);
    const node = _PostfixNode.create("arrayAccess", span, arrayExpr);
    return node;
  }
  static asCall(span, base, args) {
    const callExpr = CallNode.create(span, base, args);
    return _PostfixNode.create("call", span, callExpr);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/ExprNodes/PrefixNode.ts
var PrefixNode = class _PrefixNode extends Node {
  constructor(kind, span, expr) {
    super();
    this.kind = kind;
    this.span = span;
    this.expr = expr;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.expr);
    return children;
  }
  clone(newSpan) {
    const cloned = new _PrefixNode(this.kind, newSpan || this.span, this.expr);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  is(kind) {
    return this.kind === kind;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(kind, span, expr) {
    return new _PrefixNode(kind, span, expr);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/ExprNodes/BinaryNode.ts
var op_table = {
  "**": "power",
  "*": "multiplicative",
  "/": "multiplicative",
  "%": "multiplicative",
  "+": "additive",
  "-": "additive",
  "<<": "shift",
  ">>": "shift",
  "<": "relational",
  "<=": "relational",
  ">": "relational",
  ">=": "relational",
  "==": "equality",
  "!=": "equality",
  "&": "bitwiseAnd",
  "^": "bitwiseXor",
  "|": "bitwiseOr",
  "and": "logicalAnd",
  "or": "logicalOr",
  "=": "assignment",
  "+=": "assignment",
  "-=": "assignment",
  "*=": "assignment",
  "/=": "assignment",
  "%=": "assignment"
};
var BinaryNode = class _BinaryNode extends Node {
  constructor(kind, span, left, operator, right) {
    super();
    this.kind = kind;
    this.span = span;
    this.left = left;
    this.operator = operator;
    this.right = right;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.left);
    children.push(this.right);
    return children;
  }
  clone(newSpan) {
    const cloned = new _BinaryNode(this.kind, newSpan || this.span, this.left, this.operator, this.right);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  is(kind) {
    return this.kind === kind;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, left, operator, right) {
    const kind = op_table[operator];
    if (!kind) {
      throw new Error(`Unknown operator: ${operator}`);
    }
    return new _BinaryNode(kind, span, left, operator, right);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/ExprNodes/ConditionalNode.ts
var ConditionalNode = class _ConditionalNode extends Node {
  constructor(span, condExpr, trueExpr, falseExpr) {
    super();
    this.span = span;
    this.condExpr = condExpr;
    this.trueExpr = trueExpr;
    this.falseExpr = falseExpr;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "conditional";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.condExpr);
    children.push(this.trueExpr);
    children.push(this.falseExpr);
    return children;
  }
  clone(newSpan) {
    const cloned = new _ConditionalNode(newSpan || this.span, this.condExpr, this.trueExpr, this.falseExpr);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, condExpr, trueExpr, falseExpr) {
    return new _ConditionalNode(span, condExpr, trueExpr, falseExpr);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/ExprNodes/IfNode.ts
var IfNode = class _IfNode extends Node {
  constructor(span, condExpr, thenStmt, elseStmt) {
    super();
    this.span = span;
    this.condExpr = condExpr;
    this.thenStmt = thenStmt;
    this.elseStmt = elseStmt;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "if";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.condExpr);
    children.push(this.thenStmt);
    if (this.elseStmt) {
      children.push(this.elseStmt);
    }
    return children;
  }
  clone(newSpan) {
    const cloned = new _IfNode(newSpan || this.span, this.condExpr, this.thenStmt, this.elseStmt);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, condExpr, thenStmt, elseStmt) {
    return new _IfNode(span, condExpr, thenStmt, elseStmt);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/ExprNodes/MatchNode.ts
var MatchNode = class _MatchNode extends Node {
  constructor(span, condExpr, cases, defCase) {
    super();
    this.span = span;
    this.condExpr = condExpr;
    this.cases = cases;
    this.defCase = defCase;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "match";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.condExpr);
    for (const caseItem of this.cases) {
      children.push(...caseItem.getChildrenNodes());
    }
    if (this.defCase) {
      children.push(...this.defCase.getChildrenNodes());
    }
    return children;
  }
  clone(newSpan) {
    const cloned = new _MatchNode(newSpan || this.span, this.condExpr, this.cases, this.defCase);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, condExpr, cases, defCase) {
    return new _MatchNode(span, condExpr, cases, defCase);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/ExprNodes/CatchNode.ts
var CatchNode = class _CatchNode extends Node {
  constructor(span, leftExpr, tag, rightStmt) {
    super();
    this.span = span;
    this.leftExpr = leftExpr;
    this.tag = tag;
    this.rightStmt = rightStmt;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "catch";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.leftExpr);
    if (this.tag) {
      children.push(this.tag);
    }
    children.push(this.rightStmt);
    return children;
  }
  clone(newSpan) {
    const cloned = new _CatchNode(newSpan || this.span, this.leftExpr, this.tag, this.rightStmt);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, leftExpr, tag, rightStmt) {
    return new _CatchNode(span, leftExpr, tag, rightStmt);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/ExprNodes/TryNode.ts
var TryNode = class _TryNode extends Node {
  constructor(span, expr) {
    super();
    this.span = span;
    this.expr = expr;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "try";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.expr);
    return children;
  }
  clone(newSpan) {
    const cloned = new _TryNode(newSpan || this.span, this.expr);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, leftExpr) {
    return new _TryNode(span, leftExpr);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/ExprNodes/RangeNode.ts
var RangeNode = class _RangeNode extends Node {
  constructor(span, leftExpr, rangeType, rightExpr) {
    super();
    this.span = span;
    this.leftExpr = leftExpr;
    this.rangeType = rangeType;
    this.rightExpr = rightExpr;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "range";
    this.level = 3;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    if (this.leftExpr) {
      children.push(this.leftExpr);
    }
    if (this.rightExpr) {
      children.push(this.rightExpr);
    }
    return children;
  }
  clone(newSpan) {
    const cloned = new _RangeNode(newSpan || this.span, this.leftExpr, this.rangeType, this.rightExpr);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, leftExpr, rangeType, elseStmt) {
    return new _RangeNode(span, leftExpr, rangeType, elseStmt);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/ExprNodes/OrelseNode.ts
var OrelseNode = class _OrelseNode extends Node {
  constructor(span, left, right) {
    super();
    this.span = span;
    this.left = left;
    this.right = right;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
    this.kind = "orelse";
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [this.left, this.right];
  }
  clone(newSpan) {
    return new _OrelseNode(
      newSpan != null ? newSpan : this.span,
      this.left,
      this.right
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, left, right) {
    return new _OrelseNode(span, left, right);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/ExprNodes/AsNode.ts
var AsNode = class _AsNode extends Node {
  constructor(span, base, type) {
    super();
    this.span = span;
    this.base = base;
    this.type = type;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
    this.kind = "as";
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [this.base, this.type];
  }
  clone(newSpan) {
    return new _AsNode(
      newSpan != null ? newSpan : this.span,
      this.base,
      this.type
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, left, type) {
    return new _AsNode(span, left, type);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-5/ExprNodes/PropNode.ts
var PropNode = class _PropNode extends Node {
  constructor(span, key, val) {
    super();
    this.span = span;
    this.key = key;
    this.val = val;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "Prop";
    this.level = 5;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    if (this.key) {
      children.push(this.key);
    }
    if (this.val) {
      children.push(this.val);
    }
    return children;
  }
  clone(newSpan) {
    const cloned = new _PropNode(newSpan != null ? newSpan : this.span, this.key, this.val);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, key, val) {
    return new _PropNode(span, key, val);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-5/ExprNodes/CaseNode.ts
var CaseNode = class _CaseNode extends Node {
  constructor(span, expr, stmt, hasBreak) {
    super();
    this.span = span;
    this.expr = expr;
    this.stmt = stmt;
    this.hasBreak = hasBreak;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "Case";
    this.level = 5;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.expr);
    if (this.stmt) {
      children.push(this.stmt);
    }
    return children;
  }
  clone(newSpan) {
    const cloned = new _CaseNode(newSpan || this.span, this.expr, this.stmt, this.hasBreak);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, expr, stmt, hasBreak = void 0) {
    return new _CaseNode(span, expr, stmt, hasBreak);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-5/ExprNodes/DefaultNode.ts
var DefaultNode = class _DefaultNode extends Node {
  constructor(span, stmt, hasBreak) {
    super();
    this.span = span;
    this.stmt = stmt;
    this.hasBreak = hasBreak;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "Default";
    this.level = 5;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(this.stmt);
    return children;
  }
  clone(newSpan) {
    const cloned = new _DefaultNode(newSpan || this.span, this.stmt, this.hasBreak);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, stmt, hasBreak = void 0) {
    return new _DefaultNode(span, stmt, hasBreak);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/ExprNodes/TypeofNode.ts
var TypeofNode = class _TypeofNode extends Node {
  constructor(span, expr) {
    super();
    this.span = span;
    this.expr = expr;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
    this.kind = "typeof";
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [this.expr];
  }
  clone(newSpan) {
    return new _TypeofNode(
      newSpan != null ? newSpan : this.span,
      this.expr
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, expr) {
    return new _TypeofNode(span, expr);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-3/ExprNodes/SizeofNode.ts
var SizeofNode = class _SizeofNode extends Node {
  constructor(span, expr) {
    super();
    this.span = span;
    this.expr = expr;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 3;
    this.kind = "sizeof";
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return [this.expr];
  }
  clone(newSpan) {
    return new _SizeofNode(
      newSpan != null ? newSpan : this.span,
      this.expr
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, expr) {
    return new _SizeofNode(span, expr);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-2/ExprNode.ts
var ExprNode = class _ExprNode extends Node {
  constructor(kind, span, data) {
    super();
    this.kind = kind;
    this.span = span;
    this.data = data;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 2;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return this.data.getChildrenNodes();
  }
  clone(newSpan) {
    const cloned = new _ExprNode(this.kind, newSpan != null ? newSpan : this.span, this.data);
    return cloned;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  getPrimary() {
    return this.is("primary") ? this.data : void 0;
  }
  getPostfix() {
    return this.is("postfix") ? this.data : void 0;
  }
  getPrefix() {
    return this.is("prefix") ? this.data : void 0;
  }
  getBinary() {
    return this.is("binary") ? this.data : void 0;
  }
  getConditional() {
    return this.is("cond") ? this.data : void 0;
  }
  getIf() {
    return this.is("if") ? this.data : void 0;
  }
  getMatch() {
    return this.is("match") ? this.data : void 0;
  }
  getCatch() {
    return this.is("catch") ? this.data : void 0;
  }
  getTry() {
    return this.is("try") ? this.data : void 0;
  }
  getRange() {
    return this.is("range") ? this.data : void 0;
  }
  getOrelse() {
    return this.is("orelse") ? this.data : void 0;
  }
  getAs() {
    return this.is("as") ? this.data : void 0;
  }
  getTypeof() {
    return this.is("typeof") ? this.data : void 0;
  }
  getSizeof() {
    return this.is("sizeof") ? this.data : void 0;
  }
  getLiteral() {
    return this.is("primary") && this.getPrimary().is("literal") ? this.getPrimary().getLiteral() : void 0;
  }
  getIdent() {
    return this.is("primary") && this.getPrimary().is("ident") ? this.getPrimary().getIdent() : void 0;
  }
  getParen() {
    return this.is("primary") && this.getPrimary().is("paren") ? this.getPrimary().getParen() : void 0;
  }
  getObject() {
    return this.is("primary") && this.getPrimary().is("object") ? this.getPrimary().getObject() : void 0;
  }
  getTuple() {
    return this.is("primary") && this.getPrimary().is("tuple") ? this.getPrimary().getTuple() : void 0;
  }
  getType() {
    return this.is("primary") && this.getPrimary().is("type") ? this.getPrimary().getType() : void 0;
  }
  is(kind) {
    return this.kind === kind;
  }
  isOrEndWith(kind) {
    return this.is(kind) || this.isParen() && this.getParen().source.isOrEndWith(kind) || false;
  }
  isIdent() {
    return this.is("primary") && this.getPrimary().is("ident");
  }
  isLiteral() {
    return this.is("primary") && this.getPrimary().is("literal");
  }
  isUnreachable() {
    return this.is("primary") && this.getPrimary().is("unreachable");
  }
  isObject() {
    return this.is("primary") && this.getPrimary().is("object");
  }
  isParen() {
    return this.is("primary") && this.getPrimary().is("paren");
  }
  isTuple() {
    return this.is("primary") && this.getPrimary().is("tuple");
  }
  isType() {
    return this.is("primary") && this.getPrimary().is("type");
  }
  isMemberAccess() {
    return this.is("postfix") && this.getPostfix().is("memberAccess");
  }
  isArrayAccess() {
    return this.is("postfix") && this.getPostfix().is("arrayAccess");
  }
  isCall() {
    return this.is("postfix") && this.getPostfix().is("call");
  }
  isOrelse() {
    return this.is("orelse");
  }
  isAs() {
    return this.is("as");
  }
  isTypeof() {
    return this.is("typeof");
  }
  isSizeof() {
    return this.is("sizeof");
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  // ────────────────────────── Primary ──────────────────────────
  static asPrimary(span, source) {
    return new _ExprNode("primary", span, source);
  }
  static asLiteral(span, kind, value) {
    return _ExprNode.asPrimary(span || DEF_SPAN, PrimaryNode.asLiteral(kind, span, value));
  }
  static asIdent(span, name, builtin = false) {
    return _ExprNode.asPrimary(span || DEF_SPAN, PrimaryNode.asIdent(span || DEF_SPAN, name, builtin));
  }
  static asUnreachable(span) {
    return _ExprNode.asPrimary(span || DEF_SPAN, PrimaryNode.asUnreachable(span || DEF_SPAN));
  }
  static asType(span, type) {
    return _ExprNode.asPrimary(span || DEF_SPAN, PrimaryNode.asType(span || DEF_SPAN, type));
  }
  static asInteger(span, value) {
    return this.asLiteral(span || DEF_SPAN, "Integer", value);
  }
  static asFloat(span, value) {
    return this.asLiteral(span || DEF_SPAN, "Float", value);
  }
  static asBool(span, value) {
    return this.asLiteral(span || DEF_SPAN, "Bool", value);
  }
  static asNull(span) {
    return this.asLiteral(span || DEF_SPAN, "Null", null);
  }
  static asUndefined(span) {
    return this.asLiteral(span || DEF_SPAN, "Undefined", void 0);
  }
  static asString(span, value) {
    return this.asLiteral(span || DEF_SPAN, "String", value);
  }
  static asChar(span, value) {
    return this.asLiteral(span || DEF_SPAN, "Character", value);
  }
  static asArray(span, elements) {
    return this.asLiteral(span || DEF_SPAN, "Array", [...elements]);
  }
  static asObject(span, props, ident) {
    return _ExprNode.asPrimary(span || DEF_SPAN, PrimaryNode.asObject(span || DEF_SPAN, props, ident));
  }
  static asParen(span, expression) {
    return _ExprNode.asPrimary(span || DEF_SPAN, PrimaryNode.asParen(span || DEF_SPAN, expression));
  }
  static asTuple(span, fields) {
    return _ExprNode.asPrimary(span || DEF_SPAN, PrimaryNode.asTuple(span || DEF_SPAN, fields));
  }
  // ────────────────────────── Postfix ──────────────────────────
  static asPostfix(span, source) {
    return new _ExprNode("postfix", span, source);
  }
  static asPostIncrement(span, base) {
    return _ExprNode.asPostfix(span || DEF_SPAN, PostfixNode.asIncrement(span || DEF_SPAN, base));
  }
  static asPostDecrement(span, base) {
    return _ExprNode.asPostfix(span || DEF_SPAN, PostfixNode.asDecrement(span || DEF_SPAN, base));
  }
  static asDereference(span, base) {
    return _ExprNode.asPostfix(span || DEF_SPAN, PostfixNode.asDereference(span || DEF_SPAN, base));
  }
  static asMemberAccess(span, base, target, optional = false) {
    return _ExprNode.asPostfix(span || DEF_SPAN, PostfixNode.asMember(span || DEF_SPAN, base, target, optional));
  }
  static asCall(span, base, args) {
    return _ExprNode.asPostfix(span || DEF_SPAN, PostfixNode.asCall(span || DEF_SPAN, base, args));
  }
  static asArrayAccess(span, base, index) {
    return _ExprNode.asPostfix(span || DEF_SPAN, PostfixNode.asArrayAccess(span || DEF_SPAN, base, index));
  }
  // ────────────────────────── Prefix ──────────────────────────
  static asPrefix(span, source) {
    return new _ExprNode("prefix", span, source);
  }
  static asPreIncrement(span, base) {
    return _ExprNode.asPrefix(span || DEF_SPAN, PrefixNode.create("increment", span, base));
  }
  static asPreDecrement(span, base) {
    return _ExprNode.asPrefix(span || DEF_SPAN, PrefixNode.create("decrement", span, base));
  }
  static asReference(span, base) {
    return _ExprNode.asPrefix(span || DEF_SPAN, PrefixNode.create("reference", span, base));
  }
  static asUnaryMinus(span, base) {
    return _ExprNode.asPrefix(span || DEF_SPAN, PrefixNode.create("unaryMinus", span, base));
  }
  static asUnaryPlus(span, base) {
    return _ExprNode.asPrefix(span || DEF_SPAN, PrefixNode.create("unaryPlus", span, base));
  }
  static asLogicalNot(span, base) {
    return _ExprNode.asPrefix(span || DEF_SPAN, PrefixNode.create("logicalNot", span, base));
  }
  static asxBitwiseNot(span, base) {
    return _ExprNode.asPrefix(span || DEF_SPAN, PrefixNode.create("bitwiseNot", span, base));
  }
  // ────────────────────────── Rest ──────────────────────────
  static asBinary(span, left, operator, right) {
    return new _ExprNode("binary", span, BinaryNode.create(span || DEF_SPAN, left, operator, right));
  }
  static asConditional(span, condExpr, trueExpr, falseExpr) {
    return new _ExprNode("cond", span, ConditionalNode.create(span || DEF_SPAN, condExpr, trueExpr, falseExpr));
  }
  static asIf(span, condExpr, thenStmt, elseStmt) {
    return new _ExprNode("if", span, IfNode.create(span || DEF_SPAN, condExpr, thenStmt, elseStmt));
  }
  static asMatch(span, condExpr, cases, defCase) {
    return new _ExprNode("match", span, MatchNode.create(span || DEF_SPAN, condExpr, cases, defCase));
  }
  static asCatch(span, leftExpr, tag, rightStmt) {
    return new _ExprNode("catch", span, CatchNode.create(span || DEF_SPAN, leftExpr, tag, rightStmt));
  }
  static asTry(span, expr) {
    return new _ExprNode("try", span, TryNode.create(span || DEF_SPAN, expr));
  }
  static asRange(span, leftExpr, rangeType, rightExpr) {
    return new _ExprNode("range", span, RangeNode.create(span || DEF_SPAN, leftExpr, rangeType, rightExpr));
  }
  static asOrelse(span, left, right) {
    return new _ExprNode("orelse", span, OrelseNode.create(span || DEF_SPAN, left, right));
  }
  static asAs(span, base, type) {
    return new _ExprNode("as", span, AsNode.create(span || DEF_SPAN, base, type));
  }
  static asTypeof(span, type) {
    return new _ExprNode("typeof", span, TypeofNode.create(span || DEF_SPAN, type));
  }
  static asSizeof(span, type) {
    return new _ExprNode("sizeof", span, SizeofNode.create(span || DEF_SPAN, type));
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-4/ExprNodes/ExprTupleNode.ts
var ExprTupleNode = class _ExprTupleNode extends Node {
  constructor(span, fields) {
    super();
    this.span = span;
    this.fields = fields;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "Tuple";
    this.level = 4;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    children.push(...this.fields);
    return children;
  }
  clone(newSpan) {
    const cloned = new _ExprTupleNode(newSpan || this.span, this.fields);
    return cloned;
  }
  toString() {
    return `{ ${this.fields.map((f) => `f${f.getIdent().name}`).join(", ")} }`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, fields) {
    return new _ExprTupleNode(span, fields);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-5/ExprNodes/EnumVariantNode.ts
var EnumVariantNode = class _EnumVariantNode extends Node {
  constructor(span, ident, type) {
    super();
    this.span = span;
    this.ident = ident;
    this.type = type;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.kind = "EnumVariant";
    this.level = 5;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    return this.type ? [this.type] : [];
  }
  clone(newSpan) {
    return new _EnumVariantNode(
      newSpan != null ? newSpan : this.span,
      this.ident,
      this.type
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  hasType() {
    return this.type !== void 0;
  }
  isUnit() {
    return this.type === void 0;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, ident, type) {
    return new _EnumVariantNode(span, ident, type);
  }
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-5/common/FieldNode.ts
var FieldNode = class _FieldNode extends Node {
  constructor(span, visibility, comptime, mutability, ident, type, initializer, documents = []) {
    super();
    this.span = span;
    this.visibility = visibility;
    this.comptime = comptime;
    this.mutability = mutability;
    this.ident = ident;
    this.type = type;
    this.initializer = initializer;
    this.documents = documents;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 5;
    this.kind = "Field";
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    if (this.type) {
      children.push(this.type);
    }
    if (this.initializer) {
      children.push(this.initializer);
    }
    return children;
  }
  clone(newSpan) {
    return new _FieldNode(
      newSpan != null ? newSpan : this.span,
      this.visibility,
      this.comptime,
      this.mutability,
      this.ident,
      this.type,
      this.initializer
    );
  }
  // for factory
  getField() {
    return this;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, visibility, comptime, mutability, ident, type, initializer, documents) {
    return new _FieldNode(span, visibility, comptime, mutability, ident, type, initializer, documents);
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  // └────────────────────────────────────────────────────────────────────┘
};

// lib/nodes/level-5/ExprNodes/StructMemberNode.ts
var StructMemberNode = class _StructMemberNode extends Node {
  constructor(span, kind, source) {
    super();
    this.span = span;
    this.kind = kind;
    this.source = source;
    // ┌──────────────────────────────── INIT ──────────────────────────────┐
    this.level = 5;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── NODE ──────────────────────────────┐
  getChildrenNodes() {
    const children = [];
    if (this.source) children.push(this.source);
    return children;
  }
  clone(newSpan) {
    return new _StructMemberNode(
      newSpan != null ? newSpan : this.span,
      this.kind,
      this.source
    );
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  isField() {
    return this.kind === "Field";
  }
  isMethod() {
    return this.kind === "Method";
  }
  getField() {
    if (this.isField()) return this.source;
    return void 0;
  }
  getMethod() {
    if (this.isMethod()) return this.source;
    return void 0;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  static create(span, source) {
    return new _StructMemberNode(span, source.kind === "Function" ? "Method" : "Field", source);
  }
  static createField(span, structFieldNode) {
    return new _StructMemberNode(span, "Field", structFieldNode);
  }
  static createMethod(span, funcNode) {
    return new _StructMemberNode(span, "Method", funcNode);
  }
  // └────────────────────────────────────────────────────────────────────┘
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArrayAccessNode,
  ArrayTypeNode,
  AsNode,
  BinaryNode,
  BlockStmtNode,
  BreakStmtNode,
  CallNode,
  CaseNode,
  CatchNode,
  ConditionalNode,
  ContinueStmtNode,
  DefStmtNode,
  DefaultNode,
  DeferStmtNode,
  DoStmtNode,
  EnumTypeNode,
  EnumVariantNode,
  ErrsetTypeNode,
  ExprNode,
  ExprTupleNode,
  FieldNode,
  ForStmtNode,
  FuncStmtNode,
  FunctionTypeNode,
  IdentNode,
  IfNode,
  LetStmtNode,
  LiteralNode,
  MatchNode,
  MemberAccessNode,
  Module,
  Node,
  ObjectNode,
  OptionalTypeNode,
  OrelseNode,
  ParenNode,
  ParenTypeNode,
  PointerTypeNode,
  PostfixNode,
  PrefixNode,
  PrimaryNode,
  PrimitiveTypeNode,
  Program,
  PropNode,
  RangeNode,
  ReturnStmtNode,
  SectionStmtNode,
  SizeofNode,
  StmtNode,
  StructMemberNode,
  StructTypeNode,
  TestStmtNode,
  ThrowStmtNode,
  TryNode,
  TupleTypeNode,
  TypeNode,
  TypeofNode,
  UnionTypeNode,
  UseStmtNode,
  WhileStmtNode
});
//# sourceMappingURL=ast.js.map