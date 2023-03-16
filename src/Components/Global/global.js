import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 *{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
 }
 div{
  display: block;
 }
 a {
	text-decoration: none;
 color: black;
}
`;
export default GlobalStyle;
