import { GET_VEHICLES, GET_REQUESTS , GET_RENTLES , GET_LOCATIONS } from './types';
import axios from 'axios';

export const getvehicles = () => dispatch =>{
	axios.get("http://localhost:8000/api/vehicles")
	.then(res=> dispatch({
		type:GET_VEHICLES,
		payload: res.data,
	}));
}

export const getRequests = () => dispatch => {
	axios.get("http://localhost:8000/api/requests")
	.then(res=>dispatch({
		type: GET_REQUESTS,
		payload: res.data,
	}))
}

export const getRentles = () => dispatch => {
	axios.get("http://localhost:8000/api/rentles")
	.then(res=>dispatch({
		type: GET_RENTLES,
		payload: res.data,
	}))
}

export const getLocations = () => dispatch => {
	axios.get("http://localhost:8000/api/updatelocations")
	.then(res=>dispatch({
		type: GET_LOCATIONS,
		payload: res.data,
	}))
}