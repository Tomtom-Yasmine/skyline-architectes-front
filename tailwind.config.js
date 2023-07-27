/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'azul-100': '#113757',
				'azul-300': '#194E7D',
				'azul-500': '#236DAF',
				'azul-700': '#5DA3DF',
				'azul-900': '#C9E0F4',
				'light-blue': '#71A1D0',
				'madder-100': '#460B0E',
				'madder-300': '#751217',
				'madder-500': '#A31920',
				'madder-700': '#E03841',
				'madder-900': '#EC888D',
				'neutral-darkest': '#290A0A',
				'neutral-dark': '#6E5A5B',
				'neutral-grey': '#9CA3AF',
				'neutral-light': '#E8E0DC',
				'neutral-lighter': '#F3EEEB',
				'neutral-lightest': '#F7F9FD',
				'neutral-white': '#F9FAFB',
				'action-basic': '#F3EEEB',
				'action-hover': '#E8E0DC',
			},
			gridTemplateColumns: {
				'5-1-1-1': '5fr 1fr 1fr 1fr',
			},
			backgroundImage: {
				authentication: 'url(\'assets/images/background_login.png\')',
			},
		},
	},
	plugins: [],
};
