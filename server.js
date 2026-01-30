const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;


app.use(express.json());
app.set('trust proxy', 1); // Trust first proxy (Render/Heroku)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));
app.use(cors({ origin: '*' }));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || '/github/callback'
},
    function (accessToken, refreshToken, profile, done) {
        // In a real app, you'd save user to DB here. For now, just return profile.
        return done(null, profile);
    }));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    const user = req.session.user;
    const html = `
        <html>
            <body>
                <h1>E-commerce API</h1>
                <p>Status: <strong>${user ? `Logged in as ${user.displayName}` : 'Logged Out'}</strong></p>
                <ul>
                    ${user ?
            `<li><a href="/logout">Logout</a></li>` :
            `<li><a href="/login">Login with GitHub</a></li>`
        }
                    <li><a href="/products">View Products (Public)</a></li>
                    <li><a href="/api-docs">Open Swagger UI (Test API)</a></li>
                </ul>
            </body>
        </html>
    `;
    res.send(html);
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

app.use(express.urlencoded({ extended: true }));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', require('./routes'));

const mongodb = require('./data/database');

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
});
