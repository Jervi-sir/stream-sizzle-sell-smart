
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tv, Wifi, Globe, Zap } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add animation delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 bg-iptv-purple/10 w-96 h-96 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 bg-iptv-blue/10 w-96 h-96 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Unlimited Entertainment, <span className="gradient-heading">Unleashed</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700">
              Get access to thousands of premium channels, movies, and shows for a fraction of the cost. Stream anywhere, anytime.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/checkout">
                <Button className="btn-primary text-lg">Get Started</Button>
              </Link>
              <Link to="/#pricing">
                <Button variant="outline" className="text-lg">View Plans</Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Tv size={20} className="text-iptv-purple" />
                <span>10,000+ Channels</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi size={20} className="text-iptv-purple" />
                <span>HD Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={20} className="text-iptv-purple" />
                <span>Worldwide Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-iptv-purple" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
          
          <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="card-highlight p-4 md:p-6 overflow-hidden">
              <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video">
                <div className="absolute inset-0 bg-gradient-to-br from-iptv-purple/90 to-iptv-blue/90 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl font-bold mb-2">LIVE TV</div>
                    <div className="text-xl opacity-80">Premium Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
