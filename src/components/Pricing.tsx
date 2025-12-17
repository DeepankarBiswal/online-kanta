import { Check, Zap, Building2, Users } from 'lucide-react';

export function Pricing() {
  const plans = [
    {
      name: 'Basic',
      icon: Zap,
      price: '₹0',
      period: 'pickup charge',
      description: 'Best for homes',
      gradient: 'from-[#4ADE80] to-[#10B981]',
      features: [
        'Instant pickup scheduling',
        'Verified agents',
        'Digital weighing',
        'Transparent pricing',
        'UPI/Bank transfer',
        'Eco-friendly recycling'
      ],
      popular: false
    },
    {
      name: 'Business Plus',
      icon: Building2,
      price: '₹499',
      period: 'per month',
      description: 'For regular business needs',
      gradient: 'from-[#60A5FA] to-[#6366F1]',
      features: [
        'All Basic features',
        'Priority scheduling',
        'Dedicated account manager',
        'Weekly bulk pickups',
        'Premium rates (5% higher)',
        'Monthly analytics report',
        'Invoice & GST support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Users,
      price: 'Custom',
      period: 'pricing',
      description: 'Large housing societies & bulk scrap',
      gradient: 'from-[#22D3EE] to-[#10B981]',
      features: [
        'All Business Plus features',
        'Custom pickup schedules',
        'Multiple location support',
        'Real-time tracking dashboard',
        'Premium rates (10% higher)',
        'Quarterly business review',
        'White-label solution'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="w-full py-20 lg:py-28 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111827] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`relative rounded-[20px] p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 hover:-translate-y-2 ${
                  plan.popular
                    ? 'bg-linear-to-br from-[#111827] to-[#1f2937] border-[#4ADE80] scale-105'
                    : 'bg-white border-gray-200'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-6 py-2 bg-linear-to-r from-[#4ADE80] to-[#10B981] rounded-full shadow-lg">
                      <span className="text-sm font-bold text-[#111827]">MOST POPULAR</span>
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${plan.gradient} flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>

                {/* Plan Name */}
                <h3 className={`text-2xl font-extrabold mb-2 ${plan.popular ? 'text-white' : 'text-[#111827]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-gray-300' : 'text-gray-500'}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-extrabold ${plan.popular ? 'text-white' : 'text-[#111827]'}`}>
                      {plan.price}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${plan.popular ? 'text-gray-300' : 'text-gray-500'}`}>
                    {plan.period}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full bg-linear-to-br ${plan.gradient} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className={`text-sm ${plan.popular ? 'text-gray-200' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 rounded-full font-bold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-linear-to-r from-[#4ADE80] to-[#10B981] text-[#111827] hover:shadow-lg hover:shadow-[#4ADE80]/50'
                      : 'bg-linear-to-r from-gray-100 to-gray-200 text-[#111827] hover:from-[#4ADE80] hover:to-[#10B981]'
                  }`}
                >
                  Start Now
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Need a custom solution? We're here to help.
          </p>
          <button className="px-8 py-3 border-2 border-[#4ADE80] text-[#111827] font-bold rounded-full hover:bg-[#4ADE80] hover:shadow-lg transition-all duration-300">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}
