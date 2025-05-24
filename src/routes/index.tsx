import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Toaster, toast } from 'sonner'
import { useEffect } from "react";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
    const router = useRouter();

    useEffect(() => {
        router.navigate({ to: "/analytics" });
    }, [router]);

  return (
    <>
      <Toaster />
      <div className="text-center">
      </div>
    </>
  )
}
