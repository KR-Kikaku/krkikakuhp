import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const carouselImages = await base44.entities.CarouselImage.list('-order');
        const activeImages = carouselImages.filter(img => img.is_active);
        setImages(activeImages.sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error('カルーセル画像の取得に失敗:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (!autoPlay || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setAutoPlay(false);
  };

  if (images.length === 0) {
    return (
      <div className="relative w-full overflow-hidden bg-gray-200" style={{ aspectRatio: '16 / 9.6' }}>
        <div className="flex items-center justify-center h-full text-gray-400">
          カルーセル画像がありません
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9.6' }}>
      {/* スライドコンテナ */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <a
              href={image.link_url || '#'}
              className={image.link_url ? 'block w-full h-full cursor-pointer' : 'block w-full h-full'}
              target={image.link_url ? '_blank' : undefined}
              rel={image.link_url ? 'noopener noreferrer' : undefined}
            >
              <img
                src={image.image_url}
                alt={`スライド ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        ))}
      </div>

      {/* ナビゲーションボタン */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="前へ"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="次へ"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* インジケーター */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setAutoPlay(false);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`スライド ${index + 1} に移動`}
              />
            ))}
          </div>
        </>
      )}

      {/* スライド数表示 */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 z-10 bg-black/50 text-white px-3 py-1 rounded text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}