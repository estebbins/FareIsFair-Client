import apiUrl from '../apiConfig'
import axios from 'axios'
axios.defaults.withCredentials = true;

export const gameSessionIndex = (credentials) => {
	return axios({
		method: 'GET',
		url: apiUrl + '',
	})
}


export const addQuestions = (credentials, gamesession_id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + `/games/add_questions/${gamesession_id}/`,
        headers: {
            Authorization: `Token token=${credentials.token}`
        },
        withCredentials: true
	})
}

export const addPlayers = (credentials, gamesession_id, players) => {
    console.log(players)
	return axios({
		method: 'PATCH',
		url: apiUrl + `/games/add_players/`,
        headers: {
            Authorization: `Token token=${credentials.token}`
        },
        data: {
            gamesession_id: gamesession_id,
            players: players
        },
        withCredentials: true
	})
}

export const createGameSession = (credentials, gamesession) => {
    console.log(credentials)
    return axios({
		method: 'POST',
		url: apiUrl + `/games/new/`,
        headers: {
            Authorization: `Token token=${credentials.token}`
        },
        data: {
            gamesession: gamesession
        },
        withCredentials: true
	})
}

export const getPlayers = (credentials, filter) => {
	return axios({
		method: 'GET',
		url: apiUrl + `/find_players/${filter}`,
	})
}

export const getResponses = (credentials, gamesessionId, questionId) => {
    return axios({
		method: 'GET',
		url: apiUrl + `/livegame/${gamesessionId}/${questionId}`
	})
}

export const getQuestion = (credentials, questionId) => {
    return axios({
		method: 'GET',
		url: apiUrl + `/livegame/question/${questionId}`
	})
}