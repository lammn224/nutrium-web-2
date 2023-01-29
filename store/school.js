export const SET_SCHOOL = 'setSchool'

export default {
  state() {
    return {
      school: null,
    }
  },
  getters: {
    school(state) {
      return state.school
    },
  },
  actions: {
    setSchool(state, payload) {
      state.commit(SET_SCHOOL, payload)
    },
  },
  mutations: {
    setSchool(state, payload) {
      state.school = payload
    },
  },
}
