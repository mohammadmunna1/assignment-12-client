import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxios from './useAxios';

const useAllUsers = () => {
    const { user } = useContext(AuthContext)
    const [axiosURL] = useAxios()
    const { refetch, data: loggedUser = [] } = useQuery({
        queryKey: ['allUsers'],
       
        queryFn: async () => {
            const res = await axiosURL(`users`)
            return res.data
        }
    })
    return [loggedUser, refetch]
};

export default useAllUsers;