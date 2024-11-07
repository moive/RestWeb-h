import chalk from "chalk";
import express from "express";

export class Server {
	private app = express();
	private port = 3000;
	async start() {
		// Middlewares

		// Public Folder
		this.app.use(express.static("public"));

		this.app.listen(3000, () => {
			const textInfo = `Server running on:`;

			console.log(
				chalk.rgb(255, 255, 0)(textInfo),
				chalk.rgb(255, 255, 0).inverse(this.port)
			);
		});
	}
}
