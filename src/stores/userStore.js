//////// :::::::::::::::::::::::::::::::::::::::::::::::::::
// pour les applications avec authentification simple token 
//////// :::::::::::::::::::::::::::::::::::::::::::::::::::

// import { defineStore } from 'pinia'

// export const useUserStore = defineStore('user', {

//   state: () => ({
//     user: null,
//     token: null
//   }),

// })



//////// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// pour les applications avec authentification token rafraîchissable (jwt)
//////// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {

	state: () => ({
		user: null,
		access_token: localStorage.getItem('accessToken') || null,
		refresh_token: localStorage.getItem('refreshToken') || null,
	}),

	getters: {
		isAuthenticated: (state) => {
			return !!state.access_token
		},

		isAdmin: (state) => {
			return !!state.user?.is_staff
		},
	},

	actions: {
		setAccessToken(token) {
			localStorage.setItem('accessToken', token)
			this.access_token = token
		},

		setRefreshToken(token) {
			localStorage.setItem('refreshToken', token)
			this.refresh_token = token
		},

		clearUser() {
			localStorage.removeItem('accessToken')
			localStorage.removeItem('refreshToken')
			this.user = null
			this.access_token = null
			this.refresh_token = null
		},
	}

})

