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
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32">
        <Carousel />
        <GreetingSection />
        <BusinessSection />
        <NewsSection />
        <CompanySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}