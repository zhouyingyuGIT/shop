import Vue from 'vue'
import Router from 'vue-router'
import shop from '@/components/shop'
import commodity from '@/components/commodity'
import cart from '@/components/cart'
import invoice from '@/components/invoice'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/commodity'
    },
    {
      path: '/',
      name: 'shop',
      component: shop,
      children:[
        {
          path:"/commodity",
          component:commodity
        },
        {
          path:"/cart",
          name:"cart",
          component:cart
        },
        {
          path:"/invoice",
          name:"invoice",
          component:invoice
        }
      ]
    }
  ]
})
