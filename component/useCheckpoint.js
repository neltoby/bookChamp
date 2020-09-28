import React from 'react'
import * as Network from 'expo-network';
import NetInfo from '@react-native-community/netinfo'
import { Toast } from 'native-base'
// import

export default function useCheckpoint(failed, success, payload) {

    const checkPoint = async () => {
        const {isConnected, isInternetReachable} = await Network.getNetworkStateAsync()
        const airplane = await Network.isAirplaneModeEnabledAsync()
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
          });
        console.log(isConnected, 'isConnected')
        console.log(isInternetReachable, 'isInternetReachable')
        console.log(airplane, 'airplane')
        if(airplane){
            Toast.show(
                { 
                    text: `Offline mode`, 
                    buttonText: 'CLOSE', 
                    type: "danger"
                }
            )
            return await failed(payload)
        }else if(isConnected || isInternetReachable) {
            Toast.show(
                { 
                    text: `Request failed, Please check your internet connenction`, 
                    buttonText: 'CLOSE', 
                    type: "danger",
                    textStyle: { fontSize: 14 }
                }
            )
            return await failed(payload)
        }else{
            return success(payload)
        }
    }
    return checkPoint
}
