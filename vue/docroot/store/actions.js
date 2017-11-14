define(
    [
        "axios",
        "Vue"
    ], function (axios, Vue) {
        return {
            getUsers: function ({commit}, data) {
                let users;
                let totalPages;
                let current = parseInt(data.page);
                console.log(data);
                axios({
                    method: "get",
                    url: "http://localhost:4200/vue/views/usersList",
                    params: data
                })
                    .then((response) => {
                        users = response.data.users;
                        totalPages = parseInt(response.data.page_qty);
                        commit("setWhatever", {type: "users", item: users});
                        commit("setWhatever", {type: "totalPages", item: totalPages});
                        commit("setWhatever", {type: "currentPage", item: current});
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log("can't get Users, look at the console");
                    });
            },
            search: function ({commit}, input) {
                if(input.search === "" || input.search === undefined) {
                    console.log("ther is an empty search field");
                } else {
                    axios({
                        method: "get",
                        url: "http://localhost:4200/vue/views/usersList",
                        params: input
                    })
                        .then((response) => {
                            if (response.data !== undefined) {
                                commit("setWhatever", {type: "users", item: response.data.users});
                                commit("setWhatever", {type: "totalPages", item: 1});
                                commit("setWhatever", {type: "currentPage", item: 1});
                            } else {
                                commit("setWhatever", {type: "users", item: ""})
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            console.log("can't get Users, look at the console");
                        });
                }
            },
            getAllUsers: function ({commit}) {
                commit("setWhatever", {type: "loading", item: true});
                let data = {
                    showAll: true
                };
                axios({
                    method: "get",
                    url: "http://localhost:4200/vue/views/usersList",
                    params: data
                })
                    .then((response) => {
                        commit("setWhatever", {type: "users", item: response.data.users});
                        commit("setWhatever", {type: "totalPages", item: 1});
                        commit("setWhatever", {type: "currentPage", item: 1});
                        commit("setWhatever", {type: "loading", item: false});
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log("can't get Users, look at the console");
                        commit("setWhatever", {type: "loading", item: false});
                    });
            },
            addUser: function ({dispatch, getters}, data) {
                console.log(data);
                axios({
                    method: "post",
                    url: "http://localhost:4200/vue/views/addUser",
                    params: data
                })
                    .then((response) => {
                        console.log(response);
                        if (getters.getCurrentPage === 1) {
                            dispatch("getUsers",
                                {
                                    qty: getters.getPerPage,
                                    page: 1
                                })
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            nextPage: function ({commit, getters, dispatch}) {
                let next = getters.getCurrentPage + 1;
                commit("setWhatever", {type: "currentPage", item: next});
                dispatch("getUsers",
                    {
                        qty: getters.getPerPage,
                        page: next
                    })
            },
            prevPage: function ({commit, getters, dispatch}) {
                let prev = getters.getCurrentPage - 1;
                commit("setWhatever", {type: "currentPage", item: prev});
                dispatch("getUsers",
                    {
                        qty: getters.getPerPage,
                        page: prev
                    })
            },
            changePage: function ({commit, getters, dispatch}, page) {
                dispatch("getUsers",
                    {
                        page: page,
                        qty: getters.getPerPage
                    });
                commit("setWhatever", {type: "currentPage", item: page});
            }
        }
    });