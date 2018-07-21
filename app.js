const express=require('express');
const app=express();
const https=require('https');
const fs=require('fs');
const Server=https.createServer({
	key:fs.readFileSync('./server.key'),
	cert:fs.readFileSync('./server.crt'),
	requestCert:false,
	rejectUnauthorized:false
},app).listen(3600);
// intergrating socket.io

const io = require('socket.io')(Server);

app.set('view engine','ejs');
app.use('/assets',express.static(__dirname+'/public'));
// route assets to public the public folder
app.get('/',function(req,res){
	res.render('index');	
});

io.on('connection',function(socket){
	socket.on('stream',function(image){
		socket.broadcast.emit('stream',image);
	});

});


