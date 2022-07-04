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
  const checkDate = days => {
    if (days.format('YYYY-MM-DD') === checkInDay) {
      return css.checkInDay;
    } else if (days.format('YYYY-MM-DD') === checkOutDay) {
      return css.checkOutDay;
    } else if (
      moment(days.format('YYYY-MM-DD')).isBetween(checkInDay, tempoCheckOutDay)
    ) {
      return css.tempoCheckOutDay;
    } else if (
      moment(days.format('YYYY-MM-DD')).isBetween(checkInDay, checkOutDay)
    ) {
      return css.onDay;
    } else {
      return css.days;
    }
  };

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
              if (
                moment().isAfter(days.format('YYYY-MM-DD')) &&
                moment().format('YYYY-MM-DD') !== days.format('YYYY-MM-DD')
              ) {
                return (
                  <td className={css.lastDays} key={index}>
                    <span>{days.format('D')}</span>
                  </td>
                );
              } else if (days.format('MM') !== today.format('MM')) {
                return <td key={index} />;
              } else {
                return (
                  <td
                    className={`${checkDate(days)}`}
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
      {Array(2)
        .fill(0)
        .map((el, idx) => {
          return (
            <div className={css.calendar} key={idx}>
              <div className={css.month}>
                {idx === 0
                  ? stateMoment.format('M월')
                  : nextMonth.format('M월')}
              </div>
              <table className={css.calendarTable}>
                <thead className={css.week}>
                  <tr>
                    {['일', '월', '화', '수', '목', '금', '토'].map(
                      (week, idx) => {
                        return (
                          <td className={css.week} key={idx}>
                            {week}
                          </td>
                        );
                      }
                    )}
                  </tr>
                </thead>
                <tbody>
                  {idx === 0
                    ? CalendarArr(thisMonth, thisFirstWeek, thisLastWeek)
                    : CalendarArr(nextMonth, nextFirstWeek, nextLastWeek)}
                </tbody>
              </table>
            </div>
          );
        })}
    </div>
  );
}

export default CheckInOut;
