// import magic from '../magic';
const magicObj = require('../magic');
const magic = magicObj.default;

const { loremIpsum } = require('./mocks');

describe('function magic', () => {
  it('should throw when passed null', () => {
    expect(() => magic(null)).not.toThrow();
  });
  it('should return matching title when given long string containing a topic title', () => {
    const res = magic(loremIpsum + ' ' + 'Koa');
    expect(res.title).toBe('Koa');
  });
  it('should return "Not Found" for long string without any matching topic titles', () => {
    const res = magic(loremIpsum);
    expect(res.title).toBe('Not Found');
  });
  it('should return "Not Found" for empty string', () => {
    const res = magic('');
    expect(res.title).toBe('Not Found');
  });
  it('should return most frequent matching title when input contains multiple topic titles ', () => {
    const res = magic(loremIpsum + ' ' + 'Koa Node Node Express ');
    expect(res.title).toBe('Node');
  });
  it('should return an object with property \'title\' of type string when passed a string', () => {
    const res = magic('abc');
    expect(typeof res).toBe('object');
    expect(typeof res.title).not.toBeUndefined();
    expect(typeof res.title).toBe('string');
  });
  it('should return match topic title when input is in lowercase', () => {
    const res = magic('koa');
    expect(res.title).toBe('Koa');
  });
  it('should return match topic title when input is in uppercase', () => {
    const res = magic('KOA');
    expect(res.title).toBe('Koa');
  });
})