const createReceiver = require('./Receivers/createAuthReceiver.js');
const bodyParser = require('body-parser')

class MainServer{

constructor(server){
  this.sockets = [];
  this.server = server;
  this.createListeners();
  this.runServer();
  this.server.on('connection', (s)=>{
    this.sockets.push(s);
  });
  this.restartedIntervals = 0;
  setInterval(()=>{
    this.resetServer();
  },3600000);
}
createListeners(){
  this.server.post('/requestAuthorizationPRS', bodyParser.json(), (req, res) => {
  return createReceiver(req, res, this.server)
    .then(function(result) {
      return res.send(result).status(200);
    }).catch((e) => { res.json({ error: 'UNKNOWN INTERNAL SERVER ERROR' }).status(500); console.log(e) });
});
  /*this.server.use((req, res)=>{
    res.send('<p style="font-size: 60px; font-weight:bold;">THE PATH YOU ARE LOOKING FOR HAS EITHER EXPIRED OR DOES NOT EXIST</p>').status(404);
  })*/
  
}

runServer(){
  let app = this.server;
  app.listen(3000, function() {
    console.log(`SERVER RUNNING ON PORT: ${this.address().port}\nACTIVE LISTENERS: ${app._router.stack.length}\nRoutes: ${app._router.stack.map((r)=> `${r.handle.name}`).join(' | ')}`)
  });
}

resetServer(){
  (()=>{
    this.server.routes = {};
    this.sockets.forEach(socket=>socket.destroy());this.sockets=[];
    this.restartedIntervals++;
    console.log(`SERVER RESETING; ALL SOCKETS DESTROYED | ALL ROUTED DELETED\nRESTART #${this.restartedIntervals}`);

  })
}
}
module.exports = MainServer;