import type { FormInputData } from "@components/SocialLinks/schema/entryFormSchema";

export const registerMemberAdapter = (data: FormInputData) => {
	return {
		...data,
		stack: data?.stack?.map((item) => item.value).join(", "),
	};
};
