const express = require("express");
const userRouter = express.Router();
const {
    upsertDataByName,
    readData2,
    joinCollectionByName
} = require("../../mongo_connection");
const HourMapper = require("../../public/scripts/hour-mapper");

userRouter.route("/").get((req, res) => {
    res.render("index");
});

userRouter.route("/user").get(async (req, res) => {
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
        const user = await readData2("dailyplanner", "users", { username: username });
        await upsertDataByName("dailyplanner", "planners", { date: date, users_id: user._id }, req.body);
        res.redirect("./" + date);
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
    }
});

userRouter.route("/:username/:date").get(async (req, res) => {
    const username = req.params.username;
    const date = req.params.date;
    const user = await readData2("dailyplanner", "users", { username: username });
    const planner = await readData2("dailyplanner", "planners", { date: date, users_id: user._id });
    const join = await joinCollectionByName("dailyplanner", "planners", "users", { _id: planner._id });
    planner.username = join[0].users[0].username;
    res.render("planner", planner);
});

userRouter.route("/:username/:date/task").post(async (req, res) => {
    if (!req.body) {
        res.status(400).json({ error: "ค่า req.body ไม่ถูกต้อง" });
        return;
    }
    try {
        const username = req.params.username;
        const date = req.params.date;
        const user = await readData2("dailyplanner", "users", { username: username });
        const planner = await readData2("dailyplanner", "planners", { date: date, users_id: user._id });
        const task = req.body;
        task.planners_id = planner._id;
        await upsertDataByName("dailyplanner", "tasks", task, task);
        res.redirect("../"+date);
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
    }
});

userRouter.route("/:username/:date/table").get(async (req, res) => {
    const username = req.params.username;
    const date = req.params.date;
    const user = await readData2("dailyplanner", "users", { username: username });
    const planner = await readData2("dailyplanner", "planners", { date: date, users_id: user._id });
    const tasks = await joinCollectionByName("dailyplanner", "tasks", "planners", { planners_id: planner._id });
    const mapper = new HourMapper();
    tasks.forEach(e => mapper.map(e.taskname, e.starttime, e.endtime));
    const result = {};
    Object.assign(result, user, planner, mapper);
    res.render("tasktable", result);
});

module.exports = userRouter;