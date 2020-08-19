import * as fileSystem from 'fs'
import { extname, join } from 'path'
import { lookup } from 'mime-types'

export const getFile = async (
    filename: string,
    basePath: string,
    fs: typeof fileSystem,
): Promise<{
    file: string | Buffer
    mimeType: string
}> => {
    try {
        const stats = fs.statSync(join(basePath, 'dist', 'client', filename))

        if (!stats.isFile()) {
            filename = 'index.html'
        }
    } catch (err) {
        //se não existe redireciona pro index e deixa o vue cuidar de 404s
        filename = 'index.html'
    }
    const extension = extname(filename)
    const file = fs.readFileSync(
        join(basePath, 'dist', 'client', filename),
        extension === '.html' ? 'utf8' : undefined,
    )
    const mimeType = lookup(extension) || ''

    return {
        file,
        mimeType,
    }
}
