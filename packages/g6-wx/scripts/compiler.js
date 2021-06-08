const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const injectEnvs = require('gulp-inject-envs');

const isProduction = process.env.NODE_ENV === 'production';
const dist = isProduction
  ? path.join(__dirname, '../es')
  : path.join(__dirname, '../demo/es');
const src = path.join(__dirname, '../src');
const extTypes = ['ts', 'json', 'wxml'];
const isRpx = process.argv.splice(2)[0] === '--rpx';
const env = { jsUnitRpx: isRpx };

gulp.task('ts', () =>
  gulp
    .src(`${src}/**/*.ts`)
    .pipe(babel())
    .pipe(injectEnvs(env))
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(gulp.dest(dist)),
);

gulp.task('json', () => gulp.src(`${src}/**/*.json`).pipe(gulp.dest(dist)));

gulp.task('wxml', () => gulp.src(`${src}/**/*.wxml`).pipe(gulp.dest(dist)));

gulp.task('wxss', () => gulp.src(`${src}/**/*.wxss`).pipe(gulp.dest(dist)));

const build = gulp.series(...extTypes);
build();

if (!isProduction) {
  extTypes.forEach((type) => {
    const watcher = gulp.watch(`${src}/**/*${type}`, gulp.series(type));
    watcher.on('change', (event) => {
      console.log(`File ${event} was change`);
    });
    watcher.on('add', (event) => {
      console.log(`File ${event} was add`);
    });
    watcher.on('unlink', (event) => {
      console.log(`File ${event} was remove`);
    });
  });
}
