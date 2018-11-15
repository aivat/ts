import Vue from 'vue';
import Vuex from 'vuex';

import hotelsList from '@/store/modules/hotelsList';
import hotel from './modules/hotel';
import { IHotelsStateList } from '@/store/modules/hotelsList';
import { IHotelState } from './modules/hotel';

Vue.use(Vuex);

export interface IRootState {
  hotels: IHotelsStateList;
  hotel: IHotelState;
}

export default new Vuex.Store<IRootState>({
  modules: { 
    hotels: hotelsList,
    hotel: hotel
  }
});
