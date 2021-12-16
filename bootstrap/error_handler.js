module.exports = (app) => {
    //If request is here , then an error has been occurred
    app.use((err, req, res, next) => {
        // Respond with json
        const statusCode = req.statusCode === 200 ? 500 : res.statusCode
        //TODO :: remove this later
        console.log(err)
        // set status
        res.status(statusCode)
        //TODO :: add ApiResponse Format
        return  res.json({
            success: false,
            message: err.message,
            stack: process.env.NODE_ENV === "production" ? null : err.stack,
          });
    });
}