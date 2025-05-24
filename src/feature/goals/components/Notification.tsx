import { X } from "lucide-react";

interface Props {
    title: string;
    description: string;
}

export function Notification({title, description}: Props) {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 w-full relative">
            <button type="button"
                className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
            >
                <X className="size-4.5" />
            </button>
            <div className="flex items-center space-x-4 mb-1">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="text-white/70 text-sm">{description}</p>
                </div>
            </div>
        </div>
    )
}

