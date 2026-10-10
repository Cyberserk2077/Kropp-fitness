import Header from './Header.js'
import DemoForms from './DemoForms.js'
import Calculator from './Calculator.js'
import VideoDialog from './VideoDialog.js'
import PageActions from './PageActions.js'
import BannerSlider from './BannerSlider.js'

for (const Component of [Header, DemoForms, Calculator, VideoDialog, PageActions, BannerSlider]) {
	try {
		new Component()
	} catch (error) {
		console.error(`Unable to initialize ${Component.name}`, error)
	}
}
