import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = { template: '<div>Home</div>' }

const About = { template: '<div>about to </div>' }
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
  ]
  
  // 3. Create the router instance and pass the `routes` option
  // You can pass in additional options here, but let's
  // keep it simple for now.
  const router = new VueRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
   mode:'history',
    routes, // short for `routes: routes`
  })
  export default router