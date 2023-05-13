let initialState = {
    rooms: '',
    directory: ''
}

const actReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ROOMS':
            return {
                ...state,
                rooms: action.rooms,
            }
            case 'SET_DIRECTORY':
                return {
                    ...state,
                    directory: action.data,
                }
        default:
            return state
    }
}
export const setRooms =(rooms) =>({type: "SET_ROOMS",rooms})
export const setDirectory =(data) =>({type: "SET_DIRECTORY",data})
export default actReducer