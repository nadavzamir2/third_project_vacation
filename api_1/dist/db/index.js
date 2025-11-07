"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVacation = exports.getVacation = exports.deleteVacation = exports.createVacation = exports.addFollower = void 0;
exports.getConnection = getConnection;
const promise_1 = __importDefault(require("mysql2/promise"));
let retriesConnections = 5;
let numberOfRetry = 0;
function getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connections = yield promise_1.default.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                port: Number(process.env.DB_PORT) || 3306,
                connectionLimit: 10,
            });
            const g = yield connections.getConnection();
            yield g.ping();
            console.log('✅ MySQL pool connected successfully.');
            return connections;
        }
        catch (error) {
            yield new Promise(resolve => setTimeout(resolve, 10000));
            if (numberOfRetry !== retriesConnections) {
                numberOfRetry++;
                console.log(`🔄 Retrying MySQL connection... (${numberOfRetry}/${retriesConnections})`);
                getConnection();
            }
            else {
                process.exit(1);
            }
            console.log(error);
        }
    });
}
var addFollower_1 = require("./addFollower");
Object.defineProperty(exports, "addFollower", { enumerable: true, get: function () { return addFollower_1.addFollower; } });
var createVacation_1 = require("./createVacation");
Object.defineProperty(exports, "createVacation", { enumerable: true, get: function () { return createVacation_1.createVacation; } });
var deleteVacation_1 = require("./deleteVacation");
Object.defineProperty(exports, "deleteVacation", { enumerable: true, get: function () { return deleteVacation_1.deleteVacation; } });
var getVacation_1 = require("./getVacation");
Object.defineProperty(exports, "getVacation", { enumerable: true, get: function () { return getVacation_1.getVacation; } });
var updateVacation_1 = require("./updateVacation");
Object.defineProperty(exports, "updateVacation", { enumerable: true, get: function () { return updateVacation_1.updateVacation; } });
exports.default = getConnection;
