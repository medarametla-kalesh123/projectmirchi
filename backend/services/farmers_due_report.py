from datetime import date

from sqlalchemy.orm import Session

from models.farmers_due_report import FarmersDueReport

from schemas.farmers_due_report import (
    FarmersDueReportCreate
)


# =====================================================
# CREATE
# =====================================================

def create_farmers_due_entry(
    db: Session,
    entry: FarmersDueReportCreate
):

    new_entry = FarmersDueReport(

        town=entry.town,

        account_name=entry.account_name,

        bill_date=entry.bill_date,

        bill_no=entry.bill_no,

        bill_amount=entry.bill_amount

    )

    db.add(new_entry)

    db.commit()

    db.refresh(new_entry)


    # =================================================
    # CALCULATE DUE DAYS
    #
    # Farmers:
    #
    # Due Days = Today - Bill Date
    #
    # No negative values
    # =================================================

    due_days = (
        date.today() - new_entry.bill_date
    ).days


    if due_days < 0:
        due_days = 0


    # Add calculated value to response object

    new_entry.due_days = due_days


    return new_entry


# =====================================================
# GET ALL
# =====================================================

def get_all_farmers_due_entries(
    db: Session
):

    entries = db.query(

        FarmersDueReport

    ).order_by(

        FarmersDueReport.bill_date.desc()

    ).all()


    # =================================================
    # CALCULATE DUE DAYS FOR EVERY ENTRY
    #
    # Due Days = Today - Bill Date
    # =================================================

    today = date.today()


    for entry in entries:

        due_days = (
            today - entry.bill_date
        ).days


        # Never allow negative days

        if due_days < 0:
            due_days = 0


        entry.due_days = due_days


    return entries