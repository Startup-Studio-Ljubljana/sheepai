import { Link } from '@tanstack/react-router';
import { Goal, Home, PlusCircle, TicketPercent, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { title: 'Home', icon: Home, link: '/analytics' },
    { title: 'Invest', icon: TrendingUp, link: '/investments' },
    { title: 'Goals', icon: Goal, link: '/goals', notification: true },
    { title: 'Discounts', icon: TicketPercent, link: '/discounts' },
    { title: 'RevPoints', icon: PlusCircle, link: '/points' },
];

export default function Footer() {
   const [active, setActive] = useState(0);


    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-sm border-t border-white/20 shadow-sm z-50">
            <div className="flex justify-around items-center py-3 pt-4 pb-7 px-3">
                {navItems.map((item, i) => (
                    <Link to={item.link} key={item.title} className={`flex flex-col items-center space-y-1 text-black ${active === i ? 'text-primary' : ''}`} onClick={() => setActive(i)}>
                        <div className="size-6 flex items-center justify-center relative">
                            <item.icon className="size-6" />
                            {item.notification && (
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                            )}
                        </div>
                        <span className="text-xs">{item.title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
