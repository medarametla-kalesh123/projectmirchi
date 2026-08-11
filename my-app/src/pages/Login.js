import React, { useState } from "react";
import "./Login.css";
import API from "../api";

function Login({ setPage }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    // =====================================================
    // LOGIN
    // =====================================================

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");


        if (!username.trim()) {

            setError("Please enter your username");

            return;
        }


        if (!password) {

            setError("Please enter your password");

            return;
        }


        try {

            setLoading(true);


            const response = await fetch(
                `${API}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        username: username.trim(),

                        password: password

                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Invalid username or password"
                );
            }


            // =================================================
            // SAVE LOGIN INFORMATION
            // =================================================

            localStorage.setItem(
                "access_token",
                data.access_token
            );


            localStorage.setItem(
                "isLoggedIn",
                "true"
            );


            localStorage.setItem(
                "user_id",
                data.user_id
            );


            localStorage.setItem(
                "username",
                data.username
            );


            localStorage.setItem(
                "full_name",
                data.full_name
            );
            localStorage.setItem(
    "email",
    data.email
);

            // =================================================
            // GO TO DASHBOARD
            // =================================================

            setPage("dashboard");


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
                    LOGIN FORM
                ================================================= */}

                <div className="auth-form-section">

                    <div className="auth-form">

                        <h2>
                            Welcome Back!
                        </h2>

                        <p className="auth-subtitle">
                            Login to your Mirchi Trading account
                        </p>


                        <div className="auth-red-line">
                        </div>


                        {error && (

                            <div className="auth-error">
                                {error}
                            </div>

                        )}


                        <form onSubmit={handleLogin}>

                            {/* USERNAME */}

                            <div className="form-group">

                                <label>
                                    Username
                                </label>

                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        👤
                                    </span>

                                    <input
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />

                                </div>

                            </div>


                            {/* PASSWORD */}

                            <div className="form-group">

                                <label>
                                    Password
                                </label>

                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        🔒
                                    </span>

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword
                                            ? "🙈"
                                            : "👁️"
                                        }
                                    </button>

                                </div>

                            </div>


                            <div className="forgot-password">

                                <button
                                    type="button"
                                    onClick={() => setPage("forgot-password")}
                                >
                                    Forgot Password?
                                </button>

                            </div>


                            {/* LOGIN */}

                            <button
                                type="submit"
                                className="auth-button"
                                disabled={loading}
                            >

                                {loading
                                    ? "Logging in..."
                                    : "Login"
                                }

                            </button>

                        </form>


                        {/* REGISTER */}

                        <div className="switch-auth">

                            <span>
                                Don't have an account?
                            </span>

                            <button
                                onClick={() =>
                                    setPage("register")
                                }
                            >
                                Register now
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

export default Login;