import express from "express";

import routes from "@routes/api";

const app = express();

app.use("/api", routes);

app.listen(8000, () => console.log("initialized on 8000"));
