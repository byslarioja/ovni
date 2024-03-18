const fs = require("fs");
const crypto = require("crypto");
const hash = crypto.randomBytes(64).toString("hex");
const key = "APP_KEY = " + hash;
let env = fs.readFileSync(".env", "utf8");
env = env.replace(/(^APP_KEY=.*$)/m, "");
fs.writeFileSync(".env", key + "\n" + env);
console.log(`🚀 App key generated successfully! \n\x1b[32m${hash}\x1b[32m`);
