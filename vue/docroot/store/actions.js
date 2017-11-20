define(
    [
        "axios",
        "Vue"
    ], function (axios, Vue) {

        const BASE_URL = "http://localhost:4200";

        return {
            getUsers: function ({commit, getters}, data) {
                let users,
                    isActiveFilter = getters.getFilterOptions,
                    search = getters.getSearch,
                    totalPages,
                    current = parseInt(data.page);

                if (isActiveFilter.isActive) {
                    data.sortType = isActiveFilter.type;
                    data.sortDirection = isActiveFilter.direction
                }
                if(search) {
                    data.search = search
                }

                console.log(data);
                axios({
                    method: "get",
                    url: BASE_URL + "/pp-wilton-vue-spa-example/views/usersList",
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
                if (input.search === "" || input.search === undefined) {
                    console.log("there is an empty search field");
                } else {
                    console.log(input);
                    axios({
                        method: "get",
                        url: BASE_URL + "/pp-wilton-vue-spa-example/views/usersList",
                        params: input
                    })
                        .then((response) => {
                        console.log(response);
                            if (response.data !== undefined) {
                                commit("setWhatever", {type: "users", item: response.data.users});
                                commit("setWhatever", {type: "totalPages", item: parseInt(response.data.page_qty)});
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
            addUser: function ({dispatch, commit}, data) {
                console.log(data);
                commit("setWhatever", {type: "currentPage", item: 1});
                axios({
                    method: "post",
                    url: BASE_URL + "/pp-wilton-vue-spa-example/views/addUser",
                    params: data
                })
                    .then((response) => {
                        console.log(response);
                         dispatch("getUsers",
                             {
                                 page: 1
                             });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            filterDrivers: function ({dispatch, getters, commit}, input) {
                commit("setWhatever", {type: "filter", item: true, subItem: "isActive"});
                commit("setWhatever", {type: "filter", item: input.sortType, subItem: "type"});
                commit("setWhatever", {type: "filter", item: input.sortDirection, subItem: "direction"});
                commit("setWhatever", {type: "filter", item: input.id, subItem: "activeFilter"});
                dispatch("getUsers",
                    {
                        page: getters.getCurrentPage
                    })
            },
            nextPage: function ({commit, getters, dispatch}, input) {
                let next = getters.getCurrentPage + 1;
                commit("setWhatever", {type: "currentPage", item: next});
                if (input.search === "" || input.search === undefined) {
                    dispatch("getUsers",
                        {
                            page: next
                        })
                } else {
                    dispatch("getUsers",
                        {
                            page: next,
                            search: input.search
                        })
                }
            },
            prevPage: function ({commit, getters, dispatch}, input) {
                let prev = getters.getCurrentPage - 1;
                commit("setWhatever", {type: "currentPage", item: prev});
                if (input.search === "" || input.search === undefined) {
                    dispatch("getUsers",
                        {
                            page: prev
                        })
                } else {
                    dispatch("getUsers",
                        {
                            page: prev,
                            search: input.search
                        })
                }
            },
            changePage: function ({commit, dispatch}, input) {
                commit("setWhatever", {type: "currentPage", item: input.page});
                if (input.search === "" || input.search === undefined) {
                    dispatch("getUsers",
                        {
                            page: input.page,
                        });
                } else {
                    dispatch("getUsers",
                        {
                            page: input.page,
                            search: input.search
                        });
                }
            }
        }
    });