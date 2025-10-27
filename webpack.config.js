const Encore = require('@symfony/webpack-encore');

Encore
    // Dossier de sortie des fichiers compilés
    .setOutputPath('public/build/')
    .setPublicPath('/build')

    // Fichier d'entrée principal
    .addEntry('app', './assets/app.js')

    // Active le support de Vue 3
    .enableVueLoader(() => {}, { version: 3 })

    // Divise les chunks (pratique si tu rajoutes d'autres entrées)
    .splitEntryChunks()

    // Runtime JS partagé entre les entrées (plus efficace)
    .enableSingleRuntimeChunk()

    // Devtools : nettoyage, sourcemaps, versioning
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    // Notifications (facultatif, commente si tu veux)
    // .enableBuildNotifications()
;

module.exports = Encore.getWebpackConfig();
