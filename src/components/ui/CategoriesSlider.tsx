import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// @ts-ignore: CSS module imports without type declarations
import "swiper/css";
// @ts-ignore: CSS module imports without type declarations
import "swiper/css/pagination";
// @ts-ignore: CSS module imports without type declarations
import "swiper/css/navigation";

const categories = [
  {
    title: "ساعد مريضًا",
    description: "رعاية صحية للمتعففين",
    image: "/images/ihsan/medical.jpg",
  },
  {
    title: "ساند معسرًا",
    description: "سداد ديون المعسرين",
    image: "/images/ihsan/debt.jpg",
  },
  {
    title: "اكفل يتيمًا",
    description: "تسهيل حياة الأيتام",
    image: "/images/ihsan/orphan.jpg",
  },
  {
    title: "أخرج زكاةً",
    description: "إيصال الزكاة للمستحقين",
    image: "/images/ihsan/zakat.jpg",
    tag: "قَبِل الزكاة",
  },
  {
    title: "أغث متضررًا",
    description: "المشاريع الإغاثية لدول العالم",
    image: "/images/ihsan/relief.jpg",
  },
  {
    title: "وفر مسكنًا",
    description: "توفير مساكن للمتعففين",
    image: "/images/ihsan/shelter.jpg",
  },
  {
    title: "فرّج كربًا",
    description: "تفريج عن المكروبين",
    image: "/images/ihsan/help.jpg",
  },
  {
    title: "أطعم متعففًا",
    description: "توفير سلال غذائية",
    image: "/images/ihsan/food.jpg",
  },
];

export default function CategoriesSlider() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#0f5132] dark:text-green-400">
            مجالات الإحسان
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            فُرَص للعطاء في مختلف المجالات الخيرية
          </p>
        </div>

        {/* Swiper Slider */}
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
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">

                {/* Background Image */}
                <img
                  src={item.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-green-900/80 via-green-800/20 to-transparent" />

                {/* Tag */}
                {item.tag && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
                    {item.tag}
                  </span>
                )}

                {/* Text Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.description}</p>

                  {/* Arrow */}
                  <button className="mt-3 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
