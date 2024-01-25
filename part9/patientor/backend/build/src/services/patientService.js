"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diaryData = require("../../data/entries.json");
const getEntries = () => {
    return diaryData;
};
const addDiary = () => {
    return null;
};
exports.default = {
    getEntries,
    addDiary
};
