import { createFileRoute } from '@tanstack/react-router'
import InvestmentPage from "@/feature/investments/investment.tsx";


export const Route = createFileRoute('/investments')({
    component: InvestmentPage,
})
