import { createFileRoute } from '@tanstack/react-router'
import Base from "@/feature/analytics/base.tsx";


export const Route = createFileRoute('/analytics')({
    component: Base,
})
