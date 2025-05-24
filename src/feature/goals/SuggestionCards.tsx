
import { Check } from 'lucide-react';

interface Suggestion {
    id: string;
    title: string;
    description: string;
    monthlySavings: number;
    category: string;
    selected: boolean;
}

interface SuggestionCardProps {
    suggestion: Suggestion;
    onToggle: () => void;
}

const SuggestionCard = ({ suggestion, onToggle }: SuggestionCardProps) => {
    return (
        <div
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                suggestion.selected
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={onToggle}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-start space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            suggestion.selected
                                ? 'border-green-500 bg-green-500'
                                : 'border-gray-300'
                        }`}>
                            {suggestion.selected && (
                                <Check className="w-4 h-4 text-white" />
                            )}
                        </div>

                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                                {suggestion.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                                {suggestion.description}
                            </p>
                            <div className="flex items-center justify-between">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {suggestion.category}
                </span>
                                <span className="text-green-600 font-semibold">
                  +${suggestion.monthlySavings}/month
                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuggestionCard;
