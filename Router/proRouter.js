import { Router } from "express";
import { Procontroller } from "../Controller/controllers.js";
const proRouter = Router();
const controllers = new Procontroller();

proRouter.route("/request").post(controllers.requestOtp);
proRouter.route("/verify").post(controllers.verifyOtp);

export default proRouter;
