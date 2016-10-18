var fs = require('fs');
var mustache = require('mustache');
var SchemaFunction = require('run-function-with-signature');
var PATH_TO_TEMPLATES = __dirname + '/../views/';
var TEMPLATE_EXT = '.html';
var DEFAULT_LANG = 'en';

function getTemplate(template, viewPath){
  var templateFile = viewPath + TEMPLATE_EXT;
  var html;

  try {
    html = fs.readFileSync(templateFile).toString();
  } catch (err) {
    throw new Error(err, ' could not retrieve ' + template + ' view template');
  }

  return html;
}

function getModel(viewPath){
  function ensureSchemaProperties(schema, type, altSchema){
    if(type === 'output' && !schema){
      schema = altSchema;
    }

    var schemaWithProperties = schema && schema.properties ? schema : { properties: {} };
    schemaWithProperties.properties._str = { type: 'object' };
    
    return schemaWithProperties;
  }

  function validatedModel(model) {
    var validatedInputSchema = ensureSchemaProperties(model.inputSchema, 'input');

    return {
      model: (model.model === 'function') ? model.model : (input) => {
        return input;
      },
      inputSchema: validatedInputSchema,
      outputSchema: ensureSchemaProperties(model.outputSchema, 'output', validatedInputSchema)
    }
  };

  try {
    var model = require(viewPath);
    return validatedModel(model);
  } catch(err) {
    return validatedModel({});
  }
}

function syncModel(template, model, input, html){
  var schemaFunction = new SchemaFunction(`views/${template}.js`, { 
    func: model.model,
    input: input,
    inputSchema: model.inputSchema,
    outputSchema: model.outputSchema
  });
  
  var modelOutput = schemaFunction.run();
  modelOutput._str = input._str;

  try {
    return mustache.render(html, modelOutput);
  } catch(err) {
    throw new Error(err, ` error rendering syncModel for ${template}`);
  }
}

function asyncModel(template, model, input, html, cb){
  throw new Error('asyncModel is out of date');
  
  model(input, function(err, d){
    if(err){
      cb(err);
    }

    d._str = input._str;

    cb(null, mustache.render(html, d));
  });
}

function getView(template, input, cb) {
  var params = input.params;
  var viewPath = PATH_TO_TEMPLATES + template;
  var html = getTemplate(template, viewPath);
  var model = getModel(viewPath);

  //sync model
  if(model.model.length === 1){
    return syncModel(template, model, params, html);
  //async model
  } else if(model.model.length === 2){
    asyncModel(template, model, params, html, cb);
  }
};

//DOCUMENT
//getView(template, input, cb)

module.exports = getView;