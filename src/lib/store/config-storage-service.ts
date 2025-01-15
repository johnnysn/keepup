import { configSchema } from '$lib/schemas/config-schema';
import { config, updateConfig } from './config-store.svelte';

export function loadConfigFromLocalStorage() {
	const jsonData = localStorage.getItem('config');

	if (jsonData) {
		try {
			const parsedData = JSON.parse(jsonData);

			const validatedData = configSchema.parse(parsedData);

			updateConfig(validatedData);
		} catch (error) {
			console.error('Could not parse configuration from the local storage.', error);
		}
	}
}

export function saveConfigToLocalStorage() {
	const jsonData = JSON.stringify(config);
	localStorage.setItem('config', jsonData);
}
