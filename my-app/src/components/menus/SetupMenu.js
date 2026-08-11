import React from "react";
import "./SetupMenu.css";

function SetupMenu({
    changePage,
    isOpen,
    openMenu,
    closeMenu,
    toggleMenu
}) {

    const isMobile = () => {
        return window.innerWidth <= 768;
    };

    // =====================================================
    // SETUP BUTTON CLICK
    // =====================================================

    const handleSetupClick = () => {

        if (isMobile()) {

            toggleMenu();

        } else {

            changePage("setup");

        }
    };

    // =====================================================
    // PAGE CHANGE
    // =====================================================

    const handleChangePage = (page) => {

        changePage(page);

    };

    return (

        <div
            className="nav-item setup-nav-item"

            onMouseEnter={() => {

                if (!isMobile()) {
                    openMenu();
                }

            }}

            onMouseLeave={() => {

                if (!isMobile()) {
                    closeMenu();
                }

            }}
        >

            {/* =================================================
                SETUP BUTTON
            ================================================= */}

            <button
                className="menu-btn setup-menu-button"
                onClick={handleSetupClick}
            >

                Setup

                <span className="mobile-arrow">
                    {isOpen ? "▲" : "▼"}
                </span>

            </button>


            {/* =================================================
                SETUP DROPDOWN
            ================================================= */}

            {isOpen && (

                <div className="dropdown">

                    {/* =================================================
                        ACCOUNTS
                    ================================================= */}

                    <div className="submenu-item">

                        <div
                            className="dropdown-item accounts-item"
                            onClick={(e) => {

                                e.stopPropagation();

                                if (isMobile()) {

                                    const submenu =
                                        e.currentTarget.parentElement.querySelector(
                                            ".submenu"
                                        );

                                    if (submenu) {
                                        submenu.classList.toggle(
                                            "mobile-submenu-open"
                                        );
                                    }

                                }

                            }}
                        >

                            <span>
                                Accounts
                            </span>

                            <span className="submenu-arrow">
                                ▶
                            </span>

                        </div>


                        {/* =================================================
                            ACCOUNTS SUBMENU
                        ================================================= */}

                        <div className="submenu">

                            <div
                                className="dropdown-item"
                                onClick={() =>
                                    handleChangePage("accountslist")
                                }
                            >
                                Accounts List
                            </div>


                            <div
                                className="dropdown-item"
                                onClick={() =>
                                    handleChangePage("standardnarrations")
                                }
                            >
                                Standard Narrations
                            </div>


                            <div
                                className="dropdown-item"
                                onClick={() =>
                                    handleChangePage("nameverification")
                                }
                            >
                                Name Verification
                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        STATES
                    ================================================= */}

                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("states")
                        }
                    >
                        States
                    </div>


                    {/* =================================================
                        TOWNS
                    ================================================= */}

                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("towns")
                        }
                    >
                        Towns
                    </div>


                    {/* =================================================
                        EDIT ADDRESSES
                    ================================================= */}

                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("editaddresses")
                        }
                    >
                        Edit Addresses
                    </div>


                    {/* =================================================
                        STANDARD ACCOUNTS
                    ================================================= */}

                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("standardaccounts")
                        }
                    >
                        Standard Accounts
                    </div>


                    {/* =================================================
                        GROUP CREATION
                    ================================================= */}

                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("groupcreation")
                        }
                    >
                        Group Creation
                    </div>


                    {/* =================================================
                        CLASSIC MENU
                    ================================================= */}

                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("classicmenu")
                        }
                    >
                        Classic Menu
                    </div>

                </div>

            )}

        </div>
    );
}

export default SetupMenu;