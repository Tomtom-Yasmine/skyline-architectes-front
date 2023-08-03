import { useAuth, useOutsideClicker } from 'hooks';
import React, { useState } from 'react';
import defaultImage from 'assets/images/profile-icon.jpg';

const Profile = () => {
	const [isOpen, setOpen] = useState(false);
	const ref = useOutsideClicker(() => setOpen(false));
	const auth = useAuth();
	// const image = '';
	const options = [
		{
			name: 'Personal Information',
			label: 'Informations personnelles',
			onClick: () => {
				window.open('/myaccount?tab=personalInformations');
			},
		},
		{
			name: 'Storage Offer',
			label: 'Offre de stockage',
			onClick: () => {
				window.open('/myaccount?tab=storageOffer');
			},
		},
		{
			name: 'Invoices',
			label: 'Factures',
			onClick: () => {
				window.open('/myaccount?tab=invoices');
			},
		},
		{
			name: 'Logout',
			label: 'Déconnexion',
			onClick: () => {
				auth?.dispatch({ type: 'logout' });
			},
		},
	];
	const handleClick = () => {
		setOpen(!isOpen);
	};

	return (
		<div className="relative w-fit" ref={ref}>
			<button onClick={() => handleClick()}>
				<img className="rounded-full w-10 h-10" src={defaultImage} />
			</button>
			{isOpen && (
				<div className="absolute flex flex-col justify-center align-middle bg-neutral-light rounded-3xl drop-shadow-md right-0 top-12 w-64">
					<div className="flex justify-center align-middle p-2">
						<img className="rounded-full w-20 h-20" src={defaultImage} />
						{/* {auth.info.user} */}
					</div>
					<div className="flex flex-col p-3 gap-2">
						{options.map((option) => (
							<button
								key={option.label}
								onClick={option.onClick}
								className="p-2 hover:bg-neutral-lightest w-full text-center rounded-3xl min-w-max"
							>
								{option.label}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
