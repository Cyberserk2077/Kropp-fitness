import { lockScroll, focusableElements, trapFocus } from './Overlay.js'

export default class VideoDialog {
	constructor() {
		this.dialog = document.querySelector('#video-dialog')
		this.trigger = document.querySelector('.join-us__video-play-button')
		this.trigger.addEventListener('click', () => this.open())
		this.dialog.querySelector('[data-js-dialog-close]').addEventListener('click', () => this.dialog.close())
		this.dialog.addEventListener('keydown', (event) => trapFocus(event, focusableElements(this.dialog)))
		this.dialog.addEventListener('close', () => {
			// A queued close event must not unlock a freshly reopened dialog.
			if (this.dialog.open) return
			this.background.forEach(([element, inert]) => { element.inert = inert })
			lockScroll(this, false)
			this.returnFocus?.focus()
		})
		this.trigger.disabled = false
	}

	open() {
		if (this.dialog.open) return
		document.dispatchEvent(new Event('overlay:open'))
		this.returnFocus = document.activeElement
		// Reuse the original background snapshot if a close event is still queued.
		if (!this.background || !document.documentElement.classList.contains('is-locked')) {
			this.background = [...document.body.children].filter((element) => element !== this.dialog).map((element) => [element, element.inert])
		}
		this.background.forEach(([element]) => { element.inert = true })
		this.dialog.showModal()
		lockScroll(this, true)
		this.dialog.querySelector('button').focus()
	}
}
