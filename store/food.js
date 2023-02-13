export const SET_FOODS = 'setFoods'

export default {
  state() {
    return {
      foods: null,
    }
  },
  getters: {
    foods(state) {
      return state.foods
    },
  },
  actions: {
    setFoods(state, payload) {
      state.commit(SET_FOODS, payload)
    },
  },
  mutations: {
    setFoods(state, payload) {
      state.foods = payload
    },
  },
}
