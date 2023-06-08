export const SET_ACTIVITIES = 'setActivities'

export default {
  state() {
    return {
      activities: [],
    }
  },
  getters: {
    activities(state) {
      return state.activities
    },
  },
  actions: {
    setActivities(state, payload) {
      state.commit(SET_ACTIVITIES, payload)
    },
  },
  mutations: {
    setActivities(state, payload) {
      state.activities = payload
    },
  },
}
