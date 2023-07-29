import { Tabs } from 'components';
import React, { useEffect, useState } from 'react';
import Storage from './Storage';
import PersonalInformations from './PersonalInformations';

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

type UserInfo = {
	stockageUsed: number;
	stockageTotal: number;
};

const MyAccount = () => {
	const [currentTab, setCurrentTab] = useState('personalInformations');
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [userInfo, setUserInfo] = useState<UserInfo>({
		stockageUsed: 16, //initiate to undefined
		stockageTotal: 20,
	});
	//const api = useApi();

	useEffect(() => {
		//get user info
		//api.get('/me');
	}, []); //add api to dependency array

	return (
		<main className="flex flex-col gap-8">
			<Tabs
				onTabClick={(name) => setCurrentTab(name)}
				currentTab={currentTab}
				tabItems={createTabs}
			/>
			{currentTab === 'storageOffer' && (
				<Storage stockageTotal={userInfo.stockageTotal} stockageUsed={userInfo.stockageUsed} />
			)}
			{currentTab === 'personalInformations' && <PersonalInformations />}
		</main>
	);
};

export default MyAccount;
