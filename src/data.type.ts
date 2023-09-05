export type User = {
	id: string;
	email: string;
	role: Role;
	lastName: string;
	firstName: string;
	phoneNumber: string;
	companyName: string;
	companySiret: string;
	companyAddressNumber: string;
	companyAddressStreet: string;
	companyAddressAdditional: string;
	companyAddressCity: string;
	companyAddressZipCode: string;
	companyAddressCountry: string;
	storage: number;
	totalUsedSizeBytes: number;
	numberOfFiles: number;
	signedUpAt: Date;
};

export enum Role {
	Admin = 'ADMIN',
	User = 'USER',
}

export enum FileType {
	Invoice = 'INVOICE',
	UserFile = 'USER_FILE',
}

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
	size: number;
	id: string;
	isPinned: boolean;
	isEditing: boolean;
	url: string;
};

export type InvoiceData = {
	id: string;
	name: string;
	creationDate: Date;
	isPinned: boolean;
	price: number;
};
