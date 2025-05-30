import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "../../assets/styles/Banner.css"; // Custom styling for overlay

export default function Banner() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="absolute inset-0 z-[-2] h-full w-full"
      >
        {["/images/cover01.jpg", "/images/cover02.jpg", "/images/cover03.jpg"].map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-[-1]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 py-16 w-full max-w-screen-xl">
        <div className="md:w-1/2 mb-12 md:mb-0" data-aos="fade-up">
          <h1 className="text-5xl font-bold text-white mb-6">
            Capturing Memories
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-brand mb-6">
            With Zenith Studio
          </h2>
          <p className="text-lg text-gray-100 mb-4">
            We specialize in storytelling through photography. From weddings to portraits, we capture your most precious moments with precision and creativity.
          </p>
          <a
            href="/order"
            className="px-6 py-3 bg-brand text-white rounded-lg text-lg font-semibold shadow hover:bg-red-700 transition cursor-pointer"
          >
            Order Now
          </a>
         
        </div>

        <div data-aos="fade-left" className="md:w-1/2">
          <div className="rounded-xl overflow-hidden animate-float shadow-xl">
            <img
              src="/images/cover01.jpg"
              alt="Photography Showcase"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
