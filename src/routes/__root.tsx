import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import Header from '../components/Header'
import { MaxWidthWrapper } from '../components/layout/MaxWidthWrapper.tsx'


import Footer from '@/components/Footer.tsx'
import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <MaxWidthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="relative z-10 pb-20 pt-20 overflow-y-auto">
        <Outlet />
      </div>
      <Footer />
      </div>

      {/* Bottom Navigation */}
    <Footer />
      </MaxWidthWrapper>
      {/* <TanStackRouterDevtools /> */}

      {/* <TanStackQueryLayout /> */}
    </>
  ),
})
