from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from database import get_db

from schemas.auth import (
    RegisterRequest,
    RegisterResponse,
    LoginRequest,
    LoginResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse
)

from services.auth_service import (
    register_user,
    authenticate_user,
    create_access_token,
    forgot_password,
    reset_password
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# =========================================================
# REGISTER
# =========================================================

@router.post(
    "/register",
    response_model=RegisterResponse
)
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):

    # -----------------------------------------------------
    # Clean input
    # -----------------------------------------------------

    full_name = data.full_name.strip()

    username = data.username.strip()

    email = data.email.strip().lower()


    # -----------------------------------------------------
    # Required validation
    # -----------------------------------------------------

    if not full_name:

        raise HTTPException(
            status_code=400,
            detail="Full name is required"
        )


    if not username:

        raise HTTPException(
            status_code=400,
            detail="Username is required"
        )


    # -----------------------------------------------------
    # Password validation
    # -----------------------------------------------------

    if len(data.password) < 6:

        raise HTTPException(
            status_code=400,
            detail="Password must contain at least 6 characters"
        )


    if len(data.password.encode("utf-8")) > 72:

        raise HTTPException(
            status_code=400,
            detail="Password cannot be longer than 72 bytes"
        )


    if data.password != data.confirm_password:

        raise HTTPException(
            status_code=400,
            detail="Passwords do not match"
        )


    # -----------------------------------------------------
    # Create user
    # -----------------------------------------------------

    user, error = register_user(

        db=db,

        full_name=full_name,

        username=username,

        email=email,

        password=data.password

    )


    if error:

        raise HTTPException(
            status_code=400,
            detail=error
        )


    return {
        "message": "Registration successful"
    }


# =========================================================
# LOGIN
# =========================================================

@router.post(
    "/login",
    response_model=LoginResponse
)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    username = data.username.strip()


    # -----------------------------------------------------
    # Authenticate
    # -----------------------------------------------------

    user = authenticate_user(

        db=db,

        username=username,

        password=data.password

    )


    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )


    # -----------------------------------------------------
    # Create JWT
    # -----------------------------------------------------

    access_token = create_access_token({

        "sub": str(user.id),

        "username": user.username

    })


    return {

        "message": "Login successful",

        "access_token": access_token,

        "token_type": "bearer",

        "user_id": user.id,

        "full_name": user.full_name,

        "username": user.username,
        "email": user.email

    }


# =========================================================
# FORGOT PASSWORD
# =========================================================

@router.post(
    "/forgot-password",
    response_model=ForgotPasswordResponse
)
def forgot_password_route(
    data: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):

    email = data.email.strip().lower()


    try:

        success = forgot_password(

            db=db,

            email=email

        )

    except Exception as error:

        print(
            "Forgot password email error:",
            error
        )

        raise HTTPException(

            status_code=500,

            detail="Unable to send password reset email"

        )


    if not success:

        raise HTTPException(

            status_code=404,

            detail="No account found with this email address"

        )


    return {

        "message":
        "Password reset link has been sent to your email"

    }


# =========================================================
# RESET PASSWORD
# =========================================================

@router.post(
    "/reset-password",
    response_model=ResetPasswordResponse
)
def reset_password_route(
    data: ResetPasswordRequest,
    db: Session = Depends(get_db)
):

    # -----------------------------------------------------
    # Password validation
    # -----------------------------------------------------

    if len(data.new_password) < 6:

        raise HTTPException(

            status_code=400,

            detail=
            "Password must contain at least 6 characters"

        )


    if len(
        data.new_password.encode("utf-8")
    ) > 72:

        raise HTTPException(

            status_code=400,

            detail=
            "Password cannot be longer than 72 bytes"

        )


    if (
        data.new_password
        != data.confirm_password
    ):

        raise HTTPException(

            status_code=400,

            detail="Passwords do not match"

        )


    # -----------------------------------------------------
    # Reset password
    # -----------------------------------------------------

    success, error = reset_password(

        db=db,

        token=data.token,

        new_password=data.new_password

    )


    if not success:

        raise HTTPException(

            status_code=400,

            detail=error

        )


    return {

        "message":
        "Password reset successfully"

    }