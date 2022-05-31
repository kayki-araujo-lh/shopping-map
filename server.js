const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.info(`Running on port: ${PORT}`);
});
