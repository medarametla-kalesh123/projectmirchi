from pydantic import BaseModel
from datetime import date
from decimal import Decimal
from typing import Optional


# =====================================================
# CREATE
# =====================================================

class FarmersDueReportCreate(BaseModel):

    town: Optional[str] = None

    account_name: str

    bill_date: date

    bill_no: str

    bill_amount: Decimal = 0


# =====================================================
# RESPONSE
# =====================================================

class FarmersDueReportResponse(BaseModel):

    id: int

    town: Optional[str] = None

    account_name: str

    bill_date: date

    bill_no: str

    bill_amount: Decimal

    # =================================================
    # CALCULATED FARMERS DUE DAYS
    #
    # Due Days = Today - Bill Date
    # =================================================

    due_days: int


    class Config:

        from_attributes = True