import { Tabs } from 'components';
import React, { useState, useEffect } from 'react';
import Storage from './Storage';
import PersonalInformations from './PersonalInformations';
import Invoices from './Invoices';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
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
	const [currentTab, setCurrentTab] = useState('');
	const location = useLocation();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const tabValue = queryParams.get('tab');
		const success = queryParams.get('success');
		if (tabValue) setCurrentTab(tabValue);
		if (success) toast.success('Votre paiement a été effectué avec succès !');
	}, []);

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
