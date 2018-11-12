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
    loading: boolean = false

    @Mutation
    GET_LOADING(value: boolean) {
        this.loading = value
    }

    @Mutation
    GET_HOTEL(hotel: string[]) {
        console.log(hotel)
        this.hotel = hotel
    }

    @Action({ rawError:true }) 
    async setLoadingHotel() {
        this.context.commit('GET_HOTEL', null)
        this.context.commit('GET_LOADING', true)
    }
    
    @Action({ rawError:true })
    async getHotel(id: number) {
        let that = this.context
        await shopHotel.getHotels(
            id,
            hotel => {
                that.commit('GET_LOADING', false)
                that.commit('GET_HOTEL', hotel.hotels)
            }
        )
    }
}