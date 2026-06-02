import { APIClient } from '@heroku-cli/command';
import { TelemetryDrain } from '../types/telemetry.js';
export declare function validateAndFormatSignals(signalInput: string | undefined): string[];
export declare function displayTelemetryDrain(telemetryDrain: TelemetryDrain, heroku: APIClient): Promise<void>;
