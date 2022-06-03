Reproduction showcasing that `useId()` doesn't work inside `<Suspense>`.

```shell
git clone git@github.com:brillout/react-bug-useId-suspense
cd react-bug-useId-suspense/
pnpm install
pnpm run dev
```

As single line:

```shell
git clone git@github.com:brillout/react-bug-useId-suspense && cd react-bug-useId-suspense/ && pnpm install && pnpm run dev
```

Go to [http://localhost:3000](http://localhost:3000) and observe the following:

1. The text `I'm lazy loaded...` never resolves to `Hello`, which is unexpected.
2. The `console.log()` logging `id: :r0:`, then `id: :r1:`, then `id: :r2:`, etc. In other words: the ID provided by `useId()` is not stable, which is unexpected. This is the root cause of why `1.` doesn't work as expected.

The following commits confirms that the root problem is indeed `useId()` not returning a stable ID when used inside `<Suspense>`.

- [359df7](https://github.com/brillout/react-bug-useId-suspense/commit/c23996864fc759df23902fc44dd59c343e359df7) which replaces `const id = useId()` with `const id = 'some-static-id'`, then `1.` works as expected.
- [ba224b](https://github.com/brillout/react-bug-useId-suspense/commit/4fb4913021e9b1ed792a5fae5880791454ba224b) replaces `<Suspense>` with `useState()` to showcase that `useId()` then works as expected (i.e. returns a stable ID). This indicates that the problem is indeed caused by using `useId()` inside `<Suspense>`.
