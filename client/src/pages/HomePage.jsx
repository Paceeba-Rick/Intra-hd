import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket, FaShieldAlt, FaClock, FaMapMarkerAlt, FaWhatsapp, FaStar, FaCheckCircle } from 'react-icons/fa';
import { MdLocalShipping, MdSupportAgent, MdDeliveryDining } from 'react-icons/md';
import ResidenceTypeSelector from '../components/ResidenceTypeSelector';

const HomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const handleResidenceSelect = (residenceType) => {
    navigate(`/order/${residenceType}`);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Testimonial data
  const testimonials = [
    {
      name: "Sarah A.",
      residence: "Legon Hall",
      text: "INTRA-HD has been a lifesaver during exam week! The delivery was prompt and the service exceptional.",
      rating: 5
    },
    {
      name: "Michael K.",
      residence: "Commonwealth Hall",
      text: "I was skeptical at first, but they delivered my package in under 30 minutes. Impressive service!",
      rating: 5
    },
    {
      name: "Jessica T.",
      residence: "Jean Nelson Hostel",
      text: "Their delivery personnel are always courteous and professional. My go-to delivery service on campus.",
      rating: 4
    }
  ];
  
  // FAQ data
  const faqs = [
    {
      question: "How quickly can you deliver my order?",
      answer: "We typically deliver within 30-45 minutes of receiving your order, depending on your location on campus and the nature of the delivery."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We currently accept Mobile Money (MoMo) payments through our secure payment gateway."
    },
    {
      question: "Do you deliver to all halls and hostels on campus?",
      answer: "Yes! We deliver to all locations on campus including Legon Hall, traditional halls like Commonwealth and Volta, and all private hostels."
    },
    {
      question: "Is there a minimum order amount?",
      answer: "No, there is no minimum order amount. You only pay for your items plus our fixed delivery fee."
    }
  ];

  // Featured partners
  const partners = [
    "Night Market", "Bush Canteen", "Farmer's Kitchen", "University Bookshop", "All Needs Supermarket", "And Many Others"
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-12 pb-24 md:pb-32 overflow-hidden"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/src/assets/campus-pattern.svg')] opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Campus Delivery, <span className="text-yellow-400">Simplified</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Get anything delivered anywhere on campus within minutes. Food, groceries, essentials - we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button 
                onClick={() => document.getElementById('residence-selector').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold rounded-full text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Order Now
              </button>
              <a 
                href="https://wa.me/233533125955" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-full text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <FaWhatsapp size={20} />
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20"
              variants={fadeIn}
            >
              <div className="flex justify-center mb-2">
                <FaClock className="text-yellow-300" size={28} />
              </div>
              <h3 className="font-semibold">Fast Delivery</h3>
              <p className="text-sm opacity-80">30-45 mins</p>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20"
              variants={fadeIn}
            >
              <div className="flex justify-center mb-2">
                <FaMapMarkerAlt className="text-yellow-300" size={28} />
              </div>
              <h3 className="font-semibold">Full Coverage</h3>
              <p className="text-sm opacity-80">All campus areas</p>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20"
              variants={fadeIn}
            >
              <div className="flex justify-center mb-2">
                <FaShieldAlt className="text-yellow-300" size={28} />
              </div>
              <h3 className="font-semibold">Secure Payments</h3>
              <p className="text-sm opacity-80">Verified MoMo</p>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20"
              variants={fadeIn}
            >
              <div className="flex justify-center mb-2">
                <MdSupportAgent className="text-yellow-300" size={28} />
              </div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm opacity-80">Always available</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full">
            <path fill="#f8fafc" fillOpacity="1" d="M0,128L60,133.3C120,139,240,149,360,176C480,203,600,245,720,245.3C840,245,960,203,1080,176C1200,149,1320,139,1380,133.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How It <span className="text-blue-600">Works</span>
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-yellow-500 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Select Your Location</h3>
              <p className="text-gray-600">Choose your hall, hostel or residence to get started with your order</p>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Tell Us What You Need</h3>
              <p className="text-gray-600">Fill in the details of what you need delivered and your contact information</p>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pay & Receive</h3>
              <p className="text-gray-600">Complete your order with secure payment and wait for your delivery</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Deliver Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              What We <span className="text-blue-600">Deliver</span>
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-yellow-500 mx-auto mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From meals to groceries, books to essentials - we deliver anything you need, anywhere on campus
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <motion.div 
              className="bg-blue-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍕</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Food & Drinks</h3>
              <p className="text-sm text-gray-600">From campus cafeterias or restaurants</p>
            </motion.div>

            <motion.div 
              className="bg-green-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Groceries</h3>
              <p className="text-sm text-gray-600">Daily essentials and supplies</p>
            </motion.div>

            <motion.div 
              className="bg-purple-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Books & Stationery</h3>
              <p className="text-sm text-gray-600">Academic materials and supplies</p>
            </motion.div>

            <motion.div 
              className="bg-red-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Medicines</h3>
              <p className="text-sm text-gray-600">Over-the-counter medications</p>
            </motion.div>
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-500 italic">*Some items may be subject to availability</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/src/assets/dot-pattern.svg')] opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Choose <span className="text-yellow-400">INTRA-HD</span>
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-yellow-500 mx-auto mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>
            <p className="text-blue-200 max-w-2xl mx-auto">
              We're not just another delivery service. We understand campus life and tailor our services to meet your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <FaRocket className="text-yellow-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-blue-200">
                We understand that time is precious, especially for students. Our average delivery time is under 40 minutes.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <MdLocalShipping className="text-yellow-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Campus Experts</h3>
              <p className="text-blue-200">
                Our team knows every corner of campus. No matter where you're located, we'll find you.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <MdDeliveryDining className="text-yellow-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparent Pricing</h3>
              <p className="text-blue-200">
                No hidden fees or surprises. Just your order amount plus our fixed delivery fee of 6 GHS.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              What Students <span className="text-blue-600">Say</span>
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-yellow-500 mx-auto mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what students on campus are saying about our service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.residence}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-700">Our trusted campus partners</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
            {partners.map((partner, index) => (
              <motion.div 
                key={index} 
                className="text-gray-800 font-medium text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked <span className="text-blue-600">Questions</span>
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-yellow-500 mx-auto mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className="mb-6 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-700 mb-4">Still have questions?</p>
            <a 
              href="https://wa.me/233533125955" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors"
            >
              <FaWhatsapp size={20} className="mr-2" />
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Residence Selector Section */}
      <section id="residence-selector" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to <span className="text-blue-600">Order?</span>
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Select your residence type below to get started with your order
            </motion.p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <ResidenceTypeSelector onSelect={handleResidenceSelect} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Experience the best campus delivery service today!
            </motion.h2>
            <motion.p 
              className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join thousands of satisfied students who rely on INTRA-HD for their daily delivery needs
            </motion.p>
            <motion.button 
              onClick={() => document.getElementById('residence-selector').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold rounded-full text-lg transition-all shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Order Now
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
