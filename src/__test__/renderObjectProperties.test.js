import { isReuqired } from '../renderObjectProperties';

describe('isReuqired', () => {
  it('should return false if we have no required', () => {
    const schema = {};
    expect(isReuqired(schema, 'fieldName')).toEqual(false);
  });
  it('should return false if fieldName is not in required', () => {
    const schema = {
      required: ['fieldName'],
    };
    expect(isReuqired(schema, 'foo')).toEqual(false);
  });
  it('should return true if fieldName is in required', () => {
    const schema = {
      required: ['fieldName'],
    };
    expect(isReuqired(schema, 'fieldName')).toEqual(true);
  });
});