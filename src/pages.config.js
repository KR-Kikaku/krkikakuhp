/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import AdminBusiness from './pages/AdminBusiness';
import AdminCarousel from './pages/AdminCarousel';
import AdminContacts from './pages/AdminContacts';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminPrivacyPolicy from './pages/AdminPrivacyPolicy';
import AdminSettings from './pages/AdminSettings';
import AdminUsers from './pages/AdminUsers';
import NewsDetail from './pages/NewsDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Home from './pages/Home';
import AdminNews from './pages/AdminNews';
import NewsList from './pages/NewsList';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminBusiness": AdminBusiness,
    "AdminCarousel": AdminCarousel,
    "AdminContacts": AdminContacts,
    "AdminDashboard": AdminDashboard,
    "AdminLogin": AdminLogin,
    "AdminPrivacyPolicy": AdminPrivacyPolicy,
    "AdminSettings": AdminSettings,
    "AdminUsers": AdminUsers,
    "NewsDetail": NewsDetail,
    "PrivacyPolicy": PrivacyPolicy,
    "Home": Home,
    "AdminNews": AdminNews,
    "NewsList": NewsList,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};