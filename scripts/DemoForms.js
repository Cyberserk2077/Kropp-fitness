export default class DemoForms {
	constructor() {
		document.querySelectorAll('[data-js-demo-form]').forEach((form) => {
			const status = form.querySelector('[role="status"]')
			const name = form.querySelector('[name="name"]')
			const validateName = () => name?.setCustomValidity(name.value.trim() ? '' : 'Please enter your name.')
			form.addEventListener('submit', (event) => {
				event.preventDefault()
				validateName()
				if (!form.reportValidity()) return
				status.textContent = 'Demo check complete. Your details are valid; nothing has been sent or stored.'
			})
			form.addEventListener('input', () => {
				status.textContent = ''
				validateName()
			})
			form.querySelectorAll('[disabled]').forEach((element) => { element.disabled = false })
		})
	}
}
