export class UpdateTodoDto {
	private constructor(
		public readonly id: number,
		public readonly text: string,
		public readonly completedAt?: Date
	) {}

	get values() {
		const returnObj: { [key: string]: any } = {};
		if (this.text) returnObj.text = this.text;
		if (this.completedAt) returnObj.completedAt = this.completedAt;

		return returnObj;
	}

	static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
		const { id, text, completedAt } = props;
		let newCompletedAte = completedAt;

		if (!id || isNaN(Number(id))) return ["Id must be a valid number", id];

		if (completedAt) {
			newCompletedAte = new Date(completedAt);
			if (newCompletedAte.toString() === "Invalid Date") {
				return ["CompletedAt must be a valid date"];
			}
		}

		return [undefined, new UpdateTodoDto(id, text, newCompletedAte)];
	}
}
