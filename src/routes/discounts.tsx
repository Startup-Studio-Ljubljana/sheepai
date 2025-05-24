import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, MapPin, TrendingUp, User } from "lucide-react";
import { useState } from "react";
import DiscountsCarousel from "../feature/discounts/components/DiscountCarousel";

export const Route = createFileRoute("/discounts")({
	component: RouteComponent,
});

const sections = [
	{
		id: "nearYou",
		title: "Near You",
		icon: MapPin,
		dataKey: "locationDiscounts",
	},
	{
		id: "forYou",
		title: "For You",
		icon: User,
		dataKey: "forYouDiscounts",
	},
	{
		id: "popular",
		title: "Popular",
		icon: TrendingUp,
		dataKey: "popularDiscounts",
	},
];

function RouteComponent() {
	const [activeSection, setActiveSection] = useState<
		"nearYou" | "popular" | "forYou"
	>("nearYou");

	const discountData = {
		locationDiscounts: [
			{
				id: "1",
				title: "Coffee & Pastries",
				description:
					"Start your morning right with fresh coffee and baked goods",
				discount: "25% OFF",
				brand: "Local Café",
				location: "Downtown",
				expiresAt: "Dec 31",
				backgroundColor: "bg-gradient-to-br from-amber-500 to-orange-600",
				logoUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop",
			},
			{
				id: "2",
				title: "Fitness Classes",
				description: "Join yoga, pilates, and strength training sessions",
				discount: "40% OFF",
				brand: "FitZone Gym",
				location: "City Center",
				expiresAt: "Jan 15",
				backgroundColor: "bg-gradient-to-br from-green-500 to-emerald-600",
				logoUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
			},
			{
				id: "3",
				title: "Dinner for Two",
				description: "Romantic evening with premium dining experience",
				discount: "30% OFF",
				brand: "Bella Vista",
				location: "Uptown",
				expiresAt: "Dec 25",
				backgroundColor: "bg-gradient-to-br from-red-500 to-pink-600",
				logoUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&h=100&fit=crop",
			},
		],
		popularDiscounts: [
			{
				id: "4",
				title: "Streaming Premium",
				description: "Unlimited movies, shows, and exclusive content",
				discount: "50% OFF",
				brand: "StreamMax",
				expiresAt: "Jan 31",
				backgroundColor: "bg-gradient-to-br from-purple-500 to-indigo-600",
				logoUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop",
			},
			{
				id: "5",
				title: "Designer Clothing",
				description: "Latest fashion trends and seasonal collections",
				discount: "60% OFF",
				brand: "FashionHub",
				expiresAt: "Dec 20",
				backgroundColor: "bg-gradient-to-br from-pink-500 to-rose-600",
				logoUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop",
			},
			{
				id: "6",
				title: "Electronics Deal",
				description: "Latest gadgets and tech accessories",
				discount: "35% OFF",
				brand: "TechWorld",
				expiresAt: "Jan 10",
				backgroundColor: "bg-gradient-to-br from-blue-500 to-cyan-600",
				logoUrl: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=100&h=100&fit=crop",
			},
			{
				id: "7",
				title: "Home & Garden",
				description: "Transform your space with quality furniture",
				discount: "45% OFF",
				brand: "HomeStyle",
				expiresAt: "Feb 1",
				backgroundColor: "bg-gradient-to-br from-teal-500 to-green-600",
				logoUrl: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=100&h=100&fit=crop",
			},
		],
		forYouDiscounts: [
			{
				id: "8",
				title: "Personalized Book Box",
				description: "Curated books delivered to your door, just for you.",
				discount: "15% OFF First Box",
				brand: "Bookworm Club",
				expiresAt: "Dec 31",
				backgroundColor: "bg-gradient-to-br from-sky-400 to-blue-500",
				logoUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=100&h=100&fit=crop",
			},
			{
				id: "9",
				title: "Custom Art Commission",
				description: "A unique piece of art created based on your preferences.",
				discount: "20% OFF",
				brand: "Artify Studio",
				expiresAt: "Jan 20",
				backgroundColor: "bg-gradient-to-br from-rose-400 to-red-500",
				logoUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&h=100&fit=crop",
			},
		],
	};

	const foundSection = sections.find((sec) => sec.id === activeSection);
	const currentDiscounts = foundSection
		? discountData[foundSection.dataKey as keyof typeof discountData]
		: [];
	const activeSectionDetails = foundSection;

	return (
		<div className="min-h-screen text-white">
			<div className="relative z-10 max-w-sm mx-auto min-h-screen backdrop-blur-sm px-2">
            <h1 className="text-xl font-semibold w-full pt-2 pb-1 mx-2 text-gray-900">
				Discounts
			</h1>
				<div className="flex space-x-2 p-4 px-0">
					{sections.map((section) => (
						<button
							key={section.id}
							type="button"
							onClick={() => setActiveSection(section.id as "nearYou" | "popular" | "forYou")}
							className={`
                                flex items-center space-x-1.5 px-3 py-1.5 border border-gray-150
                                rounded-full text-sm font-medium transition-colors shadow-xs
								${
									activeSection === section.id
										? "bg-primary/5 border-primary text-primary backdrop-blur-sm"
										: " bg-white text-gray-700 hover:bg-white/15"
								}`}
						>
							<section.icon className="w-4 h-4" />
							<span>{section.title}</span>
						</button>
					))}
				</div>

				<div className="pb-24 space-y-8 pt-4">
					{activeSectionDetails && (
						<div>
							<DiscountsCarousel discounts={currentDiscounts} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
