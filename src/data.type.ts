export type User = {
	email: string;
	role: Role;
};

type Role = 'user' | 'admin';

//Authentication
export type SignUpDataFirstStep = {
	name: string;
	firstName: string;
	email: string;
	phone: string;
	company: string;
	siret: string;
};

export type SignUpDataSecondStep = {
	addressNumber: string;
	addressStreet: string;
	addressAdditional: string;
	addressCity: string;
	addressZipCode: string;
	addressCountry: string;
};

export type SignUpDataThirdStep = {
	cardHolder: string;
	cardNumber: string;
	expirationDate: string;
	cardSecurityCode: string;
	stockage: number;
};
