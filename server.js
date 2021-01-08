const express = require("express");
const csv = require("csvtojson");
const request = require("request");
const https = require("https");
const fs = require("fs");

const app = express();
app.use(express.json());

// const file = fs.createWriteStream("file.jpg");
// const request = https.get("https://takeafile.com/?f=gayihekupa", function(response) {
//   response.pipe(request);
// });

// console.log(file)

const port = 3000 || process.env.PORT;

app.get("/", async (req, res) => {
  let csvData = await csv().fromFile("./tmng.csv");

  csvData = csvData.map((data) => {
    const newData = {
      "First Name": data.firstname,
      "Last Name": data.lastname,
      Age: data.age,
    };
    return newData;
  });

  res.send(csvData);
});

app.post("/get", async (req, res) => {
  let csvData = await csv().fromFile("./tmng.csv");
  const { url, select_fields } = req.body.csv;

  console.log(req.body);

  if (!select_fields || select_fields.length < 1) {
    return res.send(csvData);
  }
  //console.log(selfie)

  csvData = csvData.map((data) => {
    const newData = {
      "First Name": data.firstname,
      "Last Name": data.lastname,
      Age: data.age,
    };
    return newData;
  });
  res.send({ conversion_key: makeid(32), json: csvData });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//console.log(makeid(32));
