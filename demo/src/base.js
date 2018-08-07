import { injectGlobal } from 'styled-components';

injectGlobal`
  * {
    box-sizing: border-box;
    outline: none;
    margin: 0;
    padding: 0;
  }
  html {
    width: 100%;
    height: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  body {
    width: 100%;
    height: 100%;
    font-family: 'Open Sans', sans-serif;
    line-height: 1rem;
    text-rendering: geometricPrecision;
    /* background: #333333 */
  }
  h1, h2, h3,
  h4, h5, h6 {
    text-rendering: geometricPrecision;
    margin: 0 0 0.3rem 0;
  }
  a {
    text-decoration: none;
    transition: all 0.24s ease;
  }
  a:hover {
    text-decoration: none;
  }
  pre {
    tab-size: 2;
  }
  li {
    list-style: none;
  }
`
