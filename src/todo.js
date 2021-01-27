const uuid = require('uuid');

class Todo {
  constructor({ text, when }) {
    this.text = text;
    this.when = when;

    this.status = '';
    this.id = uuid.v4;
  }
  // regra de negócio
  isValid() {
    //0 || "" || false
    //(!! => in JS convert aumatic for boolean)
    return !!this.text && !isNaN(this.when.valueOf());
  }
}
module.exports = Todo;
