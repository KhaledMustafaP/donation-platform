import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import Campaigns from "./pages/campaigns/Campaigns";
import About from "./pages/About";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import CampaignList from "./pages/admin/CampaignList";
import AddCampaign from "./pages/admin/AddCampaitn";
import EditCampaign from "./pages/admin/EditCampaign";
import AdminLayout from "./components/layout/AdminLayout";
import Profile from "./pages/profile/Profile";
import CampaignDetails from "./pages/campaigns/CampaignDetails";
import ZakatCalculator from "./pages/user/ZakatCalculator";
import ZakatPage from "./pages/services/Zakat";
import SacrificePage from "./pages/services/Sacrifice";
import GiftPage from "./pages/services/Gift";
import SmsPage from "./pages/services/SmsPage";
import RecurringDonationPage from "./pages/services/Recurring";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />{" "}
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaigns/:id" element={<CampaignDetails />} />
        <Route path="/user/zakat-calculator" element={<ZakatCalculator />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route path="/zakat" element={<ZakatPage />} />
<Route path="/sacrifice" element={<SacrificePage />} />
<Route path="/gift" element={<GiftPage />} />
<Route path="/sms" element={<SmsPage />} />
<Route path="/recurring" element={<RecurringDonationPage />} />
        <Route
          path="/admin/campaigns"
          element={
            <AdminLayout>
              <CampaignList />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/campaigns/add"
          element={
            <AdminLayout>
              <AddCampaign />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/campaigns/:id/edit"
          element={
            <AdminLayout>
              <EditCampaign />
            </AdminLayout>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
