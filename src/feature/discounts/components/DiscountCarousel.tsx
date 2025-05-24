
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DiscountCard from './DiscountCard';

interface Discount {
  id: string;
  title: string;
  description: string;
  discount: string;
  brand: string;
  location?: string;
  expiresAt: string;
  backgroundColor: string;
}

interface DiscountsCarouselProps {
  discounts: Discount[];
}

const DiscountsCarousel = ({ discounts }: DiscountsCarouselProps) => {
  return (
    <div className="flex flex-col gap-4">
        {discounts.map((discount) => (
            <DiscountCard key={discount.id} {...discount} />
        ))}
    </div>
  );
};

export default DiscountsCarousel;