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
    font-size: 62.5%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  body {
    width: 100%;
    height: 100%;
    font-family: 'Open Sans', sans-serif;
    font-size: 1.8rem;
    line-height: 1.5rem;
    text-rendering: geometricPrecision;
    /* background: #333333 */
  }
  h1, h2, h3,
  h4, h5, h6 {
    text-rendering: geometricPrecision;
    margin: 0 0 0.4rem 0;
  }
  h1 {
    font-size: 1.8rem;
  }
  h2 {
    font-size: 1.6rem;
  }
  h3 {
    font-size: 1.4rem;
  }
  h4 {
    font-size: 1.2rem;
  }
  h5 {
    font-size: 1rem;
  }
  h6 {
    font-size: 1rem;
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
