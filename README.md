# Kropp Fitness

A responsive fitness landing page built with HTML, SCSS and JavaScript. The original English content, dark visual style, photography and link hover effects are preserved.

[Live demo](https://cyberserk2077.github.io/Kropp-fitness/)

## Features

- Accessible mobile navigation with keyboard controls and focus restoration
- Local session request and subscription form validation
- Adult BMI and energy expenditure calculator
- Video preview notice in an accessible dialog
- Keyboard-scrollable photo gallery
- Swiper event slider with a readable fallback when the CDN is unavailable
- Reduced motion support, visible keyboard focus and a skip link

## Run locally

Open a terminal in the project directory and start a static HTTP server:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000 in your browser. Use HTTP rather than opening `index.html` directly: JavaScript modules require a server.

## Build styles

Node.js and npm are required for SCSS development:

```bash
npm ci
npm run sass
```

For automatic rebuilding while editing:

```bash
npm run sass:watch
```

Edit files in `scss/`; commit the generated `css/main.css` alongside the sources. The committed CSS allows GitHub Pages to serve the project without a build step.

## Demonstration limits

Forms only validate details in the browser. Nothing is submitted or stored. Without JavaScript, form fields and submit buttons are disabled; content, contacts and gallery remain readable.

Links labelled “demo” preserve hover effects but do not navigate with JavaScript enabled. No destination pages are included. Without JavaScript they lead to a harmless local fragment. Email and telephone links remain active.

The video poster is included; the Play button opens a notice because no video file is connected. Swiper is loaded from a CDN; without it, all three events are shown as a list.

The calculator supports adults aged 18–100, height 100–250 cm and weight 30–300 kg. BMI is weight divided by squared height in metres. Estimated resting energy uses the [Mifflin–St Jeor equation](https://pubmed.ncbi.nlm.nih.gov/2305711/); daily expenditure multiplies this estimate by an activity factor of 1.2, 1.375, 1.55, 1.725 or 1.9. These are approximate educational demo estimates, without personal nutrition advice. Daily energy is rounded after multiplication.

No backend, real bookings, subscriptions or payment processing are included. Contact details and event dates belong to the original demonstration layout.
