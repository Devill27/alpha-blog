import { Command } from '@heroku-cli/command';
export default class Connect extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        repo: import("@oclif/core/interfaces").OptionFlag<string, import("@oclif/core/interfaces").CustomOptions>;
    };
    static args: {
        name: import("@oclif/core/interfaces").Arg<string, Record<string, unknown>>;
    };
    run(): Promise<void>;
}
