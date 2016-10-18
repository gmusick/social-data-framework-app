module.exports = {
  outputSchema: {
    properties: {
      test: { type: 'string' }
    }
  },
  model: (input, cb) => {
    //input.params
    //input.renderView
    
    return {
      'test' : 'value'
    }
  }
};
