define(["Vue", "vuex", "./actions"], function (Vue, VueX, actions) {

    Vue.use(VueX);

    return new VueX.Store({
        state: {
            users: null,
            totalPages: 0,
            currentPage: 1,
            pageRange: 2,
            loading: false,
            search: "",
            filter: {
                activeFilter: 2,
                isActive: false,
                type: "",
                direction: ""
            }
        },
        getters: {
            getUsers(state) {
                return state.users;
            },
            getSearch(state) {
                return state.search;
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
            },
            getFilterOptions(state) {
                return state.filter;
            }
        },
        mutations: {
            setWhatever(state, {type, item, subItem}) {
                if (type !== "filter") {
                    state[type] = item;
                } else {
                    state[type][subItem] = item;
                }
            }
        },
        actions: actions
    });
});