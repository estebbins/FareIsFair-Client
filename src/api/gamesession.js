import apiUrl from '../apiConfig'
import axios from 'axios'
axios.defaults.withCredentials = true;

export const gameSessionIndex = (credentials) => {
	return axios({
		method: 'GET',
		url: apiUrl + '',
	})
}