import { Link } from '@tanstack/react-router';
import { Bitcoin, CreditCard, Home, PlusCircle, TrendingUp } from 'lucide-react';

const navItems = [
    { title: 'Home', icon: Home, link: '/' },
    { title: 'Invest', icon: TrendingUp, link: '/invest' },
    { title: 'Payments', icon: CreditCard, link: '/payments', notification: true },
    { title: 'Crypto', icon: Bitcoin, link: '/crypto' },
    { title: 'RevPoints', icon: PlusCircle, link: '/revpoints' },
];

export default function Footer() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-lg border-t border-white/10 z-50">
            <div className="flex justify-around items-center py-3 pt-4 px-3">
                {navItems.map((item) => (
                    <Link to={item.link} key={item.title} className="flex flex-col items-center space-y-1">
                        <div className="size-6 flex items-center justify-center relative">
                            <item.icon className="w-6 h-6 text-white" />
                            {item.notification && (
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                            )}
                        </div>
                        <span className="text-white text-xs">{item.title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}