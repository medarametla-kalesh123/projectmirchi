import React from "react";
import "./Exit.css";

function Exit({ setPage }) {

    // =====================================================
    // GET CURRENT USER DETAILS
    // =====================================================

    const fullName =
        localStorage.getItem("full_name") || "-";

    const username =
        localStorage.getItem("username") || "-";

    const email =
        localStorage.getItem("email") || "-";

    const userId =
        localStorage.getItem("user_id") || "-";


    // =====================================================
    // CANCEL
    // =====================================================

    const handleCancel = () => {

        setPage("dashboard");

    };


    // =====================================================
    // SIGN OUT
    // =====================================================

    const handleSignOut = () => {

        // -------------------------------------------------
        // CLEAR AUTHENTICATION INFORMATION
        // -------------------------------------------------

        localStorage.removeItem("access_token");

        localStorage.removeItem("isLoggedIn");

        localStorage.removeItem("user_id");

        localStorage.removeItem("username");

        localStorage.removeItem("full_name");

        localStorage.removeItem("email");
       localStorage.removeItem(
    "currentPage"
);

        // -------------------------------------------------
        // RETURN TO LOGIN
        // -------------------------------------------------

        setPage("login");

    };


    return (

        <div className="exit-page">

            <div className="exit-card">


                {/* =================================================
                    BRAND
                ================================================= */}

                <div className="exit-brand">

                    <div className="exit-logo">
                        🌶️
                    </div>

                    <div className="exit-brand-text">

                        <div className="exit-brand-name">
                            MIRCHI
                        </div>

                        <div className="exit-brand-subtitle">
                            TRADING
                        </div>

                    </div>

                </div>


                {/* =================================================
                    RED DIVIDER
                ================================================= */}

                <div className="exit-red-line">
                </div>


                {/* =================================================
                    EXIT ICON
                ================================================= */}

                <div className="exit-icon-circle">

                    <div className="exit-icon">
                        ↪
                    </div>

                </div>


                {/* =================================================
                    TITLE
                ================================================= */}

                <h1 className="exit-title">
                    Sign Out
                </h1>


                {/* =================================================
                    MESSAGE
                ================================================= */}

                <p className="exit-question">
                    Are you sure you want to exit?
                </p>

                <p className="exit-description">
                    You are currently signed in with the following
                    account.
                </p>


                {/* =================================================
                    USER INFORMATION
                ================================================= */}

                <div className="exit-user-card">

                    {/* USER HEADER */}

                    <div className="exit-user-header">

                        <div className="exit-user-avatar">
                            👤
                        </div>

                        <div className="exit-user-heading">

                            <div className="exit-user-title">
                                CURRENT USER
                            </div>

                            <div className="exit-user-status">
                                <span className="status-dot">
                                    ●
                                </span>

                                Active Session
                            </div>

                        </div>

                    </div>


                    {/* USER DETAILS */}

                    <div className="exit-details">

                        {/* FULL NAME */}

                        <div className="exit-detail-row">

                            <div className="exit-detail-label">
                                <span className="detail-icon">
                                    👤
                                </span>

                                Full Name
                            </div>

                            <div className="exit-detail-value">
                                {fullName}
                            </div>

                        </div>


                        {/* USERNAME */}

                        <div className="exit-detail-row">

                            <div className="exit-detail-label">
                                <span className="detail-icon">
                                    🔑
                                </span>

                                Username
                            </div>

                            <div className="exit-detail-value">
                                {username}
                            </div>

                        </div>


                        {/* EMAIL */}

                        <div className="exit-detail-row">

                            <div className="exit-detail-label">
                                <span className="detail-icon">
                                    📧
                                </span>

                                Email
                            </div>

                            <div className="exit-detail-value email-value">
                                {email}
                            </div>

                        </div>


                        {/* USER ID */}

                        <div className="exit-detail-row">

                            <div className="exit-detail-label">
                                <span className="detail-icon">
                                    🆔
                                </span>

                                User ID
                            </div>

                            <div className="exit-detail-value">
                                {userId}
                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    INFORMATION
                ================================================= */}

                <div className="exit-info">

                    <span className="exit-info-icon">
                        🔒
                    </span>

                    <span>
                        Your session will be securely ended
                        when you sign out.
                    </span>

                </div>


                {/* =================================================
                    ACTION BUTTONS
                ================================================= */}

                <div className="exit-actions">

                    <button
                        type="button"
                        className="exit-cancel"
                        onClick={handleCancel}
                    >

                        <span className="button-arrow">
                            ←
                        </span>

                        Cancel

                    </button>


                    <button
                        type="button"
                        className="exit-signout"
                        onClick={handleSignOut}
                    >

                        Sign Out

                        <span className="button-arrow">
                            →
                        </span>

                    </button>

                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="exit-footer">

                    <span>
                        Mirchi Trading
                    </span>

                    <span className="footer-separator">
                        •
                    </span>

                    <span>
                        2026
                    </span>

                    <span className="footer-separator">
                        •
                    </span>

                    <span>
                        Secure Business Management
                    </span>

                </div>

            </div>

        </div>
    );
}

export default Exit;