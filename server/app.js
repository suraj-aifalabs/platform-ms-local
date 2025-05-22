const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const { dbConnection } = require("./config/db");
const ErrorHandler = require("./middlewares/errorHandler");
const responseWrapper = require("./middlewares/responseWrapper");

dotenv.config();

//db call
dbConnection();

const app = express();
const middlewares = {
    validateOauthToken: require("./middlewares/oauthMiddleware").validateOauthToken,
};

app.use(helmet());
app.use(responseWrapper);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

const corsOptions = {
    // eslint-disable-next-line no-undef
    origin: process.env.ALLOWED_ORIGIN || "*",
    methods: "GET,POST,PUT,DELETE",
};

app.use(cors(corsOptions));

// routes
app.use("/api/auth", middlewares.validateOauthToken, authRoutes);

app.use("/", healthRoutes);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
}
);

app.use(ErrorHandler);