import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await base44.entities.CarouselImage.filter(
        { is_active: true },
        'order'
      );
      setImages(data);
    };
    fetchImages();
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (images.length === 0) {
    return (
      <div className="w-full aspect-video bg-gray-100 rounded-lg mb-12" />
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className="relative w-full mb-12 notranslate" translate="no" lang="ja">
      <div className="aspect-video overflow-hidden rounded-lg">
        {currentImage.link_url ? (
          <a href={currentImage.link_url} target="_blank" rel="noopener noreferrer">
            <img
              src={currentImage.image_url}
              alt="Carousel"
              className="w-full h-full object-cover"
            />
          </a>
        ) : (
          <img
            src={currentImage.image_url}
            alt="Carousel"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {images.length > 1 && (
        <>
          {/* ナビゲーション矢印 */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 transition-all"
            aria-label="前の画像"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 transition-all"
            aria-label="次の画像"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>

          {/* ドット */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`画像${index + 1}へ移動`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}