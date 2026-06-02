import { Command } from '@heroku-cli/command';
export default class ClientsCreate extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        json: import("@oclif/core/interfaces").BooleanFlag<boolean>;
        shell: import("@oclif/core/interfaces").BooleanFlag<boolean>;
    };
    static args: {
        name: import("@oclif/core/interfaces").Arg<string, Record<string, unknown>>;
        redirect_uri: import("@oclif/core/interfaces").Arg<string, Record<string, unknown>>;
    };
    run(): Promise<void>;
}
