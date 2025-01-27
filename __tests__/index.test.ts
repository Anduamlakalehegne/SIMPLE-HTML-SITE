import request from 'supertest';
import { app } from '../node/index';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
        const res = await request(app).get('/search?q=fugit');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('name', 'fugit labore quia mollitia quas deserunt nostrum sunt');
    });

    it('should return 400 if query parameter is missing', async () => {
        const res = await request(app).get('/search');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ error: 'Query parameter "q" is required and must be a string' });
    });

    it('should return an empty array if no matches are found', async () => {
        const res = await request(app).get('/search?q=nonexistent');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });
});
