import { Gift, BadgePercent, Inbox, Megaphone, ArrowLeftRight, CreditCard } from "lucide-react";

const services = [
  {
    title: "الزكاة",
    description: "إمكانية حساب ودفع الزكاة بسهولة وسرعة عبر المنصة.",
    icon: BadgePercent,
  },
  {
    title: "الأضاحي",
    description: "توكيل ذبح الأضاحي والعقيقة وتوزيعها على مستحقيها.",
    icon: Inbox,
  },
  {
    title: "الإهداء",
    description: "إهداء التبرعات للأهل والأصدقاء في المناسبات الاجتماعية.",
    icon: Gift,
  },
  {
    title: "التبرع بالرسائل",
    description: "التبرع عبر الرسائل النصية لأهم المشاريع المستعجلة.",
    icon: Megaphone,
  },
  {
    title: "الحملات",
    description: "إمكانية إنشاء حملتك الخاصة لجمع التبرعات بسهولة.",
    icon: ArrowLeftRight,
  },
  {
    title: "التبرع الدوري",
    description: "استقطاع شهري تلقائي لدعم المشاريع الخيرية.",
    icon: CreditCard,
  },
];

export default function ServicesFlipSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-green-700 dark:text-green-400">
            خدمات الإحسان 🌿
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
            طرق مختلفة تسهّل عليك العطاء بكل يسر
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {services.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="w-full h-64 group [perspective:1000px] cursor-pointer"
              >
                <div
                  className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                >
                  {/* Front Face */}
                  <div
                    className="absolute inset-0 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 
                              dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center gap-4 
                              [backface-visibility:hidden]"
                  >
                    <Icon className="w-12 h-12 text-green-700 dark:text-green-400" />

                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {item.title}
                    </h3>
                  </div>

                  {/* Back Face */}
                  <div
                    className="absolute inset-0 bg-green-700 dark:bg-green-600 text-white rounded-2xl p-6 
                               flex flex-col items-center justify-center gap-4 text-center 
                               [transform:rotateY(180deg)] [backface-visibility:hidden]"
                  >
                    <p className="text-lg leading-relaxed">
                      {item.description}
                    </p>

                    <button className="mt-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                      المزيد
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
