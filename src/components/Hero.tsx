import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ✅ استيراد ملفات CSS الخاصة بـ Swiper
import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  const { t, i18n } = useTranslation();

  const slides = [
    {
      title: t("hero.slide1.title"),
      description: t("hero.slide1.description"),
      image: "/imgs/slider1.jpg",
      cta: "/donate",
    },
    {
      title: t("hero.slide2.title"),
      description: t("hero.slide2.description"),
      image: "/imgs/slider2.jpg",
      cta: "/donate",
    },
    {
      title: t("hero.slide3.title"),
      description: t("hero.slide3.description"),
      image: "/imgs/slider3.jpg",
      cta: "/campaigns",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4500 }}
        pagination={{ clickable: true }}
        loop={true}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className="w-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-[500px] sm:h-[600px] w-full flex items-center justify-center">
              <img
                src={s.image}
                alt={`slide-${i}`}
                className="absolute inset-0 w-full h-full object-cover brightness-50 scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className={`relative z-10 max-w-2xl px-6 text-center ${
                  i18n.language === "ar" ? "rtl" : "ltr"
                }`}
              >
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
                  {s.title}
                </h1>
                <p className="text-lg text-gray-200 mb-8 leading-relaxed drop-shadow">
                  {s.description}
                </p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Link
                    to={s.cta}
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition"
                  >
                    {t("hero.cta")}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
