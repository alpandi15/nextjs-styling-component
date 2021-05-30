import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
@tailwind base;
@tailwind components;
@tailwind utilities;

// @font-face {
//   font-family: noorehira;
//   src: url(/noorehira.ttf);
// }

html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  background-color: #f5f5f5;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
  font-family: "Poppins";
}

#__next {
  height: 100%;
}

.waves-effect {
  position: relative;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  user-select: none;
  vertical-align: middle;
  z-index: 1;
  transition: .3s ease-out;
}
`