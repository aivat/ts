import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import axios from 'axios'

export interface IHotelState {
    hotel: object;
}

const CancelToken = axios.CancelToken

@Module
export default class Hotel extends VuexModule {
    hotel: any[] = []
    loading: boolean = false
    cancel: any = null
    error: any = null

    @Mutation
    SET_LOADING(value: boolean) {
        this.loading = value
    }

    @Mutation
    SET_HOTEL(hotel: string[]) {
        this.hotel = hotel
    }

    @Mutation
    SET_ERROR(value: boolean) {
        this.error = value
    }

    @Action({ rawError:true }) 
    async setLoadingHotel() {
        this.context.commit('SET_HOTEL', null)
        this.context.commit('SET_ERROR', false)
    }

    @Action({ rawError:true })
    getHotel(id: number) {
        if ( this.loading ) {
            this.cancel()
        }
        this.context.commit('SET_LOADING', true)
        let that = this.context

        axios.get(`https://my-json-server.typicode.com/aivat/ts/hotel/${id}`, {
            cancelToken: new CancelToken( (c) => {
                this.cancel = c;
            })
        })
        .then(response => {
            that.commit('SET_HOTEL', response.data)
            that.commit('SET_LOADING', false)
        })
        .catch(e => {
            that.commit('SET_ERROR', `Что-то пошло не так... ${e.toString()}`)
            that.commit('SET_LOADING', false)
        })
    }
}
