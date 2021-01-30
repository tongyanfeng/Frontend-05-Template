var Genertor = require('yeoman-generator')

module.exports = class extends Genertor {
  constructor(args, opts) {
    super(args, opts)
    // this.option('bable')
  }

  iniPackage() {
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0'
      },
      dependencies: {
        react: '^16.2.0'
      }
    }
    this.fs.entendJSON(this.destinationPath('package.json', pkgJson))
    this.npmInstall()
  }
  // 会顺次执行 class 里面的方法
  async strp1() {
    this.fs.copyTpl(
      this.templatePath('t.html'),
      this.destinationPath("public/index.html"),
      {title: 'Templating with Yeoman'}
    )


  //   const answers = await this.prompt([
  //     {
  //       type: "input",
  //       name: "name",
  //       message: "you project name",
  //       default: this.appname
  //     },
  //     {
  //       type: "confirm",
  //       name: "cool",
  //       message: "would you like to enable the cool feature?"
  //     }
  //   ])
  //   this.log("app name", answers.name)
  //   this.log("ool feature", answers.cool)
  }


  // method2() {
  //   this.log("method 2")
  // }
}