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
    lastPromise: any = null 
    @Mutation
    GET_LOADING(value: boolean) {
        this.loading = value
    }

    @Mutation
    GET_HOTEL(hotel: string[]) {
        console.log('hotel=',hotel)
        this.hotel = hotel
    }

    @Mutation
    SET_LAST_PROMISE(value: any) {
        console.log('hotel=',value)
        this.lastPromise = value
    }

    @Action({ rawError:true }) 
    async setLoadingHotel() {
        this.context.commit('GET_HOTEL', null)
        this.context.commit('GET_LOADING', true)
    }

    @Action({ rawError:true })
    getHotel(id: number) {
        axios.get('https://hotels-admin.pegast.su/api/v1/hotels/1')
        .then(response => {
            console.log(response)
        })
        .catch(e => {
            console.log(e.message)
            //commit('setLoading', false)
            //this.error = true
            //this.loading = false
        });
    }
    // @Action({ rawError:true })
    // async getHotel(id: number) {
    //     let that = this.context
    //     await shopHotel.getHotels(
    //         id,
    //         hotel => {
    //             that.commit('GET_LOADING', false)
    //             that.commit('GET_HOTEL', hotel.hotels)
    //         }
    //     )
    // }
    // @Action({ rawError:true })
    // getHotelq(id: number) {
    //     let ct = new CancellationToken()
    //     let that = this.context
    //     this.context.commit('GET_HOTEL', null)
    //     // let callOff = false
    //     // if ( this.loading ) {
    //     //     console.log('идет загрузка по другой линии')
    //     //     callOff = true
    //     //     shopHotel.getHotelsAsync(id, ct.cancel)
    //     //     .then(()=>console.log("ok"))
    //     //     .catch(()=>console.log("cancelled отменям"));
    //     // } else {
    //     //     console.log('ничего не загружается - значит начнем', this.loading)
    //     //     this.context.commit('GET_LOADING', true)
    //     //     console.log('начнем', this.loading)

    //     // }
        
    //     const promise = shopHotel.getHotelsAsync(id, ct)
    //     this.context.commit( 'SET_LAST_PROMISE', promise );
    //    // shopHotel.getHotelsAsync(id, ct)
    //     promise.then(
    //         result => result
    //     )
    //     .then(response=>{
    //         if ( promise == this.lastPromise ) {
    //             that.commit('GET_LOADING', false)
    //             that.commit('GET_HOTEL', response.hotels)
    //             that.commit( 'SET_LAST_PROMISE', null );
    //             resolve();
    //         }
    //     ).catch( error => {
    //         if ( promise == state.lastPromise ) {
    //           commit( 'setLastPromise', null );
    //           reject( error );
    //         }
    //       } );
    // }}

    // @Action({ rawError:true })
    // getHotel(id: number) {
    //     let ct = new CancellationToken()
    //     let that = this.context;
    //     const promise = shopHotel.getHotelsAsync(id, ct);
    //     this.context.commit( 'SET_LAST_PROMISE', promise );
    //     promise.then(
    //         result => result
    //     ).then( data => {
    //         if ( promise == this.lastPromise ) {
    //             that.commit('GET_LOADING', false)
    //             that.commit('GET_HOTEL', data.hotels)
    //             that.commit( 'SET_LAST_PROMISE', null );
    //         resolve();
    //         }
    //     ).catch( error => {
    //         if ( promise == this.lastPromise ) {
    //             that.commit( 'SET_LAST_PROMISE', null );
    //         reject( error );
    //         }
    //     } );
    //     } );
    // }
}
// function CancellationToken(parentToken){
//     if(!(this instanceof CancellationToken)){
//       return new CancellationToken(parentToken)
//     }
//     this.isCancellationRequested = false;
//     var cancellationPromise = new Promise(resolve => {
//       this.cancel = e => {
//         this.isCancellationReqested = true;
//         if(e){
//           resolve(e);
//         }
//         else
//         {
//           var err = new Error("cancelled");
//           err.cancelled = true;
//           resolve(err);
//         }
//       };
//     });
//     this.register = (callback) => {
//       cancellationPromise.then(callback);
//     }
//     this.createDependentToken = () => new CancellationToken(this);
//     if(parentToken && parentToken instanceof CancellationToken){
//       parentToken.register(this.cancel);
//     }
//   }