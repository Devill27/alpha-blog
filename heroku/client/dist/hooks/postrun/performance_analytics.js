import * as telemetry from '../../global_telemetry.js';
const performance_analytics = async function () {
    if (process.env.IS_HEROKU_TEST_ENV === 'true' || !global.cliTelemetry) {
        return;
    }
    const cmdStartTime = global.cliTelemetry.commandRunDuration;
    global.cliTelemetry.commandRunDuration = telemetry.computeDuration(cmdStartTime);
    global.cliTelemetry.lifecycleHookCompletion.postrun = true;
    await Reflect.get(globalThis, 'recordPromise');
};
export default performance_analytics;
