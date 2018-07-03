
export function isValidUrl(str) {
    console.log("validating url",str)
    let re = /^(?:https?:\/{2}|www.)?(?:\w+\.)+[a-z]{2,}(?:\/[\w]+)*(?:\?[;&a-z\d%_\.~+=-]+)?/i
 
    if (re.test(str)) return true
    else return false
  }