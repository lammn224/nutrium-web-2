export const SET_FOODS = 'setFoods'

export default {
  state() {
    return {
      foods: [],
    }
  },
  getters: {
    foods(state) {
      return state.foods
    },
  },
  actions: {
    async setFoods(state, payload) {
      await state.commit(SET_FOODS, payload)
    },
  },
  mutations: {
    setFoods(state, payload) {
      state.foods = payload
    },
  },
}
