import {authModule} from "@/store/modules/authModule.js";
import {createStore} from "vuex";
import {cartModule} from "@/store/modules/cartModule.js";
import {productModule} from "@/store/modules/productModule.js";

export default createStore({
    modules: {
        auth: authModule,
        cart: cartModule,
        product: productModule
    }
})
