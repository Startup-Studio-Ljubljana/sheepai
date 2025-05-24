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
            onClick={onToggle}
            className={`w-full cursor-pointer rounded-3xl p-4 border backdrop-blur-md transition-all duration-200 ${
                suggestion.selected
                    ? 'border-green-400 bg-green-500/10'
                    : 'border-white/20 bg-white/10 hover:bg-white/15'
            }`}
        >
            <div className="flex items-start space-x-4">
                <div
                    className={`w-6 h-6 mt-1 rounded-full border-2 flex items-center justify-center transition-colors ${
                        suggestion.selected
                            ? 'border-green-500 bg-green-500'
                            : 'border-white/30'
                    }`}
                >
                    {suggestion.selected && <Check className="w-4 h-4 text-white" />}
                </div>

                <div className="flex-1 text-white">
                    <h3 className="text-sm font-semibold mb-0.5">{suggestion.title}</h3>
                    <p className="text-xs text-white/70 mb-2">{suggestion.description}</p>

                    <div className="flex justify-between items-center text-xs">
						<span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
							{suggestion.category}
						</span>
                        <span className="text-green-300 font-semibold">
							+€{suggestion.monthlySavings}/month
						</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuggestionCard;
