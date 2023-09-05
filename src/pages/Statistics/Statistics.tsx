import React, { useEffect, useState } from 'react';
import useApi from 'hooks/useApi';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { GeneralStatisticsData, FilesUploadedOnPeriodStatisticsData } from 'data.type';

ChartJS.register(ArcElement, Tooltip, Legend);

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
				const filesPerUser = res.data.filesPerUser.sort((a, b) => b.value - a.value);
				const usedStorageBytesPerUser = res.data.filesPerUser.sort((a, b) => b.value - a.value);

				const data = {
					filesPerUser: {
						labels: filesPerUser.map((user) => `${user.firstName} ${user.lastName}`),
						datasets: [
							{
								label: 'Nombre de fichiers par client',
								data: filesPerUser.map((user) => user.value),
							},
						],
					},
				};
				setGeneralStatistics(data);
			})
			.catch(() => {
				toast.error('Erreur lors de la récupération des statistiques générales');
			});
	}, [api]);

	useEffect(() => {
		api.get('/statistics/files-uploaded-on-period', {
			params: {
				startDate: filesUploadedOnPeriodOptions.startDate,
				endDate: filesUploadedOnPeriodOptions.endDate,
				groupBy: filesUploadedOnPeriodOptions.groupBy,
			},
		})
			.then((res) => {
				console.log('files uploaded on period', res.data);
				setFilesUploadedOnPeriod(res.data);
			})
			.catch(() => {
				toast.error('Erreur lors de la récupération des statistiques sur les fichiers');
			});
	}, [api, filesUploadedOnPeriodOptions]);

	return (
		<div className="flex flex-col gap-16">
			{generalStatistics?.filesPerUser && <Doughnut data={generalStatistics.filesPerUser} />}
		</div>
	);
};

export default Statistics;
