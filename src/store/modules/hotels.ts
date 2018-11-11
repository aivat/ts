import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import axios from 'axios'
import shopHotels from '../../api/hotels'

export interface IHotelsState {
    hotels: string[];
}
interface IHotelsMeta {
    count: number;
    limit: number;
    page: number;
    totalPages: number;
}
@Module
export default class Hotels extends VuexModule {
    hotels: any[] = []
    meta: IHotelsMeta = {
        count: 0,
        limit: 0,
        page: 0,
        totalPages: 0
    }

    @Mutation
    GET_HOTELS(hotels: string[]) {
        console.log(hotels)
        this.hotels = hotels
    }

    @Mutation
    GET_META(meta: IHotelsMeta) {
        console.log(meta)
        this.meta = meta
    }

    @Action
    async getHotels(params: any) {
        let that = this.context
        await shopHotels.searchHotels(
            params,
            listHotels => {
                that.commit('GET_HOTELS', listHotels.hotels)
                that.commit('GET_META', listHotels.meta)
            }
        )
    }
    // @Action({ commit: 'GET_HOTELS' })
    // async getHotels() {
    //     return await axios('https://hotels-admin.pegast.su/api/v1/hotels')
    // }

    // @Action
    // async getHotels() {
    //  // const arrayHotels = await axios('http://hotels-admin.pegast.su/api/v1/hotels')
    //  const arrayHotels = this.context.state.hotels
    //   this.context.commit('GET_HOTELS', arrayHotels)
    // }


    // @Action
    // async getHotels() {
    //   await jsonp('https://hotels-admin.pegast.su/api/v1/hotels', null, (err:any, data:any) => {
    //     if (err) {
    //     } else {
    //         console.log(data);
    //     }
    //     });
    // }


}