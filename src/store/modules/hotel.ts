import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import axios from 'axios'
import shopHotel from '../../api/hotelsInfo'

export interface IHotelState {
    hotel: string[];
}
interface IHotelsMeta {
    count: number;
    limit: number;
    page: number;
    totalPages: number;
}
@Module
export default class Hotel extends VuexModule {
    hotel: any[] = []
    meta: IHotelsMeta = {
        count: 0,
        limit: 0,
        page: 0,
        totalPages: 0
    }
    loading: boolean = false
    
    @Mutation
    GET_HOTEL(hotel: string[]) {
        console.log(hotel)
        this.hotel = hotel
    }

    @Mutation
    GET_LOADING(value: boolean) {
        this.loading = value
    }
    
    @Action({ rawError:true }) 
    async setLoading() {
        this.context.commit('GET_HOTELS', null)
        this.context.commit('GET_LOADING', true)
    }
    
    @Action({ rawError:true })
    async getHotel(id: number) {
        let that = this.context
        await shopHotel.searchHotels(
            id,
            hotel => {
                that.commit('GET_HOTEL', hotel.hotels)
            }
        )
    }
}