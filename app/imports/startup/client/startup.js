import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import { registerSchemaMessages, getLang } from '../../api/utils/functions';
import App from '../../ui/layouts/App';

import '../locales';

/** Startup the application by rendering the App layout component. */
Meteor.startup(() => {
  i18n.setLocale(getLang());
  // setup translated validation messages
  registerSchemaMessages();
  ReactDOM.render(<App />, document.getElementById('root'));
});
