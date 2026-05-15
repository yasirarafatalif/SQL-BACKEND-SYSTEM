import { createServer, IncomingMessage, ServerResponse } from "http";
const config = {
    port: 3000
}
const server = createServer((req: IncomingMessage, res: ServerResponse)=>{
    res.writeHead(200, {"Content-Type": "text/plain"})
    res.end("Hello, World!")
})

server.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.port}`)
})