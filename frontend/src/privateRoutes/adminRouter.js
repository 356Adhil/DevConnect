import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PrivateRoute({children}) {
    const navigate = useNavigate();
useEffect(()=>{
    if(localStorage.getItem('admin')){
        return navigate('/admin/users')
    }else{
        return navigate('/admin')
    }
},[navigate])
 return children
}