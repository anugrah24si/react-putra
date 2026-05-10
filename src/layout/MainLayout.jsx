import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout({
    activeSection,
    menuItems,
    onMenuClick,
    onAddMenu,
    onRemoveMenu,
    searchValue,
    onSearchChange,
}) {
    return (
        <div className="lc-shell">
            <div className="lc-shell__inner">
                <Sidebar
                    activeSection={activeSection}
                    menuItems={menuItems}
                    onMenuClick={onMenuClick}
                    onAddMenu={onAddMenu}
                    onRemoveMenu={onRemoveMenu}
                />

                <main className="lc-main">
                    <Header
                        searchValue={searchValue}
                        onSearchChange={onSearchChange}
                    />
                    <div className="lc-content">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
