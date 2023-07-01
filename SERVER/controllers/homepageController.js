const homepageController = {
 getHomepage: (req, res) => {


 
    if(req.session){
  
      req.session.changePass = false;
    }
        if (req.session && req.session.is_logged_in && req.session.user.isVerified) {
         
          // If user is authenticated and verified, redirect to another page
          user = req.session.user;
          return res.send({ user });
        }
        else{
          
          // If user is not authenticated or not verified, render the template
          let user = { username: "Guest User" };
          return res.send({user});
        }
  }
};

module.exports =homepageController;