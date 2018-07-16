import {curry} from '../../helpers/helpers'
 
const convertVolume = {
    ml: 1
    ,tsp: 0.202884
    ,tbsp: 0.067628
    ,floz: 0.033814
    ,cup: 0.00416667
    ,pint: 0.00211338
    ,qt: 0.00105669
    ,gal: 0.0002641725
    ,toMl(amount){ return curry(this.convert,this,"ml",this.abbr)(amount) }
    ,toTsp(amount){ return curry(this.convert,this,"tsp",this.abbr)(amount) }
    ,toTbsp(amount){ return curry(this.convert,this,"tbsp",this.abbr)(amount) }
    ,toFloz(amount){ return curry(this.convert,this,"floz",this.abbr)(amount) }
    ,toCup(amount){ return curry(this.convert,this,"cup",this.abbr)(amount) }
    ,toPint(amount){ return curry(this.convert,this,"pint",this.abbr)(amount) }
    ,toQt(amount){ return curry(this.convert,this,"qt",this.abbr)(amount) }
    ,toGal(amount){ return curry(this.convert,this,"gal",this.abbr)(amount) }
    /**
    * converts one unit to another
    * @param {string: unit converting to} to 
    * @param {string: unit converting from} from 
    * @param {number: amount to convert} amt 
    */
    ,convert(to, from, amt=1){
        console.log("converting",amt,from,"to",to,":",amt * this[to] / this[from])
        return amt * this[to] / this[from]
    }
}

const makeVolumeObject = curry(makeConversionObject,null,convertVolume)
const ml = makeVolumeObject("Milliliter", "ml")
const tsp = makeVolumeObject("Teaspoon", "tsp")
const tbsp = makeVolumeObject("Tablespoon", "tbsp")
const floz = makeVolumeObject("Fluid Ounce", "floz")
const cup = makeVolumeObject("Cup", "cup")
const pint = makeVolumeObject("Pint", "pint")
const quart = makeVolumeObject("Quart", "qt")
const gallon = makeVolumeObject("Gallon", "gal")

const convert = {
    ml, tsp, tbsp, floz, cup, pint, quart, gallon
}

/**
 * Creates a conversion object that can convert itself to other units
 * @param {Object} prototype 
 * @param {string} name 
 * @param {string} abbr 
 */
function makeConversionObject(prototype,name,abbr){
    let conversionObject = Object.create(prototype)
    conversionObject.name = name
    conversionObject.abbr = abbr
    return conversionObject
}

export default convert

console.log(convert.tsp.toTsp(3).toFixed(2))