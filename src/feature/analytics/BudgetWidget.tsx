import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

type InsightData = {
	summary: string;
	chartData: { label: string; value: number }[];
};

// Mock API function - replace with your actual API call
const getResponse = (prompt: string, days: number) => {
	return {
		choices: [
			{
				message: {
					content: JSON.stringify({
						summary:
							"Your biggest spending categories this week were groceries (€145), dining out (€89), and transportation (€67). Consider reducing dining expenses to improve your budget.",
						chartData: [
							{ label: "Groceries", value: 145 },
							{ label: "Dining", value: 89 },
							{ label: "Transport", value: 67 },
							{ label: "Entertainment", value: 45 },
							{ label: "Shopping", value: 32 },
						],
					}),
				},
			},
		],
	};
};

const BudgetWidget = () => {
	const [insight, setInsight] = useState<InsightData | null>(null);

	async function analyze() {
		setInsight(null);

		try {
			const res = getResponse(
				`Analyze my spendings for the last 7 days. Respond in JSON format like this:\n{ summary: string, chartData: [{ label: string, value: number }] } (limit to 5 top categories)`,
				7,
			);
			const raw = res.choices[0]?.message?.content || "{}";
			const clean = raw.replace(/```json|```/g, "").trim();
			const parsed = JSON.parse(clean);
			setInsight(parsed);
		} catch (err) {
			setInsight({ summary: "Error analyzing spendings.", chartData: [] });
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		analyze();
	}, []);

	return (
		<Card className="bg-white/5 border border-white/10 backdrop-blur-md shadow-md transition-all duration-200 gap-4 pt-8 pb-4 px-6">
			<div className="text-slate-400 text-sm mb-2 absolute left-7 top-4">
				Split
			</div>
			{insight?.chartData?.length && insight?.chartData?.length > 0 && (
				<div className="flex gap-10 mx-auto">
					{/* Pie Chart */}
					<div className="size-28">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={insight.chartData.slice(0, 5)}
									dataKey="value"
									nameKey="label"
									cx="50%"
									cy="50%"
									innerRadius={37}
									outerRadius={55}
									paddingAngle={3}
									cornerRadius={5}
									stroke="rgba(148, 163, 184, 0.2)"
									strokeWidth={1}
								>
									{insight.chartData.slice(0, 5).map((entry, index) => (
										<Cell
											key={`cell-${entry.label}`}
											fill={COLORS[index % COLORS.length]}
											fillOpacity={0.8}
										/>
									))}
								</Pie>
							</PieChart>
						</ResponsiveContainer>
					</div>

					{/* Legend */}
					<div className="w-28 flex flex-col justify-center">
						{insight.chartData.slice(0, 5).map((entry, index) => (
							<div
								key={entry.label}
								className="flex items-center gap-2 text-sm text-slate-300"
							>
								<div
									className="w-3 h-3 rounded-sm"
									style={{ backgroundColor: COLORS[index % COLORS.length] }}
								/>
								<span>{entry.label}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</Card>
	);
};

export default BudgetWidget;
