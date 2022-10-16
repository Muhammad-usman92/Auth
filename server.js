const express = require("express");
const cors = require("cors");
// import the route
const authRoute=require("./routes/auth")
const { connection } = require("./config/db");
const postRout=require("./routes/posts")


const app = express();

var bodyParser = require('body-parser')
app.use(cors());
app.use(bodyParser.json());



app.use('/api/user', authRoute)
app.use('/api/posts',postRout)



var jsonParser = bodyParser.json()
const PORT =  8080;

app.listen(process.env.PORT || PORT, async () => {
	await connection.authenticate();
	connection.sync({ alter: true });
	// .then((data)=>{

		console.log("listening on PORT: " + PORT);
	// 	console.log(data)
	// })
	console.log("hello world")
});
process.on("unhandledRejection",err=>{
	console.log(`ERROR: ${err.message}`);
	

})