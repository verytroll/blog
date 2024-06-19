
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const categoryRouter = require("./routes/categories");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const app = express();
const port = 8000;

mongoose.connect("mongodb://localhost:27017/blog")
    .then(() => {
        console.log("[Server]: Connected to MongoDB");
    })
    .catch((err) => {
        console.log("[Server]: " + err);
    });

app.use("/images/", express.static(path.join(__dirname, "images")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})
const upload = multer({storage: storage});
app.post("/api/upload/", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
})

app.use("/api/auth/", authRouter);
app.use("/api/posts/", postRouter);
app.use("/api/users/", userRouter);
app.use("/api/categories/", categoryRouter);

app.listen(port, () => {
    console.log(`[Server]: Listening on port http://localhost:${port}`);
});
