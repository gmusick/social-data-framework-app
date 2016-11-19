var getView = require('./get-view');
var mustache = require('mustache');

var LANG_DEFAULT = 'en';

//TODO: make this into SchemaFunction

//TODO: Move this into get-view?  Why not just have langs asociate with views directly
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
  function renderView(subComponent, subInput, cb){
    if(cb){
      getView(subComponent, buildViewInput(subInput), cb);
    } else {
      return getView(subComponent, buildViewInput(subInput));
    }
  }

  function buildViewInput(inputValue) {
    return {
      renderView,
      params: inputValue,
    }
  }

  var renderedView = getView('system/renderView', buildViewInput({
    component,
    nav: getView('nav', buildViewInput(input)),
    view: getView(component, buildViewInput(input)),
  }));

  return renderedView;
}

module.exports = renderView;
