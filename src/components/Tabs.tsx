import React from 'react';
import cn from 'classnames';

type Props = {
	tabItems: Array<{ label: string; name: string }>;
	currentTab: string;
	onTabClick: (tabName: string) => void;
};
const Tabs = ({ tabItems, currentTab, onTabClick: handleTabClick }: Props) => {
	return (
		<div className="flex flex-row gap-7 border-b-4 py-2 border-solid border-azul-100 mr-32">
			{tabItems.map((tab) => (
				<button
					onClick={() => handleTabClick(tab.name)}
					className={cn({
						'text-azul-100': currentTab === tab.name,
						'text-neutral-grey hover:text-neutral-600': currentTab !== tab.name,
					})}
					key="tab.name"
				>
					{tab.label}
				</button>
			))}
		</div>
	);
};

export default Tabs;
