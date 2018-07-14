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
  
  // const el = document.createElement("div")
  // el.innerHTML = link                                 
  // el.setAttribute('readonly', '')                
  // el.style.position = 'absolute'                 
  // el.style.left = '-9000px'                      
  // console.log(el)
  // el.select()
  // document.execCommand('copy');                   
  // el.remove()
  // document.body.removeChild(el);    


  // document.body.appendChild(el)                  
  
  // console.log(el)
  
  // el.remove()
  // // save current selection, if any
  // const selected =            
  //   document.getSelection().rangeCount > 0        
  //     ? document.getSelection().getRangeAt(0)     
  //     : false                                  
  
  
  // el.select()                                    
  // // requires user action
  // document.execCommand('copy');                   
  // document.body.removeChild(el);                  
  
  // if (selected) {                                 
  //   document.getSelection().removeAllRanges();    
  //   document.getSelection().addRange(selected);   
  // }
};