export default class PageActions {
	constructor() {
		for (const event of ['click', 'auxclick']) document.addEventListener(event, (event) => {
			if (event.target.closest('[data-demo-link]')) event.preventDefault()
		})
		const book = document.querySelector('[data-js-book]')
		book.addEventListener('click', () => {
			document.dispatchEvent(new Event('overlay:open'))
			const heading = document.querySelector('#start-here')
			heading.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' })
			heading.focus({ preventScroll: true })
		})
		book.disabled = false
		const gallery = document.querySelector('.family__body')
		gallery.addEventListener('keydown', (event) => {
			if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
			event.preventDefault()
			const left = event.key === 'Home' ? 0 : event.key === 'End' ? gallery.scrollWidth : gallery.scrollLeft + (event.key === 'ArrowRight' ? 1 : -1) * gallery.clientWidth * 0.8
			gallery.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
		})
	}
}
