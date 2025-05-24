import { useState, useEffect } from "react";
import { MapPin, TrendingUp, User } from "lucide-react";
import GoalCard from "./components/GoalCard";
import { Notification } from "./components/Notification";

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

	return (
		<div className="mb-6 px-4">
			<Notification
				title="Reach your goals faster"
				description="You can use OTP funds to reach your goals faster."
			/>
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
						<section.icon className="w-4 h-4" />
						<span>{section.title}</span>
					</button>
				))}
			</div>

			<div className="pb-24 space-y-4 mt-2">
				{goals.map((goal) => (
					<GoalCard key={goal.id} {...goal} />
				))}
			</div>
		</div>
	);
};

export default Goals;
