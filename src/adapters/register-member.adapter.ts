import type { FormInputData } from "src/modules/home/SocialLinks/schema/entryFormSchema";

export const registerMemberAdapter = (data: FormInputData) => {
	return {
		...data,
		stack: data?.stack?.map((item) => item.value).join(", "),
	};
};
