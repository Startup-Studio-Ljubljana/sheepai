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

    return (
        <div className="min-h-screen px-4">
                <h1 className="text-xl font-semibold w-full text-white mb-6 mt-1 mx-2">Analytics</h1>
                <div className="space-y-4">
                    <SpendingChart data={last30DaysData} />
                    <BudgetWidget />
            </div>

            <h1 className="text-xl font-semibold w-full text-white mb-6 mt-6 mx-2">Saving Opportunities</h1>
        </div>
    );
};

export default Base;
