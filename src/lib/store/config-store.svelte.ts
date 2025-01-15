import type { Config } from '$lib/types/config';

const defaultConfig: Config = {
	saveInterval: 5000
};

export let config = $state<Config>(defaultConfig);

export function updateConfig(newConfig: Config) {
	Object.assign(config, newConfig);
}
