module.exports = {
	purge: ['./src/**/*.tsx'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		container: {
			center: true,
		},
		extend: {
			fontFamily: {
				body: ['IBM Plex Sand'],
			},
			colors: {
				blue: {
					100: '#cce4f6',
					200: '#99c9ed',
					300: '#66afe5',
					400: '#3394dc',
					500: '#0079d3',
					600: '#0061a9',
					700: '#00497f',
					800: '#003054',
					900: '#00182a',
				},
			},
			spacing: {
				70: '17.5rem',
				160: '40rem',
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ['disabled'],
			borderColor: ['disabled'],
		},
	},
	plugins: [
		function ({ addComponents }) {
			addComponents({
				width: '100%',
				margin: 'auto',
				'@screen sm': { width: '640px' },
				'@screen md': { width: '768px' },
				'@screen lg': { width: '975px' },
			});
		},
	],
};
