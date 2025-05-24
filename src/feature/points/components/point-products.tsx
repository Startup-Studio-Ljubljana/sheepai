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
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm rounded-3xl p-4 mx-4 gap-2">
        <h3 className="text-white/70 text-sm font-medium mb-4">Products</h3>
        <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
                <div key={product.label} className="flex flex-col items-center space-y-2">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <product.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white text-[10px] font-semibold">{product.label}</span>
                </div>
            ))}
        </div>
</Card>

    )
}