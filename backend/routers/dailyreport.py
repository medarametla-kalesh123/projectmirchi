from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from datetime import date

from database import get_db

from schemas.dailyreport import DailyReportResponse

from services.dailyreport_service import (
    get_daily_report,
    get_farmers_report,
    get_traders_report
)


router = APIRouter(
    prefix="/dailyreport",
    tags=["Daily Report"]
)


# =========================================================
# COMPLETE DAILY REPORT
# =========================================================

@router.get(
    "/",
    response_model=DailyReportResponse
)
def daily_report(
    report_date: date,
    search: str = Query(
        default=""
    ),
    db: Session = Depends(get_db)
):

    return get_daily_report(
        db,
        report_date,
        search
    )


# =========================================================
# FARMERS REPORT
# =========================================================

@router.get(
    "/farmers"
)
def farmers_report(
    report_date: date,
    search: str = Query(
        default=""
    ),
    db: Session = Depends(get_db)
):

    return get_farmers_report(
        db,
        report_date,
        search
    )


# =========================================================
# TRADERS REPORT
# =========================================================

@router.get(
    "/traders"
)
def traders_report(
    report_date: date,
    search: str = Query(
        default=""
    ),
    db: Session = Depends(get_db)
):

    return get_traders_report(
        db,
        report_date,
        search
    )