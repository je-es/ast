// Module.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { StmtNode, StmtKind }   from '../nodes/level-1/StmtNode';
    import { FuncStmtNode }         from '../nodes/level-3/StmtNodes/FuncStmtNode';

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
                public statements   : StmtNode[],
                public exports      : string[],
                public imports      : string[],
                public metadata     : ModuleMetadata,
            ) { }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(name: string, stmts: StmtNode[], metadata: ModuleMetadata): Module {
                return new Module(name, stmts || [], [], [], metadata || {});
            }

            validate(): boolean {
                try {
                    // Validate module name
                    if (!this.name.trim()) {return false;}

                    // Validate all statements
                    return this.statements.every(stmt => stmt.validate());
                } catch {
                    return false;
                }
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── FIND ──────────────────────────────┐

            findStatements(predicate: (stmt: StmtNode) => boolean): StmtNode[] {
                return this.statements.filter(predicate);
            }

            findStatement(predicate: (stmt: StmtNode) => boolean): StmtNode | undefined {
                return this.statements.find(predicate);
            }

            findStatementsByKind(kind: StmtKind): StmtNode[] {
                return this.statements.filter(stmt => stmt.kind === kind);
            }

            findFunction(name: string): FuncStmtNode | undefined {
                for (const stmt of this.statements) {
                    if (stmt.is('func') && stmt.getFunc()!.ident.name === name) {
                        return stmt.getFunc();
                    }
                }
                return undefined;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── CTRL ──────────────────────────────┐

            removeStatement(index: number): Module {
                if (index < 0 || index >= this.statements.length) {
                    throw new Error(`Statement index ${index} out of bounds (0-${this.statements.length - 1})`);
                }

                const newStatements = [...this.statements];
                newStatements.splice(index, 1);
                return new Module(
                    this.name,
                    newStatements,
                    [...this.exports],
                    [...this.imports],
                    { ...this.metadata }
                );
            }

            insertStatement(index: number, statement: StmtNode): Module {
                if (index < 0 || index > this.statements.length) {
                    throw new Error(`Statement index ${index} out of bounds (0-${this.statements.length})`);
                }

                const newStatements = [...this.statements];
                newStatements.splice(index, 0, statement);
                return new Module(
                    this.name,
                    newStatements,
                    [...this.exports],
                    [...this.imports],
                    { ...this.metadata }
                );
            }

            replaceStatement(index: number, statement: StmtNode): Module {
                if (index < 0 || index >= this.statements.length) {
                    throw new Error(`Statement index ${index} out of bounds (0-${this.statements.length - 1})`);
                }

                const newStatements = [...this.statements];
                newStatements[index] = statement;
                return new Module(
                    this.name,
                    newStatements,
                    [...this.exports],
                    [...this.imports],
                    { ...this.metadata }
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── ---- ──────────────────────────────┐

            isEmpty(): boolean {
                return this.statements.length === 0;
            }

            hasStatement(statement: StmtNode): boolean {
                return this.statements.includes(statement);
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── ---- ──────────────────────────────┐

            getStatementCount(): number {
                return this.statements.length;
            }

            getTotalNodes(): number {
                let count = 1; // Count self
                for (const statement of this.statements) {
                    const countt = 0;
                    statement.traverse(() => void (count++));
                    count += countt;
                }
                return count;
            }

            getStatementAt(index: number): StmtNode | undefined {
                if (index < 0 || index >= this.statements.length) {
                    return undefined;
                }
                return this.statements[index];
            }

            getStatementIndex(statement: StmtNode): number {
                return this.statements.indexOf(statement);
            }

            getPublicStatements(): StmtNode[] {
                const arr : StmtNode[] = [];

                for (const stmt of this.statements) {
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