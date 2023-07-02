import React, { useState } from 'react';
import 'yup-phone';
import Step from './Step';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';
import {
	SignUpDataFirstStep,
	SignUpDataSecondStep,
	SignUpDataThirdStep,
	SignUpDataFourthStep,
} from 'data.type';

type Props = {
	onLoginClick: () => void;
};

type SignUpData = Partial<
	SignUpDataFirstStep & SignUpDataSecondStep & SignUpDataThirdStep & SignUpDataFourthStep
>;

const NUMBER_OF_STEPS = 3;

const SignUpForm = ({ onLoginClick: handleLoginClick }: Props) => {
	const [step, setStep] = useState(0);
	const [data, setData] = useState<SignUpData>();
	console.log('todo', data);
	const changeStep = (stepNumber: number, stepData: SignUpData) => {
		setData(stepData);
		if (stepNumber + 1 === NUMBER_OF_STEPS) {
			// TODO : call api
			console.log(stepData);
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
			{step === 3 && <FourthStep onSubmit={(values) => changeStep(3, values)} />}
		</div>
	);
};

export default SignUpForm;
