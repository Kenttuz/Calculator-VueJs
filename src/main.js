import Vue from 'vue'
import App from './App'

new Vue({
    //Renderizando o componente dentro da div com id App
    render: h => h(App)
}).$mount('#app') //Mesma coisa que o el
