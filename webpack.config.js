module.exports = {
    entry: "./public/ui/entry.js",
    output: {
        path: __dirname + '/public/scripts/',
        filename: "bundle.js",
        libraryTarget: 'umd'
    },
    resolve: {
      extensions: [
        '',
        '.js',
        '.jsx',
      ],
    },
    module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference 
            query: {
              presets: ['react', 'es2015']
            }
          },
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};