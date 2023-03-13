let eventBus = new Vue()

Vue.component('column', {
    template: `
 
        <div class="columns">
            <newCard></newCard>
            
            <p class="head">NOTES</p>
            
        <p class="error" v-for="error in errors">{{ error }}</p>
                <column_1 :column_1="column_1"></column_1>
                <column_2 :column_2="column_2"></column_2>
                <column_3 :column_3="column_3"></column_3>
        </div>
    `,


    data() {
        return {
            column_1: [],
            column_2: [],
            column_3: [],
            errors: [],
        }

    },
})