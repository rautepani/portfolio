export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        fraunces: ['"Fraunces"', 'serif'],
        spaceGrotesk: ['"Space Grotesk"', 'sans-serif'],
        jetbrainsMono: ['"JetBrains Mono"', 'monospace'],
        comic: ['"Comic Sans MS"', '"Comic Neue"', 'cursive'],
        sans: [
          '"lxgwwenkaimono"',
          '"LXGW WenKai Mono Screen"',
          '"LXGW WenKai Mono"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          '"Open Sans"',
          '"Helvetica Neue"',
          'sans-serif',
          '"JetBrains Mono"',
        ],
      },
    },
  },
  plugins: [],
};
