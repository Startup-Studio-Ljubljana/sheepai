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
                    <div className="size-14 border-white/20  bg-white/20 rounded-4xl flex items-center justify-center backdrop-blur-sm">
                        <action.icon className="size-6 text-white" />
                    </div>
                    <span className="text-white text-sm font-medium">{action.title}</span>
                </div>
            ))}
        </div>
    )
}
