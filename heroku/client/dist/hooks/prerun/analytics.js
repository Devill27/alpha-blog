import Analytics from '../../analytics.js';
import * as telemetry from '../../global_telemetry.js';
const analytics = async function (options) {
    if (process.env.IS_HEROKU_TEST_ENV === 'true') {
        return;
    }
    global.cliTelemetry = telemetry.setupTelemetry(this.config, options);
    const analytics = new Analytics(this.config);
    Reflect.set(globalThis, 'recordPromise', analytics.record(options));
};
export default analytics;
