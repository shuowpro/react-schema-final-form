import React from 'react';
import styled from 'styled-components';
import is from 'styled-is';
import formThemes from '../formThemes'


export const HeaderWrapper = styled.header`
  position: relative;
  width: 100%;
  padding: 0 12.5rem;
  background: ${props => props.theme.color.white}
  transition: all 0.24s ease;
  grid-area: header;
  box-shadow: ${props => props.theme.shadow};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Themes = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 12.5rem;
  width: 100%;
`;

export const ThemeItem = styled.li`
  cursor: pointer;
  transition: all 0.24s ease;
  &:hover {
    color: ${props => props.theme.color.secondary}
  }
  ${is('active')`
    color: ${props => props.theme.color.primary}
  `}
`;

const Header = props => {
  const {
    onClickItem,
    activeIndex,
  } = props;
  return (
    <HeaderWrapper>
      <Themes>
        {formThemes.map((formTheme, index) => (
          <ThemeItem
            key={formTheme.name}
            onClick={() => onClickItem(index)}
            active={index === activeIndex}
          >
            {formTheme.name}
          </ThemeItem>
        ))}
      </Themes>
    </HeaderWrapper>
  )
}

export default Header;