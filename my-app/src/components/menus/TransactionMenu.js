import React from "react";
import "./TransactionMenu.css";

function TransactionMenu({
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
    // MENU CLICK
    // =====================================================

    const handleMenuClick = () => {

        // Mobile
        if (window.innerWidth <= 768) {
            toggleMenu();
            return;
        }

        // Desktop
        changePage("transaction");
    };


    return (

        <div
            className="transaction-nav-item"

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
                TRANSACTIONS BUTTON
            ================================================= */}

            <button
                className="transaction-menu-btn"
                onClick={handleMenuClick}
            >

                Transactions

                {/* MOBILE ARROW */}

                <span className="transaction-mobile-arrow">
                    {isOpen ? "▲" : "▼"}
                </span>

            </button>


            {/* =================================================
                TRANSACTION DROPDOWN
            ================================================= */}

            {isOpen && (

                <div className="transaction-dropdown">

                    {/* FOUR COLUMN DAY BOOK */}

                    <div
                        className="transaction-dropdown-item"
                        onClick={() =>
                            handleChangePage("fourcolumndaybook")
                        }
                    >
                        Four Column Day Book
                    </div>


                    {/* FARMERS PATTI */}

                    <div
                        className="transaction-dropdown-item"
                        onClick={() =>
                            handleChangePage("farmerspattientry")
                        }
                    >
                        Farmers Patti Entry
                    </div>


                    {/* TRADERS PATTI */}

                    <div
                        className="transaction-dropdown-item"
                        onClick={() =>
                            handleChangePage("traderspattientry")
                        }
                    >
                        Traders Patti Entry
                    </div>


                    {/* KATA LIST 1 */}

                    <div
                        className="transaction-dropdown-item"
                        onClick={() =>
                            handleChangePage("katalist1entry")
                        }
                    >
                        Kata List - 1 Entry
                    </div>


                    {/* KATA LIST 2 */}

                    <div
                        className="transaction-dropdown-item"
                        onClick={() =>
                            handleChangePage("katalist2entry")
                        }
                    >
                        Kata List - 2 Entry
                    </div>


                    {/* FARMER DC */}

                    <div
                        className="transaction-dropdown-item"
                        onClick={() =>
                            handleChangePage("farmerdc")
                        }
                    >
                        Farmer DC
                    </div>


                    {/* FARMER DC OUT */}

                    <div
                        className="transaction-dropdown-item"
                        onClick={() =>
                            handleChangePage("farmerdcout")
                        }
                    >
                        Farmer DCOUT
                    </div>


                    {/* VOUCHER PRINTING */}

                    <div
                        className="transaction-dropdown-item"
                        onClick={() =>
                            handleChangePage("voucherprinting")
                        }
                    >
                        Voucher Printing (Payment Voucher)
                    </div>


                    {/* ACCOUNT MERGING */}

                    <div
                        className="transaction-dropdown-item"
                        onClick={() =>
                            handleChangePage("accountmerging")
                        }
                    >
                        Account Merging
                    </div>


                    {/* COLD STORAGE */}

                    <div
                        className="transaction-dropdown-item"
                        onClick={() =>
                            handleChangePage("coldstoragebonds")
                        }
                    >
                        Cold Storage Bonds
                    </div>

                </div>

            )}

        </div>
    );
}

export default TransactionMenu;