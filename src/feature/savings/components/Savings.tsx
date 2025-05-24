import GoalSelector from "@/feature/goals/GoalSelector";
import SuggestionCard from "@/feature/goals/SuggestionCards";
import { useState } from "react";

interface Suggestion {
    id: string;
    title: string;
    description: string;
    monthlySavings: number;
    category: string;
    selected: boolean;
}

interface Goal {
    id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    monthlyContribution: number;
}

export default function Savings() {
    const [totalSavings, setTotalSavings] = useState(2847);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([
        {
            id: '1',
            title: 'Cancel Netflix Subscription',
            description: 'Premium plan you rarely use',
            monthlySavings: 15.99,
            category: 'Entertainment',
            selected: false,
        },
        {
            id: '2',
            title: 'Switch to Generic Brands',
            description: 'Grocery shopping optimization',
            monthlySavings: 85,
            category: 'Groceries',
            selected: false,
        },
        {
            id: '3',
            title: 'Reduce Coffee Shop Visits',
            description: 'Make coffee at home 3x/week',
            monthlySavings: 45,
            category: 'Food & Drinks',
            selected: false,
        },
        {
            id: '4',
            title: 'Cancel Gym Membership',
            description: 'Switch to home workouts',
            monthlySavings: 89,
            category: 'Fitness',
            selected: false,
        },
        {
            id: '5',
            title: 'Reduce Uber Usage',
            description: 'Use public transport more',
            monthlySavings: 120,
            category: 'Transportation',
            selected: false,
        },
    ]);

    const [goals, setGoals] = useState<Goal[]>([
        {
            id: '1',
            title: 'Emergency Fund',
            targetAmount: 10000,
            currentAmount: 3500,
            monthlyContribution: 200,
        },
        {
            id: '2',
            title: 'Vacation to Europe',
            targetAmount: 5000,
            currentAmount: 1200,
            monthlyContribution: 150,
        },
        {
            id: '3',
            title: 'New Car Down Payment',
            targetAmount: 8000,
            currentAmount: 2200,
            monthlyContribution: 300,
        },
    ]);

    const [showGoalSelector, setShowGoalSelector] = useState(false);

    const selectedSuggestions = suggestions.filter(s => s.selected);
    const totalAdditionalSavings = selectedSuggestions.reduce((sum, s) => sum + s.monthlySavings, 0);

    const toggleSuggestion = (id: string) => {
        setSuggestions(prev =>
            prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s)
        );
    };

    const applySelectedSuggestions = () => {
        if (selectedSuggestions.length > 0) {
            setShowGoalSelector(true);
        }
    };

    const allocateToGoal = (goalId: string) => {
        setGoals(prev =>
            prev.map(g =>
                g.id === goalId
                    ? { ...g, monthlyContribution: g.monthlyContribution + totalAdditionalSavings }
                    : g
            )
        );

        setTotalSavings(prev => prev + totalAdditionalSavings);
        setSuggestions(prev => prev.map(s => ({ ...s, selected: false })));
        setShowGoalSelector(false);
    };

    const calculateTimeToGoal = (goal: Goal, additionalSavings: number = 0) => {
        const remaining = goal.targetAmount - goal.currentAmount;
        const monthlyTotal = goal.monthlyContribution + additionalSavings;
        return Math.ceil(remaining / monthlyTotal);
    };

    return (
        <div className="px-4 pb-6">
        <div className="mb-6">
            <h1 className="text-xl font-semibold w-full text-white mb-6 mt-1 mx-2">Recommended actions</h1>

            <div className="space-y-3">
                {suggestions.map(suggestion => (
                    <SuggestionCard
                        key={suggestion.id}
                        suggestion={suggestion}
                        onToggle={() => toggleSuggestion(suggestion.id)}
                    />
                ))}
            </div>
        </div>

        {selectedSuggestions.length > 0 && (
            <div className="mb-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                    <h3 className="font-semibold text-green-900 mb-2">
                        Selected Actions Impact
                    </h3>
                    <div className="space-y-2">
                        {goals.map(goal => {
                            const originalTime = calculateTimeToGoal(goal);
                            const newTime = calculateTimeToGoal(goal, totalAdditionalSavings);
                            const timeSaved = originalTime - newTime;

                            return (
                                <div key={goal.id} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-700">{goal.title}</span>
                                    <div className="text-right">
                                        <div className="text-green-600 font-medium">
                                            -{timeSaved} months faster
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            +${totalAdditionalSavings}/month
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button
                    onClick={applySelectedSuggestions}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                    Apply Selected Actions
                </button>
            </div>
        )}

        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Goals</h2>
            {goals.map(goal => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                const timeToGoal = calculateTimeToGoal(goal);

                return (
                    <div key={goal.id} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                            <span className="text-sm text-gray-600">
            {timeToGoal} months left
          </span>
                        </div>

                        <div className="mb-3">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>${goal.currentAmount.toLocaleString()}</span>
                                <span>${goal.targetAmount.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                />
                            </div>
                        </div>

                        <div className="text-sm text-gray-600">
                            Monthly contribution: ${goal.monthlyContribution}
                        </div>
                    </div>
                );
            })}
        </div>
    </div>

    {showGoalSelector && (
        <GoalSelector
            goals={goals}
            additionalSavings={totalAdditionalSavings}
            onSelectGoal={allocateToGoal}
            onClose={() => setShowGoalSelector(false)}
        />
    )}
    )
}