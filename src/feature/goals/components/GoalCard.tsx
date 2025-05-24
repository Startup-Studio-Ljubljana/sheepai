import { Progress } from "@/components/ui/progress";

interface GoalCardProps {
	title: string;
	targetAmount: number;
	currentAmount: number;
	monthlyContribution: number;
	icon: string;
}

const GoalCard = ({
	title,
	targetAmount,
	currentAmount,
	monthlyContribution,
	icon,
}: GoalCardProps) => {
	const progressPercentage = (currentAmount / targetAmount) * 100;
	const isCloseToTarget = progressPercentage >= 95;

	return (
		<div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/20 w-full">
			<div className="flex items-center space-x-4 mb-2">
				<div className="text-4xl">{icon}</div>
				<div className="flex-1">
					<h3 className="text-lg font-semibold text-white">{title}</h3>
					<p className="text-white/70 text-sm">saving €{monthlyContribution}/month</p>
				</div>
			</div>

			<div className="space-y-1">
				<div className="flex justify-between items-center">
					<p className="text-white/70 text-xs">
						{Math.round(progressPercentage)}% complete
					</p>
					{isCloseToTarget && (
						<p className="text-green-300 text-xs font-medium">
							🎉 You are close!
						</p>
					)}
				</div>

				<Progress value={progressPercentage} className="h-3 bg-white/20" />
			</div>
		</div>
	);
};

export default GoalCard;
