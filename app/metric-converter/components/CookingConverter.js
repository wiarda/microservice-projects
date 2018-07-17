import React from 'react'
import GridLayout from '../../../components/GridLayout'
import ConversionForm from './ConversionForm'
import ml from '../measures'
import { timingSafeEqual } from 'crypto';

const FORM_NAME="conversion-form"

const options = [
    ["millileters","ml"]
    ,["teaspoons","tsp"]
    ,["tablespoons","tbsp"]
    ,["fluid ounces","floz"]
    ,["cups","cup"]
    ,["pints","pint"]
    ,["quarts","qt"]
    ,["gallons","gal"]
]

const defaultValue = {
    amount: "amount"
    ,from: "units"
    ,to: "convert to"
}

const optionsFrom = [
    defaultValue.from
    ,...options
]

const optionsTo = [
    defaultValue.to
    ,...options
]

const defaultState = {
    amount: defaultValue.amount
    ,amountValidity: ""
    ,from: defaultValue.from
    ,fromValidity: ""
    ,to: defaultValue.to
    ,toValidity: ""
}

export default class CookingConverter extends React.Component{
    constructor(props){
        super(props)
        this.defaultTextHandler = this.defaultTextHandler.bind(this)
        this.inputHandler = this.inputHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.state = defaultState
    }

    // clear amount placeholder
    defaultTextHandler(e){
        e.preventDefault()
        if (e.target.value===defaultValue.amount) this.setState({amount:"",amountValidity:""})
    }

    // control amount input
    inputHandler(e){
        e.preventDefault()
        if(!isValidExpression(e.target.value)) this.setState({amountValidity:"",amount:e.target.value})
        else this.setState(this.setState({amountValidity:"is-valid",amount:e.target.value}))
    }

    //control unit of measurement selection
    changeHandler(e,prop){
        e.preventDefault()
        let validity = e.target.value == defaultValue[prop] ? "is-invalid" : "is-valid"
        this.setState({[prop]:e.target.value, [`${prop}Validity`]:validity})
    }
    
    submitHandler(e){
        e.preventDefault()
        let {amount,from,to} = this.state
        console.log(amount,from,to)
        let amountValidity, fromValidity, toValidity
        amountValidity = fromValidity = toValidity = "is-valid"
        //validate form
        if (!isValidExpression(amount)) amountValidity="is-invalid"
        if (from === defaultValue.from) fromValidity="is-invalid"
        if (to === defaultValue.to) toValidity="is-invalid"

        if (amountValidity == "is-invalid" || fromValidity == "is-invalid" || toValidity == "is-invalid"){
            // one or more fields failed client-side validation
            this.setState({amountValidity, fromValidity, toValidity})
        } 
        else {
            // client-side validation passed: prepare form
            let form = new FormData()
            form.amount = isValidExpression(amount)
            form.from = from
            form.to = to

            //mark form as valid
            this.setState({amountValidity,fromValidity,toValidity})

            //submit form
        }
    }

    render(){
        return(
            <GridLayout
                title="Cooking Measurements Converter"
            >
            <ConversionForm
                defaultTextHandler={this.defaultTextHandler}
                inputHandler={this.inputHandler}
                changeHandler={this.changeHandler}
                submitHandler={this.submitHandler}
                amount={this.state.amount}
                amountValidity={this.state.amountValidity}
                optionsFrom={optionsFrom}
                from={this.state.from}
                fromValidity={this.state.fromValidity}
                optionsTo={optionsTo}
                to={this.state.to}
                toValidity={this.state.toValidity}
            />
            </GridLayout>
        )
    }
}

/**
 * Checks if an expression is valid
 * (accepts decimals and fractions, but not operators)
 * @param {string} expression 
 */
function isValidExpression(expression){
    //check for invalid characters
    let re = /^[\d\.\/\+\-\*\ ]+$/
    if (!re.test(expression)) return false
    
    // try to evaluate expression
    console.log("evaluating")
    let ans
    try {ans = eval(expression)}
    catch(err){ ans=false }
    console.log(ans)
    return ans
}