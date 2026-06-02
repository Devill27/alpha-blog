import { color, hux } from '@heroku/heroku-cli-util';
import { ux } from '@oclif/core';
import { parse } from 'psl';
const wait = function (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};
function isParseError(parsed) {
    return parsed.error !== undefined;
}
export async function getDomains(heroku, app) {
    const { body: domains } = await heroku.get(`/apps/${app}/domains`);
    return domains;
}
function type(domain) {
    const parsed = parse(domain.hostname);
    if (isParseError(parsed)) {
        throw new Error(parsed.error.message);
    }
    return parsed.subdomain === null ? 'ALIAS/ANAME' : 'CNAME';
}
export async function waitForDomains(heroku, app) {
    function someNull(domains) {
        return domains.some(domain => domain.kind === 'custom' && !domain.cname);
    }
    let apiDomains = await getDomains(heroku, app);
    if (someNull(apiDomains)) {
        ux.action.start('Waiting for stable domains to be created');
        let index = 0;
        do {
            // trying 30 times was easier for me to test that setTimeout
            if (index >= 30) {
                throw new Error('Timed out while waiting for stable domains to be created');
            }
            await wait(1000);
            apiDomains = await getDomains(heroku, app);
            index++;
        } while (someNull(apiDomains));
    }
    return apiDomains;
}
export function printDomains(domains, message) {
    domains = domains.filter(domain => domain.kind === 'custom');
    const domains_with_type = domains.map(domain => ({ ...domain, type: type(domain) }));
    if (domains_with_type.length === 0) {
        hux.styledHeader(`${message}  Add a custom domain to your app by running ${color.code('heroku domains:add <yourdomain.com>')}`);
    }
    else {
        hux.styledHeader(`${message}  Update your application's DNS settings as follows`);
        hux.table(domains_with_type, {
            domain: {
                get: ({ hostname }) => hostname,
                header: 'Domain',
            },
            recordType: {
                get: ({ type }) => type,
                header: 'Record Type',
            },
            // eslint-disable-next-line perfectionist/sort-objects
            dnsTarget: {
                get: ({ cname }) => cname,
                header: 'DNS Target',
            },
        });
    }
}
export async function waitForCertIssuedOnDomains(heroku, app) {
    function certIssuedOrFailedForAllCustomDomains(domains) {
        domains = domains.filter(domain => domain.kind === 'custom');
        return domains.every(domain => domain.acm_status === 'cert issued' || domain.acm_status === 'failed');
    }
    function someFailed(domains) {
        domains = domains.filter(domain => domain.kind === 'custom');
        return domains.some(domain => domain.acm_status === 'failed');
    }
    function backoff(attempts) {
        const wait = 15 * 1000;
        // Don't wait more than 60 seconds
        const multiplier = attempts < 60 ? Math.floor(attempts / 20) : 3;
        const extraWait = wait * multiplier;
        return wait + extraWait;
    }
    let domains = await getDomains(heroku, app);
    if (!certIssuedOrFailedForAllCustomDomains(domains)) {
        ux.action.start('Waiting until the certificate is issued to all domains');
        let retries = 0;
        while (!certIssuedOrFailedForAllCustomDomains(domains)) {
            await wait(backoff(retries));
            domains = await getDomains(heroku, app);
            retries++;
        }
        if (someFailed(domains)) {
            ux.action.stop(color.failure('!'));
            throw new Error('ACM not enabled for some domains');
        }
        ux.action.stop();
    }
}
