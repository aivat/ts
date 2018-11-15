import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import hotelsList from '@/api/hotelsList'

export interface IHotelsStateList {
    meta: IHotelsMeta;
    hotels: IHotelsList[];
}

interface IHotelsMeta {
    count: number;
    limit: number;
    page: number;
    totalPages: number;
}

interface IHotelsList {
    id: number;
    name: string;
    stars: number;
}

@Module
export default class Hotels extends VuexModule {
    private hotels: IHotelsList[] = []
    private meta: IHotelsMeta = {
        count: 0,
        limit: 0,
        page: 0,
        totalPages: 0
    }
    private cancel: any = null
    private loading: boolean = false

    @Mutation
    private SET_META(meta: IHotelsMeta) {
        this.meta = meta
    }

    @Mutation
    private SET_HOTELS_LIST(hotels: IHotelsList[]) {
        this.hotels = hotels
    }

    @Mutation
    private SET_LOADING_HOTEL_LIST(value: boolean) {
        this.loading = value
    }
    
    @Action({ rawError: true }) 
    public async setLoading() {
        this.context.commit('SET_HOTELS_LIST', null)
        this.context.commit('SET_LOADING_HOTEL_LIST', true)
    }

    @Action({ rawError: true })
    public async getHotels(params: any) {
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