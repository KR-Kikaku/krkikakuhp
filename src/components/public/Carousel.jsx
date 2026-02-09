import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function HomeCarousel() {
  const { data: images } = useQuery({
    queryKey: ['carouselImages'],
    queryFn: () => base44.entities.CarouselImage.filter({ is_active: true }, 'order'),
    initialData: []
  });

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  if (images.length === 0) return null;

  return (
    <div className="px-4 md:px-8">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-6xl mx-auto"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              {image.link_url ? (
                <a href={image.link_url} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={image.image_url} 
                    alt="Carousel" 
                    className="w-full h-64 md:h-96 object-cover rounded-lg"
                  />
                </a>
              ) : (
                <img 
                  src={image.image_url} 
                  alt="Carousel" 
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}