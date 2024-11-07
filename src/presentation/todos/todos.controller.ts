import { Request, Response } from "express";

const todos = [
	{ id: 1, text: "Buy milk", completedAt: new Date() },
	{ id: 2, text: "Buy bread", completedAt: null },
	{ id: 3, text: "Buy butter", completedAt: new Date() },
];
export class TodosController {
	constructor() {}

	public getTodos = (req: Request, res: Response) => {
		res.json(todos);
	};

	public getTodoById = (req: Request, res: Response) => {
		const id = Number(req.params.id);
		if (isNaN(id)) res.json({ error: `ID argument is not a number` });
		const todo = todos.find((todo) => todo.id == Number(id));
		todo
			? res.json(todo)
			: res.status(404).json({ error: `TODO with id ${id} not found` });
	};

	public createTodo = (req: Request, res: Response) => {
		const { text } = req.body;
		if (!text) res.status(400).json({ error: "Text property is required" });
		else {
			const newTodo = {
				id: todos.length + 1,
				text,
				completedAt: null,
			};

			todos.push(newTodo);
			res.json(newTodo);
		}
	};

	public updateTodo = (req: Request, res: Response) => {
		const id = Number(req.params.id);
		if (isNaN(id)) res.json({ error: `ID argument is not a number` });
		const todo = todos.find((todo) => todo.id == Number(id));
		if (!todo) {
			res.status(404).json({ error: `Todo with id ${id} not found` });
		} else {
			const { text, completedAt } = req.body;

			// Not recommended, object updated because relation
			todo.text = text || todo.text;
			completedAt === "null"
				? (todo.completedAt = null)
				: (todo.completedAt = new Date(
						completedAt || todo.completedAt
				  ));
			res.json(todo);
		}
	};

	public deletedTodoById = (req: Request, res: Response) => {
		const id = Number(req.params.id);
		if (isNaN(id)) res.json({ error: `ID argument is not a number` });
		const todo = todos.find((todo) => todo.id == Number(id));
		if (!todo)
			res.status(404).json({ error: `Todo with id ${id} not found` });
		const index = todos.findIndex((todo) => todo.id === id);
		todos.splice(index, 1);
		res.json(todo);
	};
}
