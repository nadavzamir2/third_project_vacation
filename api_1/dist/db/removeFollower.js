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
exports.removeFollower = void 0;
const _1 = __importDefault(require("."));
const removeFollower = (email, vacationId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, _1.default)();
    yield (connection === null || connection === void 0 ? void 0 : connection.execute("DELETE from northwind.followers WHERE user_email = ? AND vacation_id = ?", [email, vacationId]));
    return true;
});
exports.removeFollower = removeFollower;
