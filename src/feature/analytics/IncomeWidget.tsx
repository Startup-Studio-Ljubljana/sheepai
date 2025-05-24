import { Card } from "@/components/ui/card";

const IncomeWidget = () => {
    return (
        <Card className="bg-slate-800/50 border-slate-700 p-6 backdrop-blur-sm">
            <div className="mb-4">
                <div className="text-slate-400 text-sm mb-1">Income</div>
                <div className="text-3xl font-bold text-white mb-2">2.404 €</div>
                <div className="text-green-400 text-sm font-medium flex items-center mb-4">
                    ▲ 1.904 €
                </div>
            </div>

            {/* Simple bar chart representation */}
            <div className="flex items-end space-x-2 h-16">
                <div className="bg-slate-600 w-4 h-12 rounded-sm"></div>
                <div className="bg-slate-600 w-4 h-10 rounded-sm"></div>
                <div className="bg-slate-600 w-4 h-6 rounded-sm"></div>
                <div className="bg-slate-700 w-4 h-4 rounded-sm"></div>
                <div className="bg-slate-700 w-4 h-3 rounded-sm"></div>
                <div className="bg-slate-700 w-4 h-2 rounded-sm"></div>
            </div>
        </Card>
    );
};

export default IncomeWidget;
