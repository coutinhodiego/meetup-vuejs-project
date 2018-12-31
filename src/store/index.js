//Vuex 
import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setloadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {

    //Carrega todos os Meetups do firebase  
    loadingMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
      .then(data => {
        const meetups = []
        const obj = data.val()

        for(let key in obj){
          meetups.push({
            id : key,
            title: obj[key].title,
            location: obj[key].location,
            imageUrl: obj[key].imageUrl,
            description: obj[key].description,
            date: obj[key].date,
            creatorId: obj[key].creatorId
          })
        }
        commit('setloadedMeetups', meetups)
        commit('setLoading', false)
      })
      .catch(error => console.log(error))
    },

    //Cria um Meetup novo
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      //adiciona os novos dados no databse e gera um id unico via key
      firebase.database().ref('meetups').push(meetup)
      .then(data => {
        key = data.key        
        return key
      })
      //com o id gerado eh feito o upload do arquivo no storage
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref(`meetups/${key}.${ext}`).put(payload.image)
      })
      //apos upload do arquivo, se pega a url de download do arquivo
      .then(fileData => {
        let imagePath = fileData.metadata.fullPath
        return firebase.storage().ref().child(imagePath).getDownloadURL()
      })
      //repassa o url de download do arquivo pro database
      .then(url => {
        imageUrl = url    
        return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
      })
      //commita no state para atualizacao sem chamar o db
      .then(() => {
        commit('createMeetup', {...meetup, imageUrl: imageUrl, id: key})
      })
      .catch(error => console.log(error))
    },

    //Cria um novo usuario
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setLoading', false)
        const newUser = {
          id: user.user.uid,
          registeredMeetups: []
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },

    //Logo o usuario
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setLoading', false)
        const userOn = {
          id: user.user.uid,
          registeredMeetups: []
        }
        console.log(userOn)        
        commit('setUser', userOn)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },

    //Auto Loga um usuario
    autoSignIn ({commit}, payload) { 
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },

    //Logout do usuario
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },

    //Limpa os erros
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    }
  }
})
