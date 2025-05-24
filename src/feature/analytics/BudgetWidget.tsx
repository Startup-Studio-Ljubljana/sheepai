import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { RefreshCw } from "lucide-react";

const COLORS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

type InsightData = {
    summary: string;
    chartData: { label: string; value: number }[];
};

// Mock API function - replace with your actual API call
const getResponse = async (prompt: string, days: number) => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    return {
        choices: [{
            message: {
                content: JSON.stringify({
                    summary: "Your biggest spending categories this week were groceries (€145), dining out (€89), and transportation (€67). Consider reducing dining expenses to improve your budget.",
                    chartData: [
                        { label: "Groceries", value: 145 },
                        { label: "Dining Out", value: 89 },
                        { label: "Transportation", value: 67 },
                        { label: "Entertainment", value: 45 },
                        { label: "Shopping", value: 32 }
                    ]
                })
            }
        }]
    };
};

const BudgetWidget = () => {
    const [insight, setInsight] = useState<InsightData | null>(null);
    const [loading, setLoading] = useState(false);

    async function analyze() {
        setLoading(true);
        setInsight(null);

        try {
            const res = await getResponse(
                `Analyze my spendings for the last 7 days. Respond in JSON format like this:\n{ summary: string, chartData: [{ label: string, value: number }] } (limit to 5 top categories)`,
                7
            );
            const raw = res.choices[0]?.message?.content || '{}';
            const clean = raw.replace(/```json|```/g, '').trim();
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
        <Card className="bg-slate-800/50 border-slate-700 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <div className="text-slate-400 text-sm mb-1">Smart Insights</div>
                    <div className="text-3xl font-bold text-white mb-2">AI Analysis</div>
                    <div className="text-slate-400 text-sm">Last week breakdown</div>
                </div>
            </div>

            {loading && (
                <div className="space-y-4">
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                        <Skeleton className="h-4 w-full mb-2 bg-slate-600" />
                        <Skeleton className="h-4 w-3/4 bg-slate-600" />
                    </div>
                    <div className="h-64 flex items-center justify-center">
                        <div className="flex flex-col items-center space-y-3">
                            <div className="animate-spin rounded-full h-12 w-12 border-2 border-slate-600 border-t-blue-500"></div>
                            <div className="text-slate-400 text-sm">Analyzing spending patterns...</div>
                        </div>
                    </div>
                </div>
            )}

            {!loading && insight?.summary && (
                <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-300 text-sm space-y-2 shadow-sm">
                    <div className="flex items-center gap-2 font-medium text-white">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Insight Summary</span>
                    </div>
                    <hr className="border-slate-700" />
                    <p>{insight.summary}</p>
                </div>
            )}

            {!loading && (insight?.chartData?.length || 0) > 0 && (
                <div className="h-64 -mx-2 relative">
                    <div className="absolute inset-0 bg-slate-700/20 rounded-lg backdrop-blur-sm border border-slate-600/30" />
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={insight.chartData.slice(0, 5)}
                                dataKey="value"
                                nameKey="label"
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={3}
                                cornerRadius={5}
                                stroke="rgba(148, 163, 184, 0.2)"
                                strokeWidth={1}
                            >
                                {insight.chartData.slice(0, 5).map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        fillOpacity={0.8}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Legend */}
                    <div className="absolute left-2 right-2 flex flex-wrap gap-2 justify-center bottom-[-1.5rem] sm:bottom-2">
                        {insight.chartData.slice(0, 5).map((entry, index) => (
                            <div key={entry.label} className="flex items-center gap-1 text-xs text-slate-300">
                                <div
                                    className="w-3 h-3 rounded-sm"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></div>
                                <span>{entry.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!insight && !loading && (
                <div className="text-center text-slate-400 text-sm py-8">
                    No spending data available
                </div>
            )}
        </Card>
    );
};

export default BudgetWidget;
