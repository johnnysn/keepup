import { z } from 'zod';

export let configSchema = z.object({
	saveInterval: z.number().min(500).max(600000)
});
