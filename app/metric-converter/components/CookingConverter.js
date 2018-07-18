import React from 'react'
import GridLayout from '../../../components/GridLayout'
import ConversionForm from './ConversionForm'
import ServerResponse from '../../../components/ServerResponse'
import Loading from '../../../components/Loading'
import { isValidExpression } from '../../../helpers/validation'
import volume from '../measures'
import { timingSafeEqual } from 'crypto';

const FORM_NAME="conversion-form"
const BODY_MIN_WIDTH="450px"

const options = [
    ["milliliters","ml"]
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
    ,apiResponse: {type:""}
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
        // console.log(amount,from,to)
        let amountValidity, fromValidity, toValidity
        amountValidity = fromValidity = toValidity = "is-valid"
        //validate form
        amount = isValidExpression(amount)
        if (!amount) amountValidity="is-invalid"
        if (from === defaultValue.from) fromValidity="is-invalid"
        if (to === defaultValue.to) toValidity="is-invalid"

        if (amountValidity == "is-invalid" || 
            fromValidity == "is-invalid" || 
            toValidity == "is-invalid"){
            // one or more fields failed client-side validation
            this.setState({amountValidity, fromValidity, toValidity})
        } 
        else {           
            //submit api request
            let serverResponse = fetch(`/api/convert/request?amount=${amount}&from=${from}&to=${to}`,{
                method: "GET"
            })
            //mark form as valid
            this.setState({amountValidity,fromValidity,toValidity,apiResponse:{type:"loading"}})
            console.log("sending api request")
            serverResponse.then(body=>body.json())
            .then(apiResponse=>{
                console.log("api response received:", apiResponse)
                this.setState({apiResponse})
            })

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
                minWidth={BODY_MIN_WIDTH}
            />
            <ServerResponse
                apiResponse={this.state.apiResponse}
                parser={parseConversion}
            />
            </GridLayout>
        )
    }
}

function parseConversion(response){
    switch (response.type){
        case "loading":
            return <Loading minWidth={BODY_MIN_WIDTH} spinner={true}/>
        default:
            return null
    }
}