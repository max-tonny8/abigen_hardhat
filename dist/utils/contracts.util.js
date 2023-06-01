"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContracts = void 0;
async function getContracts(artifacts, basepath, extra = []) {
    return (await artifacts.getAllFullyQualifiedNames())
        .filter(name => name.startsWith(basepath)) // Only files in basepath directory
        .map(name => name.split(":")[1]) // Get contract name
        .filter((name, _, names) => names.indexOf(name.slice(1)) === -1) // Only contracts
        .filter(name => extra.indexOf(name) === -1); // Remove extra contracts
}
exports.getContracts = getContracts;
