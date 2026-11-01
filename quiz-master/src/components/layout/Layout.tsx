import { Outlet } from "react-router-dom";
import Header from "../header/Header";

const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <main className="main">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;