import {
  Star, Lock
} from 'lucide-react'
import Offers from './offers'
import { PointProducts } from './point-products'
import { PointActions } from './point-actions'

const RewardsInterface = () => {
    return (
        <div className="space-y-8 pb-8">
            {/* Points Display */}
            <div className="text-center mt-8">
                <h2 className="text-white text-2xl font-medium mb-16">Standard plan</h2>

                <div className="flex items-center justify-center space-x-4 mb-12">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <Star className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-6xl font-bold text-white">0</div>
                </div>

                <div className="flex items-center justify-center space-x-2 mb-8">
                    <span className="text-white/80 text-lg">1 point / 10 € spent</span>
                    <Lock className="w-4 h-4 text-white/60" />
                </div>
            </div>

            {/* Action Buttons */}
            <PointActions />


<PointProducts />
        

            {/* Products Section */}

            <Offers />
        </div>
    )
}

export default RewardsInterface
