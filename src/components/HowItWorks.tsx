import { Calendar, Scale, Banknote } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Calendar,
      number: '01',
      title: 'Select Items & Schedule Pickup',
      description: 'Choose your scrap items from our catalog and pick a convenient time slot that works for you.',
      gradient: 'from-[#4ADE80] to-[#10B981]'
    },
    {
      icon: Scale,
      number: '02',
      title: 'Agent Collects & Weighs at Doorstep',
      description: 'Our verified agent arrives on time with calibrated digital scales for transparent weighing.',
      gradient: 'from-[#60A5FA] to-[#6366F1]'
    },
    {
      icon: Banknote,
      number: '03',
      title: 'Instant Payment — Recycled Responsibly',
      description: 'Get paid instantly via UPI or bank transfer. Your scrap is recycled with eco-friendly processes.',
      gradient: 'from-[#22D3EE] to-[#10B981]'
    }
  ];

  return (
    <section className="w-full py-20 lg:py-28 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111827] mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to turn your scrap into cash while protecting the environment
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-linear-to-r from-[#4ADE80] via-[#60A5FA] to-[#22D3EE] opacity-30" style={{ top: '80px', width: 'calc(100% - 160px)', left: '80px' }}></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="relative bg-linear-to-br from-white to-gray-50 rounded-[20px] p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Step Number */}
                  <div className="absolute -top-6 -left-6">
                    <div className={`w-20 h-20 rounded-2xl bg-linear-to-br ${step.gradient} flex items-center justify-center shadow-xl`}>
                      <span className="text-3xl font-extrabold text-white">{step.number}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mt-8 mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${step.gradient} opacity-10 flex items-center justify-center`}>
                      <Icon className="w-7 h-7 text-[#111827]" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-extrabold text-[#111827] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <div className="w-0.5 h-12 bg-linear-to-b from-[#4ADE80] to-[#60A5FA] opacity-30"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
