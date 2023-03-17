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
fieldset {
    display: block;
    margin-inline-start: 2px;
    margin-inline-end: 2px;
    padding-block-start: 0.35em;
    padding-inline-start: 0.75em;
    padding-inline-end: 0.75em;
    padding-block-end: 0.625em;
    min-inline-size: min-content;
    border-width: 2px;
    border-style: groove;
    border-color: rgb(192, 192, 192);
    border-image: initial;
}
`;
export default GlobalStyle;
