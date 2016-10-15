var fs = require('fs');
var mustache = require('mustache');
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

function getModel(input, viewPath){
  var blankModel = input => input;;
  try {
    var model = require(viewPath);
    if(typeof model !== 'function'){
      return blankModel;
    } else {
      return model;
    }
  } catch(err) {
    return blankModel
  }
}


function syncModel(template, model, input, html, cb){
  var templateInput = model ? model(input) : input;
  templateInput._str = input._str;

  try {
    return mustache.render(html, templateInput);
  } catch(err) {
    throw new Error(err, ` error rendering syncModel for ${template}`);
  }
}

function asyncModel(template, model, input, html, cb){
  model(input, function(err, d){
    if(err){
      cb(err);
    }

    d._str = input._str;

    cb(null, mustache.render(html, d));
  });
}

function getView(template, input, cb) {
  var viewPath = PATH_TO_TEMPLATES + template;
  var html = getTemplate(template, viewPath);
  var model = getModel(input, viewPath);

  //sync model
  if(model.length === 1){
    return syncModel(template, model, input, html, cb);
  //async model
  } else if(model.length === 2){
    asyncModel(template, model, input, html, cb);
  }
};

module.exports = getView;