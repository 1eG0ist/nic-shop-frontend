import {authModule} from "@/store/modules/authModule.js";
import {createStore} from "vuex";

export default createStore({
    modules: {
        auth: authModule,
    }
})
