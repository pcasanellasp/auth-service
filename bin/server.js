#!/usr/bin/env node

const app = require('../app')
const port = process.env.PORT || '3000'
app.set('port', port)

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port, () => console.info('\x1b[34m%s\x1b[0m', `
  REST      → http://localhost:${port}/
  `,
))
