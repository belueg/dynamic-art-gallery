import daisyui from 'daisyui'

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
        accent: '#657786',
        background: '#E1E8ED',
        border: '#AAB8C2',
        textPrimary: '#9013FE'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [daisyui]
}
