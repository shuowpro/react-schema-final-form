const schemas = [
  {
    name: 'Basic',
    schema: {
      type: 'object',
      properties: {
        foo: {
          type: 'string',
          title: 'Foo',
        },
      },
      required: ['foo'],
    },
    initialValues: {
      foo: 'foo',
    }
  },
  {
    name: 'Simple String Array',
    schema: {
      type: 'object',
      properties: {
        arr: {
          type: 'array',
          items: {
            type: 'string',
            title: 'foo',
          },
        },
      }
    }
  },
  {
    name: 'Simple Object Array',
    schema: {
      type: 'object',
      properties: {
        arr: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              foo: {
                type: 'string',
                title: 'Foo',
              },
              bar: {
                type: 'string',
                title: 'Bar',
              }
            }
          }
        }
      }
    }
  },
  {
    name: 'Property Order',
    schema: {
      type: 'object',
      properties: {
        foo: {
          type: 'string',
          title: 'Foo',
          propertyOrder: 5,
        },
        bar: {
          type: 'string',
          title: 'Bar',
          propertyOrder: -5,
        }
      }
    }
  }
];

export default schemas.map(item => {
  const { schema, initialValues } = item;
  const jsonifySchema = schema ? JSON.stringify(schema, 0, 2) : "{}";
  const jsonifyInitialValues = initialValues ? JSON.stringify(initialValues, 0, 2) : "{}"
  return {
    ...item,
    schema: jsonifySchema,
    initialValues: jsonifyInitialValues,
  }
});