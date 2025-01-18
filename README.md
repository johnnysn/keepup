# KeepUp

Another ToDo list app developed in [Svelte 5](https://svelte.dev/). This one makes your daily life easier by allowing you to setup recurrent tasks.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of the app:

```bash
npm run build
```

## Local storage

Local storage data example:

```json
{
	"data": [
		[
			"m659fk7q7irqaxhc2n",
			{
				"id": "m659fk7q7irqaxhc2n",
				"name": "Test recurrent",
				"description": "Crazy test for testing",
				"date": "2025-01-19T16:27:57.590Z",
				"done": true
			}
		]
	],
	"daily": [["2025-01-19", ["m659fk7q7irqaxhc2n"]]],
	"recurrent": [["Test recurrent", { "name": "Test recurrent", "description": "" }]],
	"empty": null
}
```
