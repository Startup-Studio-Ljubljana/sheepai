import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from "recharts";

type SpendingChartProps = {
	title?: string;
	data: { day: number; amount: number }[];
	total: number;
};

const SpendingChart = ({ data, title, total }: SpendingChartProps) => {
	const cumulativeData = data.reduce<{ day: number; amount: number }[]>(
		(acc, curr) => {
			const last = acc.length ? acc[acc.length - 1].amount : 0;
			acc.push({ day: curr.day, amount: last + curr.amount });
			return acc;
		},
		[],
	);

	return (
		<Card className="transition-all duration-200 gap-4 pt-3 pb-4 px-6">
			<div>
				<div className="text-gray-700 text-sm mb-2 font-medium">{title ?? 'Spent'}</div>
				<div className="flex items-baseline gap-3">
					<span className="text-2xl font-bold text-gray-900">
						{total.toLocaleString("de-DE", {
							style: "currency",
							currency: "EUR",
						})}
					</span>
				</div>
			</div>

			<div className="h-28 -mx-2 -mt-10">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={cumulativeData}>
						<defs>
							<linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#44ef44" stopOpacity={0.8} />
								<stop offset="100%" stopColor="#44ef44" stopOpacity={0.1} />
							</linearGradient>
						</defs>
						<XAxis
							dataKey="day"
							axisLine={false}
							tickLine={false}
							tick={{ fill: "#74648b", fontSize: 12 }}
						/>
						<Tooltip
							formatter={(value: number) =>
								value.toLocaleString("de-DE", {
									style: "currency",
									currency: "EUR",
								})
							}
							labelFormatter={(label: number) => `Day ${label}`}
							contentStyle={{
								backgroundColor: "#291e3b",
								border: "none",
								borderRadius: "0.5rem",
							}}
							labelStyle={{ color: "#94a3b8" }}
							itemStyle={{ color: "#ffffff" }}
						/>
						<Area
							type="monotone"
							dataKey="amount"
							stroke="#44ef44"
							strokeWidth={2}
							fill="url(#spendingGradient)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</Card>
	);
};

export default SpendingChart;
