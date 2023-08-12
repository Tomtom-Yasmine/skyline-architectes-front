import { FilesArrayHeader, FileLine } from 'components';
import { InvoiceData } from 'data.type';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Invoices = () => {
	const [sort, setSort] = useState<{
		direction: 'up' | 'down';
		column: 'name' | 'creationDate' | 'price';
	}>({
		direction: 'up',
		column: 'name',
	});

	const [invoices, setInvoices] = useState<Array<InvoiceData>>([
		{
			id: '1',
			name: 'Facture 1',
			creationDate: new Date(),
			price: 100,
			url: 'https://www.googl.com',
			isPinned: false,
		},
		{
			id: '2',
			name: 'Facture 2',
			creationDate: new Date(),
			price: 100,
			url: 'https://www.googe.com',
			isPinned: false,
		},
		{
			id: '3',
			name: 'Facture 3',
			creationDate: new Date(),
			price: 100,
			url: 'https://www.gogle.com',
			isPinned: false,
		},
		{
			id: '4',
			name: 'Facture 4',
			creationDate: new Date(),
			price: 100,
			url: 'https://www.oogle.com',
			isPinned: false,
		},
		{
			id: '5',
			name: 'Facture 5',
			creationDate: new Date(),
			price: 100,
			url: 'https://www.ggle.com',
			isPinned: false,
		},
		{
			id: '6',
			name: 'Facture 6',
			creationDate: new Date(),
			price: 100,
			url: 'https://wwoogle.com',
			isPinned: false,
		},
	]);

	const createOptions = (invoiceId: string) => [
		{
			label: 'Ouvrir',
			onClick: () => {
				const fileToOpen = invoices.find((invoice) => invoice.id === invoiceId);
				if (fileToOpen) {
					window.open(fileToOpen.url, '_blank');
				}
			},
		},
		{
			label: 'Epingler',
			onClick: handlePin(invoiceId),
		},
		{
			label: 'Télécharger',
			onClick: () => {
				const fileToDownload = invoices.find((invoice) => invoice.id === invoiceId);
				if (fileToDownload) {
					window.location.href = fileToDownload.url;
				}
			},
		},
		{
			label: 'Renommer',
			onClick: () => {
				const newFiles = invoices.map((invoice) => {
					if (invoice.id === invoiceId) {
						return { ...invoice, isEditing: true };
					}
					return invoice;
				});
				//todo: rename invoice in backend
				setInvoices(newFiles);
			},
		},
		{
			label: 'Supprimer',
			onClick: () => {
				const newFiles = invoices.filter((invoice) => invoice.id !== invoiceId);
				//todo: delete invoice from backend
				toast.success('Fichier supprimé avec succès');
				// else toast.error(`Impossible de supprimer la ressource`);
				setInvoices(newFiles);
			},
		},
	];

	const handlePin = (id: string) => () => {
		setInvoices(
			invoices.map((invoice) => {
				if (invoice.id === id) {
					return {
						...invoice,
						isPinned: !invoice.isPinned,
					};
				}
				return invoice;
			})
		);
	};

	const handleSort =
		(direction: 'up' | 'down', column: 'name' | 'creationDate' | 'price') =>
			(a: InvoiceData, b: InvoiceData) => {
				if (a[column] < b[column]) return direction === 'up' ? -1 : 1;
				if (a[column] > b[column]) return direction === 'up' ? 1 : -1;
				return 0;
			};

	return (
		<div className="flex flex-col bg-neutral-light py-5 px-1 rounded-3xl">
			<FilesArrayHeader
				sortDirection={sort.direction}
				columnSorted={sort.column}
				columns={[
					{
						name: 'name',
						label: 'Nom',
					},
					{
						name: 'creationDate',
						label: 'Date',
					},
					{
						name: 'price',
						label: 'Taille',
					},
				]}
				onSortChange={(direction: 'up' | 'down', column: 'name' | 'creationDate' | 'price') =>
					setSort({ direction, column })
				}
			/>

			<div className="bg-neutral-lighter w-full flex flex-col items-center ">
				{invoices.sort(handleSort(sort.direction, sort.column)).map((invoice, index) => (
					<React.Fragment key={invoice.id}>
						<FileLine
							name={invoice.name}
							isPinned={invoice.isPinned}
							date={invoice.creationDate}
							url={invoice.url}
							additionalInformation={`${invoice.price} €`}
							options={createOptions(invoice.id)}
							onPinClick={handlePin(invoice.id)}
						/>
						{invoices.length - 1 !== index && (
							<div className="border-b border-neutral-light w-[98%]" />
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default Invoices;
