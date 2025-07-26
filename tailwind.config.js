// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: {
//     files: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './pages/**/*.{js,jsx}'],
//     safelist: [
//       {
//         pattern: /col-span-(3|6|12)/,
//       },
//       {
//         pattern: /row-span-(3|6)/,
//       },
//     ],
//   },
//   theme: {
//     extend: {
//       gridTemplateColumns: {
//         12: 'repeat(12, minmax(0, 1fr))',
//       },
//     },
//   },
//   plugins: [],
// };

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // This enables font-bebas-neue as a utility class in Tailwind
        "bebas-neue": ['"Bebas Neue"', "cursive"], // second argument is fallback
      },
    },
  },
  // Add any other config as you need
};
