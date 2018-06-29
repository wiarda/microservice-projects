export const timestampController = function(req,res){
    let input = req.params.date
    let dateObj
    let date = isNumeric(input) ? new Date(Number(input)) : new Date(input)

    if (isNaN(date)) dateObj = {error: "Invalid Date"}
    else dateObj = buildDateObj(date)

    res.json(dateObj)
}

export function currentTime(req,res){
    res.json(buildDateObj(new Date(Date.now())))
}
    
function isNumeric(input){
    if (Number(input)) return true
}

function buildDateObj(time){
    return {
        unix: time.getTime()
        ,utc: time.toUTCString()
    }
}