const auth = require('./fixtures/auth.json');
const contacts = require('./fixtures/contacts.json');
const mfe =
  process.env.NODE_ENV === 'production' ? require('./fixtures/mfe-prod.json') : require('./fixtures/mfe-dev.json');

module.exports = () => ({ auth, contacts, mfe });
