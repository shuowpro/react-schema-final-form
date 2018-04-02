import compileRefs from './compileRefs';

describe('compileRefs', () => {
  it('should resolve refs', () => {
    const schema = {
      $schema: 'http://json-schema.org/draft-04/schema#',
      definitions: {
        address: {
          type: 'object',
          properties: {
            street_address: {
              type: 'string'
            },
            city: {
              type: 'string'
            },
            state: {
              type: 'string'
            }
          },
          required: [
            'street_address',
            'city',
            'state'
          ]
        }
      },
      type: 'object',
      properties: {
        billing_address: {
          $ref: '#/definitions/address'
        },
        shipping_address: {
          $ref: '#/definitions/address'
        }
      }
    }
    expect(compileRefs({schema})).toHaveProperty('properties.billing_address.type', 'object');
    expect(compileRefs({schema})).toHaveProperty('properties.billing_address.properties', {
      street_address: {
        type: 'string'
      },
      city: {
        type: 'string'
      },
      state: {
        type: 'string'
      }
    });
    expect(compileRefs({schema})).toHaveProperty('properties.shipping_address.type', 'object');
    expect(compileRefs({schema})).toHaveProperty('properties.shipping_address.properties', {
      street_address: {
        type: 'string'
      },
      city: {
        type: 'string'
      },
      state: {
        type: 'string'
      }
    });
    expect(compileRefs({
      wrapWith: '/properties/name',
    })).toEqual({});
  });
});