import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 *{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
 }
 body{
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
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
