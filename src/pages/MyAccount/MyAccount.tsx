import { Tabs } from 'components';
import React, { useState } from 'react';
import Storage from './Storage';
import PersonalInformations from './PersonalInformations';
import Invoices from './Invoices';

const createTabs = [
	{
		label: 'Informations personnelles',
		name: 'personalInformations',
	},
	{
		label: 'Offre de stockage',
		name: 'storageOffer',
	},
	{
		label: 'Factures',
		name: 'invoices',
	},
];

const MyAccount = () => {
	const [currentTab, setCurrentTab] = useState('personalInformations');
	//eslint-disable-next-line @typescript-eslint/no-unused-vars

	return (
		<main className="flex flex-col gap-8">
			<Tabs
				onTabClick={(name) => setCurrentTab(name)}
				currentTab={currentTab}
				tabItems={createTabs}
			/>
			{currentTab === 'storageOffer' && <Storage />}
			{currentTab === 'personalInformations' && <PersonalInformations />}
			{currentTab === 'invoices' && <Invoices />}
		</main>
	);
};

export default MyAccount;
