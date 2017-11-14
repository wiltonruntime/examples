define(["Vue"], function(Vue) {
   return Vue.component("App", {
       template: `
            <div class="container">
                <div class="content-wrap">
                    <header class="main-header">
                        <h2 class="main-header__heading">
                            Wilton example SPA app
                        </h2>
                        <div class="main-header__links">
                            <a href="javascript:void(0);" class="main-header__link">
                                GitHub
                            </a>
                            <a href="javascript:void(0);" class="main-header__link">
                                API Docs
                            </a>
                        </div>
                    </header>
                    <main class="main">
                        <ul class="main__menu-list">
                            <li>
                                <router-link class="main__menu-link" to="/description">
                                    Description
                                </router-link>
                            </li>
                            <li>
                                <router-link class="main__menu-link" to="/addUser">
                                    Add User
                                </router-link>
                            </li>
                            <li>
                                <router-link class="main__menu-link" to="/usersList">
                                    Users List
                                </router-link>
                            </li>
                            <li>
                                <router-link class="main__menu-link main__menu-link_last" to="/aboutWilton">
                                    About Wilton
                                </router-link>
                            </li>
                        </ul>
                        <div class="pages">
                            <router-view></router-view>
                        </div>
                    </main>
                </div>
            </div>
       `
   });
});