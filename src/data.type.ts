export type User = {
	email: string;
	role: Role;
};

type Role = 'user' | 'admin';

//Authentication
export type SignUpDataFirstStep = {
	lastName: string;
	firstName: string;
	email: string;
	phoneNumber: string;
	password: string;
};

export type SignUpDataSecondStep = {
	companyName: string;
	companySiret: string;
	companyAddressNumber: string;
	companyAddressStreet: string;
	companyAddressAdditional: string;
	companyAddressCity: string;
	companyAddressZipCode: string;
	companyAddressCountry: string;
};

export type SignUpDataThirdStep = {
	stockage: number;
};

export type FileData = {
	name: string;
	creationDate: Date;
	lastOpenDate: Date;
	size: number;
	id: string;
	isPinned: boolean;
	isEditing: boolean;
	url: string;
};
