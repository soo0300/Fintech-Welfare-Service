import React, { useState } from "react";
import styled from "styled-components";
import Button from "../button/Button";

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const CalendarTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const CalendarCell = styled.td`
  width: 14.28%; /* 100% / 7 days */
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
  color: ${(props) => (props.isWeekend ? "red" : "inherit")};
`;

const CalendarModal = () => {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);

  // +- 5년 범위의 연도 목록을 생성합니다.
  const availableYears = [];
  const startYear = today.getFullYear() - 5;
  const endYear = today.getFullYear() + 5;
  for (let year = startYear; year <= endYear; year++) {
    availableYears.push(year);
  }

  // 월 목록을 생성합니다.
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  const renderCalendar = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const firstDayOfMonth = new Date(
      selectedYear,
      selectedMonth - 1,
      1
    ).getDay();

    const calendar = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const row = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          row.push(<CalendarCell key={j}></CalendarCell>);
        } else if (dayCounter <= daysInMonth) {
          const currentDate = new Date(
            selectedYear,
            selectedMonth - 1,
            dayCounter
          );
          const isWeekend =
            currentDate.getDay() === 0 || currentDate.getDay() === 6;

          row.push(
            <CalendarCell key={dayCounter} isWeekend={isWeekend}>
              {dayCounter}
            </CalendarCell>
          );
          dayCounter++;
        }
      }

      calendar.push(<tr key={i}>{row}</tr>);
    }

    return calendar;
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}월
              </option>
            ))}
          </select>
        </div>
        <Button
          onClick={() => setSelectedYear(selectedYear - 1)}
          background="none"
          color="black"
        >
          ◀
        </Button>
        <Button
          onClick={() => setSelectedYear(selectedYear + 1)}
          background="none"
          color="black"
        >
          ▶
        </Button>
      </CalendarHeader>
      <CalendarTable>
        <thead>
          <tr>
            <th style={{ color: "red" }}>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th style={{ color: "red" }}>토</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </CalendarTable>
    </CalendarWrapper>
  );
};

export default CalendarModal;
