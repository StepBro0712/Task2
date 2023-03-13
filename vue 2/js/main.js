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
    mounted(){
        eventBus.$on('addColumn_1', ColumnCard =>{
            if (this.column_1.length < 3){
                this.errors.length = 0
                this.column_1.push(ColumnCard)
            }
            else {
                this.errors.length = 0
                this.error.push()
            }
        })
        eventBus.$on('addColumn2', ColumnCard =>{
            if (this.column_2.length <5) {
                this.errors.length = 0
                this.column_2.push(ColumnCard)
                this.column_1.splice(this.column_1.indexOf(ColumnCard),1)
            }
            else {
                this.errors.length = 0
                this.error.push()
            }
        })
        eventBus.$on('addColumn3', ColumnCard =>{
            this.column_2.push(ColumnCard)
            this.column_1.splice(this.column_1.indexOf(ColumnCard),1)
        })
    }
})
 Vue.component('newCard',{
     template:`<section id="main" class="main_alt">
        <form class="row" @submit.prevent="Submit">
        <div class="text">
            <h1>Notes</h1>
        </div>
        <div class="form_control">
            <div class="form_name">
                <input type="text" v-model="name" id="name" placeholder="Введите название задачи" required>
            </div>
            
            <input type="text" v-model="task_1" required placeholder="Первая цель">  
            <input type="text" v-model="task_2" required placeholder="Вторая цель"> 
            <input type="text" v-model="task_3" required placeholder="Третья цель"> 
            <input type="text" v-model="task_4" required placeholder="Четвёртая цель"> 
            <input type="text" v-model="task_5" required placeholder="Пятая цель"> 
        </div>
            <div class="form_control">
                <button class="send">SEND</button>
            </div>
        </form>
    </section>
`,
data(){
         return{
             name: null,
             task_1: null,
             task_2: null,
             task_3: null,
             task_4: null,
             task_5: null,
             date: null
         }
    },
     methods:{
        Submit(){
            let card = {
                name: this.name,
                tasks:[
                    {name: this.task_1, completed: false},
                    {name: this.task_2, completed: false},
                    {name: this.task_3, completed: false},
                    {name: this.task_4, completed: false},
                    {name: this.task_5, completed: false},
                ],
                date: null,
                status: 0,
                errors: []
            }
            eventBus.$emit('addColumn_1 card')
            this.name = null
            this.task_1= null
            this.task_2= null
            this.task_3= null
            this.task_4= null
            this.task_5= null
        }
     }
 })

Vue.component('column_1',{
    template:`
        <sectoin id="main" class="main_alt">
            <div class="firstColumn">
                <div class="card" v-for="card in column_1">
                <h2>{{card.name}}</h2>
                    <ul class="points" v-for="point in card.tasks"
                        v-if="point.name" != null"
                        @click="PointCompleted(card, point)"
                        :class="{completed: point.completed}">
                        <li>
                        {{point.name}}
                        </li>
                    </ul>
                </div>
            </div>
        </sectoin>
    `,
    props:{
        column_1:{
            type: Array
        },
        column_2:{
            type: Array
        },
        card:{
            type: Object,
        },
        errors:{
          type: Array
        }
    },
    methods: {
        PointCompleted(ColumnCard, point){
            point.comleted = true
            ColumnCard.status += 1
            let count = 0
            for(let i = 0; i < 2; i++){
                count++
            }
            if ((ColumnCard.status / count) * 100 >= 100){
                eventBus.$emit('addColumn_2', ColumnCard)
                this.column_1.splice(this.column_1.indexOf(ColumnCard), 0)
            }
        }
    }
})