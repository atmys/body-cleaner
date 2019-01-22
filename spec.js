const { boolean, string, object } = require('./index');

describe('Clean', () => {

  describe('when cleaning boolean', () => {

    it('should returns false with not true param', () => {
      expect(boolean(null)).toBe(false);
      expect(boolean()).toBe(false);
      expect(boolean('string')).toBe(false);
      expect(boolean(5)).toBe(false);
    });

    it('should returns true with true param', () => {
      expect(boolean(true)).toBe(true);
    });
  });

  describe('when cleaning string', () => {

    it('should return empty string with non string param', () => {
      expect(string(null)).toBe('');
      expect(string(7)).toBe('');
    });

    it('should return clean string', () => {
      expect(string('<script>alert(5)</script>')).toBe('');
      expect(string('<script>alert(5)</script>bla')).toBe('bla');
      expect(string('Hello!')).toBe('Hello!');
      expect(string('<p>Hello!<p>')).toBe('Hello!');
    });
  });

  describe('when cleaning object', () => {

    it('should return null if falsy param', () => {
      expect(object()).toBe(null);
    });

    it('should return clean object', () => {
      const cleanObj = {
        fake: false,
        time: new Date(),
        figure: 6
      };
      const diryObj = {
        $p: 'p',
        err: new Error(),
        clean: '<p></p>',
        ignore: '<p></p>'
      }
      expect(object('## Startup & Coworking')).toBe('## Startup & Coworking');
      expect(object('<script>alert(5)</script>bla')).toBe('bla');
      expect(object(['<script>alert(5)</script>bla'])).toEqual(['bla']);
      expect(object(cleanObj)).toEqual(cleanObj);
      expect(object(diryObj, { ignoreKeys: ['ignore'] })).toEqual({ err: undefined, clean: '', ignore: '<p></p>' });
    });
  });

});