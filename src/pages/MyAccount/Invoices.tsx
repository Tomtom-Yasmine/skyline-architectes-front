import { FilesArrayHeader, FileLine } from 'components';
import { FileType, InvoiceData } from 'data.type';
import React, { useEffect, useState } from 'react';
import useApi from 'hooks/useApi';
import { toast } from 'react-toastify';

type Invoice = {
	id: string;
	slugName: string;
	displayName: string;
	serverPath: string;
	folderPath: string;
	uploadedAt: string;
	extension: string;
	sizeBytes: number;
	isPinned: boolean;
	isDeleted: boolean;
	deletedAt?: string | null; // DateTime ou null
	thumbnailPath?: string | null;
	type: FileType; // Assurez-vous d'importer le type FileType approprié
	userId: string;
	orderNumber: number;
	quantity: number;
	unitPriceExcludingTaxes: number;
	vat: number;
	createdAt: string;
	fileId: string;
};

const Invoices = () => {
	const api = useApi();

	const [sort, setSort] = useState<{
		direction: 'up' | 'down';
		column: 'name' | 'creationDate' | 'price';
	}>({
		direction: 'up',
		column: 'name',
	});

	const [invoices, setInvoices] = useState<Array<InvoiceData>>([]);

	useEffect(() => {
		api.get<{ invoices: Invoice[] }>('/invoices')
			.then((res) => {
				const invoices = res.data.invoices.map((invoice) => ({
					id: invoice.id,
					name: invoice.displayName,
					creationDate: new Date(invoice.uploadedAt),
					isPinned: invoice.isPinned,
					price: invoice.unitPriceExcludingTaxes * invoice.quantity * (1 + invoice.vat),
				}));
				if (!invoices) throw new Error('No invoices data');
				setInvoices(invoices);
			})
			.catch(() => {
				toast.error('Erreur lors de la récupération des factures');
			});
	}, [api]);

	const handleOpen = (id: string) => () => {
		api.get(`/invoice/${id}/access`)
			.then((res) => {
				const url = `${process.env.REACT_APP_API_BASE_URL}invoice/${id}/raw?accessToken=${res.data.accessToken}`;
				window.open(url, '_blank');
			})
			.catch(() => {
				toast.error('Erreur lors de la récupération de la facture');
			});
	};

	const handleDownload = (id: string) => () => {
		api.get(`/invoice/${id}/access`)
			.then((res) => {
				const url = `${process.env.REACT_APP_API_BASE_URL}invoice/${id}/download?accessToken=${res.data.accessToken}`;
				window.open(url);
			})
			.catch(() => {
				toast.error('Erreur lors du téléchargement de la facture');
			});
	};

	const createOptions = (invoiceId: string) => [
		{
			label: 'Ouvrir',
			onClick: handleOpen(invoiceId),
		},
		{
			label: 'Épingler',
			onClick: handlePin(invoiceId),
		},
		{
			label: 'Télécharger',
			onClick: handleDownload(invoiceId),
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
							url=""
							additionalInformation={`${invoice.price} €`}
							options={createOptions(invoice.id)}
							onPinClick={handlePin(invoice.id)}
							onDownloadClick={handleDownload(invoice.id)}
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
