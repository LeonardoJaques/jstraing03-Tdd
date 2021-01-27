const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const { createSandbox } = require('sinon');
const Todo = require('../src/todo');

describe('todo', () => {
  let sandbox;
  beforeEach(() => (sandbox = createSandbox()));
  afterEach(() => sandbox.restore());

  describe('#isValid', () => {
    it('should return invalid when creating an object without text', () => {
      //data of input
      const data = {
        text: '',
        when: new Date('2020-12-01'),
      };

      const todo = new Todo(data);
      const result = todo.isValid();
      expect(result).to.be.not.ok;
    });

    it('should return invalid when creating an object without using the "when" property invalid ', () => {
      //data of input
      const data = {
        text: 'hello world',
        when: new Date('20-12-01'),
      };

      const todo = new Todo(data);
      const result = todo.isValid();
      expect(result).to.be.not.ok;
    });
  });
  it('should have "id", "text", "when" and "status" properties after creating object', () => {
    const properties = {
      text: 'I must walk my dog',
      when: new Date('2020-12-10 12:00:00 GMT-0'),
    };

    const uuid = require('uuid');
    const fakeUUID = sandbox.fake.returns();
    sandbox.replace(uuid, 'v4', fakeUUID);

    const todo = new Todo(properties);
    const expectedItem = {
      text: properties.text,
      when: properties.when,
      status: '',
      id: fakeUUID,
    };

    const result = todo.isValid();

    expect(result).to.be.ok;
    expect(fakeUUID.id).to.be.ok;
    expect(todo).to.be.deep.equal(expectedItem);
  });
});
