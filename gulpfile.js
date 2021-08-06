const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
// Create esbuild incremental workflow
const { createGulpEsbuild } = require("gulp-esbuild");
const gulpEsbuild = createGulpEsbuild({ incremental: true });

// Set up file paths
const paths = {
  html: {
    src: "./src/**/*.html",
    dest: "./dist",
  },
  scss: {
    src: "./src/scss/**/*.scss",
    dest: "./dist/css",
  },
  js: {
    src: "./src/js/*.js",
    dest: "./dist/js",
  },
  img: {
    src: "./src/images/**/*",
    dest: "./dist/images",
  },
  fonts: {
    src: "./src/fonts/**/*",
    dest: "./dist/fonts",
  },
};

/* Development
   ================================================== */

// Copy html files to dist
function htmlDevelopmentTask() {
  return src(paths.html.src).pipe(dest(paths.html.dest));
}

// Combine and add css file to dist (and update browser)
function cssDevelopmentTask() {
  return src(paths.scss.src)
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

// Combine and add js file to dist
function jsDevelopmentTask() {
  return src(paths.js.src)
    .pipe(
      gulpEsbuild({
        bundle: true,
      })
    )
    .pipe(dest(paths.js.dest));
}

// Copy image files to dist
function imgDevelopmentTask() {
  return src(paths.img.src).pipe(dest(paths.img.dest));
}

// Copy font files to dist
function fontDevelopmentTask() {
  return src(paths.fonts.src).pipe(dest(paths.fonts.dest));
}

// Start server and watch files for changes
function server() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      open: true,
      notify: false,
    },
  });

  watch(paths.html.src).on("change", series(htmlDevelopmentTask, browserSync.reload));
  watch(paths.scss.src, cssDevelopmentTask);
  watch(paths.js.src).on("change", series(jsDevelopmentTask, browserSync.reload));
}

/* Production
   ================================================== */

// Minify html and add source maps?
// Clean and minify css with CSS, and add sourcemap.
// Minify js and add source map?
// Minify images and svgs
// Anything with fonts?

exports.default = series(
  parallel(
    htmlDevelopmentTask,
    cssDevelopmentTask,
    jsDevelopmentTask,
    imgDevelopmentTask,
    fontDevelopmentTask
  ),
  server
);
