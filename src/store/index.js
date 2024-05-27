import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import  {thunk} from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit';
// import heroes from '../reducers/heroes';
import heroes from '../components/heroesList/heroesSlice'; //для createSlice
// import filters from '../reducers/filters';
import filters from '../components/heroesFilters/filtersSlice'; //для createSlice


// https://redux.js.org/api/applymiddleware
// MIDDLEWARE в отличии от enhancer расширяет только ф-ю dispatch. Позволяет принимать не только объекты(наши actions возвращают объекты), но и строки,функции без вызова в dispatch и тд. 
// Dispatch переименовывают на next.
const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};


// ENHANCER - усилитель . он расширяет любую часть стора
// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }
//     return store;
// }


// https://redux.js.org/api/combinereducers 
// const store = createStore( 
//                     combineReducers({heroes, filters}),
//                     compose(applyMiddleware(thunk, stringMiddleware),
//                             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//                     // compose(
//                     //     enhancer,
//                     //     // для работы dev_tools расширения redux
//                     //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                     // ) // композиция всех усилений store
//                 ); 


//REDUX-TOOLKIT
const store = configureStore({
    reducer: {heroes, filters},
    // thunk уже включен в redux-toolkit, поэтому его не нужно дополнительно подключать
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;