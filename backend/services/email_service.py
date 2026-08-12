import os
import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from urllib.parse import quote

from dotenv import load_dotenv


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()


# =========================================================
# GMAIL SETTINGS
# =========================================================

GMAIL_USERNAME = os.getenv("GMAIL_USERNAME")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")

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

    # =====================================================
    # CHECK CONFIGURATION
    # =====================================================

    if not GMAIL_USERNAME:
        raise ValueError(
            "GMAIL_USERNAME is not configured"
        )

    if not GMAIL_APP_PASSWORD:
        raise ValueError(
            "GMAIL_APP_PASSWORD is not configured"
        )

    if not FRONTEND_URL:
        raise ValueError(
            "FRONTEND_URL is not configured"
        )


    # =====================================================
    # CREATE RESET LINK
    # =====================================================

    encoded_token = quote(
        reset_token,
        safe=""
    )

    reset_link = (
        f"{FRONTEND_URL}/reset-password"
        f"?token={encoded_token}"
    )


    # =====================================================
    # EMAIL SUBJECT
    # =====================================================

    subject = "Mirchi Trading - Password Reset"


    # =====================================================
    # PLAIN TEXT EMAIL
    # =====================================================

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


    # =====================================================
    # HTML EMAIL
    # =====================================================

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
    # CREATE EMAIL MESSAGE
    # =====================================================

    message = MIMEMultipart("alternative")

    message["Subject"] = subject
    message["From"] = GMAIL_USERNAME
    message["To"] = email


    # =====================================================
    # ATTACH PLAIN TEXT
    # =====================================================

    message.attach(
        MIMEText(
            text_body,
            "plain",
            "utf-8"
        )
    )


    # =====================================================
    # ATTACH HTML
    # =====================================================

    message.attach(
        MIMEText(
            html_body,
            "html",
            "utf-8"
        )
    )


    # =====================================================
    # SEND EMAIL USING GMAIL SMTP
    # =====================================================

    try:

        with smtplib.SMTP(
            "smtp.gmail.com",
            587,
            timeout=30
        ) as server:

            # Start encrypted connection
            server.starttls()

            # Login using Gmail App Password
            server.login(
                GMAIL_USERNAME,
                GMAIL_APP_PASSWORD
            )

            # Send email
            server.sendmail(
                GMAIL_USERNAME,
                email,
                message.as_string()
            )


    # =====================================================
    # GMAIL AUTHENTICATION ERROR
    # =====================================================

    except smtplib.SMTPAuthenticationError as e:

        raise ValueError(
            "Gmail authentication failed. "
            "Check GMAIL_USERNAME and GMAIL_APP_PASSWORD. "
            "Make sure you are using a Gmail App Password."
        ) from e


    # =====================================================
    # OTHER SMTP ERROR
    # =====================================================

    except smtplib.SMTPException as e:

        raise ValueError(
            f"Failed to send password reset email: {str(e)}"
        ) from e


    # =====================================================
    # GENERAL ERROR
    # =====================================================

    except Exception as e:

        raise ValueError(
            f"Email sending failed: {str(e)}"
        ) from e