//deployed to heroku

const express = require('express');
const app = express();
const fs = require('fs');
var get_ip = require('ipware')().get_ip  // to get real IP address

var i = 0;
var timeMin = 0;

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
	
	//var ip_info = get_ip(req); // to get real IP address
	
	fs.readFile('./mydata.txt', (err, data) => {
		if(err) var dataString = err;
		else var dataString = data.toString();
		// dataString += `${ i } - ${ req.socket.remoteAddress } - ${ ip_info.clientIp }<br/>`;
		dataString += `${ i } - ${ req.socket.remoteAddress }<br/>`;
		dataString += '\n';
		fs.writeFile('./mydata.txt', dataString, ()=>{});
	
		res.send(
		`<!DOCTYPE html>
		<html lang="en">
		<head>
			<title>Heroku tricks</title>
			<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
			<link rel="stylesheet" href="./style.css">
		</head>
		<body>
			<div class="container mt-3 p-5 bg-primary text-white text-center">
				<h1>This page was open ${ i } times.</h1>
				<h4>Up-time is ${ timeMin } seconds.</h4>
				<p class="bg-info mt-3 p-3 ">String data:<br/> ${ dataString }</p>
				<a href="reset"> RESET UP-TIME </a>
			</div>
		  </body>
		</html>`
		
		
		);
		i++;
	});
});

app.listen(process.env.PORT || 3000);

var si = setInterval(() => console.log(timeMin++), 1000);


