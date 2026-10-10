export default class BannerSlider {
	constructor() {
		this.root = document.querySelector('.swiper')
		const initialize = () => {
			if (!window.Swiper || this.slider) return
			try {
				this.root.classList.add('is-enhanced')
				this.slider = new window.Swiper(this.root, {
					loop: true,
					speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300,
					pagination: {
						el: '.swiper-pagination', clickable: true,
						renderBullet: (index, className) => `<button type="button" class="${className}" aria-label="Show event ${index + 1}"></button>`
					},
					a11y: { enabled: true, paginationBulletMessage: 'Show event {{index}}' }
				})
			} catch (error) {
				this.root.classList.remove('is-enhanced')
				console.warn('Event slider unavailable; showing all events.', error)
			}
		}
		initialize()
		document.querySelector('#swiper-script').addEventListener('load', initialize, { once: true })
	}
}
