const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { mongooseRun } = require("./util/mongoDB");
// routes
const userRoutes = require("./routes/user");
const hotelRoutes = require("./routes/hotel");
const typeRoutes = require("./routes/type");
const roomRoutes = require("./routes/room");
const transactionRoutes = require("./routes/transaction");

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use(userRoutes);
app.use(hotelRoutes);
app.use(typeRoutes);
app.use(roomRoutes);
app.use(transactionRoutes);

mongooseRun()
  .then(() => {
    app.listen(5000, () => console.log("Rocking on 5000!"));
  })
  .catch((err) => console.log(err));
