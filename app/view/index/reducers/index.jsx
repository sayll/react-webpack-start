import { combineReducers } from 'redux';
import * as Actions from '../actions';
import createReducer from './createReducer';

const requestTest = createReducer([], {
  [Actions.REQUEST_TESTS](state, action) {
    return {
      items: action.items
    };
  }
});

const postsByOther = createReducer({}, {
  [Actions.REQUEST_POSTS](state) {
    return state;
  }
});

export default combineReducers({
  postsByOther,
  requestTest
});

/*
// 建立取出某個 state 的函數
const shopItemsSelector = state => state.shop.items;
const taxPercentSelector = state => state.shop.taxPercent;

// 利用 createSelector 傳入 shopItemsSelector 函數物件
// items => shopItemsSelector return 的 物件
const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
);

// 利用 createSelector 傳入 shopItemsSelector, taxPercentSelector 函數物件
// subtotal => shopItemsSelector return 的 物件
// taxPercent => taxPercentSelector return 的 物件
const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
);

// 可傳入上述利用 createSelector 所產生的 subtotalSelector, taxSelector 函數物件
// subtotal => subtotalSelector return 的 物件
// tax => taxSelector return 的 物件
export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
);

// 測試用的 state
const exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.20 },
      { name: 'orange', value: 0.95 },
    ]
  }
};

// 執行上面所寫好 Selector 函數
console.log(subtotalSelector(exampleState)); // 2.15
console.log(taxSelector(exampleState));      // 0.172
console.log(totalSelector(exampleState));   // { total: 2.322 }
*/
