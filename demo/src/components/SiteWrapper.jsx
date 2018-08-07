import styled from 'styled-components';

const SiteWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: grid;
  overflow-x: hidden;
  transition: all 0.24s ease;
  z-index: 1000;
  grid-template-areas:
    'header'
    'schemas'
    'main';
  grid-template-rows: 3rem 3rem 1fr;
`;

export default SiteWrapper;
