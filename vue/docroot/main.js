requirejs.config({
    baseURI: ".",
    paths: {
        "Vue": "https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.2/vue",
        "axios": "https://unpkg.com/axios/dist/axios.min",
        "vue-router": "https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.5.0/vue-router",
        "vuex": "https://cdnjs.cloudflare.com/ajax/libs/vuex/2.4.1/vuex",
        "lodash": "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min",
        "vee-validate": "https://cdn.jsdelivr.net/npm/vee-validate@latest/dist/vee-validate"
        // "vue-material": "https://cdnjs.cloudflare.com/ajax/libs/vue-material/0.7.5/vue-material"
    },
    shim: {
        "Vue": {
            "exports": "Vue"
        },
        "vue-router": {
            "exports": "VueRouter"
        },
        "vuex": {
            "exports": "VueX"
        }
/*        "vue-material": {
            "exports": "VueMaterial"
        }*/
    }
});

require(
    [
        "Vue",
        "vue-router",
        "vuex",
        "router/routes",
        "components/app/app",
        "store/store"
    ],

    function (Vue, VueRouter, VueX, router, App, Store) {

        Vue.use(VueRouter);
        Vue.use(VueX);

        let app = new Vue({
            el: "#root",
            router: router,
            store: Store,
            // language=HTML
            template: `
                <App/>
            `
        });
    });

