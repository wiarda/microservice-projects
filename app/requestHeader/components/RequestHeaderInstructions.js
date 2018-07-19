import React from 'react'
import GridLayout from '../../../components/GridLayout'

export default function RequestHeaderInstructions(props){
    let title = (
        <h1 className="mx-auto">Request Header Parser Microservice</h1>
    )

    let instructions = (
        <div>
            <p>Curious what information your browser sends to other websites? This service parses a browser's request header to show:</p>
                <ol>
                    <li>IP address</li>
                    <li>Preferred languages</li>
                    <li>System info</li>
                </ol>
                <p>To use this microservice, navigate to /api/request-header. You will receive a JSON object with the following structure:
                    <pre className="mx-3">
                        {`{`}
                            ip-address: [Browser's IP address],<br/>
                            language: [Browser's preferred language setting],<br/>
                            system-info: [Browser's system information]
                        {`}`}
                    </pre>
                </p>
        </div>
    )

    return (
        <GridLayout
            title={title}
            content={instructions}
            sampleOutput={props.output}
        />
    )
}