import AdminBusiness from './pages/AdminBusiness';
import AdminCarousel from './pages/AdminCarousel';
import AdminContacts from './pages/AdminContacts';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminNews from './pages/AdminNews';
import AdminPrivacyPolicy from './pages/AdminPrivacyPolicy';
import AdminSettings from './pages/AdminSettings';
import AdminUsers from './pages/AdminUsers';
import Home from './pages/Home';
import NewsDetail from './pages/NewsDetail';
import NewsList from './pages/NewsList';
import PrivacyPolicy from './pages/PrivacyPolicy';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminBusiness": AdminBusiness,
    "AdminCarousel": AdminCarousel,
    "AdminContacts": AdminContacts,
    "AdminDashboard": AdminDashboard,
    "AdminLogin": AdminLogin,
    "AdminNews": AdminNews,
    "AdminPrivacyPolicy": AdminPrivacyPolicy,
    "AdminSettings": AdminSettings,
    "AdminUsers": AdminUsers,
    "Home": Home,
    "NewsDetail": NewsDetail,
    "NewsList": NewsList,
    "PrivacyPolicy": PrivacyPolicy,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};