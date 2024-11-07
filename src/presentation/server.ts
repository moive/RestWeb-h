import express, { Router } from "express";
import path from "path";
import chalk from "chalk";

interface Options {
	port: number;
	public_path?: string;
	routes: Router;
}
export class Server {
	private app = express();
	private readonly port: number;
	private readonly publicPath: string;
	private readonly routes: Router;

	constructor(options: Options) {
		const { port, routes, public_path = "public" } = options;
		this.port = port;
		this.publicPath = public_path;
		this.routes = routes;
	}
	async start() {
		this.app.use(this.routes);

		this.app.use(express.static(this.publicPath));

		this.app.get("*", (req, res) => {
			const indexPath = path.join(
				__dirname + `../../../${this.publicPath}/index.html`
			);
			res.sendFile(indexPath);
		});

		this.app.listen(this.port, () => {
			const textInfo = `Server running on:`;

			console.log(
				chalk.rgb(255, 255, 0)(textInfo),
				chalk.rgb(255, 255, 0).underline(this.port)
			);
		});
	}
}
