import { Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Homeowner',
      image: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDcxNDcwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      feedback: 'ScrapFlow made recycling so easy! The agent was professional, the weighing was transparent, and I got paid instantly. Highly recommended!'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ2NDkyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      feedback: 'We generate a lot of scrap at our workshop. ScrapFlow\'s business plan is perfect for us - regular pickups and competitive rates without any hassle.'
    },
    {
      name: 'Anita Desai',
      role: 'Society Manager',
      image: 'https://images.unsplash.com/photo-1530281834572-02d15fa61f64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlcnNvbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDczNzA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      feedback: 'Managing scrap collection for 200+ flats was a nightmare. ScrapFlow\'s enterprise plan handles everything smoothly. Great service!'
    }
  ];

  return (
    <section className="w-full py-20 lg:py-28 bg-linear-to-br from-[#F8FAFC] to-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111827] mb-4">
            Loved by Households & Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust ScrapFlow for their recycling needs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-[20px] bg-white/60 backdrop-blur-md p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-2"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#4ADE80] text-[#4ADE80]" />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.feedback}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <div className="relative">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-[#4ADE80]/30"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#4ADE80] rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-[#111827]">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
