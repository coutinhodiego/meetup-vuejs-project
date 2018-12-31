import { store } from "../store";

export default (to, from, next) => {
  // Verifica se existe usuario ativo
  if(store.getters.user){
    next()
  }else {
    next('/signin')
  }
}