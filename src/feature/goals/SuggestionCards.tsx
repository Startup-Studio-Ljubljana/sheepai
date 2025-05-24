import { Check, Circle } from 'lucide-react';
import { Card } from "@/components/ui/card.tsx";

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

const SuggestionCard = ({suggestion, onToggle}: SuggestionCardProps) => {
    return (
        <Card
            onClick={onToggle}
            key={suggestion.id}
            className={`transition-all duration-200 pt-3 pb-4 px-5 rounded-xl ${
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
                            : 'border-white/40'
                    }`}
                >
                    {suggestion.selected && <Check className="w-4 h-4 text-gray-900"/>}
                    {!suggestion.selected && <Circle className="w-4 h-4 text-gray-900"/>}
                </div>

                <div className="flex-1">
                    <h3 className="text-gray-900 text-sm font-semibold mb-0.5">{suggestion.title}</h3>
                    <p className="text-xs text-gray-900/70 mb-2">{suggestion.description}</p>

                    <div className="flex justify-between items-center text-xs">
						<span className="bg-white/10 text-gray-900/60 px-2 py-0.5 rounded-full">
							{suggestion.category}
						</span>
                        <span className="text-green-700 font-semibold">
							+€{suggestion.monthlySavings}/month
						</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SuggestionCard;
