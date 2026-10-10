const locks = new Set()

export const lockScroll = (owner, locked) => {
	locked ? locks.add(owner) : locks.delete(owner)
	document.documentElement.classList.toggle('is-locked', locks.size > 0)
}

export const focusableElements = (root) => [...root.querySelectorAll(
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex="0"]'
)].filter((element) => !element.closest('[inert]') && element.getClientRects().length)

export const trapFocus = (event, elements) => {
	if (event.key !== 'Tab' || !elements.length) return
	const first = elements[0]
	const last = elements.at(-1)
	if (event.shiftKey && (document.activeElement === first || !elements.includes(document.activeElement))) {
		event.preventDefault()
		last.focus()
	} else if (!event.shiftKey && (document.activeElement === last || !elements.includes(document.activeElement))) {
		event.preventDefault()
		first.focus()
	}
}
