import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PricingPlan } from '../types';

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    duration: 30,
    features: [
      'Access to 10 courses',
      'Basic certificate',
      'Email support',
      '30-day access',
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 19.99,
    duration: 90,
    features: [
      'Access to all courses',
      'Premium certificates',
      'Priority support',
      '90-day access',
      'Downloadable resources',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49.99,
    duration: 365,
    features: [
      'Unlimited access to all courses',
      'Premium certificates',
      '24/7 priority support',
      '1-year access',
      'Downloadable resources',
      'Team management',
      'Custom learning paths',
    ],
  },
];

export default function Pricing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pt-20">
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Section Title */}
      <motion.div
        variants={itemVariants}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Learning Journey
        </h1>
        <p className="text-xl text-gray-600">
          Select the plan that best fits your learning goals and budget
        </p>
      </motion.div>

      {/* Pricing Plans */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {PRICING_PLANS.map((plan) => (
          <motion.div
            key={plan.id}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <div className="p-8">
              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {plan.name}
              </h3>

              {/* Plan Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-gray-600">/month</span>
              </div>

              {/* Plan Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Get Started Button */}
              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-300 ${
                  plan.id === "pro"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                Get Started
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </div>
);

}