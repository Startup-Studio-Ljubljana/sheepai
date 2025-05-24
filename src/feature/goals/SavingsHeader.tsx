
import { Plus } from 'lucide-react';

interface SavingsHeaderProps {
    totalSavings: number;
    additionalSavings: number;
}

const SavingsHeader = ({ totalSavings, additionalSavings }: SavingsHeaderProps) => {
    return (
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 pb-8">
            <div className="text-center">
                <h1 className="text-lg font-medium mb-2 opacity-90">Total Savings</h1>
                <div className="flex items-center justify-center space-x-2">
          <span className="text-4xl font-bold">
            ${totalSavings.toLocaleString()}
          </span>
                    {additionalSavings > 0 && (
                        <div className="flex items-center bg-green-500 bg-opacity-30 rounded-lg px-3 py-1 animate-pulse">
                            <Plus className="w-4 h-4 mr-1" />
                            <span className="text-lg font-semibold">
                ${additionalSavings.toFixed(2)}
              </span>
                        </div>
                    )}
                </div>
                {additionalSavings > 0 && (
                    <p className="text-sm opacity-80 mt-2">
                        Potential monthly increase
                    </p>
                )}
            </div>
        </div>
    );
};

export default SavingsHeader;
