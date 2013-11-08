var compressor = require('node-minify');

new compressor.minify({
    type: 'uglifyjs',
    fileIn: 'js/alertjs.js',
    fileOut: 'js/alertjs.min.js',
    callback: function(err, min){
        console.log(err);
    }
});

new compressor.minify({
    type: 'sqwish',
    fileIn: 'css/alertjs.css',
    fileOut: 'css/alertjs.min.css',
    callback: function(err, min){
        console.log('Sqwish');
        console.log(err);
    }
});