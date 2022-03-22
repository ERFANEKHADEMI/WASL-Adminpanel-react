import { GET_VEHICLES, GET_REQUESTS , GET_RENTLES, GET_LOCATIONS } from "../actions/types";

const initialState = {
	vehicles: [],
	requests: [],
	rentles: [],
	locations: [],
}

export default function(state = initialState , action) {
	switch(action.type) {
		case GET_VEHICLES:
			return {
				...state,
				vehicles: action.payload
			}
		case GET_REQUESTS:
			return {
				...state,
				requests: action.payload
			}
		case GET_RENTLES:
			return {
				...state,
				rentles: action.payload
			}
		case GET_LOCATIONS:
			return {
				...state,
				locations: action.payload
			}
		default:
			return state;
	}
}