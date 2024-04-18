# JSON to Typescript converter

This is a simple NextJS project that converts JSON objects into a naive TypeScript type.

Try it out at [json-ts.vercel.app](https://json-ts.vercel.app/)

### Some caveats

- It does not try to break out repeating types into their own types - it will simply print them multiple times.
- It does not try to identify hard coded string values, it simply assigns the value "string"

## Developing

If you'd like to contribute or run this locally, first, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3007](http://localhost:3007) with your browser to see the result.

Most of the code is in the [`lib/convertObjectToTs.ts`](https://github.com/shaneosullivan/object_to_ts/blob/main/lib/convertObjectToTs.ts) file.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Improvements welcome!

If you find any issues with the type generation, pull requests are very welcome in [the Github repo](https://github.com/shaneosullivan/object_to_ts)!
