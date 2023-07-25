import { Tabs } from 'components';
import React, { useState } from 'react';

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
		name: 'bills',
	},
];

const StorageOffer = () => {
	const [currentTab, setCurrentTab] = useState('personalInformations');

	return (
		<Tabs
			onTabClick={(name) => setCurrentTab(name)}
			currentTab={currentTab}
			tabItems={createTabs}
		/>
	);
};

export default StorageOffer;
