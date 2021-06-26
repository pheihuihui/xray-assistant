const esbuild = require('esbuild')
const fse = require('fs-extra')

esbuild.buildSync({
    entryPoints: ['./src/renderer.ts'],
    treeShaking: 'ignore-annotations',
    outfile: './dist/renderer.js',
    tsconfig: 'tsconfig.esbuild.json',
    bundle: true,
    define: { 'process.env.NODE_ENV': '"devlopment"' },
    platform: 'node'
})

// fse.copy('./src/resources/favicon.ico', './dist/favicon.ico')
//     .then(() => console.log('copy favicon success!'))
//     .catch(err => console.error(err))

// fse.copy('./src/resources/global.css', './dist/global.css')
//     .then(() => console.log('copy css success!'))
//     .catch(err => console.error(err))

fse.copy('./resources/index.html', './dist/index.html')
    .then(() => console.log('copy html success!'))
    .catch(err => console.error(err))