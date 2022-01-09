module.exports = {
  content: [
    './layouts/**/*.html.twig',
    './themes/**/layouts/**/*.html.twig',
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
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'markdown',
    }),
  ],
}
