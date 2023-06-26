import { Button } from 'components';
import React, { useState } from 'react';
import 'yup-phone';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import { SignUpDataFirstStep } from 'data.type';

type Props = {
	onLoginClick: () => void;
};

const NUMBER_OF_STEPS = 4;

const SignUpForm = ({ onLoginClick: handleLoginClick }: Props) => {
	const [step, setStep] = useState(1);
	const [data, setData] = useState<Partial<SignUpDataFirstStep>>();
	console.log('todo', data);
	const changeStep = (stepNumber: number, stepData: SignUpDataFirstStep) => {
		setData(stepData);
		if (stepNumber === NUMBER_OF_STEPS) {
			// TODO : call api
			console.log(stepData);
			return;
		}
		setStep(stepNumber + 1);
	};
	return (
		<div className="rounded-2xl bg-azul-500 p-8 flex flex-col gap-9 min-w-[32rem]">
			<h1 className="text-neutral-white text-5xl text-center font-semibold">{'Inscription'}</h1>
			{step === 1 && (
				<FirstStep
					onLoginClick={handleLoginClick}
					onSubmit={(values) => changeStep(1, values)}
				/>
			)}
			{step === 2 && (
				<SecondStep
					onLoginClick={handleLoginClick}
					onSubmit={(values) => changeStep(2, values)}
				/>
			)}
			{/* {step === 3 && (
				<FirstStep
					onLoginClick={handleLoginClick}
					onSubmit={(values) => changeStep(1, values)}
				/>
			)}
            {step === 4 && (
				<FirstStep
					onLoginClick={handleLoginClick}
					onSubmit={(values) => changeStep(1, values)}
				/>
			)} */}
			<div className="flex flex-col gap-4">
				<Button category="secondary" onClick={() => console.log('to do')}>
					{'S\'inscrire'}
				</Button>
			</div>
		</div>
	);

	/* <div className="flex flex-col gap-3">
				<SectionTitle title="Addresse de facturation" />
				<div className="flex gap-4">
					<Input
						className="flex-1"
						category="authentication"
						label="Numéro de voie"
						name="streeNumber"
						placeholder="12"
						type="text"
						value={streetNumber}
						onChange={setStreetNumber}
						// onBlur={() => handleValidate('password')}
					/>
					<Input
						//TODO : mettre le 1er champ qui prendr 1/3 de la ligne et l'ayttre qui prend les 2/3 restants
						className="flex-1"
						category="authentication"
						label="Nom de voie"
						name="street"
						placeholder="rue de ...."
						type="text"
						value={street}
						onChange={setStreet}
						// onBlur={() => handleValidate('password')}
					/>
				</div>
				<Input
					category="authentication"
					label="Complément d'adresse"
					name="additionalAddressInfo"
					placeholder="bis, ter, lieu-dit"
					type="text"
					value={additionalAddressInfo}
					onChange={setAdditionalAddressInfo}
					// onBlur={() => handleValidate('password')}
				/>
				<Input
					category="authentication"
					label="Code postal"
					name="zipCode"
					placeholder="bis, ter, lieu-dit"
					type="text"
					value={zipCode}
					onChange={setZipCode}
					// onBlur={() => handleValidate('password')}
				/>
				<div className="flex gap-4">
					<Input
						category="authentication"
						label="Ville"
						name="city"
						placeholder="Paris"
						type="text"
						value={city}
						onChange={setCity}
						// onBlur={() => handleValidate('password')}
					/>
					<Input
						category="authentication"
						label="Pays"
						name="country"
						placeholder="France"
						type="text"
						value={country}
						onChange={setCountry}
						// onBlur={() => handleValidate('password')}
					/>
				</div> */
	/* </div> */
};

export default SignUpForm;
