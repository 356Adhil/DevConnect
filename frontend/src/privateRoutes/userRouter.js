import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PrivateRoute({children}) {
    const navigate = useNavigate();
useEffect(()=>{
    if(localStorage.getItem('user')){
        return navigate('/profile')
    }else{
        return navigate('/')
    }
},[navigate])
 return children
}