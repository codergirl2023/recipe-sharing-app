module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        noto: ['Noto', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
      },
    },
  },
  plugins: [],
};
