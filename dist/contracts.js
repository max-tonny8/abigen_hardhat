"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContracts = void 0;
async function getContracts(artifacts, basepath, extra = []) {
    return (await artifacts.getAllFullyQualifiedNames())
        .filter(name => name.startsWith(basepath))
        .map(name => name.split(":")[1])
        .filter((name, _, names) => names.indexOf(name.slice(1)) === -1)
        .filter(name => extra.indexOf(name) === -1);
}
exports.getContracts = getContracts;
