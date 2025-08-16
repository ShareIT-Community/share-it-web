export interface RegistrationMemberBody {
	phone: string;
	email: string;
	firstName: string;
	lastName: string;
	discord?: string;
	country: string;
	otherCountry?: string;
	role: string;
	stack?: string;
	experience?: string;
	linkedin: string;
	github?: string;
	behance?: string;
	website?: string;
	otherNetwork?: string;
	expectations: string;
	age: number;
}

export interface RegistrationMemberResponse {
	success: boolean;
	message: string;
}