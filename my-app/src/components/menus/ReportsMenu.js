import React, { useState } from "react";

function ReportsMenu({
    changePage,
    isOpen,
    openMenu,
    closeMenu,
    toggleMenu
}) {

    const [financialReportsOpen, setFinancialReportsOpen] = useState(false);
    const [stockReportsOpen, setStockReportsOpen] = useState(false);
    const [misReportsOpen, setMisReportsOpen] = useState(false);
    const [deptReportsOpen, setDeptReportsOpen] = useState(false);


    // =========================================================
    // CLOSE ALL MENUS
    // =========================================================

    const closeAllMenus = () => {

        closeMenu();

        setFinancialReportsOpen(false);
        setStockReportsOpen(false);
        setMisReportsOpen(false);
        setDeptReportsOpen(false);

    };


    // =========================================================
    // CHANGE PAGE
    // =========================================================

    const handleChangePage = (page) => {

        changePage(page);

        closeAllMenus();

    };


    // =========================================================
    // MOBILE - REPORTS CLICK
    // =========================================================

    const handleReportsClick = () => {

        // Mobile
        if (window.innerWidth <= 768) {

            toggleMenu();

            // Close submenus when opening/closing main menu
            setFinancialReportsOpen(false);
            setStockReportsOpen(false);
            setMisReportsOpen(false);
            setDeptReportsOpen(false);

        }

        // Desktop
        else {

            handleChangePage("reports");

        }

    };


    // =========================================================
    // FINANCIAL REPORTS
    // =========================================================

    const handleFinancialClick = () => {

        if (window.innerWidth <= 768) {

            setFinancialReportsOpen(prev => !prev);

            setStockReportsOpen(false);
            setMisReportsOpen(false);
            setDeptReportsOpen(false);

        }

    };


    // =========================================================
    // STOCK REPORTS
    // =========================================================

    const handleStockClick = () => {

        if (window.innerWidth <= 768) {

            setStockReportsOpen(prev => !prev);

            setFinancialReportsOpen(false);
            setMisReportsOpen(false);
            setDeptReportsOpen(false);

        }

    };


    // =========================================================
    // MIS REPORTS
    // =========================================================

    const handleMisClick = () => {

        if (window.innerWidth <= 768) {

            setMisReportsOpen(prev => !prev);

            setFinancialReportsOpen(false);
            setStockReportsOpen(false);
            setDeptReportsOpen(false);

        }

    };


    // =========================================================
    // DEPT REPORTS
    // =========================================================

    const handleDeptClick = () => {

        if (window.innerWidth <= 768) {

            setDeptReportsOpen(prev => !prev);

            setFinancialReportsOpen(false);
            setStockReportsOpen(false);
            setMisReportsOpen(false);

        }

    };


    return (

        <div
            className="nav-item reports-nav-item"

            // =====================================================
            // DESKTOP HOVER
            // =====================================================

            onMouseEnter={() => {

                if (window.innerWidth > 768) {

                    openMenu();

                }

            }}

            onMouseLeave={() => {

                if (window.innerWidth > 768) {

                    closeAllMenus();

                }

            }}
        >

            {/* =====================================================
                REPORTS BUTTON
            ===================================================== */}

            <button
                className="menu-btn"
                onClick={handleReportsClick}
            >

                Reports

                <span className="mobile-arrow">
                    {isOpen ? "▲" : "▼"}
                </span>

            </button>


            {/* =====================================================
                MAIN REPORTS DROPDOWN
            ===================================================== */}

            {isOpen && (

                <div className="dropdown reports-dropdown">


                    {/* =================================================
                        FINANCIAL REPORTS
                    ================================================= */}

                    <div
                        className="submenu-item reports-submenu-item"

                        onMouseEnter={() => {

                            if (window.innerWidth > 768) {

                                setFinancialReportsOpen(true);
                                setStockReportsOpen(false);
                                setMisReportsOpen(false);
                                setDeptReportsOpen(false);

                            }

                        }}

                        onClick={handleFinancialClick}
                    >

                        <div className="dropdown-item">

                            <span>
                                Financial Reports
                            </span>

                            <span className="submenu-arrow">
                                
                            </span>

                        </div>


                        {financialReportsOpen && (

                            <div
                                className="submenu reports-submenu"

                                onMouseLeave={() => {

                                    if (window.innerWidth > 768) {

                                        setFinancialReportsOpen(false);

                                    }

                                }}
                            >

                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "twocolumndaybook"
                                        );

                                    }}
                                >
                                    Two Column Day Book
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "fourcolumndaybookreport"
                                        );

                                    }}
                                >
                                    Four Column Day Book
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "ledgeraccount"
                                        );

                                    }}
                                >
                                    Ledger Account
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "trialbalance"
                                        );

                                    }}
                                >
                                    Trial Balance
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "balancesheet"
                                        );

                                    }}
                                >
                                    Balance Sheet
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "cashflow"
                                        );

                                    }}
                                >
                                    Cash Flow
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "profitlossaccount"
                                        );

                                    }}
                                >
                                    Profit &amp; Loss Account
                                </div>

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        STOCK REPORTS
                    ================================================= */}

                    <div
                        className="submenu-item reports-submenu-item"

                        onMouseEnter={() => {

                            if (window.innerWidth > 768) {

                                setStockReportsOpen(true);
                                setFinancialReportsOpen(false);
                                setMisReportsOpen(false);
                                setDeptReportsOpen(false);

                            }

                        }}

                        onClick={handleStockClick}
                    >

                        <div className="dropdown-item">

                            <span>
                                Stock Reports
                            </span>

                            <span className="submenu-arrow">
                                
                            </span>

                        </div>


                        {stockReportsOpen && (

                            <div
                                className="submenu reports-submenu"

                                onMouseLeave={() => {

                                    if (window.innerWidth > 768) {

                                        setStockReportsOpen(false);

                                    }

                                }}
                            >

                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "stockreport"
                                        );

                                    }}
                                >
                                    Report
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "itemslist"
                                        );

                                    }}
                                >
                                    Items List
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "pricediffreport"
                                        );

                                    }}
                                >
                                    Price Diff Report
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "farmerstockreport"
                                        );

                                    }}
                                >
                                    Farmer Stock Report (Cold Storage)
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "farmerstockstatement"
                                        );

                                    }}
                                >
                                    Farmer Stock Statement
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "townwisereport"
                                        );

                                    }}
                                >
                                    Town Wise Report
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "dailyreport"
                                        );

                                    }}
                                >
                                    Daily Report
                                </div>

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        MIS REPORTS
                    ================================================= */}

                    <div
                        className="submenu-item reports-submenu-item"

                        onMouseEnter={() => {

                            if (window.innerWidth > 768) {

                                setMisReportsOpen(true);
                                setFinancialReportsOpen(false);
                                setStockReportsOpen(false);
                                setDeptReportsOpen(false);

                            }

                        }}

                        onClick={handleMisClick}
                    >

                        <div className="dropdown-item">

                            <span>
                                MIS Reports
                            </span>

                            <span className="submenu-arrow">
                                
                            </span>

                        </div>


                        {misReportsOpen && (

                            <div
                                className="submenu reports-submenu"

                                onMouseLeave={() => {

                                    if (window.innerWidth > 768) {

                                        setMisReportsOpen(false);

                                    }

                                }}
                            >

                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "productanalysis"
                                        );

                                    }}
                                >
                                    Product Analysis
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "groupsettings"
                                        );

                                    }}
                                >
                                    Group Settings
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "monsummary"
                                        );

                                    }}
                                >
                                    Mon Summary Farmers &amp; Traders
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "monthlyexpensesummary"
                                        );

                                    }}
                                >
                                    Monthly Expenditure Summary
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "monthlyincomesummary"
                                        );

                                    }}
                                >
                                    Monthly Income Summary
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "tradersduereport"
                                        );

                                    }}
                                >
                                    Traders Due Report
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "farmersduereport"
                                        );

                                    }}
                                >
                                    Farmers Due Report
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "coldstoragereport"
                                        );

                                    }}
                                >
                                    Cold Storage Report
                                </div>

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        SUMMARY REPORTS
                    ================================================= */}

                    <div
                        className="dropdown-item"
                        onClick={() =>
                            handleChangePage("summaryreports")
                        }
                    >
                        Summary Reports
                    </div>


                    {/* =================================================
                        DEPT REPORTS
                    ================================================= */}

                    <div
                        className="submenu-item reports-submenu-item"

                        onMouseEnter={() => {

                            if (window.innerWidth > 768) {

                                setDeptReportsOpen(true);
                                setFinancialReportsOpen(false);
                                setStockReportsOpen(false);
                                setMisReportsOpen(false);

                            }

                        }}

                        onClick={handleDeptClick}
                    >

                        <div className="dropdown-item">

                            <span>
                                Dept Reports
                            </span>

                            <span className="submenu-arrow">
                                
                            </span>

                        </div>


                        {deptReportsOpen && (

                            <div
                                className="submenu reports-submenu"

                                onMouseLeave={() => {

                                    if (window.innerWidth > 768) {

                                        setDeptReportsOpen(false);

                                    }

                                }}
                            >

                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "traderamcreport"
                                        );

                                    }}
                                >
                                    Trader AMC Report
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "farmeramcreport"
                                        );

                                    }}
                                >
                                    Farmer AMC Report
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "exporterschillies"
                                        );

                                    }}
                                >
                                    Exporters Chillies
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "farmerschillies"
                                        );

                                    }}
                                >
                                    Farmers Chillies
                                </div>


                                <div
                                    className="dropdown-item"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleChangePage(
                                            "tradersitreport"
                                        );

                                    }}
                                >
                                    Traders IT Report
                                </div>

                            </div>

                        )}

                    </div>

                </div>

            )}

        </div>

    );

}

export default ReportsMenu;