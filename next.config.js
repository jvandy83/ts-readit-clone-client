const withReactSvg = require('next-react-svg');
const path = require('path');

module.exports = withReactSvg({
	images: {
		domains: ['encrypted-tbn0.gstatic.com'],
	},
	include: path.resolve(__dirname, 'src/images'),
	webpack(config, options) {
		return config;
	},
});
