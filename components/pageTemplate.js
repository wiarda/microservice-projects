export default function pageTemplate({
        title=""
        ,content=""
        ,scriptsArr=[]
    }){
    let scripts = scriptsArr.reduce( (acc,curr)=>{
        return acc + `<script type="text/javascript" src="${curr}" async></script>`
    },"")
    console.log("scripts",scripts)

    let boilerplate =  
        `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>${title}</title>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
                ${scripts}
            </head>
            <body>
                <div id="root">${content?content:null}</div>
            </body>
        </html>
        `

    return boilerplate
}