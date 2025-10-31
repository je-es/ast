// Program.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Module }               from './Module';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    // TODO: improve it.
    export interface ProgramMetadata {
        name?           : string;
        desc?           : string;
        version?        : string;
        path            : string;
        [key: string]   : unknown;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class Program {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            constructor(
                public modules      : Map<string, Module>,
                public metadata     : ProgramMetadata,
            ) { }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            static create(modules: Module[], metadata: ProgramMetadata): Program {
                // create module map from modules
                const modulesMap = new Map<string, Module>();
                for (const module of modules || []) {
                    modulesMap.set(module.name, module);
                }

                return new Program(modulesMap, metadata);
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── FIND ──────────────────────────────┐

            findModules(predicate: (module: Module, name: string) => boolean): [string, Module][] {
                const results: [string, Module][] = [];
                for (const [name, module] of this.modules) {
                    if (predicate(module, name)) {
                        results.push([name, module]);
                    }
                }
                return results;
            }

            findModule(predicate: (module: Module, name: string) => boolean): [string, Module] | undefined {
                for (const [name, module] of this.modules) {
                    if (predicate(module, name)) {
                        return [name, module];
                    }
                }
                return undefined;
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── CTRL ──────────────────────────────┐

            removeModule(name: string): Program {
                if (!this.modules.has(name)) {return this;}

                const newModules = new Map(this.modules);
                newModules.delete(name);
                return new Program(newModules, this.metadata);
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── ---- ──────────────────────────────┐

            isEmpty(): boolean {
                return this.modules.size === 0 ||
                    Array.from(this.modules.values()).every(m => m.statements.length === 0);
            }

            hasModule(name: string): boolean {
                return this.modules.has(name);
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── ---- ──────────────────────────────┐

            getModule(name: string): Module | undefined {
                return this.modules.get(name);
            }

            getModuleNames(): string[] {
                return Array.from(this.modules.keys());
            }

            getTotalModules(): number {
                return this.modules.size;
            }

            getTotalStatements(): number {
                return Array.from(this.modules.values())
                    .reduce((total, module) => total + module.statements.length, 0);
            }

            getTotalNodes(): number {
                let count = this.modules.size; // Count modules themselves
                for (const module of this.modules.values()) {
                    count += module.getTotalNodes();
                }
                return count;
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝