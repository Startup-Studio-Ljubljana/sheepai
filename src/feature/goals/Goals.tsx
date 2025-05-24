import { useState, useEffect } from 'react';
import GoalCard from "@/feature/goals/GoalCard.tsx";

import { MapPin, TrendingUp, User } from "lucide-react";
import React from "react";
import SuggestionCard from './SuggestionCards';

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
    icon: string;
}

const goals = [
	{
		id: "1",
		title: "Dream Vacation",
		targetAmount: 3000,
		currentAmount: 2850,
		monthlyContribution: 200,
		icon: "✈️",
	},
	{
		id: "2",
		title: "New Laptop",
		targetAmount: 1200,
		currentAmount: 450,
		monthlyContribution: 150,
		icon: "💻",
	},
	{
		id: "3",
		title: "New Car",
		targetAmount: 25000,
		currentAmount: 8500,
		monthlyContribution: 500,
		icon: "🚗",
	},
];

const Goals = () => {
    const [activeSection, setActiveSection] = useState<
        "My goals" | "Recommendations" | "Shared"
    >("My goals");
    const sections = [
        {
            id: "My goals",
            title: "My goals",
            icon: MapPin,
            dataKey: "myGoals",
        },
        {
            id: "Recommendations",
            title: "Recommendations",
            icon: User,
            dataKey: "recommendations",
        },
        {
            id: "Shared",
            title: "Shared",
            icon: TrendingUp,
            dataKey: "shared",
        },
    ];
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

    const calculateTimeToGoal = (goal: Goal, additionalSavings: number = 0) => {
        const remaining = goal.targetAmount - goal.currentAmount;
        const monthlyTotal = goal.monthlyContribution + additionalSavings;
        return Math.ceil(remaining / monthlyTotal);
    };

    const [showGoalSelector, setShowGoalSelector] = useState(false);

    const selectedSuggestions = suggestions.filter(s => s.selected);
    const totalAdditionalSavings = selectedSuggestions.reduce((sum, s) => sum + s.monthlySavings, 0);

    const toggleSuggestion = (id: string) => {
        setSuggestions(prev =>
            prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s)
        );
    };

    const [goals, setGoals] = useState<Goal[]>([
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
    ]);

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

    const applySelectedSuggestions = () => {
        if (selectedSuggestions.length > 0) {
            setShowGoalSelector(true);
        }
    };

    return (
        <div className="mb-6 px-4 flex-1">

            <div className="flex justify-center space-x-2 p-4">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        type="button"
                        onClick={() =>
                            setActiveSection(section.id as "My goals" | "Recommendations" | "Shared")
                        }
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                                ${
                            activeSection === section.id
                                ? "bg-white/20 text-white backdrop-blur-sm"
                                : "bg-white/10 text-white/70 hover:bg-white/15"
                        }`}
                    >
                        <section.icon className="w-4 h-4"/>
                        <span>{section.title}</span>
                    </button>
                ))}
            </div>

            {activeSection === "My goals" && (
                <React.Fragment>
                    <h1 className="text-xl font-semibold w-full text-white mb-4 mt-8 mx-2">My Goals</h1>

                    <div className="pb-24 space-y-4">
                        {goals.map((goal) => <GoalCard key={goal.id} {...goal} />)}
                    </div>
                </React.Fragment>
            )}

            {activeSection === "Recommendations" && (
                <React.Fragment>
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

                        {selectedSuggestions && (
                            <div className="mb-6 sticky">
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                                    <h3 className="font-semibold text-green-900 mb-2">
                                        Selected Recommendations Impact
                                    </h3>
                                    <div className="space-y-2">
                                        {(() => {
                                            const equalShare = totalAdditionalSavings / goals.length;

                                            return goals.map(goal => {
                                                const originalTime = calculateTimeToGoal(goal, 0);
                                                const newTime = calculateTimeToGoal(goal, equalShare);
                                                const timeSaved = originalTime - newTime;

                                                return (
                                                    <div key={goal.id} className="flex justify-between items-center text-sm">
                                                        <span className="text-gray-700">{goal.title}</span>
                                                        <div className="text-right space-y-0.5">
                                                            {timeSaved > 0 && (
                                                                <div className="text-green-600 font-medium">
                                                                    {timeSaved} months faster
                                                                </div>
                                                            )}
                                                            <div className="text-xs text-gray-500">
                                                                +€{equalShare.toFixed(2)}/month
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            });
                                        })()}
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
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export default Goals;
