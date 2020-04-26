let proxyObj = {};
proxyObj['/ws'] = {
    ws: true,
    target: "ws://localhost:1990"
};
proxyObj['/eduservice'] = {
    ws: false,
    target: 'http://localhost:1990',
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
}
    
proxyObj['/eduoss'] = {
    ws: false,
    target: 'http://localhost:1991',
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
}

module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}