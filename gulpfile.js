var gulp = require('gulp');
var ts = require('gulp-typescript');
var webpack = require('webpack');
var gutil = require('gulp-util');
var nodemon = require('nodemon');

/**
 * Launch server and hot reload on changes.
 */
gulp.task('start', ["build:server", "build:client"], cb => {
    nodemon({
        watch: ["build"],
        script: "build/server/main.js",
        ignore: ["src", "node_modules"]
    })
    nodemon.once("start", cb);
})

gulp.task('watch', ["start"], () => {
    gulp.watch(["src/client/**"], ["build:client"]);
    gulp.watch(["src/server/**"], ["build:server"]);
    gulp.watch(["src/shared/**"], ["build:client", "build:server"]);
});

gulp.task('start-production', ["build:server", "production"], cb => {
    nodemon({
        watch: ["build"],
        script: "build/server/main.js",
        ignore: ["src", "node_modules"]
    })
    nodemon.once("start", cb);
})

gulp.task('watch-production', ["start-production"], () => {
    gulp.watch(["src/client/**"], ["production"]);
    gulp.watch(["src/server/**"], ["build:server"]);
    gulp.watch(["src/shared/**"], ["production", "build:server"]);
});

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build:server', () => {
    gulp.src('src/**/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('build'));
})

gulp.task('build:client', cb => {
    var config = {
        entry: "./src/client/index",
        devtool: "source-map",
        stats: {
            errorDetails: true
        },
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.less$/,
                    loaders: ["style", "css", "less"]
                },
                {
                    test: /(\.png|\.jpg|\.svg)$/,
                    loader: "url-loader"
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".js", ".tsx", ""]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'DEBUG': true
                }
            }),            
        ],
        externals: {
        },
        output: {
            path: "www/",
            filename: "bundle.js"
        }
    }

    webpack(config, (err, stats) => {
        if(err) {
            throw new gutil.PluginError("webpack:build", err);
        }
        else {
            gutil.log("[webpack]", stats.toString({}));
            cb();
        }
    })
})

gulp.task('production', cb => {
    var config = {
        entry: "./src/client/index.tsx",
        devtool: "source-map",
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.less$/,
                    loaders: ["style", "css", "less"]
                },
                {
                    test: /(\.png|\.jpg|\.svg)$/,
                    loader: "url-loader"
                }, {
                    test: /\.(glsl|frag|vert)$/,
                    loader: __dirname+'/glsl-loader'                    
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".js", ".tsx", ""]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production'),
                    'DEBUG': false
                }
            }),
            new webpack.optimize.UglifyJsPlugin({ mangleProperties: true })
        ],
        output: {
            path: "www/",
            filename: "bundle.js"
        }
    }

    webpack(config, (err, stats) => {
        if(err) {
            throw new gutil.PluginError("webpack:build", err);
        }
        else {
            gutil.log("[webpack]", stats.toString({}));
            cb();
        }
    })
})


gulp.task('default', ["build:server", "build:client"]);