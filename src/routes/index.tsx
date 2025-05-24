import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
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
        <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
          <h1>SheepAI</h1>
          <Button onClick={handleClick}>Click me</Button>
        </header>
      </div>
    </>
  )
}
