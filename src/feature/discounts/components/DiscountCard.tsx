import { Card } from "@/components/ui/card";
import { Check, Share } from "lucide-react";

interface DiscountCardProps {
	title: string;
	description: string;
	discount: string;
	brand: string;
	logoUrl?: string;
	location?: string;
	expiresAt: string;
	backgroundColor: string; // This prop will no longer directly set the main background
}

const DiscountCard = ({
	title,
	description,
	discount,
	brand,
	logoUrl,
	location,
	expiresAt,
	// backgroundColor, // Commenting out as it's not directly used for the main background now
}: DiscountCardProps) => {
	return (
		<Card className="space-y-3 flex flex-col">
			<div className="flex justify-between items-start mb-2">
				<span className="text-xl font-bold text-gray-900">{discount}</span>
				<button
					type="button"
					className="size-8 backdrop-blur-md bg-gray-100 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
				>
					<Share className="size-4 text-gray-700" />
				</button>
			</div>

			<div className="flex items-center mb-1">
				<img
					src={logoUrl}
					alt={`${brand} logo`}
					className="size-7 rounded-full mr-2 object-contain"
				/>
				<h3 className="font-semibold text-gray-800 text-[17px]">{title}</h3>
			</div>
			<p className="text-gray-700 text-[0.8rem]">{description}</p>

			<button
				type="button"
				className="mb-1 mt-2 w-full bg-primary font-semibold py-2 px-3 rounded-full transition-colors flex items-center justify-center space-x-2"
			>
				<Check className="w-4 h-4" />
				<span className="text-sm">Activate</span>
			</button>
		</Card>
	);
};

export default DiscountCard;
