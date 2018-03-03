const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title: String,
  test: {type: String, default: 'dog'},
  completed: {type: Boolean, default: false}
});

todoSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    completed: this.completed
  };
};

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
