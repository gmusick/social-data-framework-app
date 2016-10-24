module.exports = {
  outputSchema: {
    properties: {
      test: { type: 'string' }
    }
  },
  model: (input) => {
    return {
      'test': 'value'
    }
  }
};
