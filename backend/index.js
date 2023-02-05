const express = require("express");
const fs = require("fs-extra");

const PORT = 3001;
const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
    let result = fs.readJSONSync("backend/leaderBoard.json");
    res.json(result);
    // console.log(req);
});

// app.use(express.json());

app.post("/api", (req, res) => {
    // const qwer = res.json(req.body);
    const qwer = req.body;
    console.log(qwer);
    fs.writeJson("./backend/leaderBoard.json", qwer).then(() => {
        console.log("Записал");
    });
});
app.listen(PORT, () => {
    console.log(`Сервер ${PORT} запущен`);
});
