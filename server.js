const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('frontend'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"/html","main.html"));
});

app.get(/.+\.html$/, (req, res) =>{
  var filepath = path.join(__dirname,"html",req.url).replace("?","");
  res.sendFile(filepath);
})


app.listen(3000, () => console.log('Server has been initialized on port 3000!'));
