import { Card } from "@/components/ui/card";

const CashflowWidget = () => {
    return (
        <Card className="bg-slate-800/50 border-slate-700 p-6 backdrop-blur-sm">
            <div className="mb-4">
                <div className="text-slate-400 text-sm mb-1">Net cashflow</div>
                <div className="text-3xl font-bold text-white mb-2">91 €</div>
                <div className="text-green-400 text-sm font-medium flex items-center mb-4">
                    ⊕ Positive
                </div>
            </div>

            {/* Progress bars */}
            <div className="space-y-2">
                <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-full"></div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full w-3/4"></div>
                </div>
            </div>
        </Card>
    );
};

export default CashflowWidget;
