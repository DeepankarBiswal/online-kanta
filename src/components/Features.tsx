import { Clock, Shield, Wallet } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Clock,
      title: 'Instant Pickup Scheduling',
      description: 'Book your scrap pickup in seconds. Choose your preferred time slot and we\'ll be there promptly.',
      color: 'from-[#4ADE80] to-[#10B981]'
    },
    {
      icon: Shield,
      title: 'Verified Agents & Digital Weighing',
      description: 'All agents are background-verified. Watch live weighing with calibrated digital scales for complete transparency.',
      color: 'from-[#60A5FA] to-[#6366F1]'
    },
    {
      icon: Wallet,
      title: 'Guaranteed Transparent Pricing',
      description: 'Get real-time market rates. No hidden charges, no haggling. Fair prices backed by our guarantee.',
      color: 'from-[#22D3EE] to-[#10B981]'
    }
  ];

  return (
    <section className="w-full py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111827] mb-4">
            Why Choose ScrapFlow?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of scrap recycling with cutting-edge technology and unmatched transparency
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative rounded-[20px] bg-white/60 backdrop-blur-md p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-2"
              >
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-extrabold text-[#111827] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative gradient */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${feature.color} rounded-b-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
