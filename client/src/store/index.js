import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import taskReducer from "../reducers/task";
import thunk from "redux-thunk";

const middleware = [thunk];

const allReducers = combineReducers({
  tasks: taskReducer,
});

const initialState = {
    tasks: [],
};

const store = createStore(
  allReducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
