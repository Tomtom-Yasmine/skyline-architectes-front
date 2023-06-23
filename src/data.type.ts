export type User = {
	email: string;
	role: Role;
};

type Role = 'user' | 'admin';
