import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Coins, Star, MoreHorizontal, Plane, Home as HomeIcon, Lock, ShoppingBag } from 'lucide-react';

const RewardsInterface = () => {
  return (
    <div className="space-y-8">
      {/* Points Display */}
      <div className="text-center mt-16">
        <h2 className="text-white text-2xl font-medium mb-6">Standard plan</h2>
        
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Star className="w-8 h-8 text-white" />
          </div>
          <div className="text-6xl font-bold text-white">0</div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 mb-8">
          <span className="text-white/80 text-lg">1 point / 10 € spent</span>
          <Lock className="w-4 h-4 text-white/60" />
        </div>
        
        <Button className="bg-white/20 hover:bg-white/30 text-white border-none rounded-full px-8 py-3 backdrop-blur-sm">
          Upgrade
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-4 gap-4 px-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <span className="text-white text-sm font-medium">Earn</span>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Coins className="w-8 h-8 text-white" />
          </div>
          <span className="text-white text-sm font-medium">Redeem</span>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Star className="w-8 h-8 text-white" />
          </div>
          <span className="text-white text-sm font-medium">Plan perks</span>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <MoreHorizontal className="w-8 h-8 text-white" />
          </div>
          <span className="text-white text-sm font-medium">More</span>
        </div>
      </div>

      {/* Earning Locked Card */}
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm rounded-3xl p-6 mx-4">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white text-xl font-semibold mb-2">Earning locked</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Turn everyday spending into exciting rewards. Start earning points now
            </p>
            <Button className="w-full bg-white hover:bg-white/90 text-black rounded-full py-3 font-semibold">
              Activate
            </Button>
          </div>
        </div>
      </Card>

      {/* Products Section */}
      <div className="mx-4">
        <h3 className="text-white/70 text-sm font-medium mb-4">Products</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Plane className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <HomeIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RewardsInterface