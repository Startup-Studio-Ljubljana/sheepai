import { createFileRoute } from '@tanstack/react-router'
import { Toaster, toast } from 'sonner'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(prevCount => prevCount + 1)
    toast(`Count: ${count + 1}`)
  }

  return (
    <>
      <Toaster />
      <div className="text-center">
      </div>
    </>
  )
}
