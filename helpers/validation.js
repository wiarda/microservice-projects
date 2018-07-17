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