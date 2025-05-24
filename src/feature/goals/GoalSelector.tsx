
import { X } from 'lucide-react';

interface Goal {
    id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    monthlyContribution: number;
}

interface GoalSelectorProps {
    goals: Goal[];
    additionalSavings: number;
    onSelectGoal: (goalId: string) => void;
    onClose: () => void;
}

const GoalSelector = ({ goals, additionalSavings, onSelectGoal, onClose }: GoalSelectorProps) => {
    const calculateTimeToGoal = (goal: Goal, additionalSavings: number = 0) => {
        const remaining = goal.targetAmount - goal.currentAmount;
        const monthlyTotal = goal.monthlyContribution + additionalSavings;
        return Math.ceil(remaining / monthlyTotal);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
            <div className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                        Allocate ${additionalSavings}/month to:
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                <div className="space-y-4">
                    {goals.map(goal => {
                        const originalTime = calculateTimeToGoal(goal);
                        const newTime = calculateTimeToGoal(goal, additionalSavings);
                        const timeSaved = originalTime - newTime;
                        const progress = (goal.currentAmount / goal.targetAmount) * 100;

                        return (
                            <button
                                key={goal.id}
                                onClick={() => onSelectGoal(goal.id)}
                                className="w-full bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-colors text-left"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                                    <div className="text-right">
                                        <div className="text-green-600 font-bold">
                                            -{timeSaved} months
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {newTime} months total
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>${goal.currentAmount.toLocaleString()}</span>
                                        <span>${goal.targetAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-green-600 h-2 rounded-full"
                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Current: ${goal.monthlyContribution}/month
                  </span>
                                    <span className="text-green-600 font-semibold">
                    New: ${goal.monthlyContribution + additionalSavings}/month
                  </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default GoalSelector;
