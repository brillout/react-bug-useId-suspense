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

let cache: any = {}
function LazyComponent() {
  console.log('<LazyComponent/>')
  const id = useId()
  console.log('id: ' + id)
  let entry = cache[id]
  console.log('entry: ' + entry)

  if (entry?.promise) throw entry.promise

  if (!entry) {
    entry = cache[id] ??= {}
    let resolve: Function
    const promise = new Promise((r) => (resolve = r))
    setTimeout(() => {
      delete cache[id].promise
      cache[id].done = true
      resolve()
    }, 2000)
    cache[id].promise = promise
    throw promise
  }

  return <>hello</>
}
