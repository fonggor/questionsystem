import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Question from './components/Question.vue'
import Score from './components/Score.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/question',
      component: Question
    },
    {
      path: '/score',
      component: Score
    }

  ]
})
