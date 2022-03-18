module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				light: {
					'bg': 'hsl(240, 12%, 95%)',
					'body': 'hsl(295, 6%, 35%)',
				},
				dark: {
					'bg': 'hsl(295, 6%, 35%)',
					'body': 'hsl(0, 0%, 100%)',
				},
				bnt: {
					light: {
						'bg': 'hsl(295, 6%, 35%)',
						'body': 'hsl(350, 69%, 76%)',
					},
					dark: {
						'bg': 'hsl(350, 69%, 76%)',
						'body': 'hsl(295, 6%, 35%)',
					},
					'bg': 'hsl(350, 69%, 76%)',
					'body': 'hsl(295, 6%, 35%)',
					hover: {
						'bg': 'hsl(61, 66%, 64%)',
						'body': 'hsl(295, 6%, 35%)'
					}
				},
				active: {
					'bg': 'hsl(350, 69%, 76%)',
					'body': 'hsl(350, 69%, 76%)',
				},
				'border': 'hsl(225, 9%, 64%)',
				'title': 'hsl(350, 69%, 76%)',
				'border': 'hsl(225, 9%, 64%)',
				'highlight': 'hsl(61, 66%, 64%)',
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
