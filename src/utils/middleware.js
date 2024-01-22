import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";

const middleware = applyMiddleware(thunk, apiMiddleware);

export default middleware;
