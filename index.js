const app = require('./src/server.js');

app.listen(3000, function() {
  console.log(`SERVER RUNNING ON PORT: ${this.address().port}\nACTIVE LISTENERS: ${app._router.stack.length}\nRoutes: ${app._router.stack.map((r)=> `${r.handle.name}`).join(' | ')}`)
});