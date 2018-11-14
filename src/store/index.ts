import Vue from 'vue';
import Vuex from 'vuex';

import hotelsList from '@/store/modules/hotelsList';
import hotel from './modules/hotel';
import { IHotelsStateList } from '@/store/modules/hotelsList';
import { IHotelState } from './modules/hotel';
//import { IUserState } from './modules/user';

Vue.use(Vuex);

export interface IRootState {
  hotels: IHotelsStateList;
  hotel: IHotelState;
  //user: IUserState;
}

export default new Vuex.Store<IRootState>({
  modules: { 
    hotels: hotelsList,
    hotel: hotel
  }
});
