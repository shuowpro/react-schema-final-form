import React from 'react';
import styled from 'styled-components';
import is from 'styled-is';
import defaultSchemas from '../defaultSchemas';

export const SchemasWrapper = styled.header`
  position: relative;
  width: 100%;
  padding: 0 20rem;
  background: ${props => props.theme.color.white}
  transition: all 0.24s ease;
  grid-area: schemas;
  box-shadow: ${props => props.theme.shadow};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Schemas = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const SchemaItem = styled.li`
  cursor: pointer;
  transition: all 0.24s ease;
  &:hover {
    color: ${props => props.theme.color.secondary}
  }
  ${is('active')`
    color: ${props => props.theme.color.primary}
  `}
`;

console.log(JSON.stringify(defaultSchemas, 0, 2))

const DefaultSchemas = props => {
  const {
    activeIndex,
    onClickItem,
  } = props;
  return (
    <SchemasWrapper>
      <Schemas>
        {defaultSchemas.map((defaultSchema, index) => (
          <SchemaItem
            key={defaultSchema.name}
            onClick={() => onClickItem(index)}
            active={index === activeIndex}
          >
            {defaultSchema.name}
          </SchemaItem>
        ))}
      </Schemas>
    </SchemasWrapper>
  );
}

export default DefaultSchemas;