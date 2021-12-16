const PORT = process.env.PORT || 3000;
const os = require('os');
const cluster = require('cluster');

module.exports = (app) => {
    //Server port
    // const cpuNum = os.cpus().length;
    // if(cluster.isMaster){
    //   for(let index = 0 ; index <= cpuNum ; index++){
    //     cluster.fork();
    //   }
    // }else{
      app.listen(PORT, () => {
          console.log("Server running on port : " + PORT);
      });
    // }
}
