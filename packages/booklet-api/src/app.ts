// node imports
import path from 'path';

// 3rd party imports
import { config } from 'dotenv';
import createError from 'http-errors';
import logger from 'morgan';

import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';

// app imports
import { indexRouter } from './routes';
import { appPassport } from './middleware/auth/passport';

// dotenv config
config();

interface ResponseError extends Error {
    status?: number;
}

class BookletApp {
    app: express.Express;

    constructor() {
        this.app = express();

        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandler();

        global.bookCatalog = []; // initialize book catalog (in-memory store)
    }

    private setupMiddleware(): void {
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(helmet());
        this.app.use(cors({ origin: process.env.BOOKLET_APP_CLIENT_URL, credentials: true }));

        this.app.use(
            session({
                secret: process.env.BOOKLET_APP_JWT_SECRET,
                resave: false,
                saveUninitialized: false,
                cookie: { maxAge: 60000 * 60 * 24 * 7 },
            }),
        );
        this.app.use(cookieParser());

        this.app.use(logger('dev'));

        this.app.use(appPassport.initialize());
    }

    private setupRoutes(): void {
        this.app.use('/api', indexRouter);
    }

    private setupErrorHandler(): void {
        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            next(createError(404));
        });

        // error handler
        this.app.use(function (err: ResponseError, req: Request, res: Response) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.json({ error: 'error' });
        });
    }
}

export default new BookletApp().app;
