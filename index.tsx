import React, { useId } from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

function App() {
  return (
    <React.Suspense fallback={<p>I'm lazy loaded...</p>}>
      <LazyComponent />
    </React.Suspense>
  )
}

let cache: { promise?: Promise<void>; done?: true } = {}
function LazyComponent() {
  console.log('<LazyComponent/>')

  // Doesn't work:
  const id = useId()
  // Works:
  //const id = 'some-static-id'

  let entry = (cache[id] ??= {})
  console.log('id:', id)
  console.log('entry:', entry)

  if (entry.promise) {
    throw entry.promise
  } else if (!entry.done) {
    let resolve: Function
    const promise = new Promise((r) => (resolve = r))
    entry.promise = promise
    setTimeout(() => {
      delete cache[id].promise
      cache[id].done = true
      resolve()
    }, 2000)
    console.log('promise:', promise)
    throw promise
  }

  return <p>Hello</p>
}
