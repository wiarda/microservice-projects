import purgeUploads from "../app/metadata/purgeUploads";

export default function eventLoop(){

    // consider adding code to only check for expired files 
    // when the collection isn't empty
    const fileshareLoop = setInterval(function(){
        console.log("tick")
        purgeUploads()        
    },60000) // check for expired files once every minute

}