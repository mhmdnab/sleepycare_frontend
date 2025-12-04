'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';

interface Partner {
  id: string;
  name: string;
  icon: string | null;
}

export function PartnersCarousel({ partners }: { partners: Partner[] }) {
  console.log('PartnersCarousel - partners:', partners);

  if (!partners || partners.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No partners available at the moment.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
        className="partners-swiper"
      >
        {partners.map((partner, index) => (
          <SwiperSlide key={partner.id || index}>
            <div className="bg-white p-6 transition-all duration-300 hover:scale-105 h-full">
              <div className="flex flex-col items-center justify-center space-y-3 h-full">
                {partner.icon && (
                  <img
                    src={partner.icon || '/placeholder-partner.png'}
                    alt={partner.name}
                    className="h-16 w-auto object-contain"
                  />
                ) }
                <p className="text-sm font-medium text-gray-700 text-center">{partner.name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
