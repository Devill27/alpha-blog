import { Command } from '@heroku-cli/command';
export default class OrgsOpen extends Command {
    static topic: string;
    static description: string;
    static flags: {
        team: import("@oclif/core/interfaces").OptionFlag<string, import("@oclif/core/interfaces").CustomOptions>;
    };
    static openUrl(url: string): Promise<void>;
    run(): Promise<void>;
}
