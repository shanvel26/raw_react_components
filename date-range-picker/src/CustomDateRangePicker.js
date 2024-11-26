import React, { useState } from 'react';
import './CustomDateRangePicker.css';

const CustomDateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDateSelected = date => {
    setStartDate(date);
    setEndDate(null);
  };

  const endDateSelected = date => {
    if (startDate && date < startDate) {
      setStartDate(date);
      setEndDate(null);
    } else {
      setEndDate(date);
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isWithinRange = date => {
    if (startDate && endDate) {
      return date > startDate && date < endDate;
    } else if (startDate && hoverDate) {
      return date > startDate && date < hoverDate;
    }
    return false;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderDays = () => {
    const days = [];
    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Fill in the blanks before the first day of the current month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected =
        (startDate && isSameDay(date, startDate)) ||
        (endDate && isSameDay(date, endDate));
      const isInRange = isWithinRange(date);

      days.push(
        <div
          key={day}
          className={`day ${isSelected ? 'selected' : ''} ${isInRange ? 'in-range' : ''}`}
          onClick={() =>
            startDate && !endDate
              ? endDateSelected(date)
              : startDateSelected(date)
          }
          onMouseEnter={() => startDate && !endDate && setHoverDate(date)}
          onMouseLeave={() => setHoverDate(null)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="date-range-picker">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Prev</button>
        <span>{`${currentMonth + 1}/${currentYear}`}</span>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="calendar">
        <div className="days-of-week">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="day-of-week">
              {day}
            </div>
          ))}
        </div>
        <div className="days">{renderDays()}</div>
      </div>
      <div className="selected-dates">
        <p>Start Date: {startDate ? startDate.toDateString() : 'None'}</p>
        <p>End Date: {endDate ? endDate.toDateString() : 'None'}</p>
      </div>
    </div>
  );
};

export default CustomDateRangePicker;
