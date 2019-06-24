const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const prefix = require("gulp-autoprefixer"); //bu dosya ile scss dosyaları css e donusturulur
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
 
function defaultTask(cb) {
    // place code for your default task here
    cb();
  }
  
  exports.default = defaultTask;

 
const reload = browserSync.reload;

gulp.task("browser-sync", function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "/"
    }
  });

   
  gulp.watch("./src/assets/scss/helper/**/*.scss", ["css"]); //ın altındaski scsss dosyalarını al ve css e gonder
  gulp.watch("./src/assets/scss/config/**/*.scss", ["css"]);
 
  gulp.watch("./src/assets/scss/**/*.scss", ["css"]);

  
});


gulp.task("css", () => {
    return gulp
      .src("./src/assets/scss/main.scss")
      
      .pipe(plumber([{ errorHandler: false }]))
      .pipe(sass())
      .pipe(prefix())
      .pipe(gulp.dest("./src/assets/css")) ///css olarak kayıt olunan son yer main.css
      .pipe(browserSync.stream());
  });
  

gulp.task("html", () => {
    return gulp
      .src("./views/*.pug")//html kodlarının pug a döüştürlmesinde  kullanılır
      .pipe(pug())
      .pipe(gulp.dest("./"))
      .on("end", reload);
  });
  

gulp.task("default", ["browser-sync", "html", "css"]);
