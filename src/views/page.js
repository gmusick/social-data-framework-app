module.exports = {
  outputSchema: {
    properties: {
      view: { type: 'string' },
    },
  },
  model: (input) => {
    return {
      view: input._str.component,
    };
  },
};
