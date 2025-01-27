"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
const router = express_1.default.Router();
const port = 3001;
app.use((0, cors_1.default)());
const cache = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
router.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query || typeof query !== 'string') {
        res.status(400).json({ error: 'Query parameter "q" is required and must be a string' });
        return;
    }
    if (cache[query] && Date.now() - cache[query].timestamp < CACHE_DURATION) {
        res.json(cache[query].data);
        return;
    }
    try {
        const response = await axios_1.default.get('https://jsonplaceholder.typicode.com/comments?postId=3');
        const filteredComments = response.data.filter((comment) => comment.name.toLowerCase().includes(query.toLowerCase()));
        cache[query] = {
            data: filteredComments,
            timestamp: Date.now(),
        };
        res.json(filteredComments);
    }
    catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});
app.use(router);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
