<template>
  <form @submit.prevent="submit">

    <div class="form-group">
      <label class="form-label">Product Name</label>
      <input class="form-control" type="text" v-model="name" id="name" name="name" placeholder="enter your thing's name here" />
    </div>

    <div class="form-group" :class="{ 'form-group--error': $v.price.$error }">
      <label class="form-control-label" name="price">Price (Your thing's price)</label>
      <input class="form__input" type="decimal" v-model.trim="price"/>
    </div>
    <div class="error" v-if="!$v.price.minValue">Pirce must be above 0</div>
    <div class="error" v-if="!$v.price.required">Pirce can't be empty</div>

    <div class="form-group" :class="{ 'form-group--error': $v.seller.$error }">
      <label class="form__label">Your user name</label>
      <input class="form__input" placeholder="enter your name here" v-model.trim="$v.seller.$model"/>
    </div>
    <div class="error" v-if="!$v.seller.required">Your name is Required</div>

    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ ThingBtnTitle }}</button>
    </p>
    <p>
      <a href="#/things" class="btn btn-primary btn1" role="button">See more product here</a>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">Successfully !!!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Putting...</p>
  </form>
</template>

<script>
    /* eslint-disable */
    import Vue from 'vue'
    import VueForm from 'vueform'
    import Vuelidate from 'vuelidate'
    import { required, minLength, between , minValue} from 'vuelidate/lib/validators'

    Vue.use(VueForm, {
        inputClasses: {
            valid: 'form-control-success',
            invalid: 'form-control-danger'
        }
    })

    Vue.use(Vuelidate)

    export default {
        name: 'FormData',
        props: ['ThingBtnTitle', 'thing'],
        data () {
            return {
                messagetitle: ' Put Your Thing !! ',
                name: this.thing.name,
                price: this.thing.price,
                seller: this.thing.seller,
                submitStatus: null
            }
        },
        validations: {
            seller: {
                required
            },
            price: {
                required,
                minValue : minValue(1)
            }
        },
        methods: {
            submit () {
                console.log('submit!')
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    // do your submit logic here
                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                        var thing = {
                            name: this.name,
                            price: this.price,
                            seller: this.seller
                        }
                        this.thing = thing
                        console.log('Submitting in ThingForm : ' +
                            JSON.stringify(this.thing, null, 5))
                        this.$emit('thing-is-created-updated', this.thing)
                    }, 500)
                }
            }
        }
    }
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .donate-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
