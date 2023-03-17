function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send({message:"You are not authenticated"});
}


module.exports = checkAuthenticated;