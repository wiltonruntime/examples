define(
    [
        "vue-router",
        "Vue",
        "components/aboutWilton/aboutWilton",
        "components/addUser/addUser",
        "components/description/description",
        "components/usersList/usersList"
    ],
    function (
        VueRouter,
        Vue,
        aboutWilton,
        addUser,
        description,
        usersList
    ) {

        Vue.use(VueRouter);

        return new VueRouter({
            routes: [
                {
                    path: "/",
                    redirect: "/description",
                },
                {
                    path: "/description",
                    component: description
                },
                {
                    path: "/aboutWilton",
                    component: aboutWilton
                },
                {
                    path: "/addUser",
                    component: addUser
                },
                {
                    path: "/usersList",
                    component: usersList
                },
            ],
        });
    });