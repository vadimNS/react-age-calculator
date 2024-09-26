import React, { useState } from "react";
import "./App.css";

const AgeCalculatorApp = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState({ day: "", month: "", year: "" });
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });

  const clearErrorText = () => {
    setErrors({ day: "", month: "", year: "" });
  };

  const validateInputs = () => {
    const errors = {};
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    if (!day) {
      errors.day = "This field required";
    } else if (parseInt(day, 10) < 1 || parseInt(day, 10) > 31) {
      errors.day = "Must be a valid day";
    }

    if (!month) {
      errors.month = "This field required";
    } else if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
      errors.month = "Must be a valid month";
    }

    if (!year) {
      errors.year = "This field required";
    } else if (parseInt(year, 10) < 1 || parseInt(year, 10) > currentYear) {
      errors.year = "Must be a valid year";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateAge = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    let dayResult = currentDay - parseInt(day, 10);
    let monthResult = currentMonth - parseInt(month, 10);
    let yearResult = currentYear - parseInt(year, 10);

    if (monthResult < 0) {
      monthResult += 12;
      yearResult -= 1;
    }

    if (dayResult < 0) {
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const daysInPrevMonth = new Date(yearResult, prevMonth, 0).getDate();
      dayResult += daysInPrevMonth;
      monthResult -= 1;
    }

    setAge({ years: yearResult, months: monthResult, days: dayResult });
  };

  const handleSubmit = () => {
    clearErrorText();
    if (validateInputs()) {
      calculateAge();
    }
  };

  return (
    <main>
      <div className="inputs">
        <div className="input-dates">
          <span className="input-nav">DAY</span>
          <input
            className="input-numbers"
            type="number"
            placeholder="DD"
            min="1"
            max="31"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          <span className="error-message">{errors.day}</span>
        </div>
        <div className="input-dates">
          <span className="input-nav">MONTH</span>
          <input
            className="input-numbers"
            type="number"
            placeholder="MM"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <span className="error-message">{errors.month}</span>
        </div>
        <div className="input-dates">
          <span className="input-nav">YEAR</span>
          <input
            className="input-numbers"
            type="number"
            placeholder="YYYY"
            min="1"
            max={new Date().getFullYear()}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <span className="error-message">{errors.year}</span>
        </div>
      </div>
      <div className="split">
        <hr />
        <button type="button" className="images-button" onClick={handleSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="44"
            viewBox="0 0 46 44"
          >
            <g fill="none" stroke="#FFF" strokeWidth="2">
              <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
            </g>
          </svg>
        </button>
      </div>
      <div className="outputs">
        <div className="outputs-section">
          <div className="output-numbers">{age.years}</div>
          <span className="output-words">years</span>
        </div>
        <div className="outputs-section">
          <div className="output-numbers">{age.months}</div>
          <span className="output-words">months</span>
        </div>
        <div className="outputs-section">
          <div className="output-numbers">{age.days}</div>
          <span className="output-words">days</span>
        </div>
      </div>
    </main>
  );
};

export default AgeCalculatorApp;
