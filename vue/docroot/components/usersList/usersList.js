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
                        <div class="main-content__number-of-users-block">
                            <button class="main-content__show-all" v-on:click.prevent="showAllUsers">
                                Show all
                            </button>
                            <input type="text" class="main-content__select-number-of-users" v-model="Quantity">
                        </div>
                    </div>
                </div>
                <ul class="users-list">
                    <ul class="users-list__head-row">
                        <li class="users-list__cell">Id</li>
                        <li class="users-list__cell">Date</li>
                        <li class="users-list__cell">Nick</li>
                        <li class="users-list__cell">Email</li>
                        <li class="users-list__cell">Allow Spam</li>
                    </ul>
                    <span class="main-content__loading" v-if="loading">
                        Loading...
                    </span>
                    <ul class="users-list__row" v-for="(key,index) in onUpdateUsers" v-if="!loading">
                        <li class="users-list__id users-list__cell">
                            {{ key.number_1 }}
                        </li>
                        <li class="users-list__date users-list__cell">
                            {{ key.birthday }}
                        </li>
                        <li class="users-list__nick users-list__cell">
                            {{ key.firstname }}
                        </li>
                        <li class="users-list__email users-list__cell">
                            {{ key.lastname }}
                        </li>
                        <li class="users-list__spam users-list__cell">
                            {{ key.primaryname }}
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
            updateUsersQty: _.debounce(
                function () {
                    this.$store.dispatch("getUsers",
                        {
                            qty: this.Quantity,
                            page: this.PageNumber
                        });
                },
                500
            ),
            searchUsers: _.debounce(
                function () {
                    this.$store.dispatch("search",
                        {
                            search: this.Search
                        })
                },
                500
            ),
            getUsers: function () {
                this.$store.dispatch("getUsers",
                    {
                        qty: this.Quantity,
                        page: this.PageNumber
                    });
            },
            showAllUsers: function() {
                this.loading = true;
                let that = this;
                this.$store.dispatch("getAllUsers");
            }
        },
        computed: {
            onUpdateUsers: function () {
                return this.$store.getters.getUsers;
            },
            Quantity: {
                get() {
                    return this.$store.state.perPage;
                },
                set(value) {
                    if (value === "" || value === undefined) {
                        console.log("empty input");

                    } else if (typeof value === "string" && value !== "") {
                        if (isNaN(value)) {
                            console.log("this is not a number, returning to default");
                        } else {
                            if (parseInt(value) === this.$store.getters.getPerPage) {
                                this.$store.commit("setWhatever", {type: "perPage", item: parseInt(value)});
                                this.getUsers();
                            } else {
                                this.$store.commit("setWhatever", {type: "perPage", item: parseInt(value)});
                            }
                        }
                    }
                }
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
            Search : {
                get () {
                    return this.$store.state.search;
                },
                set(input) {
                    this.$store.commit("setWhatever", {type: "search", item: input});
                }
            }
        },
        watch: {
            Quantity: function (numberOfUsers) {
                console.log("Waiting for the end of input...");
                this.updateUsersQty();
            },
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
                        qty: this.Quantity,
                        page: this.PageNumber
                    });
            }
        }
    }
});