import React from 'react';
import { hydrate } from 'react-dom';
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
  hydrate(<App />, document.getElementById('react-target')); // eslint-disable-line
});
