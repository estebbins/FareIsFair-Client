import apiUrl from '../apiConfig'
import axios from 'axios'
axios.defaults.withCredentials = true;

export const gameSessionIndex = (credentials) => {
	return axios({
		method: 'GET',
		url: apiUrl + '',
	})
}


export const addQuestions = (credentials, gameSessionId) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + `/games/add_questions/${gameSessionId}/`,
        headers: {
            Authorization: `Token token=${credentials.token}`
        },
        withCredentials: true
	})
}

export const addPlayers = (credentials, gameSessionId, players) => {
    console.log(players)
	return axios({
		method: 'PATCH',
		url: apiUrl + `/games/add_players/`,
        headers: {
            Authorization: `Token token=${credentials.token}`
        },
        data: {
            gamesession_id: gameSessionId,
            players: players
        },
        withCredentials: true
	})
}

export const createGameSession = (credentials, gameSession) => {
    console.log(credentials)
    return axios({
		method: 'POST',
		url: apiUrl + `/games/new/`,
        headers: {
            Authorization: `Token token=${credentials.token}`
        },
        data: {
            gamesession: gameSession
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

export const getResponses = (credentials, gameSessionId, questionId) => {
    return axios({
		method: 'GET',
		url: apiUrl + `/livegame/${gameSessionId}/${questionId}`
	})
}

export const getQuestion = (credentials, questionId) => {
    return axios({
		method: 'GET',
		url: apiUrl + `/livegame/question/${questionId}`
	})
}

export const getGameDetail = (credentials, gameSessionId) => {
    return axios({
        method: 'GET',
        url: apiUrl + `/game/${gameSessionId}`
    })
}

export const beginGameSession = (credentials, gameSessionId) => {
    return axios({
        method: 'PATCH',
        url: apiUrl + `/livegame/begin/${gameSessionId}/`
    })
}

export const scorePlayer = (credentials, playerId, gameSessionId, score) => {
    return axios({
        method: 'PATCH',
        url: apiUrl + `/livegame/add_score/`,
        data: {
            player_id: playerId,
            game_session_id: gameSessionId,
            score: score
        }
    })
}

export const nextRound = (credentials, gameSessionId, questionId) => {
    return axios({
        method: 'GET',
        url: apiUrl + `/livegame/next_round/${gameSessionId}/${questionId}/`,
    })
}