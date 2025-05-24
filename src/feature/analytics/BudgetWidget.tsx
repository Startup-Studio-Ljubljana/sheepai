import { Card } from "@/components/ui/card";

const BudgetWidget = () => {
    return (
        <Card className="bg-slate-800/50 border-slate-700 p-6 backdrop-blur-sm">
            <div className="mb-4">
                <div className="text-slate-400 text-sm mb-1">Personal</div>
                <div className="text-3xl font-bold text-white mb-2">0 €</div>
                <div className="text-slate-400 text-sm">left to spend</div>
            </div>

            <div className="mb-4">
                <div className="text-red-400 text-sm font-medium flex items-center">
                    ⚠ Overspent
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                <div className="bg-red-500 h-2 rounded-full w-full"></div>
            </div>

            <div className="flex justify-between text-sm text-slate-400">
                <span>0% remaining</span>
                <span>650 €</span>
            </div>
        </Card>
    );
};

export default BudgetWidget;
