/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { SpawnOptions } from 'child_process';
import { pg } from '@heroku/heroku-cli-util';
export declare function fetchVersion(db: pg.ConnectionDetails): Promise<string | undefined>;
export declare function psqlFileOptions(file: string, dbEnv: NodeJS.ProcessEnv): {
    dbEnv: NodeJS.ProcessEnv;
    psqlArgs: string[];
    childProcessOptions: SpawnOptions;
};
export declare function psqlInteractiveOptions(prompt: string, dbEnv: NodeJS.ProcessEnv): {
    dbEnv: NodeJS.ProcessEnv;
    psqlArgs: string[];
    childProcessOptions: SpawnOptions;
};
export declare function execFile(db: pg.ConnectionDetails, file: string): Promise<string>;
export declare function interactive(db: pg.ConnectionDetails): Promise<string>;
