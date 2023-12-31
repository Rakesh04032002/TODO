const express=require('express');
const app=express();
const connection=require("./db.js");
const cors=require("cors");
const path=require("path");
app.use(express.json());
app.use(cors());

app.use("/api/v1",require("./routes/auth.js"));
app.use("/api/v2",require("./routes/lists.js"));

app.get("/",(req,res)=>{
    app.use(express.static(path.resolve(__dirname,"frontend","build")));
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
});
app.listen(5000,()=>{
    console.log('server is connected');
});
connection();