
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  User, 
  Mail, 
  Phone, 
  Home, 
  Lock,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const planDetails = {
  basic: {
    name: 'Basic',
    monthlyPrice: 9.99,
    yearlyPrice: 7.99
  },
  standard: {
    name: 'Standard',
    monthlyPrice: 14.99,
    yearlyPrice: 11.99
  },
  premium: {
    name: 'Premium',
    monthlyPrice: 19.99,
    yearlyPrice: 15.99
  },
  family: {
    name: 'Family',
    monthlyPrice: 24.99,
    yearlyPrice: 19.99
  }
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const queryParams = new URLSearchParams(location.search);
  const planId = queryParams.get('plan') || 'standard';
  const billing = queryParams.get('billing') || 'monthly';
  
  const plan = planDetails[planId as keyof typeof planDetails];
  const price = billing === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
      
      setFormData({ ...formData, [name]: formattedValue });
      return;
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
      
      setFormData({ ...formData, [name]: formattedValue });
      return;
    }
    
    // Format CVV (limit to 3-4 digits)
    if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 4);
      setFormData({ ...formData, [name]: formattedValue });
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };
  
  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };
  
  const goToHome = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {!isComplete ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Complete Your Subscription</h1>
                <p className="text-gray-600">
                  You're subscribing to the {plan.name} plan ({billing === 'yearly' ? 'Yearly' : 'Monthly'})
                </p>
              </div>
              
              <div className="flex mb-8 relative">
                <div className="w-full flex items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      step >= 1 ? 'bg-iptv-purple text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    1
                  </div>
                  <div 
                    className={`h-1 flex-grow ${
                      step > 1 ? 'bg-iptv-purple' : 'bg-gray-200'
                    }`}
                  />
                </div>
                <div className="w-full flex items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      step >= 2 ? 'bg-iptv-purple text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    2
                  </div>
                  <div 
                    className={`h-1 flex-grow ${
                      step > 2 ? 'bg-iptv-purple' : 'bg-gray-200'
                    }`}
                  />
                </div>
                <div>
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      step >= 3 ? 'bg-iptv-purple text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    3
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card className="shadow-md">
                    <CardContent className="p-6">
                      {step === 1 && (
                        <form>
                          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="fullName" className="flex items-center">
                                <User size={16} className="mr-1" /> Full Name
                              </Label>
                              <Input
                                id="fullName"
                                name="fullName"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="email" className="flex items-center">
                                <Mail size={16} className="mr-1" /> Email Address
                              </Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="phone" className="flex items-center">
                                <Phone size={16} className="mr-1" /> Phone Number
                              </Label>
                              <Input
                                id="phone"
                                name="phone"
                                placeholder="+1 234 567 890"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="mt-8">
                            <Button type="button" className="btn-primary w-full" onClick={nextStep}>
                              Continue to Address
                            </Button>
                          </div>
                        </form>
                      )}
                      
                      {step === 2 && (
                        <form>
                          <h2 className="text-xl font-semibold mb-6">Billing Address</h2>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="address" className="flex items-center">
                                <Home size={16} className="mr-1" /> Address
                              </Label>
                              <Input
                                id="address"
                                name="address"
                                placeholder="123 Main St"
                                value={formData.address}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="city">City</Label>
                                <Input
                                  id="city"
                                  name="city"
                                  placeholder="New York"
                                  value={formData.city}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="zipCode">Zip Code</Label>
                                <Input
                                  id="zipCode"
                                  name="zipCode"
                                  placeholder="10001"
                                  value={formData.zipCode}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="country">Country</Label>
                              <Input
                                id="country"
                                name="country"
                                placeholder="United States"
                                value={formData.country}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-4 mt-8">
                            <Button type="button" variant="outline" onClick={prevStep}>
                              <ArrowLeft size={16} className="mr-1" /> Back
                            </Button>
                            <Button type="button" className="btn-primary flex-grow" onClick={nextStep}>
                              Continue to Payment
                            </Button>
                          </div>
                        </form>
                      )}
                      
                      {step === 3 && (
                        <form onSubmit={handleSubmit}>
                          <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="cardName" className="flex items-center">
                                <User size={16} className="mr-1" /> Name on Card
                              </Label>
                              <Input
                                id="cardName"
                                name="cardName"
                                placeholder="John Doe"
                                value={formData.cardName}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="cardNumber" className="flex items-center">
                                <CreditCard size={16} className="mr-1" /> Card Number
                              </Label>
                              <Input
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="4242 4242 4242 4242"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input
                                  id="expiryDate"
                                  name="expiryDate"
                                  placeholder="MM/YY"
                                  value={formData.expiryDate}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvv" className="flex items-center">
                                  <Lock size={16} className="mr-1" /> CVV
                                </Label>
                                <Input
                                  id="cvv"
                                  name="cvv"
                                  placeholder="123"
                                  value={formData.cvv}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 mt-8">
                            <Button type="button" variant="outline" onClick={prevStep}>
                              <ArrowLeft size={16} className="mr-1" /> Back
                            </Button>
                            <Button 
                              type="submit" 
                              className="btn-primary flex-grow"
                              disabled={isProcessing}
                            >
                              {isProcessing ? 'Processing...' : 'Complete Subscription'}
                            </Button>
                          </div>
                        </form>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Plan</span>
                          <span className="font-medium">{plan.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Billing</span>
                          <span className="font-medium capitalize">{billing}</span>
                        </div>
                        <div className="border-t pt-3 mt-3 flex justify-between">
                          <span className="text-gray-600">Total</span>
                          <span className="text-lg font-bold">
                            ${price.toFixed(2)}
                            <span className="text-sm font-normal text-gray-500">
                              /{billing === 'yearly' ? 'mo (billed yearly)' : 'month'}
                            </span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500 mt-6">
                        By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <Card className="shadow-lg max-w-2xl mx-auto animate-scale-in">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-600" size={36} />
                </div>
                
                <h1 className="text-2xl font-bold mb-2">Subscription Successful!</h1>
                <p className="text-gray-600 mb-8">
                  Thank you for subscribing to StreamSizzle. Your {plan.name} plan is now active.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Subscription Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500 text-left">Plan:</div>
                      <div className="text-right font-medium">{plan.name}</div>
                      <div className="text-gray-500 text-left">Billing:</div>
                      <div className="text-right font-medium capitalize">{billing}</div>
                      <div className="text-gray-500 text-left">Price:</div>
                      <div className="text-right font-medium">
                        ${price.toFixed(2)}/{billing === 'yearly' ? 'mo (billed yearly)' : 'month'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">What's Next?</h3>
                    <p className="text-sm text-gray-600 text-left">
                      Check your email for login details and instructions on how to set up your devices.
                    </p>
                  </div>
                </div>
                
                <Button className="btn-primary" onClick={goToHome}>
                  Return to Homepage
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
