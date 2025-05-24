import SpendingChart from "@/feature/analytics/SpendingChart.tsx";
import BudgetWidget from "@/feature/analytics/BudgetWidget.tsx";
import { useMemo } from "react";
import data from "../../../bank_account_data.json";
import { parseISO, subDays, isAfter } from "date-fns";
import SuggestionCard from "../goals/SuggestionCards";
import { ArrowLeft, ChevronRight, ChevronsDown, ChevronsRight } from "lucide-react";

const Base = () => {
	const last30DaysData = useMemo(() => {
		const today = new Date();
		const cutoff = subDays(today, 30);
		const dailyTotals: Record<number, number> = {};

		data.transactions.forEach((tx) => {
			const date = parseISO(tx.date);
			if (tx.amount < 0 && isAfter(date, cutoff)) {
				const day = date.getDate();
				dailyTotals[day] = (dailyTotals[day] || 0) + Math.abs(tx.amount);
			}
		});

		return Object.entries(dailyTotals).map(([day, amount]) => ({
			day: Number(day),
			amount: Number(amount.toFixed(2)),
		}));
	}, []);

	const suggestions = [
		{
			id: "1",
			title: "Switch to Netflix Student Plan",
			description: "Switch to Student Plan and save",
			monthlySavings: 15.99,
			category: "Entertainment",
			selected: false,
		},
		{
			id: "2",
			title: "Split your utilities bill",
			description: "Check out lowest cost providers",
			monthlySavings: 85,
			category: "Utilities",
			selected: false,
		},
		{
			id: "3",
			title: "OTP Funds",
			description: "Use OTP Funds to reach your goals faster",
			monthlySavings: undefined,
			category: "Investments",
			selected: false,
		},
	];

	return (
		<div className="min-h-screen px-4 pb-10">
			<h1 className="text-xl font-semibold w-full text-white mb-6 mt-1 mx-2">
				Analytics
			</h1>
			<div className="space-y-4">
				<SpendingChart data={last30DaysData} />
				<BudgetWidget />
			</div>

			<h1 className="text-xl font-semibold w-full text-white mb-6 mt-6 mx-2">
				Saving Opportunities
			</h1>

			<div className="flex flex-col gap-4">
				{suggestions.map((suggestion) => (
					<div
						key={suggestion.id}
						className="bg-white/5 border border-white/10 backdrop-blur-md shadow-md transition-all duration-200 gap-4 pt-3 pb-4 px-6 rounded-xl"
					>
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<div className="flex items-start space-x-3">
									<div className="flex-1">
										<h3 className="font-semibold text-white mb-1 flex items-center justify-between">
											{suggestion.title}
											<ChevronRight className="w-5 h-5 text-gray-400" />
										</h3>
										<p className="text-sm text-slate-300 mb-2">
											{suggestion.description}
										</p>
										<div className="flex items-center justify-between">
											<span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
												{suggestion.category}
											</span>
											{suggestion.monthlySavings && (
											<span className="text-green-600 font-semibold">
												+${suggestion.monthlySavings}/month
											</span>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Base;
