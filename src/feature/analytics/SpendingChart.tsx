import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from 'recharts';

type SpendingChartProps = {
    data: { day: number; amount: number }[];
};

const SpendingChart = ({ data }: SpendingChartProps) => {
    const cumulativeData = data.reduce<{ day: number; amount: number }[]>((acc, curr) => {
        const last = acc.length ? acc[acc.length - 1].amount : 0;
        acc.push({ day: curr.day, amount: last + curr.amount });
        return acc;
    }, []);

    const total = cumulativeData[cumulativeData.length - 1]?.amount || 0;

    return (
        <Card className="bg-slate-800/50 border-slate-700 p-6 backdrop-blur-sm">
            <div className="mb-4">
                <div className="text-slate-400 text-sm mb-1">Spent</div>
                <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-white">
            {total.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </span>
                </div>
            </div>

            <div className="h-40 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cumulativeData}>
                        <defs>
                            <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <Tooltip
                            formatter={(value: number) =>
                                value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
                            }
                            labelFormatter={(label: number) => `Day ${label}`}
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '0.5rem' }}
                            labelStyle={{ color: '#94a3b8' }}
                            itemStyle={{ color: '#ffffff' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#ef4444"
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
