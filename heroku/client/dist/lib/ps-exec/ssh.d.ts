/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
export declare class HerokuSsh {
    connect(context: {
        args: string[];
    }, addonHost: string, dynoUser: string, privateKey: Buffer | string, proxyKey: string, callback?: (() => void)): Promise<void>;
    ssh(context: {
        args: string[];
    }, addonHost: string, dynoUser: string, privateKey: Buffer | string, proxyKey: string): Promise<void>;
    scp(addonHost: string, dynoUser: string, privateKey: Buffer | string, proxyKey: string, src: string, dest: string): Promise<void>;
    socksv5(addonHost: string, dynoUser: string, privateKey: Buffer | string, proxyKey: string, callback?: ((port: number) => void)): void;
    private _logConnectionError;
    private _readData;
    private _readStdin;
    private _buildCommand;
    private _connectionDefaults;
}
