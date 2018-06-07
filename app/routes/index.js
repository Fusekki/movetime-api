const movietimeRoutes = require('./movietime_routes');
module.exports = function(app, db) {
  movietimeRoutes(app, db);
  // Other route groups could go here, in the future
};