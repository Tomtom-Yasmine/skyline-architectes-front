import React, { useEffect, useState } from 'react';
import useApi from 'hooks/useApi';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import {
	Chart as ChartJS,
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, SmallStatistic } from 'components';
import { GeneralStatisticsData, FilesUploadedOnPeriodStatisticsData } from 'data.type';
import { ReactComponent as ArrowForwardIcon } from 'assets/icons/arrow_forward.svg';
import { ReactComponent as ArrowBackIcon } from 'assets/icons/arrow_back.svg';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const chartBackgroundColors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'];

const periods = {
	day: {
		interval: 7,
	},
	month: {
		interval: 6,
	},
	year: {
		interval: 5,
	},
};

const getElementSize = (sizeOctet: number) => {
	const units = ['o', 'Ko', 'Mo', 'Go', 'To'];
	let size = sizeOctet;

	let unitIndex = 0;
	while (size >= 1000 && unitIndex < units.length - 1) {
		size /= 1000;
		unitIndex++;
	}

	return `${size.toFixed(2)} ${units[unitIndex]}`;
};

type FilesUploadedOnPeriodOptions = {
	startDate: Date;
	endDate: Date;
	groupBy: 'day' | 'month' | 'year';
};

const Statistics = () => {
	const [generalStatistics, setGeneralStatistics] = useState<any>({});
	const [filesUploadedOnPeriod, setFilesUploadedOnPeriod] = useState<any>({});
	const [filesUploadedOnPeriodOptions, setFilesUploadedOnPeriodOptions] =
		useState<FilesUploadedOnPeriodOptions>({
			startDate: dayjs().subtract(1, 'week').toDate(),
			endDate: new Date(),
			groupBy: 'day',
		});
	const api = useApi();

	useEffect(() => {
		api.get<GeneralStatisticsData>('/statistics')
			.then((res) => {
				console.log('general statistics', res.data);
				const sortedUsers = res.data.filesPerUser
					.sort((a, b) => b.value - a.value)
					.map((user) => user.id);
				const filesPerUser = sortedUsers.map((userId) =>
					res.data.filesPerUser.find((user) => user.id === userId)
				);
				const usedStorageBytesPerUser = sortedUsers.map((userId) =>
					res.data.usedStorageBytesPerUser.find((user) => user.id === userId)
				);

				const data = {
					...res.data,
					filesPerUser: {
						labels: filesPerUser.map((user) => `${user!.firstName} ${user!.lastName}`),
						datasets: [
							{
								label: 'Nombre de fichiers déposés',
								data: filesPerUser.map((user) => user!.value),
								backgroundColor: chartBackgroundColors,
							},
						],
					},
					usedStorageBytesPerUser: {
						labels: usedStorageBytesPerUser.map(
							(user) => `${user!.firstName} ${user!.lastName}`
						),
						datasets: [
							{
								label: 'Espace de stockage utilisé (en Go)',
								data: usedStorageBytesPerUser.map((user) => user!.value / 1_000_000_000),
								backgroundColor: chartBackgroundColors,
							},
						],
					},
				};
				setGeneralStatistics(data);
				console.log('data', data);
			})
			.catch(() => {
				toast.error('Erreur lors de la récupération des statistiques générales');
			});
	}, [api]);

	useEffect(() => {
		api.get<FilesUploadedOnPeriodStatisticsData>('/statistics/files-uploaded-on-period', {
			params: {
				startDate: filesUploadedOnPeriodOptions.startDate,
				endDate: filesUploadedOnPeriodOptions.endDate,
				groupBy: filesUploadedOnPeriodOptions.groupBy,
			},
		})
			.then((res) => {
				console.log('files uploaded on period', res.data);
				setFilesUploadedOnPeriod(res.data.filesGroupedByDate);
			})
			.catch(() => {
				toast.error('Erreur lors de la récupération des statistiques sur les fichiers');
			});
	}, [api, filesUploadedOnPeriodOptions]);

	const averageFilesPerUser =
		generalStatistics.filesPerUser?.datasets[0].data.reduce(
			(acc: number, value: number) => acc + value,
			0
		) / generalStatistics.filesPerUser?.datasets[0].data.length;
	const averageUsedStorageBytesPerUser =
		generalStatistics.usedStorageBytesPerUser?.datasets[0].data.reduce(
			(acc: number, value: number) => acc + value,
			0
		) / generalStatistics.usedStorageBytesPerUser?.datasets[0].data.length;

	return (
		<main className="bg-neutral-white gap-12 flex flex-col">
			<Card>
				<CardBody>
					<div className="flex justify-between gap-3">
						<SmallStatistic
							label="clients inscrits"
							value={generalStatistics.numberOfUsers}
							className="grow shrink-0"
						/>
						<SmallStatistic
							label="fichiers déposés"
							value={generalStatistics.numberOfFiles}
							className="grow shrink-0"
						/>
					</div>
				</CardBody>
			</Card>
			{generalStatistics.filesPerUser && (
				<Card>
					<CardHeader>
						<div className="flex gap-2 w-full justify-between">
							<span className="text-xl">Nombre de fichiers par client</span>
							<span className="text-2xl">{averageFilesPerUser} en moyenne</span>
						</div>
					</CardHeader>
					<CardBody>
						<div className="bg-neutral-lighter h-96 rounded-2xl">
							<Doughnut
								data={generalStatistics.filesPerUser}
								options={{
									responsive: true,
									maintainAspectRatio: false,
								}}
							/>
						</div>
					</CardBody>
				</Card>
			)}
			{generalStatistics.usedStorageBytesPerUser && (
				<Card>
					<CardHeader>
						<div className="flex gap-2 w-full justify-between">
							<span className="text-xl">Espace de stockage utilisé par client</span>
							<span className="text-2xl">
								{getElementSize(averageUsedStorageBytesPerUser)} en moyenne
							</span>
						</div>
					</CardHeader>
					<CardBody>
						<div className="bg-neutral-lighter h-96 rounded-2xl">
							<Doughnut
								data={generalStatistics.usedStorageBytesPerUser}
								options={{
									responsive: true,
									maintainAspectRatio: false,
								}}
							/>
						</div>
					</CardBody>
				</Card>
			)}
			<Card>
				<CardHeader>
					<div className="flex gap-2 w-full justify-between">
						<span className="text-xl">
							{'Fichiers déposés '}
							<select
								className="text-xl"
								onChange={(event) => {
									setFilesUploadedOnPeriodOptions((options) => ({
										groupBy: event.target.value as 'day' | 'month' | 'year',
										endDate: options.endDate,
										startDate: dayjs(options.endDate)
											.subtract(
												periods[event.target.value as 'day' | 'month' | 'year']
													.interval,
												event.target.value as 'day' | 'month' | 'year'
											)
											.toDate(),
									}));
								}}
							>
								<option value="day">en une journée</option>
								<option value="month">en un mois</option>
								<option value="year">en un an</option>
							</select>
						</span>
						<span className="text-2xl">
							{Object.values(
								filesUploadedOnPeriod as {
									count: number;
									sizeBytes: number;
								}[]
							).reduce((acc, item) => acc + item.count, 0)}
						</span>
					</div>
					<div className="flex gap-2">
						<button
							className="flex items-center gap-1"
							onClick={() => {
								setFilesUploadedOnPeriodOptions((options) => ({
									...options,
									startDate: dayjs(options.startDate)
										.subtract(1, options.groupBy)
										.toDate(),
									endDate: dayjs(options.endDate).subtract(1, options.groupBy).toDate(),
								}));
							}}
						>
							<ArrowBackIcon />
						</button>
						<span className="text-xl">
							{dayjs(filesUploadedOnPeriodOptions.startDate).format('DD/MM/YYYY')}
							{' — '}
							{dayjs(filesUploadedOnPeriodOptions.endDate).format('DD/MM/YYYY')}
						</span>
						<button
							className="flex items-center gap-1"
							onClick={() => {
								setFilesUploadedOnPeriodOptions((options) => ({
									...options,
									startDate: dayjs(options.startDate).add(1, options.groupBy).toDate(),
									endDate: dayjs(options.endDate).add(1, options.groupBy).toDate(),
								}));
							}}
						>
							<ArrowForwardIcon />
						</button>
					</div>
				</CardHeader>
				<CardBody>
					<div className="bg-neutral-lighter h-96 rounded-2xl">
						<Bar
							data={{
								labels: Object.keys(filesUploadedOnPeriod),
								datasets: [
									{
										label: 'Nombre de fichiers déposés',
										data: Object.values(
											filesUploadedOnPeriod as {
												count: number;
												sizeBytes: number;
											}[]
										).map((item) => item.count),
										backgroundColor: chartBackgroundColors,
									},
								],
							}}
							options={{
								responsive: true,
								maintainAspectRatio: false,
							}}
						/>
					</div>
				</CardBody>
			</Card>
		</main>
	);
};

export default Statistics;
