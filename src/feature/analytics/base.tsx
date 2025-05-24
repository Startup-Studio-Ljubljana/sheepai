import SpendingChart from "@/feature/analytics/SpendingChart.tsx";
import IncomeWidget from "@/feature/analytics/IncomeWidget.tsx";
import BudgetWidget from "@/feature/analytics/BudgetWidget.tsx";
import CashflowWidget from "@/feature/analytics/CashOutflowWidget.tsx";
import { useMemo } from "react";
import data from "../../../bank_account_data.json";
import { parseISO, subDays, isAfter } from "date-fns";
import { useInView } from 'react-intersection-observer';

const Base = () => {
    const { ref: budgetRef, inView: showBudget } = useInView({ triggerOnce: true, threshold: 0.1 });
    const last30DaysData = useMemo(() => {
        const today = new Date();
        const cutoff = subDays(today, 30);
        const dailyTotals: Record<number, number> = {};

        data.transactions.forEach(tx => {
            const date = parseISO(tx.date);
            if (tx.amount < 0 && isAfter(date, cutoff)) {
                const day = date.getDate();
                dailyTotals[day] = (dailyTotals[day] || 0) + Math.abs(tx.amount);
            }
        });

        return Object.entries(dailyTotals).map(([day, amount]) => ({
            day: Number(day),
            amount: Number(amount.toFixed(2))
        }));
    }, []);

    const totals = useMemo(() => {
        const today = new Date();
        const cutoff = subDays(today, 30);
        let income = 0;
        let expenses = 0;

        data.transactions.forEach(tx => {
            const date = parseISO(tx.date);
            if (isAfter(date, cutoff)) {
                if (tx.amount > 0) income += tx.amount;
                else expenses += Math.abs(tx.amount);
            }
        });

        return { income, expenses };
    }, []);

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl p-6">
                {/* Main Content Grid */}
                <div className="space-y-6">
                    {/* Spending Chart - Full Width */}
                    <SpendingChart data={last30DaysData} />

                    {/* Second Row - Income and Cashflow */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <IncomeWidget />
                        <CashflowWidget income={totals.income} expenses={totals.expenses} />
                    </div>

                    {/* Budget Section */}
                    <div className="space-y-4" ref={budgetRef}>
                        {showBudget && <BudgetWidget />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Base;
