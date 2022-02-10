const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
    // fontFamily: {
    //   // 'serif': ['Lora'],
    //   'serif': ['Merriweather'],
    //   // 'serif': ['Noto Serif'],
    //   'sans': ['Source Sans Pro'],
    //   // 'serif': ['Source Serif Pro'],
    // }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
