import { createFileRoute } from '@tanstack/react-router'
import RewardsInterface from '@/feature/points/components/points'
export const Route = createFileRoute('/points')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RewardsInterface /> 
}
