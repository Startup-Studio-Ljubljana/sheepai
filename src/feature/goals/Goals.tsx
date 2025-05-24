import React, { useEffect, useState } from 'react';
import GoalCard from "@/feature/goals/GoalCard.tsx";
import { AnimatePresence, motion } from 'framer-motion';

import { Goal, ListChecks, MapPin, Plus, Shield, TrendingUp, User } from "lucide-react";
import SuggestionCard from './SuggestionCards';

type UpsellService = {
    service: string;
    description: string;
    monthlyFee: number;
    added?: boolean;
};

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
    upsellServices: UpsellService[];
}

const Goals = () => {
    const [activeSection, setActiveSection] = useState<
        "My goals" | "Recommendations"
    >("My goals");
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const toggleGoalUpsell = (goal: Goal) => {
        setSelectedGoal(prev => (prev?.id === goal.id ? null : goal));
    };
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
    const sections = [
        {
            id: "My goals",
            title: "My Goals",
            icon: Goal, // represents personal objectives
            dataKey: "myGoals",
        },
        ...(suggestions.length > 0
            ? [{
                id: "Recommendations",
                title: "Recommendations",
                icon: ListChecks, // represents actionable suggestions or tasks
                dataKey: "recommendations",
            }]
            : []),
    ];
    const [totalSavings, setTotalSavings] = useState(2847);

    useEffect(() => {
        if (activeSection === "Recommendations" && suggestions.length === 0) {
            setActiveSection("My goals");
        }

        if (suggestions.length === 0) {
            sections.filter(section => section.id !== "Recommendations");
        }
    }, [suggestions, activeSection]);

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
            prev.map(s => s.id === id ? {...s, selected: !s.selected} : s)
        );
    };

    const [goals, setGoals] = useState<Goal[]>([
        {
            id: '1',
            title: 'Dream Vacation',
            targetAmount: 3000,
            currentAmount: 2850,
            monthlyContribution: 200,
            icon: '✈️',
            upsellServices: [
                { service: 'Travel Insurance', description: 'Covers trip cancellations and medical emergencies', monthlyFee: 20 },
                { service: 'Flight Deals Alert', description: 'Get notified of flight price drops', monthlyFee: 5 },
                { service: 'Lounge Access', description: 'Premium airport lounge access', monthlyFee: 15 }
            ]
        },
        {
            id: '2',
            title: 'New Laptop',
            targetAmount: 1200,
            currentAmount: 450,
            monthlyContribution: 150,
            icon: '💻',
            upsellServices: [
                { service: 'Device Insurance', description: 'Covers accidental damage and theft', monthlyFee: 12 },
                { service: 'Extended Support', description: '24/7 tech support and troubleshooting', monthlyFee: 8 },
                { service: 'Cloud Backup', description: 'Secure automatic backups for your laptop', monthlyFee: 6 }
            ]
        },
        {
            id: '3',
            title: 'New Car',
            targetAmount: 25000,
            currentAmount: 8500,
            monthlyContribution: 500,
            icon: '🚗',
            upsellServices: [
                { service: 'Auto Insurance', description: 'Comprehensive car insurance coverage', monthlyFee: 120 },
                { service: 'Auto Loan', description: 'Competitive financing rates', monthlyFee: 0 },
                { service: 'Extended Warranty', description: 'Additional protection for your vehicle', monthlyFee: 45 }
            ]
        }
    ]);

    const allocateToGoal = (goalId: string) => {
        setGoals(prev =>
            prev.map(g =>
                g.id === goalId
                    ? {...g, monthlyContribution: g.monthlyContribution + totalAdditionalSavings}
                    : g
            )
        );

        setTotalSavings(prev => prev + totalAdditionalSavings);
        setSuggestions(prev => prev.map(s => ({...s, selected: false})));
        setShowGoalSelector(false);
    };

    const applySelectedSuggestions = () => {
        if (selectedSuggestions.length > 0) {
            // Distribute savings equally to all goals
            const equalShare = totalAdditionalSavings / goals.length;

            setGoals(prev =>
                prev.map(g => ({
                    ...g,
                    monthlyContribution: g.monthlyContribution + equalShare
                }))
            );

            // Remove applied suggestions
            setSuggestions(prev => prev.filter(s => !s.selected));

            // Update total savings
            setTotalSavings(prev => prev + totalAdditionalSavings);

            // Close selector and switch to "My goals"
            setShowGoalSelector(false);
        }
    };

    const handleAddUpsell = (service: UpsellService, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedGoal) return;

        setGoals(prev =>
            prev.map(goal => {
                if (goal.id !== selectedGoal.id) return goal;

                const isAlreadyAdded = goal.upsellServices.find(s => s.service === service.service)?.added;
                if (isAlreadyAdded) return goal;

                return {
                    ...goal,
                    monthlyContribution: goal.monthlyContribution + service.monthlyFee,
                    upsellServices: goal.upsellServices.map(s =>
                        s.service === service.service ? { ...s, added: true } : s
                    )
                };
            })
        );

        setTotalSavings(prev => prev + (service.added ? 0 : service.monthlyFee));
        setSelectedGoal(null);
    };

    return (
        <div className="mb-6 px-4 flex-1">

            <div className="flex justify-center space-x-2 p-4">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        type="button"
                        onClick={() =>
                            setActiveSection(section.id as "My goals" | "Recommendations")
                        }
                        className={` flex items-center space-x-1.5 px-3 py-1.5 border border-gray-150
                                rounded-full text-sm font-medium transition-colors shadow-xs ${
                            activeSection === section.id
                                ? "bg-gray-200 border-gray-300 text-gray-900 backdrop-blur-sm"
                                : "bg-white text-gray-700 hover:bg-white/15"
                        }`}
                    >
                        <section.icon className="w-4 h-4"/>
                        <span>{section.title}</span>
                    </button>
                ))}
            </div>

            {activeSection === "My goals" && (
                <React.Fragment>
                    <h1 className="text-xl font-semibold w-full text-gray-900 mb-4 mx-2">My Goals</h1>

                    <div className="pb-24 space-y-4">
                        {goals.map(goal => (
                            <div key={goal.id}>
                                <GoalCard {...goal} onUpsellClick={() => toggleGoalUpsell(goal)} />                                <div className="flex justify-end mt-2">
                                </div>
                            </div>
                        ))}
                    </div>


                    <AnimatePresence>
                        {selectedGoal && (
                            <motion.div
                                key={selectedGoal.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                            >
                                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-4 relative">
                                    <button
                                        onClick={() => setSelectedGoal(null)}
                                        className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl leading-none"
                                    >
                                        ×
                                    </button>

                                    <h2 className="text-sm font-semibold mb-4 text-gray-800">
                                        Recommended Services for {selectedGoal.title}
                                    </h2>

                                    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                                        {selectedGoal.upsellServices.map((service, index) => (
                                            <div key={index} className="bg-gray-50 rounded-lg p-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <Shield className="w-4 h-4 text-blue-500" />
                                                        <span className="text-sm font-medium text-gray-800">{service.service}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        {service.monthlyFee > 0 && (
                                                            <span className="text-xs text-gray-600">${service.monthlyFee}/mo</span>
                                                        )}
                                                        {!service.added ? (
                                                            <button
                                                                onClick={(e) => handleAddUpsell(service, e)}
                                                                className="w-6 h-6 bg-green-600 hover:bg-green-700 text-gray-900 rounded-full flex items-center justify-center"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        ) : (
                                                            <div className="w-6 h-6 bg-gray-300 text-gray-900 rounded-full flex items-center justify-center cursor-not-allowed">
                                                                <Plus className="w-4 h-4 opacity-40" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </React.Fragment>
            )}

            {activeSection === "Recommendations" && (
                <React.Fragment>
                    <div className="pb-6 mb-[160px]">
                        <div className="mb-6">
                            <h1 className="text-xl font-semibold w-full text-gray-900 mb-6 mt-1 mx-2">Recommended
                                actions</h1>

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
                        <AnimatePresence>
                            {selectedSuggestions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="fixed bottom-[95px] left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50"
                                >
                                    <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-3 shadow-2xl shadow-black/80">
                                        <h3 className="font-semibold text-green-900 text-sm mb-2">Selected Recommendations Impact</h3>
                                        <div className="space-y-1 pb-2">
                                            {(() => {
                                                const equalShare = totalAdditionalSavings / goals.length;
                                                return goals.map(goal => {
                                                    const originalTime = calculateTimeToGoal(goal, 0);
                                                    const newTime = calculateTimeToGoal(goal, equalShare);
                                                    const timeSaved = originalTime - newTime;

                                                    return (
                                                        <div key={goal.id} className="flex justify-between items-center text-xs text-gray-700">
                                                            <span>{goal.title}</span>
                                                            <span className="text-right text-gray-600">
                                        {timeSaved > 0 && (
                                            <span className="text-green-600 font-medium mr-2">
                                                -{timeSaved} mo
                                            </span>
                                        )}
                                                                +€{equalShare.toFixed(2)}/mo
                                    </span>
                                                        </div>
                                                    );
                                                });
                                            })()}
                                        </div>

                                        <button
                                            onClick={applySelectedSuggestions}
                                            disabled={selectedSuggestions.length === 0}
                                            className={`w-full font-semibold py-2 px-3 rounded-xl transition-colors text-sm
                        ${selectedSuggestions.length === 0
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                : "bg-green-600 hover:bg-green-700 text-gray-900"
                                            }`}
                                        >
                                            Apply Selected Actions
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export default Goals;
