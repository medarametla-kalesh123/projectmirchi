import React, { useState } from "react";
import "./ForgotPassword.css";
import API from "../api";

function ForgotPassword({ setPage }) {

    const [email, setEmail] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);


    // =====================================================
    // SEND RESET LINK
    // =====================================================

    const handleForgotPassword = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // -------------------------------------------------
        // VALIDATION
        // -------------------------------------------------

        if (!email.trim()) {

            setError("Please enter your email address");

            return;
        }


        try {

            setLoading(true);


            const response = await fetch(
                `${API}/auth/forgot-password`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email.trim().toLowerCase()
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Unable to send password reset email"
                );
            }


            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            setSuccess(
                data.message ||
                "Password reset link has been sent to your email"
            );

            setEmail("");


        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
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
                    FORGOT PASSWORD FORM
                ================================================= */}

                <div className="auth-form-section">

                    <div className="auth-form">

                        <h2>
                            Forgot Password?
                        </h2>

                        <p className="auth-subtitle">
                            Enter your registered email address
                        </p>


                        <div className="auth-red-line">
                        </div>


                        {error && (

                            <div className="auth-error">
                                {error}
                            </div>

                        )}


                        {success && (

                            <div className="auth-success">
                                {success}
                            </div>

                        )}


                        <form onSubmit={handleForgotPassword}>


                            {/* EMAIL */}

                            <div className="form-group">

                                <label>
                                    Email Address
                                </label>

                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        📧
                                    </span>

                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />

                                </div>

                            </div>


                            {/* SEND BUTTON */}

                            <button
                                type="submit"
                                className="auth-button"
                                disabled={loading}
                            >

                                {loading
                                    ? "Sending..."
                                    : "Send Reset Link"
                                }

                            </button>


                        </form>


                        {/* BACK TO LOGIN */}

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

export default ForgotPassword;