import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Providers/AuthProvider';


const axiosURL = axios.create({
  baseURL: 'https://assigenment12server.vercel.app/', 
});

const useAxios = () => {
  const { logOut } = useContext(AuthContext)
  const navigate = useNavigate(); 

  useEffect(() => {
    axiosURL.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosURL.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return [axiosURL];
};

export default useAxios;