import React from 'react';
import cn from 'classnames';

type Props = {
	currentStep: number;
	totalSteps: number;
};

const Step = ({ currentStep, totalSteps }: Props) => {
	return (
		<div className="flex flex-row mx-auto w-fit gap-1">
			{new Array(totalSteps).fill(0).map((_, step) => (
				<div
					className={cn('rounded-full w-2 h-2', {
						'bg-white': step === currentStep,
						'bg-azul-300': step !== currentStep,
					})}
					key={step}
				/>
			))}
		</div>
	);
};

export default Step;
