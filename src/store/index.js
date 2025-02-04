import {authModule} from "@/store/modules/authModule.js";
import {createStore} from "vuex";
import {cartModule} from "@/store/modules/cartModule.js";

export default createStore({
    modules: {
        auth: authModule,
        cart: cartModule,
    }
})
