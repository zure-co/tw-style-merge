import chalk from 'chalk'
const log = console.log

export class Logger {
  private signature: string

  constructor() {
    this.signature = chalk.gray('[tw-style-merge]')
  }

  variableNotFound(name: string, property: string): void {
    const PATH_VAR = chalk.blue(`$[${property}].${name}`)
    const MESSAGE = 'variable not found!'

    log(this.signature, this.getStatus('WARNING'), PATH_VAR, MESSAGE)
  }

  finally() {
    log(
      chalk.gray.bold('\nTwStyleMerge'),
      chalk.gray(
        'has generated all the classes configured in tailwind.config.js!'
      )
    )
  }

  breakline() {
    log('')
  }

  private getStatus(status: 'WARNING' | 'SUCCESS' | 'ERROR') {
    const DOT = '•'
    switch (status) {
      case 'WARNING':
        return chalk.yellow('WARNING') + ` ${DOT}`
      case 'SUCCESS':
        return chalk.green('SUCCESS') + ` ${DOT}`
      case 'ERROR':
        return chalk.red('ERROR') + ` ${DOT}`
      default:
        return chalk.yellow('WARNING') + ` ${DOT}`
    }
  }
}
