import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export function formatDate(date: Date) {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is 0-indexed, so add 1
	const day = date.getDate().toString().padStart(2, '0');

	return `${year}-${month}-${day}`;
}

export function formatBasedOnLocale(date: Date) {
	const formatter = new Intl.DateTimeFormat(navigator.language, {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});
	return formatter.format(date);
}

export function downloadLocalStorageAsJson(key: string): void {
	const data = localStorage.getItem(key);

	if (data === null) {
		console.error(`No data found in localStorage with key: ${key}`);
		return;
	}

	try {
		const jsonData = JSON.parse(data);

		const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });

		const url = window.URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = `${key}.json`;

		document.body.appendChild(a);

		// Trigger the click event on the link to start the download
		a.click();

		// Clean up: remove the link from the body and revoke the URL
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	} catch (error) {
		console.error('Error parsing data or creating download:', error);
	}
}
