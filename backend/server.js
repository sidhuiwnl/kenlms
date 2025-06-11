import express from "express"
import userRoute from "./src/routes/user/contact.js"
import adminRoutes from "./src/routes/admin/book.js"
import adminLogin from "./src/routes/admin/login.js"
import userRegister from "./src/routes/user/register.js"
import userLogin from "./src/routes/user/login.js"
import { authenticateAdmin, authenticateToken } from "./src/middleware/authmiddleware.js"
import { getCurrentUser } from "./src/controller/user-controller.js"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import cors from "cors"

//lms
import auth from "./src/routes/auth.route.js"
import courseRoutes from "./src/routes/Course/course.routes.js"
import userRoutes from "./src/routes/user/user.routes.js"
import quizRoutes from "./src/routes/Course/quiz.routes.js"



dotenv.config()

const app = express();

app.use(cookieParser());


app.use(cors({
    origin : ["http://localhost:5173"],
    credentials : true
}))

app.use(express.json())


//This is our backend
app.use("/api/v1/user",userRoute)
app.use("/api/v1/admin",adminRoutes)
app.use("/api/v1/admin",adminLogin)
app.use("/api/v1/user",userRegister)
app.use("/api/v1/user",userLogin)
app.get("/api/v1/user/me",authenticateToken,getCurrentUser)

// this is for 

app.use("/auth",auth)
app.use("/course", courseRoutes);
app.use("/user",userRoutes)
app.use("/quiz",quizRoutes)


app.use('/uploads', express.static('uploads'));


app.listen(5000,() => {
    console.log("server running on port 5000")
})
