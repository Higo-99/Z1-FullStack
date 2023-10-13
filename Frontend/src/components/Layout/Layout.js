import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.scss'

const Layout = () => {
    return (
        <div className="webBackgruond">
            <div className="header">
                <Header />
            </div>

            <div className="homeBody">
                <Outlet />
            </div>

            <div className="footer">
                <Footer />
            </div>
        </div>
    )
};

export default Layout;