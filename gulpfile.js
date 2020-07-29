
var gulp     = require('gulp'),  
    concat   = require('gulp-concat'),//- 多个文件合并为一个；  
    minifycss = require('gulp-minify-css'),
    cleanCSS = require('gulp-clean-css'),//- 压缩CSS为一行；,
    rename = require('gulp-rename')
    autoprefixer = require('gulp-autoprefixer'),  
    ugLify   = require('gulp-uglify'),//压缩js  
    imageMin = require('gulp-imagemin'),//压缩图片  
    tinypng = require('gulp-tinypng-compress'),//tinypng压缩图片,每月只能压500
    tiny = require('gulp-tinypng-nokey'),//免费使用tinypng压缩图片
    cache = require('gulp-cache'),//只压缩修改的图片
    pngquant = require('imagemin-pngquant'), // 深度压缩  
    htmlMin  = require('gulp-htmlmin'),//压缩html  
    changed  = require('gulp-changed'),//检查改变状态  
    del      = require('del'),  
    fontSpider = require( 'gulp-font-spider' ),
    fontmin = require('gulp-fontmin'),
    sftp = require('gulp-sftp'),//自动上传ftp
    plumber = require('gulp-plumber'),//可以阻止 gulp 插件发生错误导致进程退出并输出错误日志
    // config = require('./config.json'),//配置自动上传ftp
    browserSync = require("browser-sync").create();//浏览器实时刷新  

  
//删除docs下的所有文件  
gulp.task('delete',function(cb){  
    return del(['./docs/src/*'],cb);  
})  
  
//压缩html  
// gulp.task('html', function () {  
//     var options = {  
//         removeComments: true,//清除HTML注释  
//         collapseWhitespace: true,//压缩HTML  
//         collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />  
//         removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />  
//         removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"  
//         removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"  
//         minifyJS: true,//压缩页面JS  
//         minifyCSS: true//压缩页面CSS  
//     };  
//     gulp.src('./src/index.html')  
//         .pipe(changed('./docs', {hasChanged: changed.compareSha1Digest}))  
//         .pipe(htmlMin(options))  
//         .pipe(gulp.dest('./docs'))  
//         .pipe(browserSync.reload({stream:true}));  
// }); 

//压缩css
gulp.task('minifycss', function() {
	return gulp.src(['./src/css/plugins/*.css','./src/css/*.css'])    //需要操作的文件
        .pipe(plumber())
    	.pipe(autoprefixer({
	        browsers: ['last 2 versions','Safari >0', 'Explorer >0', 'Edge >0', 'Opera >0', 'Firefox >=20'],//last 2 versions- 主流浏览器的最新两个版本
	        cascade: true, //是否美化属性值 默认：true 像这样：
	            //-webkit-transform: rotate(45deg);
	            //        transform: rotate(45deg);
	            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(concat('main.css'))    //合并所有css到main.css
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('./docs/src/css'))   //输出文件夹
        .pipe(browserSync.reload({stream:true}));  
}); 
  

//压缩js  
gulp.task("script",function(){  
    gulp.src(['./src/js/plugins/*.*','./src/js/*.js'])   
        .pipe(plumber())
        .pipe(concat('main.js'))  
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(ugLify().on('error', function (e) {
           console.log(e)
         }))  
        .pipe(gulp.dest('docs/src/js'))  
        .pipe(browserSync.reload({stream:true}));  
});  
gulp.task("scriptPlugins",function(){  
    gulp.src(['src/plugins/*.*'])   
        .pipe(plumber())
        .pipe(gulp.dest('docs/src/plugins'))  
        .pipe(browserSync.reload({stream:true}));  
});  
  
// 压缩图片  
gulp.task("images", function() {
    gulp.src('./src/images/*.{png,jpg,jpeg,gif}')
        .pipe(plumber())
        .pipe(gulp.dest('docs/src/images'))
        .pipe(browserSync.reload({stream:true}));  
});
// gulp.task("images", function() {
//     gulp.src('./src/images/*.{png,jpg,jpeg,gif}')
//         .pipe(plumber())
//         .pipe(cache(tiny()))
//         .pipe(gulp.dest('docs/src/images'))
//         .pipe(browserSync.reload({stream:true}));  
// });
// gulp.task('images', function () {  
//     gulp.src('./src/images/*.*')  
//         .pipe(imageMin({  
//             progressive: true,// 无损压缩JPG图片  
//             svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性  
//             use: [pngquant()] // 使用pngquant插件进行深度压缩  
//         }))  
//         .pipe(gulp.dest('docs/src/images'))  
//         .pipe(browserSync.reload({stream:true}));  
// });  

// 压缩字体
// 读取页面上引用到的字体进行压缩字体文件
function minifyFont(text, cb) {
    gulp.src('src/font/*.*')
        .pipe(plumber())
        .pipe(fontmin({
            text: text
        }))
        .pipe(gulp.dest('./docs/src/font'))
        .on('end', cb);
}
gulp.task('font', function(cb) {
    var buffers = [];
    gulp.src('./docs/*.html')
        .pipe(plumber())
        .on('data', function(file) {
            buffers.push(file.contents);
        })
        .on('end', function() {
            var text = Buffer.concat(buffers).toString('utf-8');
            minifyFont(text, cb);
        });

});
// 固定要压缩那些字
// gulp.task('font', function () {
//     return gulp.src('./src/font/PingFang Heavy.ttf')
//         .pipe(fontmin({
//             text: '欢迎登录云计量 注册 重置密码',//填入需要压缩的字体
//         }))
//         .pipe(gulp.dest('docs/src/font'));
// });


//上传到远程服务器任务
// gulp.task('upload', function () {
//     var workDirectory = 'xxx';
//     return gulp.src( workDirectory + '/**' )
//         .pipe(sftp({
//             host: config.sftp.host,
//             user: config.sftp.user,
//             port: config.sftp.port,
//             // key: config.sftp.key,
//             pass: config.sftp.pass,
//             remotePath: config.sftp.remotePath+objectDirectoryName
//         }));
// });




  
//启动热更新  
gulp.task('serve', ['delete'], function() {  
    gulp.start('script','scriptPlugins','minifycss','images','font');  
    // browserSync.init({  
    //     port: 8000,  
    //     server: {  
    //         baseDir: ['docs']  
    //     }  
    // });  
    gulp.watch('src/js/*.js', ['script']);         //监控文件变化，自动更新  
    gulp.watch('src/css/*.css', ['minifycss']);  
    // gulp.watch('src/*.html');  
    gulp.watch('src/images/*.*', ['images']);  
    gulp.watch('src/font/*.*', ['font']);  
    // gulp.watch('*.*', ['upload']);  
});  
  
gulp.task('default',['serve']);  