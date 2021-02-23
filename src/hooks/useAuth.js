import React ,  {useEffect , useContext} from 'react';
import {useAsync} from 'react-hook-async';
import {AuthUserCtx} from '../context/authUser';
import axios from 'axios';

const fetchMeApi = (jwt) => {
    return axios.get("http://localhost:5000/auth/me", {
        headers: {
            Authorization: "Bearer " + jwt,
        }
    }).then((res) => res.data);
}

export const useAuth = () =>{

    const [fetchMeApiData, executeFetchMe] = useAsync({}, fetchMeApi);
    const { setAuthUser } = useContext(AuthUserCtx);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');

        executeFetchMe(jwt).then((user) => {
            setAuthUser(user)
            console.log(user)
        })
    }, [executeFetchMe, setAuthUser])

    return fetchMeApiData;
}