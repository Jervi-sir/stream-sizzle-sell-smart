
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PricingPlans from '@/components/PricingPlans';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <PricingPlans />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
