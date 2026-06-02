import * as telemetry from '../../global_telemetry.js';
const performance_analytics = async function (options) {
    global.cliTelemetry = telemetry.setupTelemetry(this.config, options);
};
export default performance_analytics;
