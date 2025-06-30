const mix = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the
 */

mix.js('resources/js/app.jsx', 'public/js')
    .react()
    .webpackConfig({
        resolve: {
            extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'],
            alias: {
                '@': path.resolve(__dirname, 'resources/js'),
                '@Pages': path.resolve(__dirname, 'resources/js/Pages'),
                '@Components': path.resolve(__dirname, 'resources/js/Components'),
                '@Layouts': path.resolve(__dirname, 'resources/js/Layouts')
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/, 
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        }
    })
    .postCss('resources/css/app.css', 'public/css', [
        require('tailwindcss'),
        require('autoprefixer'),
    ])
    .version();
