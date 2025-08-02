//////// :::::::::::::::::::::::::::::::::::::::::::::::::::
// pour les applications avec authentification simple token 
//////// :::::::::::::::::::::::::::::::::::::::::::::::::::

// import axios from "axios";
// import { useUserStore } from "@/stores/userStore";

// const Axios = axios.create({
//     baseURL: "http://127.0.0.1:8000/api"
// })

// Axios.interceptors.request.use(requete => {
//     const user = useUserStore()
//     if (user.token) {
//         requete.headers.Authorization = `Bearer ${user.token}`
//     }
    
//     return requete
// })

// export default Axios;


//////// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// pour les applications avec authentification token rafraîchissable (jwt)
//////// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

import axios from "axios";
import router from "@/router";
import { useUserStore } from "@/stores/userStore";

const Axios = axios.create({
    baseURL: "https://my-api.com/api",
    // baseURL: "http://192.168.100.131:8000/api",
    timeout: 10000, // Timeout de 10 secondes
    // withCredentials: true
})

// Intercepteur de requête amélioré
Axios.interceptors.request.use(
    (requete) => {
        const user = useUserStore()
        
        if (user.access_token) {
            requete.headers.Authorization = `Bearer ${user.access_token}`
        }
        
        return requete
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Variables pour la gestion du refresh token
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token=null) => {
    failedQueue.forEach(p => {
        error ? p.reject(error) : p.resolve(token)
    })
    failedQueue = []
}

// Intercepteur de réponse amélioré
Axios.interceptors.response.use(
    (res) => res,
    async (err) => {
        const userStore = useUserStore()
        const originalRequest = err.config

        // Gestion des erreurs de réseau
        if (!err.response) {
            console.error('Erreur réseau:', err.message)
            return Promise.reject(err)
        }

        // Éviter la logique de refresh si explicitement demandé
        if (originalRequest?.skipAuthRefresh) {
            return Promise.reject(err)
        }

        // Gestion de l'erreur 401 (non autorisé)
        if (err.response?.status === 401 && !originalRequest._retry) {
            // Si on est déjà en train de refresh, ajouter à la queue
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return Axios(originalRequest)
                }).catch(err => {
                    return Promise.reject(err)
                })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                // Vérifier si on a un refresh token
                if (!userStore.refresh_token) {
                    throw new Error('Aucun refresh token disponible')
                }

                const res = await Axios.post('/token/refresh/', {
                    refresh: userStore.refresh_token
                }, { skipAuthRefresh: true })
                
                const newToken = res.data.access
                
                // Mettre à jour le store et l'instance Axios
                userStore.setAccessToken(newToken)
                originalRequest.headers.Authorization = `Bearer ${newToken}`
                processQueue(null, newToken)

                return Axios(originalRequest)
            } catch (refreshError) {
                console.error('Erreur lors du refresh du token:', refreshError)
                
                // Nettoyer la queue en cas d'erreur
                processQueue(refreshError, null)
                
                // Nettoyer les données utilisateur et rediriger
                userStore.clearUser()
                router.push({ name: 'login' })
                
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        // Gestion d'autres codes d'erreur spécifiques
        switch (err.response?.status) {
            case 403:
                console.error('Accès interdit')
                break
            case 404:
                console.error('Ressource non trouvée')
                break
            case 500:
                console.error('Erreur serveur interne')
                break
            default:
                console.error('Erreur API:', err.response?.status, err.response?.data?.message || err.message)
        }

        return Promise.reject(err)
    }
)

export default Axios;