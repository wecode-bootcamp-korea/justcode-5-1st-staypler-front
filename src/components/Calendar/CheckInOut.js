import React from 'react';
import moment from 'moment';
import css from './CheckInOut.module.scss';

function CheckInOut({
  stateMoment,
  checkIn,
  checkOut,
  onCheck,
  tempoCheckOut,
  onHover,
  onHoverReset,
}) {
  //달력 생성변수
  const thisMonth = stateMoment;
  const thisFirstWeek = thisMonth.clone().startOf('month').week();
  const thisLastWeek =
    thisMonth.clone().endOf('month').week() === 1
      ? 53
      : thisMonth.clone().endOf('month').week();

  const nextMonth = stateMoment.clone().add(1, 'month');
  const nextFirstWeek = nextMonth.clone().startOf('month').week();
  const nextLastWeek =
    nextMonth.clone().endOf('month').week() === 1
      ? 53
      : nextMonth.clone().endOf('month').week();

  const checkInDay = checkIn;
  const checkOutDay = checkOut;
  const tempoCheckOutDay = tempoCheckOut;

  //특정 날짜마다 어떤 조건에 해당하는지 판단-> 조건에 맞는 className 주기
  const CalendarArr = (today, firstWeek, lastWeek) => {
    let result = [];
    let week = firstWeek;
    for (let i = week; i <= lastWeek; i++) {
      result = result.concat(
        <tr key={i}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let days = today
                .clone()
                .startOf('year')
                .week(i)
                .startOf('week')
                .add(index, 'day');
              if (days.format('MM') !== today.format('MM')) {
                return <td />;
              } else if (days.format('YYYY-MM-DD') === checkInDay) {
                return (
                  <td
                    className={css.checkInDay}
                    onMouseEnter={() => onHover(days.format('YYYY-MM-DD'))}
                    onMouseLeave={onHoverReset}
                    onClick={() => onCheck(days.format('YYYY-MM-DD'))}
                    key={index}
                  >
                    <span>{days.format('D')}</span>
                  </td>
                );
              } else if (
                moment(days.format('YYYY-MM-DD')).isBetween(
                  checkInDay,
                  tempoCheckOutDay
                )
              ) {
                return (
                  <td
                    className={css.tempoCheckOutDay}
                    onMouseEnter={() => onHover(days.format('YYYY-MM-DD'))}
                    onMouseLeave={onHoverReset}
                    onClick={() => onCheck(days.format('YYYY-MM-DD'))}
                    key={index}
                  >
                    <span>{days.format('D')}</span>
                  </td>
                );
              } else if (days.format('YYYY-MM-DD') === checkOutDay) {
                return (
                  <td
                    className={css.checkOutDay}
                    onMouseEnter={() => onHover(days.format('YYYY-MM-DD'))}
                    onMouseLeave={onHoverReset}
                    onClick={() => onCheck(days.format('YYYY-MM-DD'))}
                    key={index}
                  >
                    <span>{days.format('D')}</span>
                  </td>
                );
              } else if (
                moment(days.format('YYYY-MM-DD')).isBetween(
                  checkInDay,
                  checkOutDay
                )
              ) {
                return (
                  <td
                    className={css.onDay}
                    onMouseEnter={() => onHover(days.format('YYYY-MM-DD'))}
                    onMouseLeave={onHoverReset}
                    onClick={() => onCheck(days.format('YYYY-MM-DD'))}
                    key={index}
                  >
                    <span>{days.format('D')}</span>
                  </td>
                );
              } else if (
                moment().isAfter(days.format('YYYY-MM-DD')) &&
                moment().format('YYYY-MM-DD')
              ) {
                return (
                  <td className={css.lastDays} key={index}>
                    <span>{days.format('D')}</span>
                  </td>
                );
              } else {
                return (
                  <td
                    className={css.days}
                    onMouseEnter={() => onHover(days.format('YYYY-MM-DD'))}
                    onMouseLeave={onHoverReset}
                    onClick={() => onCheck(days.format('YYYY-MM-DD'))}
                    key={index}
                  >
                    <span>{days.format('D')}</span>
                  </td>
                );
              }
            })}
        </tr>
      );
    }
    return result;
  };

  return (
    <div className={css.calendarWrapper}>
      <div className={css.calendar}>
        <div className={css.month}>{stateMoment.format('M월')}</div>
        <table className={css.calendarTable}>
          <thead>
            <tr className={css.week}>
              <td>일</td>
              <td>월</td>
              <td>화</td>
              <td>수</td>
              <td>목</td>
              <td>금</td>
              <td>토</td>
            </tr>
          </thead>
          <tbody>{CalendarArr(thisMonth, thisFirstWeek, thisLastWeek)}</tbody>
        </table>
      </div>
      <div className={css.calendar}>
        <div className={css.month}>{nextMonth.format('M월')}</div>
        <table className={css.calendarTable}>
          <thead>
            <tr className={css.week}>
              <td>일</td>
              <td>월</td>
              <td>화</td>
              <td>수</td>
              <td>목</td>
              <td>금</td>
              <td>토</td>
            </tr>
          </thead>
          <tbody>{CalendarArr(nextMonth, nextFirstWeek, nextLastWeek)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default CheckInOut;
