export const BG_COLOR = "#001111";

// Average brightness after CRT scanlines: 1 bright row + 3 dimmed rows (×0.40) per 4 = 0.55

export const SCANLINE_AVG = 0.55;

export function darkenHex(hex: string, factor: number): string {
	const n = parseInt(hex.slice(1), 16);
	const r = Math.round(((n >> 16) & 0xff) * factor);
	const g = Math.round(((n >> 8) & 0xff) * factor);
	const b = Math.round((n & 0xff) * factor);
	return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export const FADE_COLOR = darkenHex(BG_COLOR, SCANLINE_AVG);
