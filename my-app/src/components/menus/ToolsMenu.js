import React from "react";
import "./ToolsMenu.css";

function ToolsMenu({
    changePage,
    isOpen,
    openMenu,
    closeMenu,
    toggleMenu
}) {

    // =====================================================
    // CHANGE PAGE
    // =====================================================

    const handleChangePage = (page) => {
        changePage(page);
    };


    // =====================================================
    // TOOLS BUTTON CLICK
    // MOBILE  -> OPEN / CLOSE DROPDOWN
    // DESKTOP -> NORMAL PAGE NAVIGATION
    // =====================================================

    const handleToolsClick = () => {

        if (window.innerWidth <= 768) {

            toggleMenu();

        } else {

            changePage("tools");

        }
    };


    return (

        <div
            className="nav-item tools-nav-item"

            onMouseEnter={() => {

                if (window.innerWidth > 768) {
                    openMenu();
                }

            }}

            onMouseLeave={() => {

                if (window.innerWidth > 768) {
                    closeMenu();
                }

            }}
        >

            {/* =================================================
                TOOLS BUTTON
            ================================================= */}

            <button
                className="menu-btn"
                onClick={handleToolsClick}
            >
                Tools

                {/* MOBILE ARROW */}

                <span className="mobile-arrow">
                    {isOpen ? "▲" : "▼"}
                </span>

            </button>


            {/* =================================================
                TOOLS DROPDOWN
            ================================================= */}

            {isOpen && (

                <div className="dropdown tools-dropdown">

                    {/* =================================================
                        MAIN TOOLS
                    ================================================= */}

                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("engtotel")
                        }
                    >
                        Eng to Tel
                    </div>


                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("calculator")
                        }
                    >
                        Calculator
                    </div>


                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("calendar")
                        }
                    >
                        Calendar
                    </div>


                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("interestcalculator")
                        }
                    >
                        Interest Calculator
                    </div>


                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("printersetup")
                        }
                    >
                        Printer Setup
                    </div>


                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("changecompany")
                        }
                    >
                        Change Company
                    </div>


                    {/* =================================================
                        SEPARATOR
                    ================================================= */}

                    <hr />


                    {/* =================================================
                        SYSTEM TOOLS
                    ================================================= */}

                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("backuprestore")
                        }
                    >
                        Backup Restore
                    </div>


                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("auditreport")
                        }
                    >
                        Audit Report
                    </div>


                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("password")
                        }
                    >
                        Passwords
                    </div>


                    {/* =================================================
                        SEPARATOR
                    ================================================= */}

                    <hr />


                    {/* =================================================
                        OTHER TOOLS
                    ================================================= */}

                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("repostingledger")
                        }
                    >
                        Reposting Ledger
                    </div>


                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("toolstandardnarrations")
                        }
                    >
                        Standard Narrations
                    </div>


                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("reportviewer")
                        }
                    >
                        Report Viewer
                    </div>


                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("databaseverification")
                        }
                    >
                        Database Verification
                    </div>

                </div>

            )}

        </div>
    );
}

export default ToolsMenu;