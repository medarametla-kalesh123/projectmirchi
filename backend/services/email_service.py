import os

import requests

from urllib.parse import quote

from dotenv import load_dotenv


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()


# =========================================================
# BREVO SETTINGS
# =========================================================

BREVO_API_KEY = os.getenv("BREVO_API_KEY")

BREVO_SENDER_EMAIL = os.getenv("BREVO_SENDER_EMAIL")

BREVO_SENDER_NAME = os.getenv(
    "BREVO_SENDER_NAME",
    "Mirchi Trading"
)

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:3000"
)


# =========================================================
# BREVO API URL
# =========================================================

BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"


# =========================================================
# SEND PASSWORD RESET EMAIL
# =========================================================

def send_password_reset_email(
    email: str,
    username: str,
    reset_token: str
):

    # =====================================================
    # CHECK BREVO CONFIGURATION
    # =====================================================

    if not BREVO_API_KEY:

        raise ValueError(
            "BREVO_API_KEY is not configured"
        )


    if not BREVO_SENDER_EMAIL:

        raise ValueError(
            "BREVO_SENDER_EMAIL is not configured"
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
    # BREVO REQUEST HEADERS
    # =====================================================

    headers = {

        "accept": "application/json",

        "api-key": BREVO_API_KEY,

        "content-type": "application/json"

    }


    # =====================================================
    # EMAIL DATA
    # =====================================================

    payload = {

        "sender": {

            "name": BREVO_SENDER_NAME,

            "email": BREVO_SENDER_EMAIL

        },

        "to": [

            {

                "email": email,

                "name": username

            }

        ],

        "subject": subject,

        "htmlContent": html_body,

        "textContent": text_body

    }


    # =====================================================
    # SEND EMAIL THROUGH BREVO API
    # =====================================================

    try:

        response = requests.post(

            BREVO_API_URL,

            headers=headers,

            json=payload,

            timeout=30

        )


    except requests.exceptions.Timeout as e:

        raise ValueError(
            "Brevo email request timed out."
        ) from e


    except requests.exceptions.RequestException as e:

        raise ValueError(
            f"Could not connect to Brevo API: {str(e)}"
        ) from e


    # =====================================================
    # HANDLE BREVO RESPONSE
    # =====================================================

    if response.status_code in (200, 201):

        try:

            response_data = response.json()

        except ValueError:

            response_data = {}


        return {

            "success": True,

            "message": "Password reset email sent successfully",

            "message_id": response_data.get("messageId")

        }


    # =====================================================
    # BREVO AUTHENTICATION ERROR
    # =====================================================

    if response.status_code == 401:

        raise ValueError(
            "Brevo authentication failed. "
            "Check BREVO_API_KEY."
        )


    # =====================================================
    # BREVO FORBIDDEN ERROR
    # =====================================================

    if response.status_code == 403:

        raise ValueError(
            "Brevo rejected the request. "
            "Check your sender email verification "
            "and Brevo account permissions."
        )


    # =====================================================
    # BREVO RATE LIMIT
    # =====================================================

    if response.status_code == 429:

        raise ValueError(
            "Brevo rate limit exceeded. "
            "Please try again later."
        )


    # =====================================================
    # OTHER BREVO ERROR
    # =====================================================

    try:

        error_data = response.json()

        error_message = (
            error_data.get("message")
            or error_data.get("code")
            or response.text
        )

    except ValueError:

        error_message = response.text


    raise ValueError(
        f"Brevo email sending failed "
        f"(HTTP {response.status_code}): "
        f"{error_message}"
    )