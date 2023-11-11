const express = require("express");
const userRouter = express.Router();
const {
    upsertDataByName,
} = require("../../mongo_connection");

userRouter.route("/").get((req, res) => {
    res.render("index");
});

userRouter.route("/username").get(async (req, res) => {
    if (!req.body) {
        res.status(400).json({ error: "ค่า req.body ไม่ถูกต้อง" });
        return;
    }
    try {
        const username = req.query.username;
        await upsertDataByName("dailyplanner", "users", { username: username }, req.query);
        res.redirect("./" + username);
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
    }
});

userRouter.route("/:username").get(async (req, res) => {
    const username = req.params.username;
    res.render("user", { username: username });
});

userRouter.route("/:username/planner").get(async (req, res) => {
    const date = req.query.date;
    res.redirect("./" + date);
});

userRouter.route("/:username/planner").post(async (req, res) => {
    if (!req.body) {
        res.status(400).json({ error: "ค่า req.body ไม่ถูกต้อง" });
        return;
    }
    try {
        const username = req.params.username;
        const date = req.body.date;
        req.body.username = username;
        await upsertDataByName("dailyplanner", "planners", { date: date, username: username }, req.body);
        res.redirect("./" + date);
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
    }
});

userRouter.route("/:username/:date").get(async (req, res) => {
    const username = req.params.username;
    const date = req.params.date;
    res.render("planner", { date: date, username: username });
});

module.exports = userRouter;