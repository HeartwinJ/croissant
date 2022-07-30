import { sveltekit } from "@sveltejs/kit/vite";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const file = fileURLToPath(new URL("package.json", import.meta.url));
const json = readFileSync(file, "utf8");
const pkg = JSON.parse(json);

/** @type {import('vite').UserConfig} */
const config = {
	define: {
		APP_VERSION: JSON.stringify(pkg.version)
	},
	envPrefix: ["VITE_", "MONGODB_", "ENV_"],
	plugins: [sveltekit()]
};

export default config;
