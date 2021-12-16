module.exports = (app) => {
    //If request_is_here , then no route has not been found
    app.use((req, res) => {
        // TODO :: Respond with json in ApiResponse Format
        return res.send("Not Found")
    });
}