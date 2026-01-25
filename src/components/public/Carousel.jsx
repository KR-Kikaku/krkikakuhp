import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await base44.entities.CarouselImage.filter({ is_active: true }, 'order');
      setImages(data.slice(0, 5));
      setIsLoading(false);
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const goTo = (index) => setCurrentIndex(index);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  if (isLoading) {
    return (
      <div className="w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] bg-gray-100" />
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop" 
          alt="TOP"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const handleImageClick = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] overflow-hidden notranslate" translate="no" lang="ja">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.image_url}
            alt={`Slide ${index + 1}`}
            className={`w-full h-full object-cover ${image.link_url ? 'cursor-pointer' : ''}`}
            onClick={() => handleImageClick(image.link_url)}
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all shadow-lg"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}