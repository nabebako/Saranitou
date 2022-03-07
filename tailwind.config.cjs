module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				light: {
					'background': 'rgb(225 231 239)',
					'body': 'rgb(15 23 42)',
					'button-color': 'rgb(51 65 85)',
					'button-text': 'rgb(241 245 249)',
					'border': 'rgb(15 23 42/.1)',
					'checked': '',
				},
				dark: {
					'background': 'rgb(30 41 59)',
					'body': 'rgb(203 213 225)',
					'button-color': 'rgb(148 163 184)',
					'button-text': 'rgb(30 41 59)',
					'border': 'rgb(203 213 225/.1)',
					'checked': '',
				},
				button: {
					'bg': 'rgb(51 65 85)',
					'text': 'rgb(241 245 249)',
				}
			},
			spacing: {
				'80vw': '80vw',
			},
			transitionProperty: {
				'height': 'height',
			}
		}
	},
	plugins: []
};
