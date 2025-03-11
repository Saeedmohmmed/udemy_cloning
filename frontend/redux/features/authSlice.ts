import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
const token = Cookies.get('access_token')

const emptyUser = {
	email:'',
	first_name:"",
	last_name:"",
	id:0,
	courses:0
}
interface user {
    id: number;
    courses: number;
    first_name:string;
    last_name: string;
    email:string;
    image:string | undefined;

}
interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
    user:user
}

const initialState = {
    isAuthenticated: token? true :false,
	isLoading: true,
    user: token? jwtDecode(token): emptyUser
} as AuthState;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.isAuthenticated = true;
			if(action.payload)
				{
					Cookies.set('access_token', action.payload) 
					state.user = jwtDecode(action.payload)
				}
		},
		setLogout: state => {
			
			Cookies.remove('access_token')
			state.isAuthenticated = false;
		},
		finishInitialLoad: state => {
			state.isLoading = false;
		},
	},
});

export const { setAuth, setLogout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;