import { Button, CustomerLine } from 'components';
import { User } from 'data.type';
import { useApi } from 'hooks';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

type Stats = {
	users: number;
	files: number;
};

const AdminHome = () => {
	const api = useApi();
	const [stats, setStats] = useState<Stats>();
	const [customers, setCustomers] = useState<User[]>([]);

	useEffect(() => {
		const inititateCustomers = async () => {
			try {
				const { data } = await api.get('/customers');
				setCustomers(data.customers);
			} catch (error) {
				toast.error('Erreur lors de la récupération des clients');
			}
		};
		const inititateStats = async () => {
			try {
				const { data } = await api.get('/statistics');
				setStats({
					users: data.numberOfUsers,
					files: data.numberOfFiles,
				});
			} catch (error) {
				toast.error('Erreur lors de la récupération des statistiques');
			}
		};
		inititateStats();
		inititateCustomers();
	}, [api]);

	return (
		<main className="bg-neutral-white  gap-12 flex flex-col">
			<div className="bg-neutral-light flex flex-col gap-16 p-8 rounded-3xl">
				<div className="flex gap-8">
					<div className="flex justify-center items-center bg-neutral-white flex-1 text-center p-4 text-3xl rounded-lg">
						{stats?.users} <br /> Clients inscrits
					</div>
					<div className="flex justify-center items-center bg-neutral-white flex-1 text-center p-4 text-3xl rounded-lg">
						{stats?.files} <br /> Fichiers déposés
					</div>
				</div>
				<Button className="w-1/4" category="secondary">
					Voir les statistiques
				</Button>
			</div>

			<div className="flex flex-col bg-neutral-light py-5 px-1 rounded-3xl">
				<header className="grid grid-cols-5 pb-4 w-full relative">
					<div className="col-span-1">Prénom</div>
					<div className="col-span-1">Nom de famille</div>
					<div className="col-span-1">{'Date d\'inscription'}</div>
					<div className="col-span-1">Fichiers déposés</div>
					<div className="col-span-1">Espace de stockage utilisé</div>
				</header>
				<div className="bg-neutral-lighter w-full flex flex-col items-center ">
					{customers.map((customer, index) => (
						<React.Fragment key={customer.id}>
							<CustomerLine
								lastName={customer.lastName}
								fistName={customer.firstName}
								registerDate={new Date()}
								files={customer.numberOfFiles}
								stockageAvailable={customer.storage}
								stockageused={customer.totalUsedSizeBytes}
							/>
							{customers.length - 1 !== index && (
								<div className="border-b border-neutral-light w-[98%]" />
							)}
						</React.Fragment>
					))}
				</div>
			</div>
		</main>
	);
};

export default AdminHome;
