// import i18n translation files
import '../locales';

// Set up some rate limiting and other important security settings.
import './config/security';

// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import './config/accounts';
import './config/ValidationError';
import './register-api';
