import { getRef, getWidget } from '../renderField';

describe('getWidget', () => {
  const theme = {
    email: 'EmailWidget',
  };
  it('should get the widget based on the widget', () => {
    const schema = {
      type: 'string',
      widget: 'widget',
      format: 'email',
    };
    expect(getWidget(schema, theme)).toEqual('widget');
  });
  it('should return the choice if we have emun', () => {
    const schema = {
      enum: ['a', 'b'],
    }
    expect(getWidget(schema, theme)).toEqual('choice');
  });
  it('should return email if we have format', () => {
    const schema = {
      type: 'string',
      format: 'email',
    };
    expect(getWidget(schema, theme)).toEqual('email');
  });
  it('should return type by default', () => {
    const schema = {
      type: 'string',
    }
    expect(getWidget(schema, theme)).toEqual('string');
  })
});

describe('getRef', () => {
  it('should get the ref', () => {
    const foo = {
      type: 'string',
    };
    const schema = {
      definitions: {
        foo: {
          type: 'string',
        },
      },
    };
    const ref = '#/definitions/foo';
    expect(getRef(ref, schema)).toEqual(foo);
  })
});