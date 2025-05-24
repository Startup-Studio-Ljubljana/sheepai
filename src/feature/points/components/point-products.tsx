import { Card } from "@/components/ui/card";
import { HomeIcon, Plane, ShoppingBag, Lock } from "lucide-react";

export function PointProducts() {
    const products = [
        { icon: Plane, label: 'Travel' },
        { icon: HomeIcon, label: 'Stays' },
        { icon: Lock, label: 'Experience' },
        { icon: ShoppingBag, label: 'Shopping' }
    ]

    return (
        <Card className="p-4 mx-4 gap-2">
        <h3 className="text-gray-700 text-sm font-semibold mb-4">Products</h3>
        <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
                <div key={product.label} className="flex flex-col items-center space-y-2">
                    <div className="w-14 h-14 bg-primary/20 border border-primary/50 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <product.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-gray-900 text-[10px] font-semibold">{product.label}</span>
                </div>
            ))}
        </div>
</Card>

    )
}