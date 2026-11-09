import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import fs from 'node:fs'
import path from 'node:path'

function localCmsPlugin() {
  return {
    name: 'nextlevel-local-cms',
    configureServer(server: { middlewares: { use: (fn: (req: any, res: any, next: () => void) => void) => void } }) {
      const dataDir = path.resolve(process.cwd(), 'public', 'data')
      const contentFile = path.join(dataDir, 'content.json')
      const passFile = path.join(dataDir, 'admin_pass.txt')
      const defaultPass = 'nextlevel2025'

      const getPass = () => {
        try {
          if (fs.existsSync(passFile)) {
            const p = fs.readFileSync(passFile, 'utf-8').trim()
            if (p) return p
          }
        } catch {
          // ignore
        }
        return defaultPass
      }

      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/api.php')) {
          return next()
        }
        const urlObj = new URL(req.url, 'http://localhost')
        const action = urlObj.searchParams.get('action') || 'get'

        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.setHeader('Cache-Control', 'no-store')

        if (action === 'get' && req.method === 'GET') {
          try {
            if (fs.existsSync(contentFile)) {
              const raw = fs.readFileSync(contentFile, 'utf-8')
              res.end(raw || '{}')
              return
            }
          } catch {
            // ignore
          }
          res.end('{}')
          return
        }

        let body = ''
        req.on('data', (chunk: Buffer) => {
          body += chunk.toString()
        })
        req.on('end', () => {
          try {
            const parsed = body ? JSON.parse(body) : {}
            const providedPass =
              req.headers['x-admin-password'] || parsed.password || ''

            if (action === 'verify') {
              if (providedPass !== getPass()) {
                res.statusCode = 401
                res.end(JSON.stringify({ ok: false, error: 'Неверный пароль администратора' }))
                return
              }
              res.end(JSON.stringify({ ok: true }))
              return
            }

            if (action === 'passwd') {
              if (providedPass !== getPass()) {
                res.statusCode = 401
                res.end(JSON.stringify({ ok: false, error: 'Текущий пароль неверный' }))
                return
              }
              const newPass = String(parsed.newPassword || '').trim()
              if (newPass.length < 4) {
                res.statusCode = 400
                res.end(JSON.stringify({ ok: false, error: 'Минимум 4 символа' }))
                return
              }
              fs.mkdirSync(dataDir, { recursive: true })
              fs.writeFileSync(passFile, newPass, 'utf-8')
              res.end(JSON.stringify({ ok: true }))
              return
            }

            if (action === 'save') {
              if (providedPass !== getPass()) {
                res.statusCode = 401
                res.end(JSON.stringify({ ok: false, error: 'Неверный пароль администратора' }))
                return
              }
              const payload = parsed.content ?? parsed
              fs.mkdirSync(dataDir, { recursive: true })
              fs.writeFileSync(contentFile, JSON.stringify(payload, null, 2), 'utf-8')
              res.end(JSON.stringify({ ok: true }))
              return
            }

            res.statusCode = 400
            res.end(JSON.stringify({ ok: false, error: 'Unsupported action in dev mode' }))
          } catch (err) {
            res.statusCode = 500
            res.end(JSON.stringify({ ok: false, error: String(err) }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: true,
  },
  plugins: [
    localCmsPlugin(),
    react(),
    tailwindcss(),
    viteSingleFile(),
  ],
})
