import os

import resend

from dotenv import load_dotenv


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()


# =========================================================
# RESEND SETTINGS
# =========================================================

RESEND_API_KEY = os.getenv("RESEND_API_KEY")

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:3000"
)


# =========================================================
# SEND PASSWORD RESET EMAIL
# =========================================================

def send_password_reset_email(
    email: str,
    username: str,
    reset_token: str
):

    # -----------------------------------------------------
    # Check Resend configuration
    # -----------------------------------------------------

    if not RESEND_API_KEY:
        raise ValueError(
            "RESEND_API_KEY is not configured"
        )


    # -----------------------------------------------------
    # Configure Resend
    # -----------------------------------------------------

    resend.api_key = RESEND_API_KEY


    # -----------------------------------------------------
    # Create reset link
    # -----------------------------------------------------

    reset_link = (
        f"{FRONTEND_URL}/reset-password"
        f"?token={reset_token}"
    )


    # -----------------------------------------------------
    # Email subject
    # -----------------------------------------------------

    subject = "Mirchi Trading - Password Reset"


    # -----------------------------------------------------
    # Plain text email
    # -----------------------------------------------------

    text_body = f"""
Hello {username},

We received a request to reset your Mirchi Trading account password.

Your username is:

{username}

Click the link below to create a new password:

{reset_link}

This password reset link will expire in 15 minutes.

If you did not request a password reset, please ignore this email.

Regards,

Mirchi Trading
"""


    # -----------------------------------------------------
    # HTML email
    # -----------------------------------------------------

    html_body = f"""
<html>

<head>

<meta charset="UTF-8">

<title>
Mirchi Trading Password Reset
</title>

</head>


<body style="
    margin: 0;
    padding: 0;
    background: #f5f5f5;
    font-family: Arial, sans-serif;
">


<div style="
    max-width: 600px;
    margin: 40px auto;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
">


    <!-- HEADER -->

    <div style="
        background: #b71c1c;
        padding: 30px;
        text-align: center;
        color: white;
    ">

        <div style="
            font-size: 42px;
        ">
            🌶️
        </div>


        <h1 style="
            margin: 8px 0 0;
            font-size: 28px;
            letter-spacing: 2px;
        ">
            MIRCHI TRADING
        </h1>


        <p style="
            margin: 8px 0 0;
            font-size: 14px;
        ">
            Account Security
        </p>

    </div>


    <!-- CONTENT -->

    <div style="
        padding: 35px;
        color: #333333;
    ">


        <h2 style="
            margin-top: 0;
            color: #222222;
        ">
            Password Reset Request
        </h2>


        <p>
            Hello <strong>{username}</strong>,
        </p>


        <p>
            We received a request to reset your
            Mirchi Trading account password.
        </p>


        <!-- USERNAME -->

        <div style="
            background: #f8f8f8;
            border-left: 4px solid #b71c1c;
            padding: 15px;
            margin: 25px 0;
        ">

            <strong>
                Your Username:
            </strong>

            <br>

            <span style="
                font-size: 18px;
                color: #b71c1c;
            ">
                {username}
            </span>

        </div>


        <p>
            Click the button below to create
            a new password:
        </p>


        <!-- RESET BUTTON -->

        <div style="
            text-align: center;
            margin: 30px 0;
        ">

            <a
                href="{reset_link}"
                style="
                    display: inline-block;
                    background: #b71c1c;
                    color: white;
                    text-decoration: none;
                    padding: 14px 30px;
                    border-radius: 7px;
                    font-size: 16px;
                    font-weight: bold;
                "
            >
                Reset Password
            </a>

        </div>


        <p style="
            font-size: 14px;
            color: #666666;
        ">
            This password reset link will expire
            in <strong>15 minutes</strong>.
        </p>


        <p style="
            font-size: 14px;
            color: #666666;
        ">
            If you did not request a password reset,
            you can safely ignore this email.
        </p>


    </div>


    <!-- FOOTER -->

    <div style="
        background: #fafafa;
        padding: 20px;
        text-align: center;
        color: #888888;
        font-size: 12px;
    ">

        © 2026 Mirchi Trading.
        All rights reserved.

    </div>


</div>


</body>

</html>
"""


    # =====================================================
    # SEND EMAIL USING RESEND
    # =====================================================

    params = {
        "from": "Mirchi Trading <onboarding@resend.dev>",
        "to": [email],
        "subject": subject,
        "text": text_body,
        "html": html_body
    }


    resend.Emails.send(params)