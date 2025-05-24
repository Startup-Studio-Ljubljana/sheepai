import { Progress } from "@/components/ui/progress";
import { Share, Sparkles } from "lucide-react";

interface GoalCardProps {
	title: string;
	targetAmount: number;
	currentAmount: number;
	monthlyContribution: number;
	icon: string;
	onUpsellClick?: () => void;
}

const GoalCard = ({
					  title,
					  targetAmount,
					  currentAmount,
					  monthlyContribution,
					  icon,
					  onUpsellClick,
				  }: GoalCardProps) => {
	const progressPercentage = (currentAmount / targetAmount) * 100;
	const isCloseToTarget = progressPercentage >= 95;

	return (
		<div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/20 w-full">
			<div className="flex items-center space-x-4 mb-2">
				<div className="text-4xl">{icon}</div>
				<div className="flex-1">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-white">{title}</h3>
						<div className="flex gap-2">
							<button
								type="button"
								onClick={onUpsellClick}
								className="size-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
							>
								<Sparkles className="size-4 text-white" />
							</button>
							<button
								type="button"
								className="size-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
							>
								<Share className="size-4 text-white" />
							</button>
						</div>
					</div>
					<p className="text-white/70 text-sm">
						saving €{monthlyContribution.toFixed(2)}/month
					</p>
				</div>
			</div>

			<div className="space-y-1 mt-6">
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

				<Progress value={progressPercentage} className="h-3 bg-white/20 my-2" />
				<div className="flex justify-between items-center">
					<p className="text-white/70 text-xs">{currentAmount}€</p>
					<p className="text-white/70 text-xs font-medium">{targetAmount}€</p>
				</div>
			</div>
		</div>
	);
};

export default GoalCard;
