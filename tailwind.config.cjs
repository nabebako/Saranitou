module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					200: 'hsl(350, 69%, 75%)',
					300: 'hsl(350, 70%, 65%)'
				},
				secondary: {
					300: 'hsl(61, 67%, 65%)'
				},
				neutral: {
					100: 'hsl(300, 7%, 92%)',
					300: 'hsl(225, 9%, 64%)',
					600: 'hsl(295, 6%, 35%)',
					700: 'hsl(293, 6%, 25%)',
					
					50: '',
					200: '',
					400: '',
					500: '',
					800: '',
					900: ''
				}
			},
			spacing: {
				'80vw': '80vw',
			},
			transitionProperty: {
				'height': 'height',
				'width': 'width'
			}
		}
	},
	plugins: []
};
