import { createGlobalStyle } from 'styled-components';

import githubBackGround from '../assets/github-background.svg';

export default createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  background: #f0f0f5 url(${githubBackGround}) no-repeat 70% top;/* no-repeat: para evitar que a imagem se repita*/
  -webkit-font-smoothing: antialiased; /* melhorar definição das letras*/
}

body, input, button {
  font: 16px Roboto, sans-serif /* se não achar Roboto usa a sans-serif*/
}

#root{
  max-width: 960px;
  margin: 0 auto; /* centralizar */
  padding: 40px 20px
}

button {
  cursor: pointer;
}
`;
