require("dotenv").config();

/**** Enviromnment definition *******************************************************/
process.env.PORT = process.env.PORT || 3001;
process.env.AppURL = process.env.AppURL || 'http://localhost';
//process.env.MongoDb = 'connectionstring';
process.env.StorageType = process.env.StorageType || 'local'; // local,azure,aws
    //process.env.AzureStorage = ''
    //process.env.AwsKey=''
    //process.env.AwsId=''
    //process.env.AwsRegion='us-east-1'
/************************************************************************************/

const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');
const app = express();

mongoose.connect(process.env.MongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("connected"))
.catch(e => console.error(e.message));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(require("morgan")("dev"));

app.use(require("./routes"));

app.listen(process.env.PORT, () => console.log(`listem on ${process.env.AppURL}:${process.env.PORT}`));
