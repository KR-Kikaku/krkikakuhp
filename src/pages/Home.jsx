import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import Carousel from '@/components/public/Carousel';
import GreetingSection from '@/components/public/GreetingSection';
import BusinessSection from '@/components/public/BusinessSection';
import NewsSection from '@/components/public/NewsSection';
import CompanySection from '@/components/public/CompanySection';
import ContactSection from '@/components/public/ContactSection';

export default function Home() {
  const handleNavigate = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} />
      <div className="mt-8 md:mt-12"></div>
      <main>
        <Carousel />
        <div className="-mt-12 md:-mt-16"></div>
        <GreetingSection />
        <BusinessSection />
        <NewsSection />
        <CompanySection />
        <ContactSection />
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}