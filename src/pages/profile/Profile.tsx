import { useAuth } from "../../hooks/useAuth";
import { useDonations } from "../../hooks/useDonations";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import useCurrency from "../../hooks/useCurrency";
import formatCurrency from "../../utils/formatCurrency";

export default function Profile() {
  const { user } = useAuth();
  const { donations } = useDonations();
  const { i18n, t } = useTranslation();
  const { currency, decimals, setCurrency, setDecimals } = useCurrency();

  // 🔥 ضمان email آمن وسليم
  const email =
    user && typeof user.email === "string" ? user.email : "";

  const name =
    email && email.includes("@") ? email.split("@")[0] : "Guest User";

  const defaultProfile = {
    name,
    email,
    avatar:
      "https://ui-avatars.com/api/?name=User&background=22c55e&color=fff",
    password: "123456",
  };

  // تحميل من التخزين
  const saved = localStorage.getItem("profileData");
  const [formData, setFormData] = useState(
    saved ? JSON.parse(saved) : defaultProfile
  );

  const [isEditing, setIsEditing] = useState(false);
  const [passwords, setPasswords] = useState({
    newPass: "",
    confirmPass: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 تحديث آمن بدون مشاكل
  const handleSave = () => {
    let updatedData = { ...formData };

    if (passwords.newPass || passwords.confirmPass) {
      if (passwords.newPass !== passwords.confirmPass) {
        alert(t("profile.alert.password_mismatch"));
        return;
      }
      updatedData.password = passwords.newPass;
      alert(t("profile.alert.password_updated"));
    }

    setFormData(updatedData);
    localStorage.setItem("profileData", JSON.stringify(updatedData));
    setIsEditing(false);
  };

  // Reset
  const handleReset = () => {
    if (confirm(t("profile.confirm.reset"))) {
      setFormData(defaultProfile);
      localStorage.removeItem("profileData");
    }
  };

  // تبرعات المستخدم
  const userDonations = donations.filter(
    (d) => d.email === email
  );

  const totalAmount = userDonations.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-24 p-6">
      <motion.div
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 🧍‍♂️ Basic Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
          <img
            src={formData.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-green-500 shadow-md"
          />

          <div
            className={`${
              i18n.language === "ar" ? "text-right" : "text-left"
            } flex-1`}
          >
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
              {formData.name}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {formData.email}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {user?.role === "admin" ? t("profile.role.admin") : t("profile.role.donor")}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition"
              >
                {t("profile.edit_button")}
              </button>

              <button
                onClick={handleReset}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition"
              >
                {t("profile.reset_button")}
              </button>
            </div>
          </div>
        </div>

        {/* 💰 Donations Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center mb-10">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t("profile.total_donations")}
            </p>
            <p className="text-xl font-bold text-green-700 dark:text-green-400">
              {formatCurrency(totalAmount)}
            </p>
          </div>

          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t("profile.donations_count")}
            </p>
            <p className="text-xl font-bold text-blue-700 dark:text-blue-400">
              {userDonations.length}
            </p>
          </div>

          <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t("profile.last_donation")}
            </p>
            <p className="text-xl font-bold text-yellow-700 dark:text-yellow-400">
              {userDonations.length > 0
                ? userDonations[userDonations.length - 1].date
                : "—"}
            </p>
          </div>
        </div>

        {/* 🧾 Recent Donations */}
        <h3 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-400">
          {t("profile.recent_donations")}
        </h3>

        {/* ⚙️ Settings (currency) */}
        <div className="mt-6 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">{t("profile.settings.title")}</h4>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex flex-col text-sm">
              <span className="text-gray-600 dark:text-gray-300">{t("profile.settings.currency_label")}</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-1 p-2 rounded-md bg-gray-50 dark:bg-gray-700 text-sm"
                aria-label={t("profile.settings.currency_label")}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="ILS">ILS (₪)</option>
              </select>
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={decimals > 0}
                onChange={(e) => setDecimals(e.target.checked ? 2 : 0)}
              />
              <span className="text-gray-600 dark:text-gray-300">{t("profile.settings.decimals_label")}</span>
            </label>
          </div>
        </div>

        {userDonations.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-center py-6">
            {t("profile.no_donations")}
          </p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-green-100 dark:bg-green-900/40 text-left">
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                  {t("profile.table.amount")}
                </th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                  {t("profile.table.type")}
                </th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                  {t("profile.table.date")}
                </th>
              </tr>
            </thead>
            <tbody>
              {userDonations
                .slice(-5)
                .reverse()
                .map((d, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <td className="p-3 border-b border-gray-300 dark:border-gray-700">
                      {formatCurrency(Number(d.amount))}
                    </td>
                    <td className="p-3 border-b border-gray-300 dark:border-gray-700">
                      {d.type === "once"
                        ? t("profile.type.once")
                        : t("profile.type.monthly")}
                    </td>
                    <td className="p-3 border-b border-gray-300 dark:border-gray-700">
                      {d.date}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {/* 🪟 Edit Modal */}
        {isEditing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-80 text-center">
              <h3 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-400">
                Edit Profile
              </h3>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mb-3 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mb-3 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none"
              />

              <input
                type="text"
                name="avatar"
                placeholder="Avatar URL"
                value={formData.avatar}
                onChange={handleChange}
                className="w-full mb-4 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none"
              />

              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Change Password
              </h4>

              <input
                type="password"
                name="newPass"
                placeholder="New Password"
                value={passwords.newPass}
                onChange={handlePasswordChange}
                className="w-full mb-2 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none"
              />

              <input
                type="password"
                name="confirmPass"
                placeholder="Confirm Password"
                value={passwords.confirmPass}
                onChange={handlePasswordChange}
                className="w-full mb-4 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none"
              />

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition"
                >
                  Save
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md text-sm transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
