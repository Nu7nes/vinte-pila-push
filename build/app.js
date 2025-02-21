"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var App = /** @class */ (function () {
    // public database: RedisConnection;
    function App() {
        this.server = (0, express_1.default)();
        this.cors();
        this.middleware();
        this.router();
        // this.database = RedisClient;
    }
    App.prototype.middleware = function () {
        this.server.use(express_1.default.json());
        this.server.use((0, morgan_1.default)("tiny"));
    };
    App.prototype.router = function () {
        this.server.use(express_1.default.static(path_1.default.resolve(__dirname, "../public")));
        this.server.use(routes_1.default);
    };
    App.prototype.cors = function () {
        this.server.use((0, cors_1.default)({
            origin: "*",
        }));
    };
    return App;
}());
exports.App = App;
