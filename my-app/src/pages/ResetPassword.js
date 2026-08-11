import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import API from "../api";

function ResetPassword({ setPage }) {

    const [token, setToken] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);


    // =====================================================
    // GET TOKEN FROM URL
    // =====================================================

    useEffect(() => {

        const params = new URLSearchParams(
            window.location.search
        );

        const resetToken = params.get("token");

        if (resetToken) {

            setToken(resetToken);

        } else {

            setError(
                "Invalid or missing password reset link"
            );

        }

    }, []);


    // =====================================================
    // RESET PASSWORD
    // =====================================================

    const handleResetPassword = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // -------------------------------------------------
        // TOKEN
        // -------------------------------------------------

        if (!token) {

            setError(
                "Invalid or missing password reset token"
            );

            return;
        }


        // -------------------------------------------------
        // PASSWORD
        // -------------------------------------------------

        if (!newPassword) {

            setError(
                "Please enter your new password"
            );

            return;
        }


        if (newPassword.length < 6) {

            setError(
                "Password must contain at least 6 characters"
            );

            return;
        }


        if (confirmPassword !== newPassword) {

            setError(
                "Passwords do not match"
            );

            return;
        }


        try {

            setLoading(true);


            const response = await fetch(
                `${API}/auth/reset-password`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        token: token,

                        new_password: newPassword,

                        confirm_password: confirmPassword

                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Unable to reset password"
                );
            }


            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            setSuccess(
                data.message ||
                "Password reset successfully"
            );

            setNewPassword("");
            setConfirmPassword("");


        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // LOGIN AFTER SUCCESS
    // =====================================================

    const handleGoToLogin = () => {

        setPage("login");

    };


    return (

        <div className="auth-page">

            <div className="auth-card">


                {/* =================================================
                    LEFT BRANDING
                ================================================= */}

                <div className="auth-brand">

                    <div className="brand-content">

                        <div className="chilli-logo">
                            🌶️
                        </div>

                        <h1>
                            MIRCHI
                        </h1>

                        <h2>
                            TRADING
                        </h2>

                        <div className="brand-line">
                        </div>

                        <p className="brand-tagline">
                            Smart Trading.
                            <br />
                            Better Business.
                        </p>

                        <div className="brand-features">

                            <div>
                                <span>✓</span>
                                Easy Transactions
                            </div>

                            <div>
                                <span>✓</span>
                                Account Management
                            </div>

                            <div>
                                <span>✓</span>
                                Farmers & Traders
                            </div>

                            <div>
                                <span>✓</span>
                                Reports & Analytics
                            </div>

                            <div>
                                <span>✓</span>
                                Secure & Reliable
                            </div>

                        </div>

                    </div>


                    <div className="chilli-decoration">
                        🌶️ 🌶️ 🌶️
                    </div>

                </div>


                {/* =================================================
                    RESET PASSWORD FORM
                ================================================= */}

                <div className="auth-form-section">

                    <div className="auth-form">

                        <h2>
                            Reset Password
                        </h2>

                        <p className="auth-subtitle">
                            Create a new password for your account
                        </p>


                        <div className="auth-red-line">
                        </div>


                        {error && (

                            <div className="auth-error">
                                {error}
                            </div>

                        )}


                        {success ? (

                            <div className="reset-success-box">

                                <div className="success-icon">
                                    ✓
                                </div>

                                <h3>
                                    Password Reset Successful
                                </h3>

                                <p>
                                    Your password has been reset
                                    successfully.
                                </p>

                                <button
                                    type="button"
                                    className="auth-button"
                                    onClick={handleGoToLogin}
                                >
                                    Go to Login
                                </button>

                            </div>

                        ) : (

                            <form
                                onSubmit={
                                    handleResetPassword
                                }
                            >


                                {/* NEW PASSWORD */}

                                <div className="form-group">

                                    <label>
                                        New Password
                                    </label>

                                    <div className="input-wrapper">

                                        <span className="input-icon">
                                            🔒
                                        </span>

                                        <input
                                            type={
                                                showNewPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
                                            }
                                        >
                                            {showNewPassword
                                                ? "🙈"
                                                : "👁️"
                                            }
                                        </button>

                                    </div>

                                </div>


                                {/* CONFIRM PASSWORD */}

                                <div className="form-group">

                                    <label>
                                        Confirm Password
                                    </label>

                                    <div className="input-wrapper">

                                        <span className="input-icon">
                                            🔒
                                        </span>

                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Confirm new password"
                                            value={
                                                confirmPassword
                                            }
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        >
                                            {showConfirmPassword
                                                ? "🙈"
                                                : "👁️"
                                            }
                                        </button>

                                    </div>

                                </div>


                                <button
                                    type="submit"
                                    className="auth-button"
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Resetting..."
                                        : "Reset Password"
                                    }

                                </button>

                            </form>

                        )}


                        {!success && (

                            <div className="switch-auth">

                                <span>
                                    Remember your password?
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setPage("login")
                                    }
                                >
                                    Back to Login
                                </button>

                            </div>

                        )}


                        <div className="auth-footer">
                            © 2026 Mirchi Trading.
                            All rights reserved.
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ResetPassword;