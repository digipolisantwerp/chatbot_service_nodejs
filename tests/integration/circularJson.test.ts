import * as circularJson from './../../example/helpers/circularJson';

describe('circularJson stringify', () => {
  test('works as JSON.stringify', () => {
    const o = {a: 'a', b: 'b', c: () => { /**/ }, d: {e: 123}};
    const a = circularJson.stringify(o);
    const b = JSON.stringify(o);
    expect(a).toEqual(b);
  });

  test('works with same value under multiple keys', () => {
    const dupe = { e: 123 };
    const o = {a: 'a', b: 'b', c: dupe, d: dupe};
    const a = circularJson.stringify(o);
    const b = JSON.stringify(o);
    expect(a).toEqual(b);
  });

  test('can stringify circular json', () => {
    const o = { a: 'a', b: { c: 'c', d: null } };
    const expected = { a: 'a', b: { c: 'c' } };
    o.b.d = o;
    const encoded = circularJson.stringify(o);
    const parsed = JSON.parse(encoded);
    expect(parsed).toEqual(expected);
  });
});
