module.exports = {
  outputSchema: {
    properties: {
      test: { type: 'string' }
    }
  },
  model: (params) => {
    //input.params
    //input.renderView

    return {
      'test' : 'here is a value returned from the model'
    }
  }
};
