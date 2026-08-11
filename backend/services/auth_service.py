from datetime import datetime, timedelta, timezone

import bcrypt
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from models.user import User
from services.email_service import send_password_reset_email


# =========================================================
# JWT SETTINGS
# =========================================================

SECRET_KEY = "mirchi-trading-secret-key-change-this"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

PASSWORD_RESET_EXPIRE_MINUTES = 15


# =========================================================
# PASSWORD FUNCTIONS
# =========================================================

def hash_password(password: str) -> str:
    """
    Hash a user's password using bcrypt.
    """

    password_bytes = password.encode("utf-8")

    if len(password_bytes) > 72:
        raise ValueError(
            "Password cannot be longer than 72 bytes"
        )

    hashed_password = bcrypt.hashpw(
        password_bytes,
        bcrypt.gensalt()
    )

    return hashed_password.decode("utf-8")


def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:

    password_bytes = plain_password.encode("utf-8")

    if len(password_bytes) > 72:
        return False

    hashed_password_bytes = hashed_password.encode("utf-8")

    return bcrypt.checkpw(
        password_bytes,
        hashed_password_bytes
    )


# =========================================================
# CREATE ACCESS TOKEN
# =========================================================

def create_access_token(data: dict) -> str:

    to_encode = data.copy()

    expire = (
        datetime.now(timezone.utc)
        + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )

    to_encode.update({
        "exp": expire
    })

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# =========================================================
# CREATE PASSWORD RESET TOKEN
# =========================================================

def create_password_reset_token(user_id: int) -> str:

    expire = (
        datetime.now(timezone.utc)
        + timedelta(
            minutes=PASSWORD_RESET_EXPIRE_MINUTES
        )
    )

    data = {
        "sub": str(user_id),
        "type": "password_reset",
        "exp": expire
    }

    return jwt.encode(
        data,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# =========================================================
# VERIFY PASSWORD RESET TOKEN
# =========================================================

def verify_password_reset_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        if payload.get("type") != "password_reset":
            return None

        user_id = payload.get("sub")

        if not user_id:
            return None

        return int(user_id)

    except (
        JWTError,
        ValueError,
        TypeError
    ):
        return None


# =========================================================
# REGISTER USER
# =========================================================

def register_user(
    db: Session,
    full_name: str,
    username: str,
    email: str,
    password: str
):

    # -----------------------------------------------------
    # Check username
    # -----------------------------------------------------

    existing_username = (
        db.query(User)
        .filter(
            User.username == username
        )
        .first()
    )

    if existing_username:
        return None, "Username already exists"


    # -----------------------------------------------------
    # Check email
    # -----------------------------------------------------

    existing_email = (
        db.query(User)
        .filter(
            User.email == email
        )
        .first()
    )

    if existing_email:
        return None, "Email is already registered"


    # -----------------------------------------------------
    # Password length
    # -----------------------------------------------------

    if len(password.encode("utf-8")) > 72:

        return (
            None,
            "Password cannot be longer than 72 bytes"
        )


    # -----------------------------------------------------
    # Hash password
    # -----------------------------------------------------

    hashed_password = hash_password(password)


    # -----------------------------------------------------
    # Create user
    # -----------------------------------------------------

    user = User(
        full_name=full_name,
        username=username,
        email=email,
        password=hashed_password
    )


    db.add(user)

    db.commit()

    db.refresh(user)

    return user, None


# =========================================================
# LOGIN USER
# =========================================================

def authenticate_user(
    db: Session,
    username: str,
    password: str
):

    user = (
        db.query(User)
        .filter(
            User.username == username
        )
        .first()
    )

    if not user:
        return None

    if not verify_password(
        password,
        user.password
    ):
        return None

    return user


# =========================================================
# FORGOT PASSWORD
# =========================================================

def forgot_password(
    db: Session,
    email: str
):

    # -----------------------------------------------------
    # Find user by email
    # -----------------------------------------------------

    user = (
        db.query(User)
        .filter(
            User.email == email
        )
        .first()
    )

    if not user:
        return False


    # -----------------------------------------------------
    # Create reset token
    # -----------------------------------------------------

    reset_token = create_password_reset_token(
        user.id
    )


    # -----------------------------------------------------
    # Send email
    # -----------------------------------------------------

    send_password_reset_email(
        email=user.email,
        username=user.username,
        reset_token=reset_token
    )

    return True


# =========================================================
# RESET PASSWORD
# =========================================================

def reset_password(
    db: Session,
    token: str,
    new_password: str
):

    # -----------------------------------------------------
    # Verify token
    # -----------------------------------------------------

    user_id = verify_password_reset_token(token)

    if not user_id:
        return False, "Invalid or expired reset link"


    # -----------------------------------------------------
    # Find user
    # -----------------------------------------------------

    user = (
        db.query(User)
        .filter(
            User.id == user_id
        )
        .first()
    )

    if not user:
        return False, "User not found"


    # -----------------------------------------------------
    # Password length
    # -----------------------------------------------------

    if len(new_password.encode("utf-8")) > 72:

        return (
            False,
            "Password cannot be longer than 72 bytes"
        )


    # -----------------------------------------------------
    # Hash new password
    # -----------------------------------------------------

    user.password = hash_password(
        new_password
    )


    # -----------------------------------------------------
    # Save
    # -----------------------------------------------------

    db.commit()

    db.refresh(user)

    return True, None