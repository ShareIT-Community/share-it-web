/// <reference types="astro/client" />

declare module 'particles.js';

interface Window {
	particlesJS?: (tag_id: string, params: Record<string, unknown>) => void;
}
