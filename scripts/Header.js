import { lockScroll, focusableElements, trapFocus } from './Overlay.js'

export default class Header {
	constructor() {
		this.root = document.querySelector('[data-js-header]')
		this.overlay = this.root.querySelector('[data-js-header-overlay]')
		this.button = this.root.querySelector('[data-js-header-burger-button]')
		this.media = window.matchMedia('(max-width: 767.98px)')
		this.opened = false
		this.root.classList.add('is-enhanced')
		this.button.hidden = false
		this.button.addEventListener('click', () => this.setOpen(!this.opened))
		this.overlay.addEventListener('click', (event) => {
			if (event.target.closest('a, [data-js-book]')) this.setOpen(false)
		})
		document.addEventListener('keydown', (event) => {
			if (!this.opened) return
			if (event.key === 'Escape') this.setOpen(false)
			trapFocus(event, [...focusableElements(this.overlay), this.button])
		})
		this.media.addEventListener('change', () => {
			const focusWasInside = this.overlay.contains(document.activeElement)
			const focusWasOnButton = document.activeElement === this.button
			this.setOpen(false, false)
			this.sync()
			if (this.media.matches && focusWasInside) this.button.focus()
			if (!this.media.matches && focusWasOnButton) focusableElements(this.overlay)[0]?.focus()
		})
		document.addEventListener('overlay:open', () => this.setOpen(false, false))
		this.sync()
	}

	sync() {
		this.overlay.inert = this.media.matches && !this.opened
	}

	setOpen(opened, restore = true) {
		if (opened === this.opened) return
		this.opened = opened
		this.overlay.classList.toggle('is-active', opened)
		this.button.classList.toggle('is-active', opened)
		this.button.setAttribute('aria-expanded', String(opened))
		this.button.setAttribute('aria-label', opened ? 'Close menu' : 'Open menu')
		lockScroll(this, opened)
		if (opened) {
			this.background = [...document.body.children].filter((element) => element !== this.root && !element.contains(this.root))
			this.previousInert = this.background.map((element) => element.inert)
			this.background.forEach((element) => { element.inert = true })
		} else {
			this.background?.forEach((element, index) => { element.inert = this.previousInert[index] })
		}
		this.sync()
		if (opened) focusableElements(this.overlay)[0]?.focus()
		else if (restore && this.media.matches) this.button.focus()
	}
}
