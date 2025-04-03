import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/headerComponent.jsx';
import FooterComponent from './components/footerComponent.jsx';
import RestaurantListComponent from './components/restaurantListComponent.jsx';
import LoginComponent from './components/loginComponent.jsx';
import RegisterComponent from './components/registerComponent.jsx';
import routes from './data/routes.js';
import { ToastContainer, Zoom } from 'react-toastify';

function App() {
  return (
    <div id="root">
      <BrowserRouter>
        {/* Header 區塊，請在 HeaderComponent 裡面設定 className="header" 或在此處傳入 */}
        <HeaderComponent className="header" />
        {/* Main 內容區：包含左側 list 與右側 map */}
        <main className="main-content">
          <Routes>
            <Route path={routes.home} element={<RestaurantListComponent />} />
            <Route path={routes.login} element={<LoginComponent />} />
            <Route path={routes.register} element={<RegisterComponent />} />
          </Routes>
        </main>
        {/* Footer 區塊 */}
        <FooterComponent className="footer" />
      </BrowserRouter>
      
      <ToastContainer hideProgressBar autoClose={10000} transition={Zoom} />
    </div>
  );
}

export default App;
