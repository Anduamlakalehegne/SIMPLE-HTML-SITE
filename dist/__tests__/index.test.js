"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../node/index");
const axios_1 = __importDefault(require("axios"));
jest.mock('axios');
const mockedAxios = axios_1.default;
const mockResponse = [
    {
        postId: 3,
        id: 11,
        name: 'fugit labore quia mollitia quas deserunt nostrum sunt',
        email: 'Veronica_Goodwin@timmothy.net',
        body: 'ut dolorum nostrum id quia aut est fuga est inventore vel eligendi explicabo quis consectetur aut occaecati repellat id natus quo est ut blanditiis quia ut vel ut maiores ea',
    },
    {
        postId: 3,
        id: 12,
        name: 'modi ut eos dolores illum nam dolor',
        email: 'Oswald.Vandervort@leanne.org',
        body: 'expedita maiores dignissimos facilis ipsum est rem est fugit velit sequi eum odio dolores dolor totam occaecati ratione eius rem velit',
    },
];
beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockResponse });
});
describe('GET /search', () => {
    it('should return filtered comments', async () => {
        const res = await (0, supertest_1.default)(index_1.app).get('/search?q=fugit');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('name', 'fugit labore quia mollitia quas deserunt nostrum sunt');
    });
    it('should return 400 if query parameter is missing', async () => {
        const res = await (0, supertest_1.default)(index_1.app).get('/search');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ error: 'Query parameter "q" is required and must be a string' });
    });
    it('should return an empty array if no matches are found', async () => {
        const res = await (0, supertest_1.default)(index_1.app).get('/search?q=nonexistent');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });
});
