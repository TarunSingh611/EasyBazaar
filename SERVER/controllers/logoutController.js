

const logoutController = {
  getLogout: (req, res) => {
    
  
    req.session.destroy();

    res.end(); 
   
  },

  
};

module.exports = logoutController;