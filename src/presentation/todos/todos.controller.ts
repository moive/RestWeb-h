import { Request, Response } from "express";

const todos = [
	{ id: 1, text: "Buy milk", createdAt: new Date() },
	{ id: 2, text: "Buy bread", createdAt: null },
	{ id: 3, text: "Buy butter", createdAt: new Date() },
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
				createdAt: null,
			};

			todos.push(newTodo);
			res.json(newTodo);
		}
	};
}
