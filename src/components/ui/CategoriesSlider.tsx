import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";

// @ts-ignore: CSS module imports without type declarations
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/navigation";

export default function CategoriesSlider() {
  const { t, i18n } = useTranslation();

  // 🧩 نقرأ النصوص من ملفات الترجمة بدل الثابت
  const categories = [
    {
      title: t("categories.medical.title"),
      description: t("categories.medical.description"),
      image: "imgs/helpPatient.jpg",
    },
    {
      title: t("categories.debt.title"),
      description: t("categories.debt.description"),
      image: "imgs/debt.jpg",
    },
    {
      title: t("categories.orphan.title"),
      description: t("categories.orphan.description"),
      image: "imgs/orphan.jpg",
    },
    {
      title: t("categories.zakat.title"),
      description: t("categories.zakat.description"),
      image: "imgs/zakat.jpg",
      tag: t("categories.zakat.tag"),
    },
    
    {
      title: t("categories.shelter.title"),
      description: t("categories.shelter.description"),
      image: "imgs/categoriesSliderShelter.jpg",
    },
    {
      title: t("categories.food.title"),
      description: t("categories.food.description"),
      image: "imgs/donate1.jpg",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* 🌍 العنوان */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#0f5132] dark:text-green-400">
            {t("categories.section_title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t("categories.section_subtitle")}
          </p>
        </div>

        {/* 🌀 السلايدر */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-10"
          dir={i18n.language === "ar" ? "rtl" : "ltr"} // ✅ الاتجاه حسب اللغة
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-linear-to-t from-green-900/80 via-green-800/20 to-transparent" />

                {item.tag && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
                    {item.tag}
                  </span>
                )}

                <div
                  className={`absolute bottom-4 left-4 right-4 ${
                    i18n.language === "ar" ? "text-right" : "text-left"
                  } text-white`}
                >
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.description}</p>

                  
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
