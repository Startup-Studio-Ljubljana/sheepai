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
				brand: "Starbucks",
				location: "Downtown",
				expiresAt: "Dec 31",
				backgroundColor: "bg-gradient-to-br from-amber-500 to-orange-600",
				logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png",
			},
			{
				id: "2",
				title: "Fitness Classes",
				description: "Join yoga, pilates, and strength training sessions",
				discount: "40% OFF",
				brand: "Gold's Gym",
				location: "City Center",
				expiresAt: "Jan 15",
				backgroundColor: "bg-gradient-to-br from-green-500 to-emerald-600",
				logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Gold%27s_Gym_logo.svg/1200px-Gold%27s_Gym_logo.svg.png",
			},
			{
				id: "3",
				title: "Dinner for Two",
				description: "Romantic evening with premium dining experience",
				discount: "30% OFF",
				brand: "Olive Garden",
				location: "Uptown",
				expiresAt: "Dec 25",
				backgroundColor: "bg-gradient-to-br from-red-500 to-pink-600",
				logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Olive_Garden_logo.svg/1200px-Olive_Garden_logo.svg.png",
			},
		],
		popularDiscounts: [
			{
				id: "4",
				title: "Streaming Premium",
				description: "Unlimited movies, shows, and exclusive content",
				discount: "50% OFF",
				brand: "Netflix",
				expiresAt: "Jan 31",
				backgroundColor: "bg-gradient-to-br from-purple-500 to-indigo-600",
				logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png",
			},
			{
				id: "5",
				title: "Designer Clothing",
				description: "Latest fashion trends and seasonal collections",
				discount: "60% OFF",
				brand: "Zara",
				expiresAt: "Dec 20",
				backgroundColor: "bg-gradient-to-br from-pink-500 to-rose-600",
				logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Zara_Logo.svg/1200px-Zara_Logo.svg.png",
			},
			{
				id: "6",
				title: "Electronics Deal",
				description: "Latest gadgets and tech accessories",
				discount: "35% OFF",
				brand: "Apple",
				expiresAt: "Jan 10",
				backgroundColor: "bg-gradient-to-br from-blue-500 to-cyan-600",
				logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png",
			},
			{
				id: "7",
				title: "Home & Garden",
				description: "Transform your space with quality furniture",
				discount: "45% OFF",
				brand: "IKEA",
				expiresAt: "Feb 1",
				backgroundColor: "bg-gradient-to-br from-teal-500 to-green-600",
				logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/IKEA_Logo.svg/1200px-IKEA_Logo.svg.png",
			},
		],
		forYouDiscounts: [
			{
				id: "8",
				title: "Personalized Book Box",
				description: "Curated books delivered to your door, just for you.",
				discount: "15% OFF First Box",
				brand: "Amazon Books",
				expiresAt: "Dec 31",
				backgroundColor: "bg-gradient-to-br from-sky-400 to-blue-500",
				logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
			},
			{
				id: "9",
				title: "Custom Art Commission",
				description: "A unique piece of art created based on your preferences.",
				discount: "20% OFF",
				brand: "Etsy",
				expiresAt: "Jan 20",
				backgroundColor: "bg-gradient-to-br from-rose-400 to-red-500",
				logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Etsy_logo.svg/1200px-Etsy_logo.svg.png",
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
			<div className="relative z-10 max-w-sm mx-auto min-h-screen backdrop-blur-sm">
					<h1 className="text-2xl font-semibold text-center mb-3 mt-2">Discounts</h1>

				<div className="flex justify-center space-x-2 p-4">
					{sections.map((section) => (
						<button
							key={section.id}
							type="button"
							onClick={() =>
								setActiveSection(section.id as "nearYou" | "popular" | "forYou")
							}
							className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors
								${
									activeSection === section.id
										? "bg-white/20 text-white backdrop-blur-sm"
										: "bg-white/10 text-white/70 hover:bg-white/15"
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
