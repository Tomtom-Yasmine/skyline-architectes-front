import React, { useState, useEffect } from 'react';
import 'yup-phone';
import Step from './Step';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import { SignUpDataFirstStep, SignUpDataSecondStep, SignUpDataThirdStep } from 'data.type';
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';
import useApi from 'hooks/useApi';
import { useLocation } from 'react-router-dom';

type Props = {
	onLoginClick: () => void;
};

type SignUpData = Partial<SignUpDataFirstStep & SignUpDataSecondStep & SignUpDataThirdStep>;

const NUMBER_OF_STEPS = 3;

const SignUpForm = ({ onLoginClick: handleLoginClick }: Props) => {
	const auth = useAuth();
	const api = useApi();
	const [step, setStep] = useState(0);
	const [data, setData] = useState<SignUpData>();
	const location = useLocation();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const stepValue = queryParams.get('step');
		if (stepValue) setStep(+stepValue);
	}, []);
	const handleCheckout = (stockage = 20) => {
		api.post('/stripe/create-checkout-session', {
			data: {
				amount: stockage,
				price: 20,
				urlSuccess: '',
				urlFailure: '?success=false',
			},
		})
			.then((res) => {
				if (res.data.url) {
					window.location.href = res.data.url;
				}
			})
			.catch(() => {
				toast.error('Une erreur est survenue');
			});
	};

	const changeStep = async (stepNumber: number, stepData: SignUpData) => {
		setData((data) => ({ ...data, ...stepData }));
		if (stepNumber + 1 === NUMBER_OF_STEPS) {
			try {
				const res = await api.post('/signup', data);
				const { sessionToken: jwt } = res.data;
				auth?.dispatch({
					type: 'login',
					payload: {
						jwt,
						onLogin: () => {
							handleCheckout(data?.stockage);
						},
					},
				});
				toast.success('Inscription réussie');
			} catch (e) {
				toast.error('Email ou numéro de téléphone déjà utilisé');
			}
			return;
		}
		setStep(stepNumber + 1);
	};

	return (
		<div className="rounded-2xl bg-azul-500 px-8 pt-5 pb-5 flex flex-col gap-4 min-w-[32rem]">
			<h1 className="text-neutral-white text-4xl text-center font-semibold">{'Inscription'}</h1>
			<Step currentStep={step} totalSteps={NUMBER_OF_STEPS} />
			{step === 0 && (
				<FirstStep
					onLoginClick={handleLoginClick}
					onSubmit={(values) => changeStep(0, values)}
				/>
			)}
			{step === 1 && <SecondStep onSubmit={(values) => changeStep(1, values)} />}
			{step === 2 && <ThirdStep onSubmit={(values) => changeStep(2, values)} />}
		</div>
	);
};

export default SignUpForm;
