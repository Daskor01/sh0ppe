// конвертация JPEG/PNG в public/images в WebP; пути /images/… в app/data и tests подставляются под .webp
import { readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, relative } from 'node:path'
import sharp from 'sharp'

const root = join(import.meta.dirname, '..')
const imageRoot = join(root, 'public', 'images')
const codeRoots = [join(root, 'app', 'data'), join(root, 'tests')]
const rasterRe = /\.(jpe?g|png)$/i
const webpQuality = 85

function walkFiles(dir, filter, out = []) {
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const name of entries) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) {
      walkFiles(path, filter, out)
    } else if (filter(path)) {
      out.push(path)
    }
  }
  return out
}

function publicUrlFor(filePath) {
  const rel = relative(join(root, 'public'), filePath).replaceAll('\\', '/')
  return `/${rel}`
}

const rasterFiles = walkFiles(imageRoot, (p) => rasterRe.test(p))
if (rasterFiles.length === 0) {
  console.log('images:webp — нечего конвертировать')
  process.exit(0)
}

/** @type {{ fromUrl: string, toUrl: string }[]} */
const replacements = []

for (const srcPath of rasterFiles) {
  const base = basename(srcPath).replace(rasterRe, '')
  const destPath = join(dirname(srcPath), `${base}.webp`)
  const fromUrl = publicUrlFor(srcPath)
  const toUrl = publicUrlFor(destPath)

  await sharp(srcPath).webp({ quality: webpQuality }).toFile(destPath)
  unlinkSync(srcPath)
  replacements.push({ fromUrl, toUrl })
  console.log(`images:webp — ${relative(root, srcPath)} → ${relative(root, destPath)}`)
}

const codeFiles = codeRoots.flatMap((dir) => walkFiles(dir, (p) => /\.(ts|vue)$/.test(p)))

let filesUpdated = 0
for (const file of codeFiles) {
  let text = readFileSync(file, 'utf8')
  let changed = false
  for (const { fromUrl, toUrl } of replacements) {
    if (text.includes(fromUrl)) {
      text = text.replaceAll(fromUrl, toUrl)
      changed = true
    }
  }
  if (changed) {
    writeFileSync(file, text, 'utf8')
    filesUpdated += 1
  }
}

console.log(
  `images:webp — готово: ${replacements.length} файл(ов), обновлено ${filesUpdated} исходник(ов)`,
)
