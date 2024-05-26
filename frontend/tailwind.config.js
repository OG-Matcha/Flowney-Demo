/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './components/**/*.{vue,js,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './composables/**/*.{js,ts}',
      './plugins/**/*.{js,ts}',
      './app.{js,ts,vue}'
    ],
    theme: {
        extend: {
          colors: {
            bgcolor: "#212121",
            title: "#BFBFBF",
            text: "#ECECEC",
            button: "#0386D0",
            buttonhover: "#005C90",
            input: "#171717",
            border: "#000000",
            store: "#363636",
            storehover: "#696767",
            result: "#3C3C3C"
          }
        },
      },
    plugins: []
  }