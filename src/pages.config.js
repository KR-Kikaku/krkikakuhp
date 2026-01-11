import Home from './pages/Home';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminCarousel from './pages/AdminCarousel';
import AdminBusiness from './pages/AdminBusiness';


export const PAGES = {
    "Home": Home,
    "NewsList": NewsList,
    "NewsDetail": NewsDetail,
    "PrivacyPolicy": PrivacyPolicy,
    "AdminLogin": AdminLogin,
    "AdminDashboard": AdminDashboard,
    "AdminCarousel": AdminCarousel,
    "AdminBusiness": AdminBusiness,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};