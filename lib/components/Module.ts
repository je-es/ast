// Module.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { SectionStmtNode } from '../ast';
import { StmtNode, StmtKind }   from '../nodes/level-1/StmtNode';
    import { FuncStmtNode }         from '../nodes/level-3/StmtNodes/FuncStmtNode';
    import { ModuleDocsInfo }       from '../nodes/node';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    // TODO: improve it.
    export interface ModuleMetadata {
        name?           : string;
        path            : string;
        [key: string]   : unknown;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class Module {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            constructor(
                public name         : string,
                public stmts        : StmtNode[],
                public metadata     : ModuleMetadata,
                public docs         : ModuleDocsInfo,
            ) { }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(name: string, stmts: StmtNode[], metadata: ModuleMetadata, docs: ModuleDocsInfo): Module {
                return new Module(name, stmts, metadata, docs);
            }

            validate(): boolean {
                try {
                    // Validate module name
                    if (!this.name.trim()) {return false;}

                    // Validate all statements
                    return this.stmts.every(stmt => stmt.validate());
                } catch {
                    return false;
                }
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── FIND ──────────────────────────────┐

            findStatements(predicate: (stmt: StmtNode) => boolean): StmtNode[] {
                return this.stmts.filter(predicate);
            }

            findStatement(predicate: (stmt: StmtNode) => boolean): StmtNode | undefined {
                return this.stmts.find(predicate);
            }

            findStatementsByKind(kind: StmtKind): StmtNode[] {
                return this.stmts.filter(stmt => stmt.kind === kind);
            }

            findFunction(name: string): FuncStmtNode | undefined {
                for (const stmt of this.stmts) {
                    if (stmt.is('func') && stmt.getFunc()!.ident.name === name) {
                        return stmt.getFunc();
                    } else if(stmt.is('section')) {
                        const section = stmt.getSection()!;

                        for (const stmt of section.stmts) {
                            if (stmt.is('func') && stmt.getFunc()!.ident.name === name) {
                                return stmt.getFunc();
                            }
                        }
                    }
                }
                return undefined;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── CTRL ──────────────────────────────┐

            removeStatement(index: number): Module {
                if (index < 0 || index >= this.stmts.length) {
                    throw new Error(`Statement index ${index} out of bounds (0-${this.stmts.length - 1})`);
                }

                const newStatements = [...this.stmts];
                newStatements.splice(index, 1);
                return new Module(
                    this.name,
                    newStatements,
                    { ...this.metadata },
                    { ...this.docs }
                );
            }

            insertStatement(index: number, statement: StmtNode): Module {
                if (index < 0 || index > this.stmts.length) {
                    throw new Error(`Statement index ${index} out of bounds (0-${this.stmts.length})`);
                }

                const newStatements = [...this.stmts];
                newStatements.splice(index, 0, statement);
                return new Module(
                    this.name,
                    newStatements,
                    { ...this.metadata },
                    { ...this.docs }
                );
            }

            replaceStatement(index: number, statement: StmtNode): Module {
                if (index < 0 || index >= this.stmts.length) {
                    throw new Error(`Statement index ${index} out of bounds (0-${this.stmts.length - 1})`);
                }

                const newStatements = [...this.stmts];
                newStatements[index] = statement;
                return new Module(
                    this.name,
                    newStatements,
                    { ...this.metadata },
                    { ...this.docs }
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── ---- ──────────────────────────────┐

            isEmpty(): boolean {
                return this.stmts.length === 0;
            }

            hasStatement(statement: StmtNode): boolean {
                return this.stmts.includes(statement);
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── ---- ──────────────────────────────┐

            getStatementCount(): number {
                return this.stmts.length;
            }

            getTotalNodes(): number {
                let count = 1; // Count self
                for (const statement of this.stmts) {
                    const countt = 0;
                    statement.traverse(() => void (count++));
                    count += countt;
                }
                return count;
            }

            getStatementAt(index: number): StmtNode | undefined {
                if (index < 0 || index >= this.stmts.length) {
                    return undefined;
                }
                return this.stmts[index];
            }

            getStatementIndex(statement: StmtNode): number {
                return this.stmts.indexOf(statement);
            }

            getPublicStatements(): StmtNode[] {
                const arr : StmtNode[] = [];

                for (const stmt of this.stmts) {
                    if(
                        (stmt.is('let')     && stmt.getLet()!.field.visibility.kind !== 'Private') ||
                        (stmt.is('def')     && stmt.getDef()!.visibility.kind  !== 'Private') ||
                        (stmt.is('func')    && stmt.getFunc()!.visibility.kind !== 'Private')
                    ) { arr.push(stmt); }
                }

                return arr;
            }

            getPath(): string {
                return this.metadata?.path as string || '';
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝