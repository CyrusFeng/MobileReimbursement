import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Index from './components/index'
import List from './components/StaffReimbursement/list'
import TravelApplyList from './components/TravelApply/travelApplyList'
import TravelAccountList from './components/TravelAccount/travelAccountList'
import PeerPeople from './components/TravelApply/peerPeople'
import DetailsAndApproval from './components/StaffReimbursement/detailsAndApproval'
import Detail from './components/TravelApply/detail'
import TravelAccountDetail from './components/TravelAccount/travelAccountDetail'
import Add from './components/add'
import BlankPage from './components/fullPageLoading'
import CreditScore from './components/creditScore'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/detailsAndApproval',
      name: 'detailsAndApproval',
      component: DetailsAndApproval
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/travelAccountDetail',
      name: 'travelAccountDetail',
      component: TravelAccountDetail
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/travelApplyList',
      name: 'travelApplyList',
      component: TravelApplyList
    },
    {
      path: '/travelAccountList',
      name: 'travelAccountList',
      component: TravelAccountList
    },
    {
      path: '/peerPeople',
      name: 'peerPeople',
      component: PeerPeople
    },

    {
      path: '/blankPage',
      name: 'blankPage',
      component: BlankPage
    },
    {
      path: '/creditScore',
      name: 'creditScore',
      component: CreditScore
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})


