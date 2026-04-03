/*
* JSON-Server with authentication
*/

const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const app = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const rules = {
    users: 640,      // Only the logged-in user can see his data
    posts: 644,      // Only logged-in user can read/write
};

const rewriter = auth.rewriter(rules);

// config middleware
app.db = router.db; // IMPORTANT: auth needs access to the DB
app.use(cors());    // allows CORS access (e.g. from localhost:3000 for Next.js)
//app.use(jsonServer.bodyParser); // allows JSON-POST/PUT
app.use(jsonServer.defaults())

// Apply authentication-middleware and access rules
app.use(rewriter);
app.use(auth);

// Router (db-endpoints)
app.use(router);

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`JSON server running under http://localhost:${PORT}`);
});
