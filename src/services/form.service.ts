import type { RegistrationMemberBody, RegistrationMemberResponse } from "@models/form.model";

export const registerMember = async (body: RegistrationMemberBody): Promise<RegistrationMemberResponse> => {
	try {
		const response = await fetch("/api/appscript", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || response.statusText);
		}

		return data;
	} catch (error) {
		throw error;
	}
};