export const prerender = false;

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }: { request: Request; }) => {
	const body = await request.json();
	const BASE_URL = import.meta.env.ASTRO_APP_SCRIPT_URL;

	const res = await fetch(BASE_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		return new Response(JSON.stringify({
			success: false,
			message: "Error interno en el servicio externo",
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}

	const data = await res.json();

	if (!data.success) {
		return new Response(JSON.stringify(data), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
};