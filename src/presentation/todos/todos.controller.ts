import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import {
	CreateTodo,
	DeleteTodo,
	GetTodo,
	GetTodos,
	UpdateTodo,
} from "../../domain";
import { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodosController {
	constructor(private readonly todoRepository: TodoRepository) {}

	public getTodos = (req: Request, res: Response) => {
		new GetTodos(this.todoRepository)
			.execute()
			.then((todos) => res.json(todos))
			.catch((error) => res.status(400).json({ error }));
	};

	public getTodoById = (req: Request, res: Response) => {
		const id = Number(req.params.id);
		new GetTodo(this.todoRepository)
			.execute(id)
			.then((todo) => res.json(todo))
			.catch((error) => res.status(400).json({ error }));
	};

	public createTodo = (req: Request, res: Response) => {
		const [error, createTodoDto] = CreateTodoDto.create(req.body);

		if (error) res.status(400).json({ error });
		new CreateTodo(this.todoRepository)
			.execute(createTodoDto!)
			.then((todo) => res.json(todo))
			.catch((error) => res.status(400).json({ error }));
	};

	public updateTodo = (req: Request, res: Response) => {
		const id = Number(req.params.id);

		const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
		if (error) res.status(400).json({ error });

		new UpdateTodo(this.todoRepository)
			.execute(updateTodoDto!)
			.then((todo) => res.json(todo))
			.catch((error) => res.status(400).json({ error }));
	};

	public deletedTodoById = (req: Request, res: Response) => {
		const id = Number(req.params.id);
		new DeleteTodo(this.todoRepository)
			.execute(id)
			.then((todo) => res.json(todo))
			.catch((error) => res.status(400).json({ error }));
	};
}
