import React, { useState } from "react";
import "./Register.css";
import API from "../api";

function Register({ setPage }) {

    const [formData, setFormData] = useState({

        full_name: "",

        username: "",

        email: "",

        password: "",

        confirm_password: ""

    });


    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

        setError("");

        setSuccess("");
    };


    // =====================================================
    // REGISTER
    // =====================================================

    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");

        setSuccess("");


        if (
            !formData.full_name.trim() ||
            !formData.username.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            !formData.confirm_password
        ) {

            setError(
                "Please fill all the fields"
            );

            return;
        }


        if (
            formData.password.length < 6
        ) {

            setError(
                "Password must contain at least 6 characters"
            );

            return;
        }


        if (
            formData.password !==
            formData.confirm_password
        ) {

            setError(
                "Passwords do not match"
            );

            return;
        }


        try {

            setLoading(true);


            const response = await fetch(
                `${API}/auth/register`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)

                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Registration failed"
                );

            }


            setSuccess(
                "Account created successfully!"
            );


            setFormData({

                full_name: "",

                username: "",

                email: "",

                password: "",

                confirm_password: ""

            });


            setTimeout(() => {

                setPage("login");

            }, 1500);


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
                    LEFT BRAND
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
                    REGISTER FORM
                ================================================= */}

                <div className="auth-form-section">

                    <div className="auth-form register-form">

                        <h2>
                            Create Your Account
                        </h2>

                        <p className="auth-subtitle">
                            Join Mirchi Trading and grow your business
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


                        <form onSubmit={handleRegister}>


                            {/* FULL NAME */}

                            <div className="form-group">

                                <label>
                                    Full Name
                                </label>

                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        👤
                                    </span>

                                    <input
                                        type="text"
                                        name="full_name"
                                        placeholder="Enter your full name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


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
                                        name="username"
                                        placeholder="Choose a username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* EMAIL */}

                            <div className="form-group">

                                <label>
                                    Email Address
                                </label>

                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        ✉️
                                    </span>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        value={formData.email}
                                        onChange={handleChange}
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
                                        name="password"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    >
                                        {showPassword
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
                                        name="confirm_password"
                                        placeholder="Confirm your password"
                                        value={
                                            formData.confirm_password
                                        }
                                        onChange={handleChange}
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


                            {/* TERMS */}

                            <div className="terms-row">

                                <input
                                    type="checkbox"
                                    required
                                />

                                <span>
                                    I agree to the
                                    <b> Terms & Conditions </b>
                                    and
                                    <b> Privacy Policy</b>
                                </span>

                            </div>


                            {/* REGISTER */}

                            <button
                                type="submit"
                                className="auth-button"
                                disabled={loading}
                            >

                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"
                                }

                            </button>

                        </form>


                        {/* LOGIN */}

                        <div className="switch-auth">

                            <span>
                                Already have an account?
                            </span>

                            <button
                                onClick={() =>
                                    setPage("login")
                                }
                            >
                                Login now
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

export default Register;