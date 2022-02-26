module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 4px 5px rgba(0, 0, 0, 0.8)',
        '4xl': [
            '0 2px 3px rgba(0, 0, 0, 1)',
            '0 6px 8px rgba(0, 0, 0, 0.3)'
        ]
      },
      boxShadow: {
        '3xl': '0 4px 5px rgba(0, 0, 0, 0.6)'
      }
    },
  },
  plugins: [],
}
