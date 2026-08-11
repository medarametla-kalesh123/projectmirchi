import React, { useState } from "react";
import "./Navbar.css";

import SetupMenu from "./menus/SetupMenu";
import TransactionMenu from "./menus/TransactionMenu";
import ReportsMenu from "./menus/ReportsMenu";
import ToolsMenu from "./menus/ToolsMenu";

function Navbar({ setPage }) {

    const [activeMenu, setActiveMenu] = useState(null);

    // =====================================================
    // CHANGE PAGE
    // =====================================================

    const changePage = (pageName) => {
        setPage(pageName);
        setActiveMenu(null);
    };

    // =====================================================
    // OPEN MENU
    // =====================================================

    const openMenu = (menuName) => {
        setActiveMenu(menuName);
    };

    // =====================================================
    // CLOSE MENU
    // =====================================================

    const closeMenu = (menuName) => {
        setActiveMenu(prev =>
            prev === menuName ? null : prev
        );
    };

    // =====================================================
    // TOGGLE MENU
    // =====================================================

    const toggleMenu = (menuName) => {
        setActiveMenu(prev =>
            prev === menuName ? null : menuName
        );
    };

    return (
        <nav className="navbar">

            {/* =================================================
                SETUP
            ================================================= */}

            <SetupMenu
                changePage={changePage}
                isOpen={activeMenu === "setup"}
                openMenu={() => openMenu("setup")}
                closeMenu={() => closeMenu("setup")}
                toggleMenu={() => toggleMenu("setup")}
            />


            {/* =================================================
                ITEMS
            ================================================= */}

            <button
                className="menu-btn"
                onClick={() => changePage("items")}
            >
                Items
            </button>


            {/* =================================================
                TRANSACTIONS
            ================================================= */}

            <TransactionMenu
                changePage={changePage}
                isOpen={activeMenu === "transactions"}
                openMenu={() => openMenu("transactions")}
                closeMenu={() => closeMenu("transactions")}
                toggleMenu={() => toggleMenu("transactions")}
            />


            {/* =================================================
                REPORTS
            ================================================= */}

            <ReportsMenu
                changePage={changePage}
                isOpen={activeMenu === "reports"}
                openMenu={() => openMenu("reports")}
                closeMenu={() => closeMenu("reports")}
                toggleMenu={() => toggleMenu("reports")}
            />


            {/* =================================================
                TOOLS
            ================================================= */}

            <ToolsMenu
                changePage={changePage}
                isOpen={activeMenu === "tools"}
                openMenu={() => openMenu("tools")}
                closeMenu={() => closeMenu("tools")}
                toggleMenu={() => toggleMenu("tools")}
            />


            {/* =================================================
                EXIT
            ================================================= */}

            <button
                className="menu-btn exit-menu-btn"
                onClick={() => changePage("exit")}
            >
                Exit
            </button>

        </nav>
    );
}

export default Navbar;