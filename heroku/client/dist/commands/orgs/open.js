import { color } from '@heroku/heroku-cli-util';
import { Command, flags } from '@heroku-cli/command';
import open from 'open';
import { ux } from '@oclif/core';
export default class OrgsOpen extends Command {
    static topic = 'orgs';
    static description = 'open the team interface in a browser window';
    static flags = {
        team: flags.team({ required: true }),
    };
    static async openUrl(url) {
        ux.stdout(`Opening ${color.info(url)}...`);
        await open(url);
    }
    async run() {
        const { flags } = await this.parse(OrgsOpen);
        const { team } = flags;
        const { body: org } = await this.heroku.get(`/teams/${team}`);
        await OrgsOpen.openUrl(`https://dashboard.heroku.com/teams/${org.name}`);
    }
}
