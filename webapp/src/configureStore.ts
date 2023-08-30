import { createBrowserHistory } from 'history'
import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { reducer } from './store'

const basename = new URL(document.baseURI).pathname;
export const history = createBrowserHistory({basename});

export default function configureStore(
    initialState?: any
) {
    const enhancer = (window as any)["__REDUX_DEVTOOLS_EXTENSION__"] ? (window as any)["__REDUX_DEVTOOLS_EXTENSION__"]()(createStore) : createStore;
    // noinspection UnnecessaryLocalVariableJS
    return enhancer(
        reducer(history),
        initialState,
        compose(
            applyMiddleware(
                routerMiddleware(history)
            ),
        ),
    )
}

