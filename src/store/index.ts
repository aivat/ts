import Vue from 'vue';
import Vuex from 'vuex';

import hotels from './modules/hotels';
import { IHotelsState } from './modules/hotels';
//import { IUserState } from './modules/user';

Vue.use(Vuex);

export interface IRootState {
  hotels: IHotelsState;
  //user: IUserState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({
  modules: { hotels: hotels }
});

// const store = new Vuex.Store({
//   state: {},
//   modules: {
//     hotels
//   }
// })
// export default new Vuex.Store({
//   modules: {
//     hotels
//   },
// })
//export default store