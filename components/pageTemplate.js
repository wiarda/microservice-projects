export default function pageTemplate({
        title=""
        ,content=""
        ,scriptsArr=[]
        ,stylesArr=[]
    }){
    
        let scripts = scriptsArr.reduce( (acc,cur)=>{
            return acc + `<script type="text/javascript" src="${cur}" async></script>`
        },"")

        let styles = stylesArr.reduce( (acc,cur)=>{
            return acc + `<link rel="StyleSheet" href="${cur}" type="text/css"/>`
        },"")

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
                ${scripts}
            </head>
            <body>
                <div id="root">${content?content:null}</div>
            </body>
        </html>
        `

    return boilerplate
}