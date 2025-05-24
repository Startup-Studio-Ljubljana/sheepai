import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import Header from "../components/Header";
import { MaxWidthWrapper } from "../components/layout/MaxWidthWrapper.tsx";

import Footer from "@/components/Footer.tsx";
import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<MaxWidthWrapper>
				<div className="min-h-screen relative overflow-hidden">
					<div className="absolute inset-0">
						<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-100/10 rounded-full blur-3xl" />
						<div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gray-200/10 rounded-full blur-2xl" />
						<div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gray-300/10 rounded-full blur-3xl" />
					</div>

					<Header />
					<div className="relative z-10 pb-20 pt-20">
						<Outlet />
					</div>
					<Footer />
				</div>
				<Footer />
			</MaxWidthWrapper>
		</>
	),
});
