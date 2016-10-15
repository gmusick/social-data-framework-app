var getView = require('./get-view');
var mustache = require('mustache');

var LANG_DEFAULT = 'en';

//TODO: make this into SchemaFunction
function setLangStrings(component, lang){
  var str = {};

  lang = lang || LANG_DEFAULT;

  try {
    str = require('../lang/' + component + '/' + lang);
  } catch (e){
    throw new Error(e, 'cannot find lang file for ' + component);
  }

  str._lang = lang;

  return str;
}

function renderView(component, input, lang) {
  input._str = setLangStrings(component, lang);

  //make renderView available to all sub views
  input.renderView = function(subComponent, subInput, cb){
    subInput.renderView = input.renderView;
    if(cb){
      getView(subComponent, subInput, cb);
    } else {
      return getView(subComponent, subInput);
    }
  }

  var renderedView = getView('system/_renderView', {
    'nav' : getView('nav', input),
    'view' : getView(component, input)
  });

  return renderedView;
}

module.exports = renderView;
