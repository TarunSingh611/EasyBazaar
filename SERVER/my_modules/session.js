const cookie = require('cookie');
let data = {};
// console.log(cookie)
function session(options) {
  const name = options.name || 'session';
  const maxAge = options.maxAge || 24 * 60 * 60 * 1000;

  return function(req, res, next) {
    // Parse the cookies from the request headers
    const cookies = cookie.parse(req.headers.cookie || '');
    //  data =cookies.sessionData
    
    // Retrieve the session data from the cookie
    let sessionData = data;
    
    if (sessionData) {
      try {
        // If session data exists, parse it from JSON
        req.session =data;
      } catch (error) {
        console.error('Error parsing session data:', error);
        req.session = data;
      }
    } else {
      // If no session data exists, initialize an empty session object
      req.session = data;
    }

    // Function to save the session data to the response cookie
    function saveSession() {
      const serializedSessionData = JSON.stringify(req.session);
      res.setHeader('Set-Cookie', `${name}Data=${serializedSessionData}; HttpOnly; Max-Age=${maxAge}`);
    }

    // Add a destroy method to the session object to clear the session cookie
    req.session.destroy = function() {
      // Remove the session cookie from the response
      res.setHeader('Set-Cookie', ``);
      req.session = {};
      data={}
    };

    // Save the session data in the response cookie
    saveSession();

    next();
  };
}

module.exports = session;
