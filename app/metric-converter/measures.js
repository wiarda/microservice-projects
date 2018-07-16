const ml = {
    name: "Millileter"
    ,namePlural: "Milliliters"
    ,abbr: "ml"
    ,abbrPrint: "ml"
    ,defaultConversion: "floz"
    ,ml: 1
    ,tsp: 0.202884
    ,tbsp: 0.067628
    ,floz: 0.033814
    ,cup: 0.00416667
    ,pint: 0.00211338
    ,qt: 0.00105669
    ,gal: 0.000264172
}

function convert({from, to, amt}){
    return amt * ml[to] / ml[from]
}


console.log("measures")
    
function outside(){
    console.log(this)
    let inner = ()=>console.log("inner",this)
    inner()
}

const fat = ()=>console.log(this)

const test = {
    abc: outside
    ,fat
}


const cup = {
    name: "Cup"
    ,namePlural: "Cups"
    ,abbr: "cup"
    ,abbrPrint: "C"
    ,defaultConversion: "floz"
    ,ml: 1 / ml[this]
    ,tsp: ml.tsp / ml[this]
    ,tbsp: 16.2307
    ,floz: 8.11537
    ,pint: 0.50721
    ,qt: 0.253605
    ,gal: 0.0634013
}




export const tsp = {
    name: "Teaspoon"
    ,namePlural: "Teaspoons"
    ,abbr: "tsp"
    ,abbrPrint: "tsp"
    ,defaultConversion: "ml"
    ,ml: 1 / ml[this]
    ,tbsp: 1/3
    ,floz: 1/6
    ,cup: 1 / cup.tsp
    ,pint: ml.pint / ml[this]
    ,qt: ml.qt / ml[this]
    ,gal: ml.gal / ml[this]
}

const tbsp = {
    name: "Tablespoon"
    ,namePlural: "Tablespoons"
    ,abbr: "tbsp"
    ,abbrPrint: "Tbsp"
    ,defaultConversion: "ml"
    ,tsp: 3
    ,ml: 1/ml.tbsp
    ,floz: 1/2
    ,cup: 1/cup.tbsp
    ,pint: ml.pint / ml[this]
    ,qt: ml.qt / ml[this]
    ,gal: ml.gal / ml[this]
}

const floz= {
    name: "Fluid ounce"
    ,namePlural: "Fluid ounces"
    ,abbr: "floz"
    ,abbrPrint: "fl oz"
    ,defaultConversion: "ml"
    ,tsp: 6
    ,tbsp: 2
    ,ml: 1/ml.floz
    ,cup: 1/cup.floz
    ,pint: ml.pint / ml[this]
    ,qt: ml.qt / ml[this]
    ,gal: ml.gal / ml[this]
}

const gal = {
    name: "Gallon"
    ,namePlural: "Gallons"
    ,abbr: "gal"
    ,abbrPrint: "gal"
    ,defaultConversion: "qt"
    ,tsp: ml.tsp
    ,tbsp: 2
    ,ml: 1/ml.floz
    ,cup: 1/cup.floz
    ,pint: 8
    ,quart: 4
}


export default ml