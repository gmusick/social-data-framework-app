var inputSchema = {};
var outputSchema = {};

module.exports = (input) => {
  return {
    inputSchema, 
    outputSchema,
    output: {
      'test' : 'here is a value returned from the model'
    }
  }
}
