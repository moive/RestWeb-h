export class TodoEntity {
	constructor(
		public id: number,
		public text: string,
		completedAt?: Date | null
	) {}

	get isCompleted(): boolean {
		return !!this.isCompleted;
	}
}
