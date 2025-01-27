import express, { Request, Response, Router } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const router: Router = express.Router();
const port = 3001;

app.use(cors());

interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

const cache: { [key: string]: { data: Comment[]; timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

router.get('/search', async (req: Request, res: Response): Promise<void> => {
    const query = req.query.q as string;

    if (!query || typeof query !== 'string') {
        res.status(400).json({ error: 'Query parameter "q" is required and must be a string' });
        return;
    }
    if (cache[query] && Date.now() - cache[query].timestamp < CACHE_DURATION) {
        res.json(cache[query].data);
        return;
    }
    try {
        const response = await axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments?postId=3');
        const filteredComments = response.data.filter((comment) =>
            comment.name.toLowerCase().includes(query.toLowerCase())
        );
        cache[query] = {
            data: filteredComments,
            timestamp: Date.now(),
        };
        res.json(filteredComments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

app.use(router);
export { app };

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
