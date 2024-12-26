import { TodoEntity } from "../../entities/todo.entity";
import { CreateTodoDto } from "../../dtos/todos/create-todo.dto";
import { TodoRepository } from "../../repositories/todo.repository";
export interface CreateTodoUseCase {
	execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
	constructor(private readonly repository: TodoRepository) {}
	execute(dto: CreateTodoDto): Promise<TodoEntity> {
		return this.repository.create(dto);
	}
}
