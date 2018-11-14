import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import hotelsList from '@/api/hotelsList'

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
    cancel: any = null
    loading: boolean = false

    @Mutation
    SET_META(meta: IHotelsMeta) {
        this.meta = meta
    }

    @Mutation
    SET_HOTELS_LIST(hotels: string[]) {
        this.hotels = hotels
    }

    @Mutation
    SET_LOADING_HOTEL_LIST(value: boolean) {
        this.loading = value
    }
    
    @Action({ rawError:true }) 
    async setLoading() {
        this.context.commit('SET_HOTELS_LIST', null)
        this.context.commit('SET_LOADING_HOTEL_LIST', true)
    }

    @Action({ rawError:true })
    async getHotels(params: any) {
        let that = this.context
        that.commit('SET_HOTELS_LIST', null)
        that.commit('SET_LOADING_HOTEL_LIST', true)
        await hotelsList.searchHotels(
            params,
            (listHotels: any) => {
                that.commit('SET_META', listHotels.meta)
                that.commit('SET_HOTELS_LIST', listHotels.hotels)
                that.commit('SET_LOADING_HOTEL_LIST', false)
            }
        )
    }
}