// после добавления hook createSlice() в проект и подключения в store, данный файл больше не нужен, так как reducer создаётся уже там HeroesList/heroesSlice.js
import { createReducer } from "@reduxjs/toolkit";

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

// вторым аргументом передаётся функция builder
// toolkit ипользует библиотеку immer, поэтому мы можем использовать мутабельный код, а библиотека за нас сделает его иммутабльным. example: state => {мутабельные действия}
const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroCreated, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        })
        .addDefaultCase(() => {});
})


// Работает только в нативном JS, в TypeScript не сработает, когда вторым аргументом передаётся объект, где ключи - экшн криэйторы, а их свойства - выполняемые действия
// const heroes = createReducer(initialState, {
//     // Урок 206. Так как мы здесь напрямую мутируем состояние, нужны фигурные скобки, чтобы toolkit(lib immer внутри toolkit) понял, что он должен под капотом автоматически сделать это иммутабельным.  state => {мутабельная запись}. Метод не работает на 2024 год!
//     [heroesFetching]: state => {state.heroesLoadingStatus = 'loading'},
//     [heroesFetched]: (state, action) => {
//                     state.heroesLoadingStatus = 'idle';
//                     state.heroes = action.payload;
//                 },
//     [heroesFetchingError]: state => {
//                     state.heroesLoadingStatus = 'error';
//                 },
//     [heroCreated]: (state, action) => {
//                     state.heroes.push(action.payload);
//                 },
//     [heroDeleted]: (state, action) => {
//                     state.heroes = state.heroes.filter(item => item.id !== action.payload);
//                 }
//         },
//     [],
//     state => state
// )


// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HERO_CREATED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload]
//             }
//         case 'HERO_DELETED': 
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload)
//             }
//         default: return state
//     }
// }

export default heroes;