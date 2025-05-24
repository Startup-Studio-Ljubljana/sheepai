import { Coins, MoreHorizontal, Plus, Star } from 'lucide-react'

const actions = [
    { icon: Plus, title: 'Earn' },
    { icon: Coins, title: 'Redeem' },
    { icon: Star, title: 'Plan perks' },
    { icon: MoreHorizontal, title: 'More' },
]

export function PointActions() {
    return (
        <div className="grid grid-cols-4 gap-4 px-4 mt-16">
            {actions.map(action => (
                <div key={action.title} className="flex flex-col items-center space-y-2">
                    <div className="size-14 border border-gray-400/25  bg-white text-gray-700 
                    rounded-4xl flex items-center justify-center backdrop-blur-sm">
                        <action.icon className="size-6" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{action.title}</span>
                </div>
            ))}
        </div>
    )
}
