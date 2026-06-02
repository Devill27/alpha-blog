import * as telemetry from '../../global_telemetry.js';
const performance_analytics = async function () {
    global.cliTelemetry = telemetry.reportCmdNotFound(this.config);
};
export default performance_analytics;
