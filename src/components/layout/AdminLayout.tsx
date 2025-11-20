import type { ReactNode } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SidebarAdmin from "./SidebarAdmin";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { i18n, t } = useTranslation();

  // Prevent the fixed sidebar from overlapping the main content on md+ screens.
  // If language is Arabic (RTL) the sidebar sits on the right, so add md:pr-64,
  // otherwise add md:pl-64 for LTR (left sidebar).
  const sidePaddingClass = i18n.language === "ar" ? "md:pr-64" : "md:pl-64";

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">

      {/* Sidebar (responsive) */}
      <SidebarAdmin isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <main className={`flex-1 p-4 sm:p-8 overflow-y-auto ${sidePaddingClass}`}>
        {/* Mobile header: show toggle for sidebar */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label={t("sidebar.open")}
            className="bg-white dark:bg-gray-800 p-2 rounded-md shadow inline-flex items-center"
          >
            ☰
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}
