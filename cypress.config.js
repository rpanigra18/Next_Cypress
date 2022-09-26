const { defineConfig } = require("cypress");
const http = require('http')
const next = require('next')
const nock = require('nock')


module.exports = defineConfig({
    e2e: {
        async setupNodeEvents(on, config) {
            const app = next({ dev: true })
            const handleNextRequests = app.getRequestHandler()
            await app.prepare()

            const customServer = new http.Server(async (req, res) => {
                return handleNextRequests(req, res)
            })

            await new Promise((res, rej) => {
                customServer.listen(3000, (err) => {
                    if (err) {
                        rej(err)
                    } console.log('>>>>> Ready, Application listening on 3000')
                    res()
                })
            })
            on('task', {
                clearNock() {
                    nock.restore()
                    nock.cleanAll()
                    return null
                }
            })
            on('task', {
                setupNock({ hostname, method, path, statusCode, body }) {
                    nock.activate()
                    console.log("Nock activated")
                    console.log("hostname " + hostname)
                    console.log("Method> " + method)
                    console.log("Path> " + path)
                    console.log("body> " + JSON.stringify(body))
                    method = method.toLowerCase()
                    nock(hostname)[method](path).reply(statusCode, body)
                    console.log('Active Nocks --> ' + nock.activeMocks())
                    return null
                }
            })
        },
    },
});
