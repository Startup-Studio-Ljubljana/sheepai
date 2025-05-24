import { createFileRoute } from "@tanstack/react-router";
import Goals from "@/feature/goals/Goals.tsx";

export const Route = createFileRoute("/goals")({
	component: Goals,
});
