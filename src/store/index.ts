import Vue from 'vue';
import Vuex from 'vuex';

import hotels from './modules/hotels';
import hotel from './modules/hotel';
import { IHotelsState } from './modules/hotels';
import { IHotelState } from './modules/hotel';
//import { IUserState } from './modules/user';

Vue.use(Vuex);

export interface IRootState {
  hotels: IHotelsState;
  hotel: IHotelState;
  //user: IUserState;
}

export default new Vuex.Store<IRootState>({
  modules: { 
    hotels: hotels,
    hotel: hotel
  }
});
