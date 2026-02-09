import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function HomeCarousel() {
  const { data: images } = useQuery({
    queryKey: ['carouselImages'],
    queryFn: () => base44.entities.CarouselImage.filter({ is_active: true }, 'order'),
    initialData: []
  });

  if (!images.length) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 mb-12">
      <Carousel>
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              {image.link_url ? (
                <a href={image.link_url} target="_blank" rel="noopener noreferrer">
                  <img src={image.image_url} alt="" className="w-full aspect-[1280/750] object-cover rounded" />
                </a>
              ) : (
                <img src={image.image_url} alt="" className="w-full aspect-[1280/750] object-cover rounded" />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}