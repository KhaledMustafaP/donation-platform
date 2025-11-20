import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
 // @ts-ignore

import "swiper/css";
 // @ts-ignore

import "swiper/css/pagination";

export default function Hero() {
  const { t, i18n } = useTranslation();

  const slides = [
    {
      title: "ساهم في إنقاذ حياة محتاج",
      description: "تبرعك اليوم يصنع فرقًا حقيقيًا… دع يدك تمتد لمن ينتظر العون.",
      image:
        "https://iunsplash.com/photo-1604881991720-f91d17d0b3d2?auto=format&it=crop&w=2000&q=80",
      cta: "/donate",
    },
    {
      title: "كن عونًا لأسرة فقيرة",
      description: "ساهم في توفير الغذاء والدواء والكساء لمن هم بأمس الحاجة إليك.",
      image:
        "https://i=s.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&it=crop&w=2000&q=80",
      cta: "/donate",
    },
    {
      title: "شارك في دعم الأيتام",
      description: "بمساعدتك، نمنحهم فرصةً لحياة كريمة ومستقبلٍ أفضل.",
      image:
        "https://iunsplash.com/photo-1524504388940-b1c1722653e1?auto=formt&fit=crop&w=2000&q=80",
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

              {/* Background Image */}
              <img
                src={s.image}
                alt="slide-bg"
                className="absolute inset-0 w-full h-full object-cover brightness-50 scale-105"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/70"></div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="relative z-10 max-w-2xl text-center px-6"
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
                    {t("home.donate")}
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
