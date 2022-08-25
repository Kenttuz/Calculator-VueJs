<template>
    <div class="calculator">
        <AllDisplay :value="displayValue" @onClick="addDigit" />
        <AllButton label="AC" triple @onClick="clearMemory" />
        <AllButton label="/" operation @onClick="setOperation" />
        <AllButton label="7" @onClick="addDigit" />
        <AllButton label="8" @onClick="addDigit" />
        <AllButton label="9" @onClick="addDigit" />
        <AllButton label="*" operation @onClick="setOperation" />
        <AllButton label="4" @onClick="addDigit" />
        <AllButton label="5" @onClick="addDigit" />
        <AllButton label="6" @onClick="addDigit" />
        <AllButton label="-" operation @onClick="setOperation" />
        <AllButton label="1" @onClick="addDigit" />
        <AllButton label="2" @onClick="addDigit" />
        <AllButton label="3" @onClick="addDigit" />
        <AllButton label="+" operation @onClick="setOperation" />
        <AllButton label="0" double @onClick="addDigit" />
        <AllButton label="." @onClick="addDigit" />
        <AllButton label="=" operation @onClick="setOperation" />
    </div>
</template>

<script>
import AllDisplay from '../components/AllDisplay.vue'
import AllButton from '../components/AllButton.vue'

//Registrando o componente
export default {
    //Valores padrão
    data: function () {
        return {
            displayValue: '0',
            clearDisplay: false,
            operation: null,
            values: [0, 0],
            current: 0
        }
    },
    components: { AllButton, AllDisplay },
    methods: {
        clearMemory() {
            //Atribuindo ao this.data o estado inicial do objeto
            Object.assign(this.$data, this.$options.data())
        },
        setOperation(operation) {
            if (this.current === 0) {
                //Quando o usuário digita no primeiro elemento recebe a própria operação
                this.operation = operation
                //Aqui digita no segundo valor
                this.current = 1
                //O próximo dígito vai limpar o dipslay
                this.clearDisplay = true
            } else {
                const equals = operation === '='
                const currentOperation = this.operation

                try {
                    this.values[0] = eval(
                        `${this.values[0]} ${currentOperation} ${this.values[1]}`
                    )
                } catch (e) {
                    this.$emit('OnError', e)
                }
                this.values[1] = 0

                this.displayValue = this.values[0]
                this.operation = equals ? null : operation
                //Se o usuário digitou equals (igual) ele vai para o primeiro elemento, se não ele vai para o segundo
                this.current = equals ? 0 : 1
                this.clearDisplay = !equals
            }
        },

        addDigit(n) {
            if (n === '.' && this.displayValue.includes('.')) {
                return
            }
            const clearDisplay = this.displayValue === '0' || this.clearDisplay
            const currentValue = clearDisplay ? '' : this.displayValue
            const displayValue = currentValue + n

            //Aqui com o this estou alterando os dados do componente em si
            this.displayValue = displayValue
            this.clearDisplay = false

            //Alternativa 1
            this.values[this.current] = displayValue

            //Alternativa 2
            // if (n !== '.') {
            //     //Olhando o índice
            //     const i = this.current
            //     const newValue = parseFloat(displayValue)
            //     //Acrescendo o novo valor no índice
            //     this.values[i] = newValue
            // }
        }
    }
}
</script>

<style>
.calculator {
    height: 320px;
    width: 235px;
    border-radius: 5px;
    overflow: hidden;

    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows:
        1fr
        48px
        48px
        48px
        48px
        48px;
}
</style>
