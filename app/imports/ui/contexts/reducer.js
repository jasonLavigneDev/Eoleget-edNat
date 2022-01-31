import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';

export const MOBILE_SIZE = 768;

const reducer = (state, action) => {
  const { type, data = {} } = action;
  const { language, width } = data;
  const newState = JSON.parse(JSON.stringify(state));
  switch (type) {
    case 'language':
      if (newState.user && newState.user.language !== language) {
        Meteor.call('users.setLanguage', { language });
      }
      i18n.setLocale(language);
      return {
        ...newState,
        language,
      };
    case 'event':
      return {
        ...newState,
        event: { ...data },
      };
    case 'appPage':
      return {
        ...newState,
        appPage: { ...data },
      };
    case 'packPage':
      return {
        ...newState,
        packPage: { ...data },
      };
    case 'appSelected':
      return {
        ...newState,
        appSelected: { ...data },
      };
    case 'mobile':
      return {
        ...newState,
        isMobile: width < MOBILE_SIZE,
      };
    case 'user':
      return {
        ...newState,
        ...data,
      };
    default:
      throw new Error();
  }
};

export default reducer;
