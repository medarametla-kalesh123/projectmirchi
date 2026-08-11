from pydantic import BaseModel, EmailStr


# =========================================================
# REGISTER
# =========================================================

class RegisterRequest(BaseModel):

    full_name: str

    username: str

    email: EmailStr

    password: str

    confirm_password: str


class RegisterResponse(BaseModel):

    message: str


# =========================================================
# LOGIN
# =========================================================

class LoginRequest(BaseModel):

    username: str

    password: str


class LoginResponse(BaseModel):

    message: str

    access_token: str

    token_type: str

    user_id: int

    full_name: str

    username: str

    email: EmailStr


# =========================================================
# FORGOT PASSWORD
# =========================================================

class ForgotPasswordRequest(BaseModel):

    email: EmailStr


class ForgotPasswordResponse(BaseModel):

    message: str


# =========================================================
# RESET PASSWORD
# =========================================================

class ResetPasswordRequest(BaseModel):

    token: str

    new_password: str

    confirm_password: str


class ResetPasswordResponse(BaseModel):

    message: str