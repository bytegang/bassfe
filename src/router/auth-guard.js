import {store} from '../store/index'

export default (to, from, next) => {
  if (store.getters.token) {
    next()
  } else {
    next('/login')
  }
}


