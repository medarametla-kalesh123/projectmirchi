import React, { useEffect, useState } from "react";
import "./FarmersDueReport.css";
import API from "../../api";

function FarmersDueReport({ setPage }) {

  // =====================================================
  // STATES
  // =====================================================

  const [view, setView] = useState("summary");

  const [reportData, setReportData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(() => {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

  });

  const [farmerAccounts, setFarmerAccounts] = useState([]);
const [farmerTowns, setFarmerTowns] = useState([]);


  // =====================================================
  // LOAD REPORT
  // =====================================================

  useEffect(() => {

    loadFarmersDueReport();
    loadFarmerAccounts();
    loadFarmerTowns();

  }, []);

  const loadFarmerAccounts = async () => {

  try {

    const response = await fetch(
      `${API}/accounts/group/Farmers`
    );

    if (!response.ok) {

      throw new Error(
        "Failed to load Farmers accounts"
      );

    }

    const data = await response.json();

    setFarmerAccounts(data);

  } catch (error) {

    console.error(
      "Error loading Farmers accounts:",
      error
    );

  }

};

const loadFarmerTowns = async () => {

  try {

    const response = await fetch(
      `${API}/accounts/group/Farmers/towns`
    );

    if (!response.ok) {

      throw new Error(
        "Failed to load Farmers towns"
      );

    }

    const data = await response.json();

    setFarmerTowns(
      data.filter(
        town =>
          town &&
          String(town).trim() !== ""
      )
    );

  } catch (error) {

    console.error(
      "Error loading Farmers towns:",
      error
    );

  }

};


  // =====================================================
  // LOAD FARMERS DUE REPORT
  // =====================================================

  const loadFarmersDueReport = async () => {

    try {

      const response = await fetch(
        `${API}/farmers-due-report/`
      );

      if (!response.ok) {

        throw new Error(
          "Failed to load Farmers Due Report"
        );

      }

      const data = await response.json();

      setReportData(data);

    }

    catch (error) {

      console.error(
        "Error loading Farmers Due Report:",
        error
      );

    }

  };


  // =====================================================
  // ACCOUNT LIST
  // =====================================================

 const accountList = [
  ...new Set(
    farmerAccounts
      .map(account => account.account_name)
      .filter(Boolean)
  )
];

  // =====================================================
  // TOWN LIST
  // =====================================================
const townList = [
  ...new Set(
    farmerTowns
      .filter(
        town =>
          town &&
          String(town).trim() !== ""
      )
      .map(town => String(town).trim())
  )
];

  // =====================================================
  // PARSE LOCAL DATE
  // =====================================================

  const parseLocalDate = (dateValue) => {

    if (!dateValue) {
      return null;
    }

    const dateString =
      String(dateValue).split("T")[0];

    const parts =
      dateString.split("-");

    if (parts.length !== 3) {

      return new Date(dateValue);

    }

    const year = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const day = Number(parts[2]);

    return new Date(
      year,
      month,
      day
    );

  };


  // =====================================================
  // CALCULATE DUE DAYS
  //
  // Farmers:
  //
  // Due Days = Selected Date - Bill Date
  //
  // Example:
  //
  // Bill Date : 01-Aug
  // Selected  : 09-Aug
  // Due Days  : 8
  //
  // No negative values.
  // =====================================================

  const calculateDueDays = (billDate) => {

    if (!billDate) {
      return 0;
    }

    const billDateObject =
      parseLocalDate(billDate);

    const selectedDateObject =
      parseLocalDate(selectedDate);

    if (
      !billDateObject ||
      !selectedDateObject
    ) {

      return 0;

    }


    const difference =
      selectedDateObject -
      billDateObject;


    const days = Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    );


    return Math.max(
      0,
      days
    );

  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (dateValue) => {

    if (!dateValue) {
      return "";
    }

    const date =
      parseLocalDate(dateValue);

    if (!date) {
      return "";
    }

    return date.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "2-digit"
      }
    );

  };


  // =====================================================
  // FORMAT AMOUNT
  // =====================================================

  const formatAmount = (amount) => {

    return Number(
      amount || 0
    ).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    );

  };


  // =====================================================
  // GROUP FARMERS
  //
  // Same account_name = same farmer
  // =====================================================

  const groupedFarmers = [];

  const farmerMap = new Map();


  reportData.forEach((row) => {

    const farmerName =
      row.account_name ||
      "Unknown Farmer";


    if (!farmerMap.has(farmerName)) {

      const group = {

        account_name: farmerName,

        town: row.town || "-",

        rows: [],

        total: 0

      };


      farmerMap.set(
        farmerName,
        group
      );


      groupedFarmers.push(
        group
      );

    }


    const group =
      farmerMap.get(
        farmerName
      );


    group.rows.push(row);


    group.total += Number(
      row.bill_amount || 0
    );

  });


  // =====================================================
  // TOTALS
  // =====================================================

  const totals = {

    upTo90: 0,

    from91To180: 0,

    from181To270: 0,

    from271To365: 0

  };


  reportData.forEach((row) => {

    const dueDays =
      calculateDueDays(
        row.bill_date
      );


    const amount =
      Number(
        row.bill_amount || 0
      );


    if (dueDays <= 90) {

      totals.upTo90 += amount;

    }

    else if (dueDays <= 180) {

      totals.from91To180 += amount;

    }

    else if (dueDays <= 270) {

      totals.from181To270 += amount;

    }

    else if (dueDays <= 365) {

      totals.from271To365 += amount;

    }

  });


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="farmers-due-container">


      {/* =================================================
          TITLE
      ================================================= */}

      <h2>
        Farmers Due Report
      </h2>


      <div className="farmers-due-main">


        {/* =================================================
            REPORT TABLE
        ================================================= */}

        <div className="farmers-table-wrapper">

          <table className="farmers-table">

            <thead>

              <tr>

                <th className="town-column">
                  Town
                </th>

                <th className="account-column">
                  A/C Name
                </th>

                <th className="date-column">
                  Bill Date
                </th>

                <th className="bill-column">
                  Bill No
                </th>

                <th className="amount-column">
                  Bill Amount
                </th>

                <th className="due-column">
                  Due Days
                </th>

              </tr>

            </thead>


            <tbody>


              {/* =================================================
                  GROUPED FARMERS
              ================================================= */}

              {groupedFarmers.map(
                (farmer, farmerIndex) => (

                  <React.Fragment
                    key={
                      `${farmer.account_name}-${farmerIndex}`
                    }
                  >


                    {/* =========================================
                        FARMER BILL ROWS
                    ========================================= */}

                    {farmer.rows.map(
                      (row, rowIndex) => {

                        const dueDays =
                          calculateDueDays(
                            row.bill_date
                          );


                        return (

                          <tr
                            key={
                              row.id ||
                              `${farmerIndex}-${rowIndex}`
                            }
                            className="bill-row"
                          >


                            {/* TOWN */}

                            <td className="town-cell">

                              {rowIndex === 0
                                ? farmer.town
                                : ""}

                            </td>


                            {/* ACCOUNT NAME */}

                            <td className="account-cell">

                              {rowIndex === 0
                                ? farmer.account_name
                                : ""}

                            </td>


                            {/* BILL DATE */}

                            <td className="date-cell">

                              {formatDate(
                                row.bill_date
                              )}

                            </td>


                            {/* BILL NUMBER */}

                            <td className="bill-cell">

                              {row.bill_no || "-"}

                            </td>


                            {/* BILL AMOUNT */}

                            <td className="amount-cell">

                              {formatAmount(
                                row.bill_amount
                              )}

                            </td>


                            {/* DUE DAYS */}

                            <td className="due-cell">

                              {dueDays}

                            </td>

                          </tr>

                        );

                      }
                    )}


                    {/* =========================================
                        FARMER TOTAL
                    ========================================= */}

                    <tr className="farmer-total-row">

                      <td></td>

                      <td></td>

                      <td></td>

                      <td className="total-label">

                        Total :

                      </td>

                      <td className="farmer-total-amount">

                        {formatAmount(
                          farmer.total
                        )}

                      </td>

                      <td className="farmer-total-due">

                      </td>

                    </tr>


                  </React.Fragment>

                )
              )}


              {/* =================================================
                  NO RECORDS
              ================================================= */}

              {reportData.length === 0 && (

                <tr>

                  <td
                    colSpan="6"
                    className="no-records"
                  >

                    No Farmers Due Records Found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =====================================================
            BOTTOM PANEL
        ===================================================== */}

        <div className="farmers-bottom-panel">


          {/* ===================================================
              LEFT PANEL
          =================================================== */}

          <div className="left-panel">


            {/* ACCOUNTS */}

            <div className="panel-box">

              <label>
                Accounts List
              </label>

              <select size="5">

                {accountList.map(
                  (account, index) => (

                    <option
                      key={index}
                    >

                      {account}

                    </option>

                  )
                )}

              </select>

            </div>


            {/* TOWNS */}

            <div className="panel-box">

              <label>
                Towns
              </label>

              <select size="4">

                {townList.map(
                  (town, index) => (

                    <option
                      key={index}
                    >

                      {town}

                    </option>

                  )
                )}

              </select>

            </div>


          </div>


          {/* ===================================================
              MIDDLE PANEL
          =================================================== */}

          <div className="middle-panel">


            {/* DATE */}

            <div className="date-box">

              <label>
                Date
              </label>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) =>
                  setSelectedDate(
                    e.target.value
                  )
                }
              />


              <button>
                Selected Days Only
              </button>

            </div>


            {/* TOTALS */}

            <div className="totals-box">

              <h4>
                Totals
              </h4>


              <p>
                Up to 90 :
                ₹ {formatAmount(
                  totals.upTo90
                )}
              </p>


              <p>
                91 - 180 :
                ₹ {formatAmount(
                  totals.from91To180
                )}
              </p>


              <p>
                181 - 270 :
                ₹ {formatAmount(
                  totals.from181To270
                )}
              </p>


              <p>
                271 - 365 :
                ₹ {formatAmount(
                  totals.from271To365
                )}
              </p>

            </div>


          </div>


          {/* ===================================================
              RIGHT PANEL
          =================================================== */}

          <div className="right-panel">


            {/* VIEW OPTIONS */}

            <div className="view-options">

              <h4>
                View Option
              </h4>


              <label>

                <input
                  type="radio"
                  checked={
                    view === "summary"
                  }
                  onChange={() =>
                    setView(
                      "summary"
                    )
                  }
                />

                Summary

              </label>


              <label>

                <input
                  type="radio"
                  checked={
                    view === "detailed"
                  }
                  onChange={() =>
                    setView(
                      "detailed"
                    )
                  }
                />

                Detailed

              </label>

            </div>


            {/* GROUP WISE */}

            <label className="checkbox">

              <input
                type="checkbox"
              />

              Group Wise

            </label>


            {/* LASER PRINT */}

            <label className="checkbox">

              <input
                type="checkbox"
              />

              Laser Print

            </label>


            {/* PERIODS */}

            <button>
              Periods
            </button>


            {/* VIEW */}

            <button>
              View
            </button>


            {/* PRINT */}

            <button
              onClick={() =>
                window.print()
              }
            >

              Print

            </button>


            {/* CLOSE */}

            <button
              onClick={() =>
                setPage
                  ? setPage("dashboard")
                  : window.history.back()
              }
            >

              Close

            </button>


          </div>


        </div>

      </div>

    </div>

  );

}

export default FarmersDueReport;