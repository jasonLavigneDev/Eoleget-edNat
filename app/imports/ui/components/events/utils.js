import React, { useEffect } from 'react';
import moment from 'moment';
import i18n from 'meteor/universe:i18n';
import { useObjectState } from '../../../api/utils/hooks';

export const initialState = {
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  title: '',
  description: '',
  location: '',
  allDay: false,
  recurrent: false,
  daysOfWeek: [],
  groups: [],
  guests: [],
  participants: [],
  startRecur: '',
  endRecur: '',
};

export const useErrors = (state) => {
  const { startDate, endDate, startTime, endTime, startRecur, endRecur } = state;
  const [errors, setErrors] = useObjectState({});

  useEffect(() => {
    if (moment(startDate).isAfter(endDate)) {
      setErrors({ endDate: i18n.__('pages.FormEvent.endDateMustBeAfterStartDate') });
    } else if (moment(startDate).isBefore(moment().subtract(1, 'days'))) {
      setErrors({ endDate: i18n.__('pages.AddEvent.startDateMustBeAfterToday') });
    } else {
      setErrors({ endDate: null });
    }
  }, [endDate, startDate]);

  useEffect(() => {
    if (moment(`${startDate} ${startTime}`).isAfter(`${endDate} ${endTime}`)) {
      setErrors({ endTime: i18n.__('pages.FormEvent.endTimeMustBeAfterStartTime') });
    } else if (moment(`${startDate} ${startTime}`).isBefore(moment().subtract(1, 'days'))) {
      setErrors({ endDate: i18n.__('pages.AddEvent.startDateMustBeAfterToday') });
    } else {
      setErrors({ endTime: null });
    }
  }, [endTime, startTime, endDate, startDate]);

  useEffect(() => {
    if (endRecur && moment(`${startRecur}`).isAfter(`${endRecur}`)) {
      setErrors({ endTime: i18n.__('pages.FormEvent.endTimeMustBeAfterStartTime') });
    } else {
      setErrors({ endTime: null });
    }
  }, [startRecur, endRecur]);

  return errors;
};

export const descriptionWithLinks = (description) => {
  const arrayDescription = description ? description.split(' ') : [];
  // eslint-disable-next-line max-len
  const regex = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/,
  );
  const html = [];
  arrayDescription.forEach((line) => {
    if (line.match(regex)) {
      html.push(
        <a href={line} key={line} target="_blank" rel="noreferrer">
          {`${line} `}
        </a>,
      );
    } else {
      html.push(`${line} `);
    }
  });
  return html;
};
