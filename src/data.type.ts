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
