"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = exports.read = exports.mkdir = void 0;
const promises_1 = __importDefault(require("fs/promises"));
async function mkdir(path) {
    const dirStats = await promises_1.default.stat(path);
    if (!dirStats.isDirectory()) {
        await promises_1.default.mkdir(path);
    }
}
exports.mkdir = mkdir;
async function read(path) {
    return promises_1.default.readFile(path, "utf8");
}
exports.read = read;
async function write(path, data) {
    promises_1.default.writeFile(path, data, { flag: "w" });
}
exports.write = write;
