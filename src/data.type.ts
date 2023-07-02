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
	companyName: string;
	companySiret: string;
};

export type SignUpDataSecondStep = {
	companyAddressNumber: string;
	companyAddressStreet: string;
	companyAddressAdditional: string;
	companyAddressCity: string;
	companyAddressZipCode: string;
	companyAddressCountry: string;
};

export type SignUpDataThirdStep = {
	cardHolder: string;
	cardNumber: string;
	expirationDate: string;
	cardSecurityCode: string;
	stockage: number;
};
