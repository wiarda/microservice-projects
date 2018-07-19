export function isValidUrl(str) {
    let re = /^(?:https?:\/{2}|www.)?(?:\w+\.)+[a-z]{2,}((?:\/[\w]+)*(?:\?[;&a-z\d%_\.~+=-]+)?)?$/i
 
    if (re.test(str)) return true
    else return false
  }

export function resolveLink(link){
  const el = document.createElement("a")
  el.href = link
  const resolved = el.href
  el.remove()
  return resolved
}

 export function copyLink(id){
  console.log("copying link")  
  const a = document.getElementById(id)
  const link = a.href
  console.log(a)
  console.log(link)

  const el = document.createElement("textarea")
  el.innerHTML = link                                 
  el.setAttribute('readonly', '')                
  el.style.position = 'absolute'                 
  el.style.left = '-9000px'                      

  document.body.appendChild(el)
  el.select()
  document.execCommand('copy');                   
  el.remove()
 }

 /**
 * Curries a function. 
 * First argument is a function
 * Second argument is the this value to pass to the curried function
 */
export function curry(){
  let [fn,context,...defaults] = arguments
  return function(...args){
      // console.log("curried function: arguments",[...defaults,...args])
      // console.log("context", context)
      return fn.apply(context,[...defaults,...args])
  }
}

export function capitalize(string){
  return string.replace(/^([a-z])/,function(match,p1){
      return p1.toUpperCase()
  })
}