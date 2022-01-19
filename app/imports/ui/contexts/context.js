import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import reducer, { MOBILE_SIZE } from './reducer';
import { getLang } from '../../api/utils/functions';
import { useWindowSize } from '../../api/utils/hooks';

const initialState = {
  user: Meteor.user(),
  userId: null,
  isMobile: window.innerWidth < MOBILE_SIZE,
  language: getLang().substr(0, 2),
  loggingIn: Accounts.loggingIn(),
  authenticated: false,
  appPage: {},
  packPage: {},
};

const logger = (state, action) => {
  const newState = reducer(state, action);
  if (Meteor.isDevelopment) {
    console.groupCollapsed('Action Type:', action.type);
    console.log('Prev state: ', state);
    console.log('Next state: ', newState);
    console.groupEnd();
  }
  return newState;
};

const Store = ({ children, loggingIn, user, userId, authenticated, roles, loadingUser }) => {
  const [state, dispatch] = useReducer(logger, initialState);
  const { width } = useWindowSize();

  useEffect(() => {
    dispatch({ type: 'mobile', data: { width } });
  }, [width]);

  useEffect(() => {
    dispatch({
      type: 'user',
      data: {
        loadingUser,
        loggingIn,
        user,
        userId,
        authenticated,
        roles,
      },
    });
    if (user && user.language && user.language !== state.language) {
      dispatch({
        type: 'language',
        data: {
          language: user.language,
        },
      });
    }
  }, [loggingIn, user, userId, authenticated, roles, loadingUser]);

  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

export const Context = createContext(initialState);
export const useAppContext = () => useContext(Context);

const DynamicStore = withTracker(() => {
  const userHandle = Meteor.subscribe('userData');
  const loadingUser = !userHandle.ready();
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();

  return {
    loadingUser,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    user,
    userId,
  };
})(Store);

export default DynamicStore;

Store.defaultProps = {
  authenticated: false,
  loadingUser: false,
  loggingIn: false,
  userId: undefined,
  user: {},
  roles: {},
};

Store.propTypes = {
  authenticated: PropTypes.bool,
  loadingUser: PropTypes.bool,
  loggingIn: PropTypes.bool,
  userId: PropTypes.string,
  user: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.element.isRequired,
  roles: PropTypes.objectOf(PropTypes.any),
};
