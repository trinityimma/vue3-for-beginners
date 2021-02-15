import {createRouter, createWebHistory} from 'vue-router';
import DcHeroes from "./pages/DcHeroes";
import Calender from "./pages/Calender";
import Home from "./pages/Home";
import Markdown from "./pages/Markdown";
import Slider from "./pages/slider";
import Calculator from "./pages/Calculator";
import ReuseableModal from "./pages/ReuseableModal";
import Chat from "./pages/Chat";
import UserCrud from "./pages/UserCrud";
import Tensorflow from "./pages/Tensorflow";
import store from './store/index';

const routes = [
    { path: '/', component: Home },
    { path: '/dc-Heroes', component: DcHeroes },
    { path: '/calendar', component: Calender },
    { path: '/markdown', component: Markdown },
    { path: '/slider', component: Slider },
    { path: '/calculator', component: Calculator, meta: { middleware: 'auth' } },
    { path: '/reuseable-modal', component: ReuseableModal },
    { 
        path: '/chat',
        component: Chat, 
        meta: { middleware: 'auth' }
     },
    { path: '/user-crud',component: UserCrud, },
    {  path: '/tensorflow', component: Tensorflow, },
]
  
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to,_,next)=>{
    if(to.meta.middleware) {
        const middleware = require('./middleware/auth');
        if(middleware){
            middleware.default(next,store);
        } else {
            next();
        }
    
    } else {
        next();
    }
   
});
export default router;