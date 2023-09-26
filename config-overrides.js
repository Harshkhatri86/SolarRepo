const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        url: require.resolve('url'),
        fs: require.resolve('fs'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
        path:require.resolve('path-browserify') , 
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}


// "start": "react-scripts start",
// "build": "react-scripts build",
// "test": "react-scripts test",
// "eject": "react-scripts eject"




// new config file
// "start": "react-app-rewired start",
// "build": "react-app-rewired build",
// "test": "react-app-rewired test",
// "eject": "react-app-rewired eject"