define(["Vue"], function (Vue) {
    return {
        // language=HTML
        template: `
            <div class="main-content">
                <h4 class="main-content__heading">
                    Add User
                </h4>
                <form action="" class="add-user" id="add-user">
                    <div class="add-user__input-block">
                        <label for="input1" class="add-user__label">
                            Nickname:
                        </label>
                        <input type="text" class="add-user__input" id="input1" placeholder="Enter nickname" v-model="nick">
                    </div>
                    <div class="add-user__input-block">
                        <label for="input2" class="add-user__label">
                            Email:
                        </label>
                        <input type="text" class="add-user__input" id="input2" placeholder="Enter email" v-model="email">
                    </div>
                    <div class="add-user__input-block">
                        <label for="" class="add-user__input-label">
                            <input type="checkbox" class="add-user__checkbox" name="spam" value="resolveSpam" v-model="spam"> Allow spam
                        </label>
                    </div>
                    <button class="add-user__submit" v-on:click.prevent="addUser">
                        Submit
                    </button>
                </form>
            </div>
        `,
        data: function() {
            return {
                nick: "",
                email: "",
                spam: false
            }
        },
        methods: {
            addUser: function() {
                this.$store.dispatch("addUser",
                    {
                        nick: this.nick,
                        email: this.email,
                        spam: this.spam
                    })
            }
        }
    }
});