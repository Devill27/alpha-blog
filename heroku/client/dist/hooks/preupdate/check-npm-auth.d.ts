import { Hook } from '@oclif/core';
/**
 * Check if user has private plugins that may require npm authentication
 */
declare const checkNpmAuth: Hook<'preupdate'>;
export default checkNpmAuth;
