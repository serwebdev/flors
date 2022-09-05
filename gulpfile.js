const { src, dest, watch, parallel, series } = require('gulp');
const browsersync = require('browser-sync').create();
const scss = require('gulp-sass')(require('sass'));
const fileinclude = require('gulp-file-include');
const autoprefixer = require('gulp-autoprefixer');
const group_media = require('gulp-group-css-media-queries');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const gulpif = require('gulp-if');

let isDev = false;

function clean() {
  return del('dist');
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: 'dist',
    },
    browser: 'chrome',
    notify: false,
    // tunnel: true,
  });
}

function watcher() {
  watch(['src/*.html', 'src/components/**/*.html'], html);
  watch(['src/scss/*.scss', 'src/components/**/*.scss'], styles);
  watch(['src/js/*.js', 'src/components/**/*.js'], js);
  watch('src/img/**/*', images);
  watch('src/assets/**/*', copyFiles);
  watch(['src/components/**/*.json'], html);
}

function html() {
  return src(['src/*.html', '!src/_*.html'])
    .pipe(fileinclude())
    .pipe(dest('dist'))
    .pipe(browsersync.stream());
}

function styles() {
  return (
    src('src/scss/style.scss', { sourcemaps: isDev })
      .pipe(scss())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ['last 5 versions'],
        })
      )
      .pipe(group_media())
      // .pipe(dest('dist/css'))

      // Сжатый файл style.min.css
      .pipe(gulpif(!isDev, scss({ outputStyle: 'compressed' })))
      .pipe(
        rename({
          extname: '.min.css',
        })
      )
      .pipe(dest('dist/css', { sourcemaps: isDev }))
      .pipe(browsersync.stream())
  );
}

function libsstyles() {
  return src('src/scss/libs.scss')
    .pipe(gulpif(!isDev, scss({ outputStyle: 'compressed' })))
    .pipe(
      rename({
        extname: '.min.css',
      })
    )
    .pipe(dest('dist/css'))
    .pipe(browsersync.stream());
}

function js() {
  return (
    src('src/js/main.js', { sourcemaps: isDev })
      .pipe(fileinclude())
      // .pipe(dest('dist/js'))

      // Сжатый файл main.min.js
      .pipe(gulpif(!isDev, uglify()))
      .pipe(
        rename({
          extname: '.min.js',
        })
      )
      .pipe(dest('dist/js', { sourcemaps: isDev }))
      .pipe(browsersync.stream())
  );
}

function libsjs() {
  return src('src/js/libs.js')
    .pipe(fileinclude())
    .pipe(gulpif(!isDev, uglify()))
    .pipe(
      rename({
        extname: '.min.js',
      })
    )
    .pipe(dest('dist/js'))
    .pipe(browsersync.stream());
}

function images() {
  return src('src/img/**/*')
    .pipe(
      gulpif(
        !isDev,
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ])
      )
    )
    .pipe(dest('dist/img'))
    .pipe(browsersync.stream());
}

function fonts() {
  return src('src/fonts/*.ttf')
    .pipe(ttf2woff())
    .pipe(dest('dist/fonts'))
    .pipe(src('src/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('dist/fonts'))
    .pipe(src(['src/fonts/*.woff', 'src/fonts/*.woff2']))
    .pipe(dest('dist/fonts'));
}

function copyFiles() {
  return src('src/assets/**/*', { base: 'src' })
    .pipe(dest('dist'))
    .pipe(browsersync.stream());
}

exports.clean = clean;
exports.browserSync = browserSync;
exports.watcher = watcher;
exports.html = html;
exports.styles = styles;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.copyFiles = copyFiles;

function develop(ready) {
  isDev = true;
  ready();
}

const base = parallel(
  html,
  styles,
  libsstyles,
  js,
  libsjs,
  images,
  fonts,
  copyFiles,
  browserSync,
  watcher
);

exports.default = series(develop, clean, base);

exports.build = series(clean, base);
