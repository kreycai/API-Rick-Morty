import express from "express";
const routerChar = express.Router();
import * as charController from "./characters.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

routerChar.post("/create", authMiddleware, charController.createCharController);
routerChar.get("/", authMiddleware, charController.FindAllCharController);
routerChar.get("/find/:id", charController.findByIdCharController);
routerChar.put("/update/:id", charController.updateCharController);
routerChar.delete("/delete/:id", charController.deleteCharController);
routerChar.get("/search", authMiddleware, charController.searchCharController);

export { routerChar };
