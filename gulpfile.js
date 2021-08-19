const { src, dest, series, parallel, watch } = require("gulp");
// SASS
const sass = require("gulp-sass")(require("sass"));
// Create esbuild incremental workflow
// const { createGulpEsbuild } = require("gulp-esbuild");
const gulpEsbuild = require("gulp-esbuild");
// const gulpEsbuild = createGulpEsbuild({ incremental: true, piping: true });
// Notifications and server
const browserSync = require("browser-sync").create();
const notify = require("gulp-notify");
// Production
const clean = require("gulp-clean");
const htmlmin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");

// Set up file paths
const paths = {
  html: {
    src: "./src/**/*.html",
    dest: "./public",
  },
  scss: {
    src: "./src/scss/**/*.scss",
    dest: "./public/css",
  },
  js: {
    root: "./src/js/*.js",
    src: "./src/js/**/*.js",
    dest: "./public/js",
  },
  img: {
    src: "./src/images/**/*",
    dest: "./public/images",
  },
  fonts: {
    src: "./src/fonts/**/*",
    dest: "./public/fonts",
  },
};

/* Development
   ================================================== */
// Copy html files to public
function htmlDevelopmentTask() {
  return src(paths.html.src).pipe(dest(paths.html.dest));
}

// Combine and add css file to public (and update browser)
function cssDevelopmentTask() {
  return src(paths.scss.src)
    .pipe(
      sass.sync().on(
        "error",
        notify.onError(function (error) {
          return {
            title: "SCSS ERR0R",
            message:
              "line " +
              error.line +
              " in " +
              error.file.replace(/^.*[/\\]/, "") +
              "\n" +
              error.message,
          };
        })
      )
    )
    .pipe(dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

// Combine and add js file to public
function jsDevelopmentTask() {
  return src(paths.js.root)
    .pipe(
      gulpEsbuild({
        bundle: true,
      }).on(
        "error",
        notify.onError(function (error) {
          return {
            title: "ESBUILD ERROR",
            message: error.message,
          };
        })
      )
    )
    .pipe(dest(paths.js.dest));
}

// Copy image files to public
function imgDevelopmentTask() {
  return src(paths.img.src).pipe(dest(paths.img.dest));
}

// Copy font files to public
function fontDevelopmentTask() {
  return src(paths.fonts.src).pipe(dest(paths.fonts.dest));
}

// Start server and watch files for changes
function server() {
  browserSync.init({
    server: {
      baseDir: "./public",
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

// Delete public folder
function cleanTask() {
  return src("./public", { allowEmpty: true, read: false }).pipe(clean());
}

// Copy html files to public
function htmlProductionTask() {
  return src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.html.dest));
}

// Combine and compile to CSS, and minify
function cssProductionTask() {
  return src(paths.scss.src)
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(dest(paths.scss.dest));
}

// Combine modules and minify code
function jsProductionTask() {
  return src(paths.js.root)
    .pipe(
      gulpEsbuild({
        bundle: true,
        minify: true,
      })
    )
    .pipe(dest(paths.js.dest));
}

// Copy image compress images and svgs
function imgProductionTask() {
  return src(paths.img.src)
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 60, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5, interlaced: null }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ],
        { verbose: true }
      )
    )
    .pipe(dest(paths.img.dest));
}

// Copy font files to public
function fontProductionTask() {
  return src(paths.fonts.src).pipe(dest(paths.fonts.dest));
}
/* Exports
/* ==================================================== */

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

exports.production = series(
  cleanTask,
  htmlProductionTask,
  cssProductionTask,
  jsProductionTask,
  fontProductionTask,
  imgProductionTask
);
