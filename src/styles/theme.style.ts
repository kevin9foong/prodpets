// refer to this for the idea for global style theming and commons: 
// https://www.reactnative.guide/8-styling/8.1-theme-variables.html
type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export default {
	// Eva Design color theme
	'color-primary-100': '#D6E4FF',
	'color-primary-200': '#ADC8FF',
	'color-primary-300': '#84A9FF',
	'color-primary-400': '#6690FF',
	'color-primary-500': '#3366FF',
	'color-primary-600': '#254EDB',
	'color-primary-700': '#1939B7',
	'color-primary-800': '#102693',
	'color-primary-900': '#091A7A',
	'color-primary-transparent-100': 'rgba(51, 102, 255, 0.08)',
	'color-primary-transparent-200': 'rgba(51, 102, 255, 0.16)',
	'color-primary-transparent-300': 'rgba(51, 102, 255, 0.24)',
	'color-primary-transparent-400': 'rgba(51, 102, 255, 0.32)',
	'color-primary-transparent-500': 'rgba(51, 102, 255, 0.4)',
	'color-primary-transparent-600': 'rgba(51, 102, 255, 0.48)',
	'color-success-100': '#F0FCD3',
	'color-success-200': '#DFFAA8',
	'color-success-300': '#C4F27A',
	'color-success-400': '#A8E658',
	'color-success-500': '#81D626',
	'color-success-600': '#65B81B',
	'color-success-700': '#4B9A13',
	'color-success-800': '#357C0C',
	'color-success-900': '#266607',
	'color-success-transparent-100': 'rgba(129, 214, 38, 0.08)',
	'color-success-transparent-200': 'rgba(129, 214, 38, 0.16)',
	'color-success-transparent-300': 'rgba(129, 214, 38, 0.24)',
	'color-success-transparent-400': 'rgba(129, 214, 38, 0.32)',
	'color-success-transparent-500': 'rgba(129, 214, 38, 0.4)',
	'color-success-transparent-600': 'rgba(129, 214, 38, 0.48)',
	'color-info-100': '#D6F6FF',
	'color-info-200': '#AEE9FF',
	'color-info-300': '#85D7FF',
	'color-info-400': '#67C5FF',
	'color-info-500': '#35A7FF',
	'color-info-600': '#2682DB',
	'color-info-700': '#1A61B7',
	'color-info-800': '#104493',
	'color-info-900': '#0A307A',
	'color-info-transparent-100': 'rgba(53, 167, 255, 0.08)',
	'color-info-transparent-200': 'rgba(53, 167, 255, 0.16)',
	'color-info-transparent-300': 'rgba(53, 167, 255, 0.24)',
	'color-info-transparent-400': 'rgba(53, 167, 255, 0.32)',
	'color-info-transparent-500': 'rgba(53, 167, 255, 0.4)',
	'color-info-transparent-600': 'rgba(53, 167, 255, 0.48)',
	'color-warning-100': '#FFF9CC',
	'color-warning-200': '#FFF099',
	'color-warning-300': '#FFE666',
	'color-warning-400': '#FFDC3F',
	'color-warning-500': '#FFCC00',
	'color-warning-600': '#DBAA00',
	'color-warning-700': '#B78B00',
	'color-warning-800': '#936D00',
	'color-warning-900': '#7A5700',
	'color-warning-transparent-100': 'rgba(255, 204, 0, 0.08)',
	'color-warning-transparent-200': 'rgba(255, 204, 0, 0.16)',
	'color-warning-transparent-300': 'rgba(255, 204, 0, 0.24)',
	'color-warning-transparent-400': 'rgba(255, 204, 0, 0.32)',
	'color-warning-transparent-500': 'rgba(255, 204, 0, 0.4)',
	'color-warning-transparent-600': 'rgba(255, 204, 0, 0.48)',
	'color-danger-100': '#FFEBD3',
	'color-danger-200': '#FFD2A9',
	'color-danger-300': '#FFB47E',
	'color-danger-400': '#FF965D',
	'color-danger-500': '#FF6528',
	'color-danger-600': '#DB461D',
	'color-danger-700': '#B72C14',
	'color-danger-800': '#93170C',
	'color-danger-900': '#7A0807',
	'color-danger-transparent-100': 'rgba(255, 101, 40, 0.08)',
	'color-danger-transparent-200': 'rgba(255, 101, 40, 0.16)',
	'color-danger-transparent-300': 'rgba(255, 101, 40, 0.24)',
	'color-danger-transparent-400': 'rgba(255, 101, 40, 0.32)',
	'color-danger-transparent-500': 'rgba(255, 101, 40, 0.4)',
	'color-danger-transparent-600': 'rgba(255, 101, 40, 0.48)', 
	'color-light-contrast': '#fff',
	// TODO: to fix styling and colors
	'ios-system-gray-light': '#rgb(216,216,220)',
	'ios-system-blue-light': 'rgb(0,122,255)', 
	'ios-system-blue-dark': 'rgb(0,132,255)',
	// font-size themes
	mediumButtonText: {
		fontSize: 18,
		fontWeight: 'bold' as FontWeight
	}
};