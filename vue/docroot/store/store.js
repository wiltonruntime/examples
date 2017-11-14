define(["Vue", "vuex", "./actions"], function (Vue, VueX, actions) {

    Vue.use(VueX);

    return new VueX.Store({
        state: {
            users: null,
            totalPages: 0,
            perPage: 9,
            currentPage: 1,
            pageRange: 2,
            loading: false,
            search: ""
        },
        getters: {
            getUsers(state) {
                return state.users;
            },
            getPerPage(state) {
                return state.perPage;
            },
            getCurrentPage(state) {
                return state.currentPage;
            },
            getTotalPages(state) {
                return state.totalPages;
            },
            getPageRange(state) {
                return state.pageRange;
            },
            getLoading(state) {
                return state.loading;
            }
        },
        mutations: {
            setWhatever(state, {type, item}) {
                state[type] = item;
            }
        },
        actions: actions
    });
});