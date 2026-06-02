export declare type DeepRequired<T> = T extends object ? {
    [K in keyof T]-?: DeepRequired<T[K]>;
} : T;
declare type ResourceReference = {
    id: string;
    name: string;
};
declare type AppReference = ResourceReference;
declare type AddonReference = ResourceReference;
declare type CommonRuntimeRegion = 'eu' | 'us';
declare type PrivateSpaceRegion = 'california' | 'dublin' | 'frankfurt' | 'london' | 'montreal' | 'mumbai' | 'ohio' | 'oregon' | 'paris' | 'singapore' | 'sydney' | 'tokyo' | 'virginia';
export declare type InfoResponse = {
    addon: AddonReference;
    app: AppReference;
    created_at: string;
    features: {
        continuous_protection: {
            enabled: boolean;
        };
        credentials: {
            current_count: number;
            enabled: boolean;
        };
        data_encryption: {
            enabled: boolean;
        };
        fork: {
            enabled: boolean;
        };
        highly_available: {
            enabled: boolean;
        };
        rollback: {
            earliest_time: null | string;
            enabled: boolean;
            latest_time: null | string;
        };
    };
    forked_from: AddonReference | null;
    plan_limits: Array<PlanLimit>;
    pools: Array<PoolInfoResponse>;
    quotas: Array<Quota>;
    region: CommonRuntimeRegion | PrivateSpaceRegion;
    status: 'available' | 'migrating' | 'modifying' | 'provisioning' | 'unavailable';
    tier: 'advanced';
    version: string;
};
export declare type Quotas = {
    items: Array<Quota>;
};
export declare type Quota = {
    critical_gb: null | number;
    current_gb: null | number;
    enforcement_action: 'none' | 'notify' | 'restrict';
    enforcement_active: boolean;
    type: string;
    warning_gb: null | number;
};
declare type TableLimit = {
    current: number;
    limit: number;
    name: 'table-limit';
};
declare type ConnectionLimit = {
    current: number;
    limit: number;
    name: 'connection-limit';
};
declare type StorageLimitInGb = {
    current: number;
    limit: number;
    name: 'storage-limit-in-gb';
};
export declare type PlanLimit = ConnectionLimit | StorageLimitInGb | TableLimit;
export declare type PostgresLevelInfo = {
    connection_limit: number;
    memory_in_gb: number;
    name: string;
    vcpu: number;
};
export declare type PostgresLevelsResponse = {
    items: Array<PostgresLevelInfo>;
};
declare type BaseChange = {
    current: boolean | null | number | string;
    name: string;
    previous: boolean | null | number | string;
};
declare type PoolChange = {
    pool: string;
} & BaseChange;
export declare type ScaleResponse = {
    changes: Array<PoolChange>;
};
declare type SettingsChange = BaseChange;
export declare type SettingsChangeResponse = {
    changes: Array<SettingsChange>;
};
export declare type SettingsResponse = {
    items: Array<{
        current: boolean | null | number | string;
        default: boolean | null | number | string;
        name: string;
        reboot_required: boolean;
    }>;
};
export declare type CreatePoolParameters = {
    count: number;
    level: string;
    name?: string;
};
export declare type ComputeInstance = {
    id: string;
    level: string;
    name: string;
    role: string;
    status: string;
    updated_at: string;
};
export declare type ConnectionEndpoint = {
    host: string;
    port: number;
    status: 'available' | 'degraded' | 'deprovisioning' | 'modifying';
};
export declare type PoolInfoResponse = {
    compute_instances: Array<ComputeInstance>;
    connections_used: null | number;
    endpoints: Array<ConnectionEndpoint>;
    expected_connection_limit: number;
    expected_count: number;
    expected_level: string;
    id: string;
    metrics_sources: {
        cluster: null | string;
        database: null | string;
        leader: null | string;
    };
    name: string;
    status: 'available' | 'modifying' | 'provisioning' | 'unknown';
    wait_status: {
        message: null | string;
        waiting: boolean;
    };
};
export declare type CredentialsInfo = {
    items: Array<AdvancedCredentialInfo>;
};
export declare type CredentialInfo = AdvancedCredentialInfo | NonAdvancedCredentialInfo;
export interface AdvancedCredentialInfo extends Record<string, unknown> {
    database: string;
    host: string;
    id: string;
    name: string;
    port: string;
    roles: Array<{
        password: string;
        state: string;
        user: string;
    }>;
    state: string;
    type: 'additional' | 'owner';
}
export declare function isAdvancedCredentialInfo(credential: CredentialInfo): credential is AdvancedCredentialInfo;
export declare type PricingInfo = {
    billing_period: 'month';
    billing_unit: 'compute' | 'gigabyte';
    included_units?: number;
    product_description: string;
    rate: number;
};
export declare type TierPricingInfo = Record<string, PricingInfo>;
export declare type PricingInfoResponse = Record<string, TierPricingInfo>;
declare type NonAdvancedCredentialState = 'active' | 'archived' | 'enabling' | 'revoked' | 'revoking';
declare type NonAdvancedCredential = {
    connections?: null | number;
    password: string;
    state: NonAdvancedCredentialState;
    user: string;
};
declare type NonAdvancedCredentialStoreState = 'active' | 'archived' | 'provisioning' | 'revoking' | 'rotating' | 'rotation_completed' | 'wait_for_provisioning';
export interface NonAdvancedCredentialInfo extends Record<string, unknown> {
    credentials: Array<NonAdvancedCredential>;
    database: string;
    host: string;
    name: string;
    port: string;
    state: NonAdvancedCredentialStoreState;
    uuid: string;
}
export declare type ExtendedPostgresLevelInfo = {
    pricing: PricingInfo | undefined;
} & PostgresLevelInfo;
export declare type Maintenance = {
    'addon': {
        'attachments': string[];
        'kind': string;
        'name': string;
        'plan': string;
        'uuid'?: string;
        'window': null | string;
    };
    'app': {
        'name': string;
        'uuid'?: string;
    };
    'completed_at': null | string;
    'duration_seconds': null | string;
    'method': string;
    'previously_scheduled_for': null | string;
    'reason': string;
    'required_by': null | string;
    'scheduled_for': null | string;
    'server_created_at': string;
    'started_at': null | string;
    'status': MaintenanceStatus;
    'window': null | string;
};
export declare type Window = {
    previous_window: null | string;
    previously_scheduled_at: null | string;
    scheduled_at: null | string;
    window: null | string;
};
export declare enum MaintenanceStatus {
    completed = "completed",
    none = "none",
    pending = "pending",
    preparing = "preparing",
    ready = "ready",
    running = "running"
}
export declare type WaitStatus = {
    message: null | string;
    waiting: boolean;
};
export {};
