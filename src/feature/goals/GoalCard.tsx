import { Progress } from "@/components/ui/progress";
import { Share, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card.tsx";

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
        <Card
            key={title}
            className="transition-all duration-200 pt-3 pb-4 px-5 rounded-xl"
        >
            <div className="flex items-center space-x-4 mb-2">
                <div className="text-4xl">{icon}</div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onUpsellClick}
                                className="size-8 text-white border border-gray-300 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                                <Sparkles className="size-4 text-gray-900"/>
                            </button>
                            <button
                                type="button"
                                className="size-8  border border-gray-300 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                                <Share className="size-4 text-gray-900"/>
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-900 text-sm">
                        saving €{monthlyContribution.toFixed(2)}/month
                    </p>
                </div>
            </div>

            <div className="space-y-1 mt-6">
                <div className="flex justify-between items-center">
                    <p className="text-gray-900 text-xs">
                        {Math.round(progressPercentage)}% complete
                    </p>
                    {isCloseToTarget && (
                        <p className="text-gray-900 text-xs font-medium">
                            🎉 You are close!
                        </p>
                    )}
                </div>

                <Progress value={progressPercentage} className="h-3 bg-gray-300 my-2"/>
                <div className="flex justify-between items-center">
                    <p className="text-gray-900 text-xs">{currentAmount}€</p>
                    <p className="text-gray-900 text-xs font-medium">{targetAmount}€</p>
                </div>
            </div>
        </Card>
    );
};

export default GoalCard;
