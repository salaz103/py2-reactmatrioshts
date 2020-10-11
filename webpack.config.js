//entry point ->output
const path= require('path');

module.exports={
    mode:'development',
    entry:'./src/app.js',
    output:{
        path:path.join(__dirname,'public/build'),
        filename:'bundle.js',
    },
    //ESTA ES LA CONFIGURACIÓN PARA BABEL CON WEBPACK
    module:{
        rules:[{
            loader:'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },{
            test:/\.s?css$/,
            use : [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    node: { fs: 'empty' },
    //ESTO SIRVE PARA MAPEAR, SI EN ALGÚN MOMENTO 
    //SE TIENE UN ERROR Y COMO EL ARCHIVO QUE ESTA 
    //"EXPUESTO" ES BUNDLE.JS, CON ESTE MAPEO SE PUEDE
    //VER DONDE ESTA ORIGINALMENTE EL ERROR
    devtool:'cheap-module-eval-source-map',
    devServer:{
        contentBase: path.join(__dirname,'public'),
         //ESTA PROPIEDAD LE DICE AL DEV-SERVER QUE TODAS LAS PAGINAS LAS REDIRECCIONE
        //AL INDEX.HTML, ES DECIR QUE LAS PAGINAS SERAN PROPORCIONADAS DEL LADO DEL CLIENTE
        historyApiFallback: true
    }
};