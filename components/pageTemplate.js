export default function pageTemplate(title=null,content=null,scripts=null){
    let boilerplate =  
        `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title> ${title} </title>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
            </head>
            
            <body>
                <div id="root">
                    ${content}
                </div>
                    ${scripts}
            </body>
        </html>
        `

    return boilerplate
}