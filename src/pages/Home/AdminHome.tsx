import { Button, Card, CardBody, CardHeader, CustomerLine, SmallStatistic } from 'components';
import { User } from 'data.type';
import { useApi } from 'hooks';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type Stats = {
	users: number;
	files: number;
};

const AdminHome = () => {
	const navigate = useNavigate();
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
			<Card>
				<CardBody>
					<div className="flex justify-between gap-3">
						<SmallStatistic
							label="clients inscrits"
							value={stats?.users.toString() ?? '0'}
							className="grow shrink-0"
						/>
						<SmallStatistic
							label="fichiers déposés"
							value={stats?.files.toString() ?? '0'}
							className="grow shrink-0"
						/>
					</div>
					<Button
						className="w-1/4"
						category="secondary"
						onClick={() => {
							navigate('/statistics');
						}}
					>
						Voir les statistiques
					</Button>
				</CardBody>
			</Card>

			<div className="flex flex-col bg-neutral-light py-5 px-1 rounded-3xl">
				<header className="grid grid-cols-5 pb-4 w-full relative">
					<div className="col-span-1">Prénom</div>
					<div className="col-span-1">Nom de famille</div>
					<div className="col-span-1">{"Date d'inscription"}</div>
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
								onClick={() => navigate(`/customers/${customer.id}`)}
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
