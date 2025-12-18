import {
  Gift,
  BadgePercent,
  Inbox,
  Megaphone,
  ArrowLeftRight,
  CreditCard,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import ZakatPage from "../../pages/services/Zakat";
import { Link } from "react-router-dom";

export default function ServicesFlipSection() {
  const { t, i18n } = useTranslation();

  const services = [
    {
      title: t("services.zakat.title"),
      description: t("services.zakat.description"),
      icon: BadgePercent,
      link: "/zakat",
    },
    {
      title: t("services.sacrifice.title"),
      description: t("services.sacrifice.description"),
      icon: Inbox,
      link: "/sacrifice",
    },
    {
      title: t("services.gift.title"),
      description: t("services.gift.description"),
      icon: Gift,
      link: "/gift",
    },
    {
      title: t("services.sms.title"),
      description: t("services.sms.description"),
      icon: Megaphone,
      link: "/sms",
    },
    {
      title: t("services.campaign.title"),
      description: t("services.campaign.description"),
      icon: ArrowLeftRight,
      link: "/campaigns",
    },
    {
      title: t("services.recurring.title"),
      description: t("services.recurring.description"),
      icon: CreditCard,
      link: "/recurring",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* العنوان */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-green-700 dark:text-green-400">
            {t("services.section_title")} 🌿
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
            {t("services.section_subtitle")}
          </p>
        </div>

        {/* الشبكة */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ${
            i18n.language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {services.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="w-full h-64 group [perspective:1000px] cursor-pointer"
              >
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* الوجه الأمامي */}
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

                  {/* الوجه الخلفي */}
                  <div
                    className="absolute inset-0 bg-green-700 dark:bg-green-600 text-white rounded-2xl p-6 
                               flex flex-col items-center justify-center gap-4 text-center 
                               [transform:rotateY(180deg)] [backface-visibility:hidden]"
                  >
                    <p className="text-lg leading-relaxed">
                      {item.description}
                    </p>
                    <Link
                      to={item.link}
                      className="mt-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition text-white text-sm"
                    >
                      {t("services.more")}
                    </Link>
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
