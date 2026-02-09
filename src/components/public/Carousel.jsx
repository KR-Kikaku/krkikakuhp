import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function Carousel() {
  const { data: images } = useQuery({
    queryKey: ['carouselImages'],
    queryFn: () => base44.entities.CarouselImage.filter({ is_active: true }, 'order'),
    initialData: []
  });

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  if (!images.length) return null;

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {images.map((img) => (
          <div key={img.id} className="flex-[0_0_100%] min-w-0">
            {img.link_url ? (
              <a href={img.link_url} target="_blank" rel="noopener noreferrer">
                <img src={img.image_url} alt="" className="w-full h-96 object-cover" />
              </a>
            ) : (
              <img src={img.image_url} alt="" className="w-full h-96 object-cover" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}