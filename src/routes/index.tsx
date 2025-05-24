import { createFileRoute } from '@tanstack/react-router'
import { Toaster, toast } from 'sonner'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <Toaster />
      <div className="text-center">
      </div>
    </>
  )
}
