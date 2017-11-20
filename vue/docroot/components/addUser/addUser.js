define(["Vue", "vee-validate"], function (Vue, VeeValidate) {

    Vue.use(VeeValidate);

    return {
        // language=HTML
        template: `
            <div class="main-content">
                <h4 class="main-content__heading">
                    Add User
                </h4>
                <form action="" class="add-user" id="add-user" v-on:submit.prevent="validateBeforeSubmit">
                    <div class="add-user__input-block">
                        <label for="inputFirstname" class="add-user__label">
                            First Name:
                        </label>
                        <input type="text" 
                               name="first_name"
                               class="add-user__input" 
                               v-validate="'required|alpha'"
                               v-bind:class="{'input': true, 'is-danger': errors.has('first_name') }"
                               id="inputFirstname" placeholder="Enter your firstname" 
                               v-model="formInput.firstname">
                        <span v-show="errors.has('first_name')" class="help is-danger">
                            {{ errors.first('first_name') }}
                        </span>
                    </div>
                    <div class="add-user__input-block">
                        <label for="inputSurname" class="add-user__label">
                            Surname:
                        </label>
                        <input type="text"
                               name="surname"
                               class="add-user__input"
                               v-validate="'required|alpha'"
                               v-bind:class="{'input': true, 'is-danger': errors.has('surname') }"
                               id="inputSurname" placeholder="Enter your surname"
                               v-model="formInput.lastname">
                        <span v-show="errors.has('surname')" class="help is-danger">
                            {{ errors.first('surname') }}
                        </span>
                    </div>
                    <div class="add-user__input-block">
                        <label for="inputPrimaryname" class="add-user__label">
                            Primary Name:
                        </label>
                        <input type="text"
                               name="primary_name"
                               class="add-user__input"
                               v-validate="'required|alpha'"
                               v-bind:class="{'input': true, 'is-danger': errors.has('primary_name') }"
                               id="inputPrimaryname" placeholder="Enter your primaryname"
                               v-model="formInput.primaryname">
                        <span v-show="errors.has('primary_name')" class="help is-danger">
                            {{ errors.first('primary_name') }}
                        </span>
                    </div>
                    <div class="add-user__input-block">
                        <label for="inputBirthdate" class="add-user__label">
                            Birth Date:
                        </label>
                        <input type="text"
                               name="birth_date"
                               class="add-user__input"
                               v-validate="'required|date_format:DD-MM-YYYY'"
                               v-bind:class="{'input': true, 'is-danger': errors.has('birth_date') }"
                               id="inputBirthdate" placeholder="DD-MM-YYYY"
                               v-model="formInput.birthday">
                        <span v-show="errors.has('birth_date')" class="help is-danger">
                            {{ errors.first('birth_date') }}
                        </span>
                    </div>
                    <div class="add-user__input-block">
                        <label for="inputEmail" class="add-user__label">
                            Email:
                        </label>
                        <input type="text" 
                               name="email"
                               class="add-user__input" 
                               id="inputEmail" placeholder="Enter email" 
                               v-model="formInput.email" 
                               v-validate="'required|email'" 
                               v-bind:class="{'input': true, 'is-danger': errors.has('email') }">
                        <span v-show="errors.has('email')" class="help is-danger">
                            {{ errors.first('email') }}
                        </span>
                    </div>
                    <div class="add-user__input-block">
                        <label for="" class="add-user__input-label">
                            <input type="checkbox" class="add-user__checkbox" name="spam" value="resolveSpam" v-model="formInput.spam"> Allow spam
                        </label>
                    </div>
                    <button class="add-user__submit" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        `,
        data: function() {
            return {
                formInput: {
                    firstname: "",
                    lastname: "",
                    primaryname: "",
                    email: "",
                    birthday: "",
                    spam: false
                }
            }
        },
        methods: {
            addUser: function() {
                this.$store.dispatch("addUser", this.formInput)
            },
            validateBeforeSubmit: function() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.addUser();
                        return 1;
                    } else {
                        console.log("There are errors in your form");
                    }
                })
            }
        }
    }
});