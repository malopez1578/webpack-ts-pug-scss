import { Game2 } from '../game2/index';
import './index.scss';

export class NewGame extends Game2 {
  msg: string;
  constructor(msg: string) {
    super();
    this.msg = msg;
    console.log('foooo');
    this.message();
  }
  async message() {
    return await console.log('fooo');
  }
}
