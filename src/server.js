import app, { port } from './app.js'

app.listen(port, () => {
    console.log('Server is started on port: ' + port)
})
