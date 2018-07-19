/**
 * Checks if an expression is valid
 * (accepts decimals and fractions, but not operators)
 * @param {string} expression 
 */
export function isValidExpression(expression){
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

/**
 * checks if the passed parameter is a number 
 * @param {*} string 
 */
export function isNumber(string){
    let re = /^[\d\.]+$/
    if (re.test(string)) {
        // no invalid characters
        return 
    }
}