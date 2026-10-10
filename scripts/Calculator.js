export const calculateMetrics = ({ height, weight, age, gender, activity }) => {
	const values = [height, weight, age, activity]
	if (!values.every((value) => typeof value === 'number' && Number.isFinite(value)) ||
		height < 100 || height > 250 || weight < 30 || weight > 300 ||
		age < 18 || age > 100 || !Number.isInteger(age) ||
		![1.2, 1.375, 1.55, 1.725, 1.9].includes(activity) ||
		!['male', 'female'].includes(gender)) {
		throw new RangeError('Please use values within the displayed adult demo limits.')
	}
	const resting = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161)
	return { bmi: weight / (height / 100) ** 2, resting, daily: resting * activity }
}

export default class Calculator {
	constructor() {
		const form = document.querySelector('.calculate__form')
		const status = form.querySelector('[role="status"]')
		form.addEventListener('submit', (event) => {
			event.preventDefault()
			status.textContent = ''
			if (!form.reportValidity()) return
			try {
				const data = new FormData(form)
				const result = calculateMetrics({
					height: Number(data.get('height')), weight: Number(data.get('weight')),
					age: Number(data.get('age')), gender: data.get('gender'), activity: Number(data.get('activity'))
				})
				status.textContent = `BMI: ${result.bmi.toFixed(1)}. Estimated resting energy: ${Math.round(result.resting)} kcal/day. Estimated daily energy expenditure: ${Math.round(result.daily)} kcal/day.`
			} catch (error) {
				status.textContent = error.message
			}
		})
		for (const event of ['input', 'change']) form.addEventListener(event, () => { status.textContent = '' })
		form.querySelectorAll('[disabled]').forEach((element) => { element.disabled = false })
	}
}
