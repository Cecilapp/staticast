module.exports = {
  content: [
    './layouts/**/*.html.twig',
  ],
  theme: {
    container: {
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1024px',
        xl: '1024px',
      }
    },
    extend: {
      colors: {
        primary: '#7E4EA3',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'markdown',
    }),
  ],
}
