var Genertor = require('yeoman-generator')

module.exports = class extends Genertor {
  constructor(args, opts) {
    super(args, opts)
    // this.option('bable')
  }

  async iniPackage() {
    let answer = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "you project name",
        default: this.name
      }
    ])
    const pkgJson = {
      "name": answer.name,
      "version": "1.0.0",
      "description": "",
      "main": "generators/app/index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {
        eslint: '^3.15.0'
      },
      "dependencies": {
      }
    }
    this.fs.entendJSON(this.destinationPath('package.json', pkgJson))
    this.npmInstall(["vue"], {' save-dev': false})
    this.npmInstall(["webpack", "vue-loader", "vue-template-compiler", 'vue-style-loader', 'css-loader',
    'copy-webpack-plugin'], {' save-dev': true})
  }

  copyFiles() {
    this.fs.copyTpl(
      this.templatePath('HelloWord.vue'),
      this.destinationPath("src/HelloWord.vue")
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath("webpack.config.js")
    )
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath("src/main.js")
    )
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath("src/index.html"),
      {title: answer.name}
    )
  }














  // 会顺次执行 class 里面的方法
  // async strp1() {
  //   this.fs.copyTpl(
  //     this.templatePath('t.html'),
  //     this.destinationPath("public/index.html"),
  //     {title: 'Templating with Yeoman'}
  //   )


  // //   const answers = await this.prompt([
  // //     {
  // //       type: "input",
  // //       name: "name",
  // //       message: "you project name",
  // //       default: this.appname
  // //     },
  // //     {
  // //       type: "confirm",
  // //       name: "cool",
  // //       message: "would you like to enable the cool feature?"
  // //     }
  // //   ])
  // //   this.log("app name", answers.name)
  // //   this.log("ool feature", answers.cool)
  // }


  // method2() {
  //   this.log("method 2")
  // }
}