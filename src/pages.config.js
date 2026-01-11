import Home from './pages/Home';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminLogin from './pages/AdminLogin';


export const PAGES = {
    "Home": Home,
    "NewsList": NewsList,
    "NewsDetail": NewsDetail,
    "PrivacyPolicy": PrivacyPolicy,
    "AdminLogin": AdminLogin,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};