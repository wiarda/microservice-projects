import ShareLinks from '../../models/fileshare/ShareLinksModel'
import { FILE_LIFE_SPAN } from "./settings"
import { fileshareDb } from '../../models/connections'
import fs from 'fs'

export default async function purgeUploads(){
    let expiryCutoff = Date.now()-FILE_LIFE_SPAN
    let docs = await ShareLinks.find({timestamp:{$lt:expiryCutoff}})

    // remove files from system
    docs.forEach(async function(el){
        let re = /[\w]+$/
        let filename = `public/uploads/${re.exec(el.link)[0]}`
        
        fs.unlink(filename, handleErrors)
        // console.log(el.shortlink)
        try {
            await ShareLinks.deleteOne({"shortlink":el.shortlink})
        } catch (e){
            console.log(e)
        }
    })

}


function handleErrors(err){
    if (err && err.errno == -4058) console.log("File doesn't exist")
    else if (err) console.log(err)
    else console.log("file deleted")
}