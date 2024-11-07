import { Router } from "express";
import { TodosController } from "./todos.controller";

export class TodosRoutes {
	static get routes(): Router {
		const router = Router();
		const { getTodos, getTodoById, createTodo, updateTodo } =
			new TodosController();

		router.get("/", getTodos);
		router.get("/:id", getTodoById);
		router.post("/", createTodo);
		router.put("/:id", updateTodo);

		return router;
	}
}
