import { Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plane } from 'lucide-react'
import { Gift, Headphones } from 'lucide-react'

const offers = [
    {
        id: 1,
        title: 'Free Coffee',
        description: 'Costa Coffee voucher',
        pointsRequired: 500,
        pointsEarned: 120,
        icon: Coffee,
        color: 'bg-amber-500',
    },
    {
        id: 2,
        title: 'Free Delivery',
        description: 'Uber Eats free delivery',
        pointsRequired: 300,
        pointsEarned: 280,
        icon: Gift,
        color: 'bg-green-500',
    },
    {
        id: 3,
        title: 'Headphones',
        description: 'Sony WH-1000XM4',
        pointsRequired: 15000,
        pointsEarned: 120,
        icon: Headphones,
        color: 'bg-blue-500',
    },
    {
        id: 4,
        title: 'Flight Discount',
        description: '10% off on flights',
        pointsRequired: 2500,
        pointsEarned: 120,
        icon: Plane,
        color: 'bg-purple-500',
    },
]

export default function Offers() {
    return (
        <div className="mx-4">
            <h3 className="text-gray-700 text-lg font-semibold mb-4">Redeem offers</h3>
            <div className="flex flex-col gap-4">
                {offers.map(offer => {
                    const IconComponent = offer.icon
                    const progress = (offer.pointsEarned / offer.pointsRequired) * 100
                    const isCloseToRedeem = progress >= 80

                    return (
                        <Card
                            key={offer.id}
                            className="p-3 relative overflow-hidden flex flex-row items-center gap-2"
                        >
                            <div
                                className={`size-14 ${offer.color} rounded-xl flex items-center justify-center`}
                            >
                                <IconComponent className="w-6 h-6 text-gray-700" />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <div>
                                    <h4 className="text-gray-700 font-semibold text-sm">
                                        {offer.title}
                                    </h4>
                                    <p className="text-gray-700/70 text-[10px]">{offer.description}</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700/80 text-[10px]">
                                            {offer.pointsEarned}/{offer.pointsRequired} pts
                                        </span>
                                        {isCloseToRedeem && (
                                            <span className="text-green-400 text-[10px] font-medium">
                                                Almost there!
                                            </span>
                                        )}
                                    </div>

                                    <div className="w-full bg-white/20 rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                                isCloseToRedeem ? 'bg-green-400' : 'bg-gray-500/60'
                                            }`}
                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                        ></div>
                                    </div>

                                    {/* <Button
                                        size="sm"
                                        className={`w-full text-xs rounded-full ${
                                            progress >= 100
                                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                                : 'bg-white/20 hover:bg-white/30 text-white'
                                        }`}
                                        disabled={progress < 100}
                                    >
                                        {progress >= 100
                                            ? 'Redeem'
                                            : `${Math.ceil(offer.pointsRequired - offer.pointsEarned)} pts to go`}
                                    </Button> */}
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
