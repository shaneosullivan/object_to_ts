import { convertToTs } from "@/lib/convertObjectToTs";

it("should create a simple number", () => {
  expect(convertToTs(4)).toBe("number");
});

it("should create a simple string", () => {
  expect(convertToTs("foo")).toBe("string");
});

it("should create a simple Date", () => {
  expect(convertToTs(new Date())).toBe("Date");
});

it("should create a simple function", () => {
  expect(convertToTs(() => {})).toBe("(...args: unknown[]) => unknown");
});

it("should create an Array of number", () => {
  expect(convertToTs([1, 2, 3])).toBe("Array<number>");
});

it("should create an Array of string", () => {
  expect(convertToTs(["hi", "there"])).toBe("Array<string>");
});

it("should create an Array of string and number", () => {
  expect(convertToTs(["hi", 2])).toBe("Array<string | number>");
});

it("should create an Object with no fields", () => {
  expect(convertToTs({})).toBe("{}");
});

it("should create an Object with one field", () => {
  expect(convertToTs({ a: 8 })).toBe(`{
  a: number;
}`);
});

it("should create an Object with two fields", () => {
  expect(convertToTs({ a: 8, b: "str" })).toBe(`{
  a: number;
  b: string;
}`);
});

it("should create an Object with two fields, sorted alphabetically", () => {
  expect(convertToTs({ z: 8, b: "str" })).toBe(`{
  b: string;
  z: number;
}`);
});

it("should create an Object with an object field", () => {
  expect(convertToTs({ z: { foo: "bar" } })).toBe(`{
  z: {
    foo: string;
  };
}`);
});

it("should create an Object with an two nested object fields", () => {
  expect(convertToTs({ a: { b: { c: 100 } } })).toBe(`{
  a: {
    b: {
      c: number;
    };
  };
}`);
});

it("should create an Array with an object", () => {
  expect(convertToTs([{ foo: { bar: 100 } }])).toBe(`Array<{
  foo: {
    bar: number;
  };
}>`);
});

it("should create an object containing an Array with an object", () => {
  expect(convertToTs({ a: [{ foo: { bar: 100 } }] })).toBe(`{
  a: Array<{
    foo: {
      bar: number;
    };
  }>;
}`);
});
