import { color } from '@heroku/heroku-cli-util';
import { ux } from '@oclif/core';
import * as api from '../../api.js';
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function pollAppSetup(heroku, appSetup) {
    return api.getAppSetup(heroku, appSetup.id).then(({ body: setup }) => {
        if (setup.status === 'succeeded') {
            return setup;
        }
        if (setup.status === 'failed') {
            throw new Error(`Couldn't create application ${color.app(setup.app.name)}: ${setup.failure_message}`);
        }
        return wait(1000).then(() => pollAppSetup(heroku, appSetup));
    }).catch((error) => ux.error(error, { exit: 1 }));
}
export default function pollAppSetups(heroku, appSetups) {
    return Promise.all(appSetups.map((appSetup) => pollAppSetup(heroku, appSetup)));
}
