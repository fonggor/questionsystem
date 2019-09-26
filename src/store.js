import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    choices: [],  //保存各题号及其对应的选项
    scorePerQues: 0,
    score: 0
  },
  mutations: {
    updateRecord(state, choice) {
      var flag = false
      if (state.choices.length === 0) {
        state.choices.push(choice)
        flag = true
        return true
      }
      state.choices.forEach(item => {
        if (item.quesIndex === choice.quesIndex) {
          item.choiceIndex = choice.choiceIndex
          item.correctness = choice.correctness
          flag = true
          return true
        }
      })
      if (!flag) {
        state.choices.push(choice)
        return true
      }
      return false
    },
    getScore(state) {
      state.choices.forEach(item => {
        if (item.correctness === true) {
          state.score += state.scorePerQues
        }
      })
    },
    //重置state中的所有值，重新答题的时候触发
    resetStore(state) {
      state.choices = []
      state.scorePerQues = 0
      state.score = 0
    }
  },
  actions: {}
})
