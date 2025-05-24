import { Card } from "@/components/ui/card";

type Props = {
    income: number;
    expenses: number;
};

const CashflowWidget = ({ income, expenses }: Props) => {
    const net = income - expenses;
    const isPositive = net >= 0;
    const netFormatted = net.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
    });

    const expensePercent = income > 0 ? Math.min(100, (expenses / income) * 100) : 100;

    return (
        <Card className="bg-slate-800/50 border-slate-700 p-6 backdrop-blur-sm h-full">
            <div className="mb-4">
                <div className="text-slate-400 text-sm mb-1">Net cashflow</div>
                <div className={`text-3xl font-bold mb-2 ${isPositive ? "text-white" : "text-red-400"}`}>
                    {netFormatted}
                </div>
                <div
                    className={`text-sm font-medium flex items-center mb-4 ${
                        isPositive ? "text-green-400" : "text-red-400"
                    }`}
                >
                    {isPositive ? "⊕ Positive" : "⊖ Negative"}
                </div>
            </div>

            {/* Progress bars */}
            <div className="space-y-2">
                <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "100%" }}
                    ></div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${expensePercent}%` }}
                    ></div>
                </div>
            </div>
        </Card>
    );
};

export default CashflowWidget;
