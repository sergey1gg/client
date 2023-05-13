let initialState = {
    currentUser: {},
    isAuth: false
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MY_USER':
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case 'LOGOUT':
            localStorage.removeItem('token')
            return{
                ...state,
                currentUser:{},
                isAuth: false
            }
        default:
            return state
    }
}
export const setUser =(user) =>({type: "SET_MY_USER",payload: user})

export default usersReducer