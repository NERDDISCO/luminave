const path = require('path');

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {
  // Fix https://github.com/PolymerX/polymerx-cli/issues/179
  let { plugin } = helpers.getPluginsByName(config, "HtmlWebpackPlugin")[0];
  plugin.options.chunksSortMode = 'none'

  // Add node_modules into dev server
  config.devServer.contentBase = [
    path.resolve(__dirname, "src"),
    path.resolve(__dirname, "node_modules")
  ]

  config.devServer.publicPath = "/"
}
