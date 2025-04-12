
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    features: [
      '5,000+ Live Channels',
      'HD Quality Streaming',
      'Watch on 1 Device',
      '24/7 Customer Support',
      '7-Day Replay'
    ],
    popular: false
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 14.99,
    features: [
      '8,000+ Live Channels',
      'Full HD Quality Streaming',
      'Watch on 2 Devices',
      '24/7 Customer Support',
      '7-Day Replay',
      'Video On Demand'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    features: [
      '10,000+ Live Channels',
      '4K Quality Streaming',
      'Watch on 4 Devices',
      '24/7 Premium Support',
      '14-Day Replay',
      'Video On Demand',
      'Sports & PPV Events'
    ],
    popular: false
  },
  {
    id: 'family',
    name: 'Family',
    price: 24.99,
    features: [
      '10,000+ Live Channels',
      '4K Quality Streaming',
      'Watch on 6 Devices',
      '24/7 Premium Support',
      '30-Day Replay',
      'Video On Demand',
      'Sports & PPV Events',
      'Parental Controls'
    ],
    popular: false
  }
];

const PricingPlans = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="gradient-heading">Perfect Plan</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the plan that fits your entertainment needs. All plans include our full channel lineup with different features.
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="bg-gray-100 p-1 rounded-full inline-flex">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingPeriod === 'monthly' 
                    ? 'bg-white shadow-md text-gray-800' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingPeriod === 'yearly' 
                    ? 'bg-white shadow-md text-gray-800' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setBillingPeriod('yearly')}
              >
                Yearly <span className="text-xs font-bold text-green-500">Save 20%</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.popular 
                  ? 'card-highlight border-2 border-iptv-purple relative' 
                  : 'bg-white shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-iptv-purple text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">${billingPeriod === 'yearly' ? (plan.price * 0.8).toFixed(2) : plan.price}</span>
                  <span className="text-gray-500 text-sm">/{billingPeriod === 'yearly' ? 'mo (billed yearly)' : 'month'}</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={`/checkout?plan=${plan.id}&billing=${billingPeriod}`}
                  className="block w-full"
                >
                  <Button 
                    className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    Choose {plan.name}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 text-gray-500 text-sm">
          All plans include a 7-day money-back guarantee. No questions asked.
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
