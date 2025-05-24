import { Star, Lock } from "lucide-react";
import Offers from "./offers";
import { PointProducts } from "./point-products";
import { PointActions } from "./point-actions";

const RewardsInterface = () => {
	return (
		<div className="space-y-8 pb-8">
			{/* Points Display */}
			<div className="text-center mt-4">
				<h2 className="text-gray-900 text-2xl font-medium mb-12">
					Standard plan
				</h2>

				<div className="flex items-center justify-center space-x-4 mb-12">
					<div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
						<Star className="w-8 h-8 text-primary" />
					</div>
					<div className="text-6xl font-bold text-gray-900">280</div>
				</div>

				<div className="flex items-center justify-center space-x-2 mb-6">
					<span className="text-gray-700 text-lg">1 point / 1 € spent</span>
					<Lock className="w-4 h-4 text-primary/60" />
				</div>
			</div>

			<PointActions />
			<PointProducts />
			<Offers />
		</div>
	);
};

export default RewardsInterface;
