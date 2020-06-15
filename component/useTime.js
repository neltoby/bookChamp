import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {timeOut} from '../actions/quiz'

const useTime = (tenmin) => {
    const dispatch = useDispatch()
    const [returned, setReturned] = useState('')
    const remainingTime = () => {
        if(tenmin){
            let currentTime = Date.now() / 1000
            if(tenmin > currentTime){
                let leftmin = Math.floor((tenmin - currentTime) / 60 )
                let leftsec = Math.floor((tenmin - currentTime) % 60 )
                let dis_sec = leftsec < 10 ? `0${leftsec}`: leftsec
                let leftTime = `${leftmin}:${dis_sec}`
                setReturned(leftTime)
            }else{
                dispatch(timeOut())
                setReturned('')
            }
        }else{
            setReturned('')
        }
    }
    useEffect(() => {       
        let clear = setInterval(() => {
            if(tenmin){
                remainingTime() 
            }
        }, 1000);

        return () => {
            clearInterval(clear)
        }
       
    } )
    return returned
}

export default useTime