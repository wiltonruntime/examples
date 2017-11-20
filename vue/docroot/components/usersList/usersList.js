define(["Vue", "lodash", "../pagination/pagination"], function (Vue, _, Pagination) {
    return {
        // language=HTML
        template: `
            <div class="main-content">
                <div class="main-content__heading">
                    <h4>
                        Users List
                    </h4>
                    <div class="main-content__show-users">
                        <div class="main-content__search-block">
                            <label for="search" class="mai-content__search-label">
                                Search:
                            </label>
                            <input type="text" class="main-content__search" id="search" v-model="Search">
                        </div>
                    </div>
                </div>
                <ul class="users-list">
                    <ul class="users-list__head-row" v-on:click="activateFilter($event)">
                        <li class="users-list__cell">
                            <span class="users-list__cell-text">Id</span>
                            <div class="users-list__filter-buttons">
                                <i class="material-icons users-list__filter-button" id="1"
                                   v-on:click="filterDrivers('id', 'up', $event)">arrow_drop_up</i>
                                <i class="material-icons users-list__filter-button" id="2"
                                   v-on:click="filterDrivers('id', 'down', $event)">arrow_drop_down</i>
                            </div>
                        </li>
                        <li class="users-list__cell">
                            <span class="users-list__cell-text">Date</span>
                            <div class="users-list__filter-buttons">
                                <i class="material-icons users-list__filter-button" id="3"
                                   v-on:click="filterDrivers('birthday', 'up', $event)">arrow_drop_up</i>
                                <i class="material-icons users-list__filter-button" id="4"
                                   v-on:click="filterDrivers('birthday', 'down', $event)">arrow_drop_down</i>
                            </div>
                        </li>
                        <li class="users-list__cell">
                            <span class="users-list__cell-text">Nick</span>
                            <div class="users-list__filter-buttons">
                                <i class="material-icons users-list__filter-button" id="5"
                                   v-on:click="filterDrivers('name', 'up', $event)">arrow_drop_up</i>
                                <i class="material-icons users-list__filter-button" id="6"
                                   v-on:click="filterDrivers('name', 'down', $event)">arrow_drop_down</i>
                            </div>
                        </li>
                        <li class="users-list__cell">
                            <span class="users-list__cell-text">Email</span>
                            <div class="users-list__filter-buttons">
                                <i class="material-icons users-list__filter-button" id="7"
                                   v-on:click="filterDrivers('email', 'up', $event)">arrow_drop_up</i>
                                <i class="material-icons users-list__filter-button" id="8"
                                   v-on:click="filterDrivers('email', 'down', $event)">arrow_drop_down</i>
                            </div>
                        </li>
                        <li class="users-list__cell">Allow Spam</li>
                    </ul>
                    <span class="main-content__loading" v-if="loading">
                        Loading...
                    </span>
                    <ul class="users-list__row" v-for="(key,index) in onUpdateUsers" v-if="!loading">
                        <li class="users-list__id users-list__cell">
                            {{ key.id }}
                        </li>
                        <li class="users-list__date users-list__cell">
                            {{ key.birthday }}
                        </li>
                        <li class="users-list__nick users-list__cell">
                            {{ key.firstname }}
                            {{ key.lastname }}
                            {{ key.primaryname }}
                        </li>
                        <li class="users-list__email users-list__cell">
                            {{ key.email }}
                        </li>
                        <li class="users-list__spam users-list__cell">
                            {{ key.spam }}
                        </li>
                    </ul>
                </ul>
                <Pagination></Pagination>
            </div>
        `,
        components: {
            Pagination: Pagination
        },
        methods: {
            searchUsers: _.debounce(
                function () {
                    this.$store.dispatch("search",
                        {
                            search: this.Search,
                            page: this.PageNumber
                        })
                },
                500
            ),
            getUsers: function () {
                this.$store.dispatch("getUsers",
                    {
                        page: this.PageNumber
                    });
            },
            filterDrivers: function (name, direction, event) {
                let id = event.target.getAttribute("id");
                    input = {
                        sortType: name,
                        sortDirection: direction,
                        id: id
                    };
                this.$store.dispatch("filterDrivers", input);
            },
            activateFilter: function (event) {
                let elem = event.target;
                let filter = document.getElementsByClassName("users-list__filter-button");

                if (elem.classList.contains("users-list__filter-button")) {
                    if (elem.classList.contains("is-active-filter")) {
                        return 1;
                    } else {
                        for (let i = 0; i < filter.length; i++) {
                            if (filter[i].classList.contains("is-active-filter")) {
                                filter[i].classList.remove("is-active-filter");
                            }
                        }
                        elem.classList.add("is-active-filter");
                    }
                } else {
                    return 0;
                }
            },
            checkActiveFilter: function () {
                let filters = document.getElementsByClassName("users-list__filter-button");
                for (let i = 0; i < filters.length; i++) {
                    if (+this.activeFilter === +filters[i].getAttribute("id")) {
                        filters[i].classList.add("is-active-filter");
                    }
                }
            }
        },
        computed: {
            onUpdateUsers: function () {
                return this.$store.getters.getUsers;
            },
            loading: {
                get() {
                    return this.$store.state.loading;
                }
            },
            PageNumber: {
                get() {
                    return this.$store.state.currentPage;
                }
            },
            Search: {
                get() {
                    return this.$store.state.search;
                },
                set(input) {
                    this.$store.commit("setWhatever", {type: "search", item: input});
                }
            },
            activeFilter: {
                get() {
                    return this.$store.state.filter.activeFilter;
                }
            }
        },
        watch: {
            Search: function (input) {
                console.log("Waiting for the end of input...");
                this.searchUsers();
            }
        },
        created() {
            if (this.onUpdateUsers) {
                console.log("just created");
            } else {
                this.$store.dispatch("getUsers",
                    {
                        page: this.PageNumber
                    });
            }
        },
        mounted() {
            this.checkActiveFilter();
        }
    }
});