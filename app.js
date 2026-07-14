const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const cors = require('cors');

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const employeeRoutes = require("./routes/employee");
const leaveRoutes = require("./routes/leave");
const profileRoutes = require("./routes/profile");
const attendanceRoutes = require("./routes/attendance");
const employeePortalRoutes = require("./routes/employeePortal");

const formatDate = require("./utils/formatDate");

const app = express();
app.locals.formatDate = formatDate;


app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));


app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(cors());


//ROUTES
app.use("/",authRoutes);
app.use("/",dashboardRoutes);
app.use("/",employeeRoutes);
app.use("/",leaveRoutes);
app.use("/",profileRoutes);
app.use("/", attendanceRoutes);
app.use("/", employeePortalRoutes);



app.listen(4000,()=>{
    console.log("Server running on port 4000");
});