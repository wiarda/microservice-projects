export default function pageTemplate({
        title=""
        ,content=""
        ,scriptsArr=[]
        ,stylesArr=[]
        ,initialState=null
    }){
    
        let scripts = scriptsArr.reduce( (acc,cur)=>{
            return acc + `<script type="text/javascript" src="${cur}" defer></script>`
        },"");

        let styles = stylesArr.reduce( (acc,cur)=>{
            return acc + `<link rel="StyleSheet" href="${cur}" type="text/css"/>`
        },"");

        let state = initialState ? 
        `<script>window.__STATE=${JSON.stringify(initialState)}</script>` :
        "";

    console.log("scripts",scripts)

    let boilerplate =  
        `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>${title}</title>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous">
                ${styles}
            </head>
            <body>
                <div id="root">${content?content:null}</div>
                ${state}    
                ${scripts}
            </body>
        </html>
        `

    return boilerplate
}