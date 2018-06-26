import buildSyncValidation, { setError } from '../buildSyncValidation';

describe('setError', () => {
  it('should set the error', () => {
    const error = {
      keyword: 'errorMessage',
      dataPath: '',
      schemaPath: '#/errorMessage',
      params: {
        errors: [
          {
            keyword: 'additionalProperties',
            dataPath: '',
            schemaPath: '#/additionalProperties',
            params: {
              additionalProperty: 'bar'
            },
            message: 'should NOT have additional properties'
          },
          {
            keyword: 'type',
            dataPath: '/foo',
            schemaPath: '#/properties/foo/type',
            params: {
              type: 'integer'
            },
            message: 'should be integer'
          }
        ]
      },
      message: 'should be an object with an integer property foo only'
    };
    const expected = {
      '': 'should be an object with an integer property foo only',
    };
    expect(setError(error, undefined, {})).toEqual(expected);
  })
});

describe('buildSyncValidation', () => {
  it('should build the validation function', () => {
    const value = {};
    const schema = {
      type: 'object',
      properties: {
        foo: {
          type: 'string',
        }
      },
      required: ['foo'],
    };
    const expectedError = {
      foo: "is a required property",
    };
    expect(buildSyncValidation(schema)(value)).toEqual(expectedError);
  });
})