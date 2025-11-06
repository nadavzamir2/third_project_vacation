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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVacationEndpoint = void 0;
const getVacation_1 = require("../db/getVacation");
const getVacationEndpoint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const id = query.id;
    if (!id) {
        return res.status(400).send("id is required");
    }
    if (isNaN(Number(id))) {
        return res.status(400).send("Invalid id");
    }
    const vacation = yield (0, getVacation_1.getVacation)(Number(id));
    if (!vacation) {
        return res.status(404).send("Vacation not found");
    }
    res.status(200).send({ vacation });
});
exports.getVacationEndpoint = getVacationEndpoint;
