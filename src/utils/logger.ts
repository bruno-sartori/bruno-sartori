import chalk, { Chalk } from 'chalk';

const isNode = typeof process === 'object' && `${process}` === '[object process]';

class Logger {
  private log(color: keyof Chalk, label: string, message: string|object) {
    if (process.env.REACT_APP_LOG) {
      if (typeof message === 'object') {
        // eslint-disable-next-line no-param-reassign
        message = JSON.stringify(message, null, 2);
      }

      if (isNode) {
        // eslint-disable-next-line no-console
        console.log(`[${(chalk[color] as Chalk)(label)}] ${message}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(
          `%c ${label} %c ${message}`,
          `background-color: ${color}; color: #FFFFFF`,
          `background-color: inherit; color: inherit`
        );
      }
    }
  };

  public info(label: string, message: string|object) {
    return this.log('blue', label, message);
  };

  public success(label: string, message: string | object) {
    return this.log('green', label, message);
  };

  public warn(label: string, message: string | object) {
    return this.log('yellow', label, message);
  };

  public error(label: string, message: string | object) {
    return this.log('red', label, message);
  };
}

export default new Logger();
