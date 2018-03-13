import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '../pages/MainPage'
import Author from '../pages/AuthorPage'
import Review from '../pages/ReviewPage'
import About from '../pages/AboutPage'

Vue.use(Router)

export default new Router({
  routes: [
    { name: 'home', path: '/', component: MainPage },
    { name: 'review', path: '/review', component: Review },
    { name: 'author', path: '/author', component: Author },
    { name: 'about', path: '/about', component: About }
  ]
})
