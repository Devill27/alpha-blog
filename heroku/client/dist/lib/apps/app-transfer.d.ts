import { APIClient } from '@heroku-cli/command';
declare type Options = {
    appName: string;
    bulk: boolean;
    heroku: APIClient;
    personalToPersonal: boolean;
    recipient: string;
};
export declare const appTransfer: (options: Options) => Promise<void>;
export {};
