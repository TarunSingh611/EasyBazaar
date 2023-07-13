const cookie = require("cookie");
const { v4: uuidv4 } = require("uuid");

// In-memory storage for session data
const sessionData = [];

function session(options) {
  const name = options.name || "session";
  const maxAge = options.maxAge || 24 * 60 * 60 * 1000;

  return function (req, res, next) {
    // Parse the cookies from the request headers
    const cookies = cookie.parse(req.headers.cookie || "");

    // Retrieve the session ID from the cookie
    const sessionID = cookies.sessionID;

    ///

    /////
    if (
      sessionID &&
      sessionData.find((session) => session.sessionID == sessionID)
    ) {
      try {
        console.log("try");
        // If session data exists for the session ID, assign it to the request session
        const session = sessionData.find(
          (session) => session.sessionID === sessionID
        );
        req.session = session.data;
        console.log(req.session);
      } catch (error) {
        console.error("Error parsing session data:", error);
        req.session = {};
      }
    } else {
      if (sessionID) {
        // If the cookies already have a session ID but no corresponding session data exists,
        // set the session ID to the existing ID instead of generating a new one
        const session = sessionData.find(
          (session) => session.sessionID === sessionID
        );
        req.session = session?.data || {};
      } else {
        // If no session ID exists in the cookies, generate a new session ID
        const newSessionID = uuidv4();
        req.session = {};
        const newSession = { sessionID: newSessionID, data: req.session };
        sessionData.push(newSession);

        // Set the session ID in the response cookie
        res.setHeader(
          "Set-Cookie",
          `${name}ID=${newSessionID}; HttpOnly; Max-Age=${maxAge}`
        );
      }
    }

    // Function to save the session data to the storage
    function saveSession() {
      // No need to explicitly save session data in the in-memory storage
      // as it is already updated in the `sessionData` array
    }

    // Add a destroy method to the session object to clear the session data
    req.session.destroy = function () {
      // Remove the session data from the in-memory storage
      const sessionIndex = sessionData.findIndex(
        (session) => session.sessionID === sessionID
      );
      if (sessionIndex !== -1) {
        sessionData.splice(sessionIndex, 1);
      }

      // Remove the session ID cookie from the response
      res.setHeader("Set-Cookie", `${name}ID=; HttpOnly; Max-Age=0`);
      req.session = {};
    };

    // Save the session data (if modified) and set the session ID cookie in the response
    saveSession();

    next();
  };
}

module.exports = session;
