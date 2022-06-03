import React, { useId, useState } from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

function App() {
  return <Counter />
}

function Counter() {
  const [count, setCount] = useState(0)
  const id = useId()
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <div>id: {id}</div>
    </>
  )
}
