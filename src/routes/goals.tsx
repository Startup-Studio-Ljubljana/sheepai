import GoalCard from "@/feature/goals/components/GoalCard";
import { Notification } from "@/feature/goals/components/Notification";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/goals")({
	component: RouteComponent,
});

function RouteComponent() {
    const goals = [
        {
          id: '1',
          title: 'Dream Vacation',
          targetAmount: 3000,
          currentAmount: 2850,
          monthlyContribution: 200,
          icon: '✈️'
        },
        {
          id: '2',
          title: 'New Laptop',
          targetAmount: 1200,
          currentAmount: 450,
          monthlyContribution: 150,
          icon: '💻'
        },
        {
          id: '3',
          title: 'New Car',
          targetAmount: 25000,
          currentAmount: 8500,
          monthlyContribution: 500,
          icon: '🚗'
        }
      ];
    
	return (
		<div className="mb-6 px-4">
      <Notification title="Reach your goals faster" description="You can use OTP funds to reach your goals faster."/>

			<h1 className="text-xl font-semibold w-full text-white mb-4 mt-8 mx-2">My Goals</h1>

			<div className="pb-24 space-y-4">
				{goals.map((goal) => <GoalCard key={goal.id} {...goal} />)}
			</div>
		</div>
	);
}
