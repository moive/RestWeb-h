import { Router } from "express";
import { TodosController } from "./todos.controller";
import { TodoRepositoryImplementation } from "../../infrastructure/respositories/todo.repository.implementation";
import { TodoDatasourceImplementation } from "../../infrastructure/datasource/todo.datasource.implementation";

export class TodosRoutes {
	static get routes(): Router {
		const router = Router();
		const datasource = new TodoDatasourceImplementation();
		const todoRepository = new TodoRepositoryImplementation(datasource);
		const { getTodos, getTodoById, createTodo, updateTodo, deletedTodoById } =
			new TodosController(todoRepository);

		router.get("/", getTodos);
		router.get("/:id", getTodoById);
		router.post("/", createTodo);
		router.put("/:id", updateTodo);
		router.delete("/:id", deletedTodoById);

		return router;
	}
}
