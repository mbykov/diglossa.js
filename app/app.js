/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: navigate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigate", function() { return navigate; });
/* harmony import */ var _lib_context_menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/context_menu.js */ "./src/lib/context_menu.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! split.js */ "split.js");
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(split_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _lib_book__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/book */ "./src/lib/book.js");
/* harmony import */ var _lib_getfiles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/getfiles */ "./src/lib/getfiles.js");
//
// import "./stylesheets/app.css";
// import "./stylesheets/main.css";
// import { BrowserWindow } from "electron";







 // import { nav } from './lib/nav'



const Mousetrap = __webpack_require__(/*! mousetrap */ "mousetrap");

let fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const log = console.log;

const Store = __webpack_require__(/*! electron-store */ "electron-store");

const store = new Store(); // const elasticlunr = require('elasticlunr')
// const Mousetrap = require('mousetrap')
// const axios = require('axios')

const path = __webpack_require__(/*! path */ "path");

const clipboard = __webpack_require__(/*! electron-clipboard-extended */ "electron-clipboard-extended");

const {
  dialog
} = __webpack_require__(/*! electron */ "electron").remote; // const isDev = require('electron-is-dev')
// const isDev = false


const isDev = true;
const app = electron__WEBPACK_IMPORTED_MODULE_3__["remote"].app;
const apath = app.getAppPath();
let upath = app.getPath("userData"); // const watch = require('node-watch')

const PouchDB = __webpack_require__(/*! pouchdb */ "pouchdb");

let libPath = path.resolve(upath, 'library');
let pouch = new PouchDB(libPath);
electron__WEBPACK_IMPORTED_MODULE_3__["ipcRenderer"].on('save-state', function (event) {
  store.set('navpath', window.navpath);
  electron__WEBPACK_IMPORTED_MODULE_3__["ipcRenderer"].send('state-saved', window.navpath);
});
electron__WEBPACK_IMPORTED_MODULE_3__["ipcRenderer"].on('home', function (event) {
  navigate({
    section: 'lib'
  });
});
electron__WEBPACK_IMPORTED_MODULE_3__["ipcRenderer"].on('section', function (event, name) {
  log('SECTION NAME', name);
  navigate({
    section: name
  });
});
electron__WEBPACK_IMPORTED_MODULE_3__["ipcRenderer"].on('parseDir', function (event, name) {
  log('PARSE DIR', name); // dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'book', extensions: ['ods'] }]}, showBook)

  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, getFNS);
}); // let hstates =   store.get('hstates') || []
// let hstate = store.get('hstate') || -1

let hstates = [];
let hstate = -1; // let hstakey = {}
// log('HSTATE=>', hstate)
// log('HSTATES=>', hstates)
// let position = hstates[hstate] || {section: 'lib'}
// log('HSTATES=>POS', position)

window.split = Object(_lib_book__WEBPACK_IMPORTED_MODULE_5__["twoPages"])(); // window.split.setSizes([50,50])

pouch.get('_local/current').then(function (current) {
  log('CURRENT:', current);
  if (current.section == 'lib') navigate({
    section: 'lib'
  });else getDir(current);
}).catch(function (err) {
  // log('CURERR', err)
  pouch.put({
    _id: '_local/current',
    section: 'lib'
  }).then(function () {
    navigate({
      section: 'lib'
    });
  });
}); // let navpath = store.get('navpath') || {section: 'lib'}
// log('LOAD-navpath', navpath)
// if (navpath.section == 'lib') navigate({section: 'lib'})
// else {
//   let lib = store.get('lib') || []
//   // log('npath=>', navpath)
//   // log('lib=>', lib)
//   let bpath = lib[navpath.bkey].bpath
//   // log('bpath=>', bpath)
//   getDir(bpath, navpath)
// }
// // navigate({section: 'lib'})

function getLib() {
  let options = {
    include_docs: true,
    startkey: 'info',
    endkey: 'info\ufff0'
  };
  pouch.allDocs(options).then(function (result) {
    log('GETLIB', result);
  }).catch(function (err) {
    log('getLib', err);
  });
}

function parseLib() {
  window.split.setSizes([100, 0]);
  let lib = store.get('lib') || [];

  let infos = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.values(lib); // log('LIB INFOS', infos)


  let osource = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#source');
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["empty"])(osource);
  let oul = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["create"])('ul');
  osource.appendChild(oul);
  if (!infos.length) oul.textContent = 'no book in lib';
  infos.forEach(info => {
    let ostr = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["create"])('li', 'libauth');
    ostr.bkey = info.bkey;
    oul.appendChild(ostr);
    let author = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["span"])(info.book.author);
    let title = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["span"])(info.book.title);
    author.classList.add('lib-auth');
    title.classList.add('lib-title');
    ostr.appendChild(author);
    ostr.appendChild(title);
  });
  oul.addEventListener('click', goBook, false);
}

function goBook(ev) {
  if (ev.target.parentNode.nodeName != 'LI') return;
  let bkey = ev.target.parentNode.bkey;
  navigate({
    section: 'title',
    bkey: bkey
  });
}

function navigate(navpath) {
  let osource = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#source');
  let otrns = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#trns');
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["empty"])(osource);
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["empty"])(otrns);
  let ohleft = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('.hleft');
  let ohright = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('.hright');
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["remove"])(ohleft);
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["remove"])(ohright);
  let sec = navpath.section; // if (sec == 'lib') parseLib()

  if (sec == 'lib') getLib();else if (sec == 'title') Object(_lib_book__WEBPACK_IMPORTED_MODULE_5__["parseTitle"])(navpath);else if (sec == 'book') Object(_lib_book__WEBPACK_IMPORTED_MODULE_5__["parseBook"])(navpath);else showSection(sec); // let hkey = JSON.stringify(navpath)
  // // log('HKEY', hkey)
  // if (!hstakey[hkey]) {
  //   hstates.push(navpath)
  //   hstate = hstates.length-1
  //   hstakey[hkey] = true
  //   // log('ADD-SEC', navpath.section)
  // }

  store.set('navpath', navpath); // log('STORE-navpath', navpath)

  log('Navigate:', navpath);
  window.navpath = navpath;
}
Mousetrap.bind(['alt+left', 'alt+right'], function (ev) {
  // log('EV', ev.which, hstate, hstate - 1 > -1, hstates[hstate])
  // if (ev.which == 37 && hstate - 1 > -1) log('LEFT', hstate, hstates[hstate-1])
  // if (ev.which == 39 && hstate + 1 < hstates.length) log('RIGHT', hstate, hstates[hstate+1])
  if (ev.which == 37 && hstate - 1 > -1) hstate--;
  if (ev.which == 39 && hstate + 1 < hstates.length) hstate++;
  let navpath = hstates[hstate]; // log('_arrow_navpath_', navpath)
  // store.set('hstate', hstate)

  navigate(navpath);
});

function showSection(name) {
  window.split.setSizes([100, 0]);
  let osource = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#source');
  let secpath = path.resolve(apath, 'src/sections', [name, 'html'].join('.'));
  const section = fse.readFileSync(secpath);
  osource.innerHTML = section;
} // let lunr = elasticlunr(function () {
//   this.addField('nic')
//   this.addField('lang')
//   this.addField('fpath')
//   this.addField('text')
//   this.setRef('id')
// })
// унести в getFile, и грязно пока


function getFNS(fns) {
  if (!fns) return;
  let bpath = fns[0]; // log('Bpath:', bpath)

  getDir(bpath);
}

function getDir(bpath, navpath) {
  Object(_lib_getfiles__WEBPACK_IMPORTED_MODULE_6__["openDir"])(bpath, book => {
    if (!book) return; // // log('BKEY', book.texts)
    // let lib = store.get('lib') || {}
    // // lib = {}
    // lib[book.bkey] = book.info
    // store.set('lib', lib)
    // store.set(book.bkey, book.texts)
    // startWatcher(book.bpath)

    log('INFO::', book.info); // pushTexts(book.texts)
    // pushInfo(book.info)

    Promise.all([pushInfo(book.info), pushTexts(book.texts)]).then(function (res) {
      // log('ALL RES', res)
      navigate({
        section: 'lib'
      });
    }).catch(function (err) {
      log('ALL RES ERR', err);
    }); // if (navpath) navigate(navpath)
    // else navigate({section: 'lib'})
  });
}

function pushInfo(ndoc) {
  // log('NDOCinfo', ndoc)
  return pouch.get(ndoc._id).catch(function (err) {
    if (err.name === 'not_found') return;else throw err;
  }).then(function (doc) {
    if (doc) {
      let testdoc = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.clone(doc);

      delete testdoc._rev;
      if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEqual(ndoc, testdoc)) return; // if (JSON.stringify(ndoc) == JSON.stringify(testdoc)) return
      else {
          ndoc._rev = doc._rev; // log('NDOC-rev', ndoc)

          return pouch.put(ndoc);
        }
    }
  });
}

function pushTexts(newdocs) {
  // log('PUSH-NEW-TEXTS', newdocs)
  return pouch.allDocs({
    include_docs: true
  }).then(function (res) {
    let docs = res.rows.map(row => {
      return row.doc;
    });
    let cleandocs = [];
    let hdoc = {};
    docs.forEach(doc => {
      hdoc[doc._id] = doc;
    });
    newdocs.forEach(newdoc => {
      let doc = hdoc[newdoc._id];

      if (doc) {
        if (newdoc.text == doc.text) return;else doc.text = newdoc.text, cleandocs.push(doc);
      } else {
        cleandocs.push(newdoc);
      }
    });
    log('CLD', cleandocs);
    return pouch.bulkDocs(cleandocs);
  });
}

function setSearch_(bkey, texts) {
  texts.forEach(text => {
    if (!text.author) return;
    let id = [bkey, text.fpath].join('/');
    let panee = {
      id: id,
      lang: text.lang,
      nic: text.nic,
      fpath: text.fpath,
      text: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.flatten(text.rows)[0] // lunr.addDoc(panee)

    };
  });
}

const historyMode_ = event => {
  const checkArrow = element => {
    // if (!element.classList.contains("arrow")) return
    if (element.id === "new-version") {// log('NEW VERS CLICKED')
    }

    if (element.id === "arrow-left") {
      if (hstate - 1 > -1) hstate--; // showText(hstates[hstate])
    } else if (element.id === "arrow-right") {
      if (hstate + 1 < hstates.length) hstate++; // showText(hstates[hstate])
    }
  };

  checkArrow(event.target);
}; // document.addEventListener("click", historyMode, false)
// не работает - почему?
// function startWatcher(bpath) {
//   watch(bpath, { recursive: true }, function(evt, name) {
//     log('%s changed.', name);
//     // navigate(navpath)
//     navigate({section: 'lib'})
//   })
// }

/***/ }),

/***/ "./src/lib/book.js":
/*!*************************!*\
  !*** ./src/lib/book.js ***!
  \*************************/
/*! exports provided: twoPages, parseTitle, parseBook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "twoPages", function() { return twoPages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTitle", function() { return parseTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBook", function() { return parseBook; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! split.js */ "split.js");
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(split_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tree */ "./src/lib/tree.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app */ "./src/app.js");






const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const path = __webpack_require__(/*! path */ "path");

const log = console.log;

const Store = __webpack_require__(/*! electron-store */ "electron-store");

const store = new Store(); // const Apstore = require('./apstore')
// const store = new Apstore()
// const elasticlunr = require('elasticlunr');

const clipboard = __webpack_require__(/*! electron-clipboard-extended */ "electron-clipboard-extended");

function twoPages() {
  var sizes = store.get('split-sizes');
  if (sizes) sizes = JSON.parse(sizes);else sizes = [50, 50];
  let split = split_js__WEBPACK_IMPORTED_MODULE_1___default()(['#source', '#trns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {// reSetBook()
    }
  });
  let obook = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#book');
  obook.addEventListener("wheel", scrollPanes, false);
  document.addEventListener("keydown", keyScroll, false);
  return split;
}

function scrollPanes(ev) {
  if (ev.shiftKey == true) return;
  let delta = ev.deltaY > 0 ? 24 : -24;
  let source = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let trns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  source.scrollTop += delta;
  trns.scrollTop = source.scrollTop; // let start = qs('#source > p').length
  // if (!start) return

  if (window.navpath.section != 'book') return;
  let el = ev.target;
  let oapp = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#app');
  let book = oapp.book;

  if (source.scrollHeight - source.scrollTop - source.clientHeight <= 3.0) {
    let start = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#source > p').length;
    log('___START', start);
    setChunk(start, book);
  }
}

function keyScroll(ev) {
  let source = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let trns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  if (!source || !trns) return;
  trns.scrollTop = source.scrollTop;

  if (ev.keyCode == 38) {
    source.scrollTop = source.scrollTop - 24;
  } else if (ev.keyCode == 40) {
    source.scrollTop = source.scrollTop + 24;
  } else if (ev.keyCode == 33) {
    let height = source.clientHeight;
    source.scrollTop = source.scrollTop - height + 60;
  } else if (ev.keyCode == 34) {
    let height = source.clientHeight;
    source.scrollTop = source.scrollTop + height - 60;
  }

  trns.scrollTop = source.scrollTop; // let start = qs('#source > p').length
  // if (!start) return

  if (window.navpath.section != 'book') return;
  let book = window.book;

  if (source.scrollHeight - source.scrollTop - source.clientHeight <= 3.0) {
    let start = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#source > p').length; // log('___KEY START', start)
    // ошибка при прокрутке всегда

    setChunk(start, book);
  }
}

function parseTitle(navpath) {
  // log('========= parse title =============')
  window.split.setSizes([50, 50]);
  let lib = store.get('lib') || [];
  let info = lib[navpath.bkey];
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  let obookTitle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])('');
  obookTitle.classList.add('bookTitle');
  osource.appendChild(obookTitle);
  let oauthor = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])(info.book.author, 'author');
  let otitle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])(info.book.title, 'title');
  obookTitle.appendChild(oauthor);
  obookTitle.appendChild(otitle); // problem if not all names in nics list ?

  let onics = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create"])('ul');

  for (let nic in info.nicnames) {
    let name = info.nicnames[nic];
    let onicli = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create"])('li');
    let ocheck = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create"])('input');
    ocheck.type = 'checkbox';
    ocheck.checked = true;
    let oname = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["span"])(name);
    oname.classList.add('check-name');
    onicli.appendChild(ocheck);
    onicli.appendChild(oname);
    onics.appendChild(onicli);
  }

  obookTitle.appendChild(onics);
  let obookCont = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])('');
  obookCont.classList.add('bookTitle');
  otrns.appendChild(obookCont);
  let otree = Object(_tree__WEBPACK_IMPORTED_MODULE_3__["default"])(info.tree, info.book.title);
  obookCont.appendChild(otree);
  let otbody = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#tree-body');
  otree.addEventListener('click', goBookEvent, false);
}

function goBookEvent(ev) {
  if (!ev.target.classList.contains('tree-node-text')) return;
  let navpath = window.navpath;
  let fpath = ev.target.getAttribute('fpath');
  navpath.fpath = fpath;
  navpath.section = 'book';
  Object(_app__WEBPACK_IMPORTED_MODULE_4__["navigate"])(navpath);
}

function parseBook(navpath) {
  // log('___parseBook_start')
  window.split.setSizes([50, 50]);
  window.navpath = navpath; // reload !
  // let obook = q('#source')

  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(osource);
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(otrns); // log('parse-BOOK-npath:', navpath)

  let lib = store.get('lib');
  let info = lib[navpath.bkey];
  let texts = store.get(info.bkey); // log('BOOK-LIB', lib)
  // log('INFO', info)
  // log('TEXTS', texts)

  if (!info) return;
  if (!texts) return;
  let start = 0;
  let fpath = navpath.fpath;
  let book = {};
  book.info = info;
  book.texts = texts;
  let nic = navpath.nic;
  setBookText(book, fpath, nic, start);
  osource.addEventListener("mouseover", copyToClipboard, false);
  otrns.addEventListener("wheel", cyclePar, false);
}

function setBookText(book, fpath, nic, start) {
  let author = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(book.texts.panes, auth => {
    return auth.author && auth.fpath == fpath;
  })[0];

  let trns = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(book.texts.panes, auth => {
    return !auth.author && auth.fpath == fpath;
  });

  book.author = author;
  book.trns = trns;
  let cnics = trns.map(auth => {
    return auth.nic;
  });
  book.cnics = cnics;
  if (!nic) nic = cnics[0];
  if (!cnics.includes(nic)) nic = cnics[0];
  window.navpath.nic = nic;
  store.set('navpath', window.navpath); // log('BEFORE CHUNK nic', nic)

  window.book = book;
  setChunk(start);
  createRightHeader();
  createLeftHeader();
}

function setChunk(start) {
  let limit = 20;
  let book = window.book;
  let author = book.author;
  let trns = book.trns;
  if (!author || !author.rows) return;
  let authrows = author.rows.slice(start, start + limit);
  let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)';
  let rePunct = new RegExp(punct, 'g');
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  let nic = window.navpath.nic;
  authrows.forEach((astr, idx) => {
    let oleft = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["p"])();
    let html = astr.replace(rePunct, " <span class=\"active\">$1</span>");
    oleft.innerHTML = html;
    oleft.setAttribute('idx', start + idx);
    oleft.setAttribute('nic', author.nic);
    osource.appendChild(oleft);
    let orights = [];
    trns.forEach(auth => {
      let rstr = auth.rows[start + idx];
      let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["p"])(rstr);
      oright.setAttribute('idx', start + idx);
      oright.setAttribute('nic', auth.nic);
      otrns.appendChild(oright);
      if (auth.nic == nic) oright.setAttribute('active', true);
      orights.push(oright);
    });
    alignPars(oleft, orights);
  });
}

function copyToClipboard(ev) {
  if (ev.shiftKey == true) return;
  if (ev.ctrlKey == true) return;
  if (ev.target.nodeName != 'SPAN') return;
  let wf = ev.target.textContent;
  clipboard.writeText(wf);
}

function alignPars(oleft, orights) {
  orights.push(oleft);
  let heights = orights.map(par => {
    return par.scrollHeight;
  });

  let max = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.max(heights);

  orights.forEach(par => {
    par.style.height = max + 'px';
    if (!par.getAttribute('active')) par.classList.add('hidden');
  });
}

function cyclePar(ev) {
  if (ev.shiftKey != true) return;
  let idx = ev.target.getAttribute('idx');
  let selector = '#trns [idx="' + idx + '"]';
  let pars = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])(selector);

  let nics = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(pars, par => {
    return par.getAttribute('nic');
  });

  let curpar = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(pars, par => {
    return !par.classList.contains('hidden');
  });

  let nic = curpar.getAttribute('nic');
  let nicidx = nics.indexOf(nic);
  let nextnic = nicidx + 1 == nics.length ? nics[0] : nics[nicidx + 1];

  let next = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(pars, par => {
    return par.getAttribute('nic') == nextnic;
  });

  next.classList.remove('hidden');
  curpar.classList.add('hidden');
}

function createLeftHeader() {
  let book = window.book;
  let obook = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#book');
  let arect = obook.getBoundingClientRect();
  let ohleft = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])();
  obook.appendChild(ohleft);
  ohleft.classList.add('hleft');
  ohleft.style.left = arect.width * 0.15 + 'px';
  ohleft.addEventListener("click", clickLeftHeader, false);
  let info = book.info;
  let otree = Object(_tree__WEBPACK_IMPORTED_MODULE_3__["default"])(info.tree, info.book.title);
  ohleft.appendChild(otree);
  let navpath = window.navpath; // log('N', navpath)
  // log('T', otree)

  let otitle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#tree-title');
  otitle.textContent = navpath.fpath;
  let otbody = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#tree-body');
  otbody.classList.add('tree-collapse');
}

function clickLeftHeader(ev) {
  let fpath = ev.target.getAttribute('fpath'); // log('LEFT', ev.target)

  let otbody = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#tree-body');

  if (fpath) {
    if (ev.target.classList.contains('tree-node-empty')) return;
    let otitle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#tree-title');
    let navpath = window.navpath;
    navpath.fpath = fpath;
    otitle.textContent = navpath.fpath;
    otbody.classList.add('tree-collapse');
    Object(_app__WEBPACK_IMPORTED_MODULE_4__["navigate"])(navpath);
  } else {
    otbody.classList.remove('tree-collapse');
    let ohleft = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('.hleft');
    ohleft.classList.add('header');
  }
}

function createRightHeader() {
  let book = window.book;
  let obook = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#book');
  let arect = obook.getBoundingClientRect();
  let ohright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])();
  ohright.classList.add('hright');
  ohright.style.left = arect.width * 0.70 + 'px';
  let oul = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create"])('ul');
  oul.setAttribute('id', 'namelist');
  oul.addEventListener("click", clickRightHeader, false);
  ohright.appendChild(oul);
  obook.appendChild(ohright);
  createNameList(book);
  let navpath = window.navpath;
  let nic = navpath.nic;
  collapseRightHeader(nic);
}

function createNameList(book) {
  let nics = book.cnics;
  let nicnames = book.info.nicnames;
  let oul = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#namelist');
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(oul);
  oul.setAttribute('nics', nics);
  nics.forEach(nic => {
    let oli = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create"])('li');
    let name = nicnames[nic] ? nicnames[nic] : nic;
    oli.textContent = name;
    oli.setAttribute('nic', nic);
    oul.appendChild(oli);
  });
}

function clickRightHeader(ev) {
  if (ev.target.classList.contains('active')) {
    expandRightHeader();
  } else {
    let nic = ev.target.getAttribute('nic');
    let navpath = window.navpath;
    navpath.nic = nic;
    store.set('navpath', window.navpath);
    if (!nic) return;
    collapseRightHeader(nic);
    otherNic(nic);
  }
}

function otherNic(nic) {
  let pars = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#trns > p');
  pars.forEach((par, idx) => {
    if (par.getAttribute('nic') == nic) par.setAttribute('active', true), par.classList.remove('hidden');else par.classList.add('hidden');
  });
}

function collapseRightHeader(nic) {
  let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('.hright');
  oright.classList.remove('header');
  let olis = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#namelist > li');

  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(olis, oli => {
    if (oli.getAttribute('nic') == nic) oli.classList.add('active');else oli.classList.add('hidden');
  });
}

function expandRightHeader() {
  let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('.hright');
  oright.classList.add('header');
  let olis = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#namelist > li');

  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(olis, oli => {
    oli.classList.remove('hidden');
    oli.classList.remove('active');
  });
} // function reSetBook_(nic) {
//   let osource = q('#source')
//   let otrns = q('#trns')
//   let scrollTop = osource.scrollTop
//   setBookText(nic)
//   osource.scrollTop = scrollTop
//   otrns.scrollTop = scrollTop
// }

/***/ }),

/***/ "./src/lib/context_menu.js":
/*!*********************************!*\
  !*** ./src/lib/context_menu.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
// This gives you default context menu (cut, copy, paste)
// in all input fields and textareas across your app.

const Menu = electron__WEBPACK_IMPORTED_MODULE_0__["remote"].Menu;
const MenuItem = electron__WEBPACK_IMPORTED_MODULE_0__["remote"].MenuItem;

const isAnyTextSelected = () => {
  return window.getSelection().toString() !== "";
};

const cut = new MenuItem({
  label: "Cut",
  click: () => {
    document.execCommand("cut");
  }
});
const copy = new MenuItem({
  label: "Copy",
  click: () => {
    document.execCommand("copy");
  }
});
const paste = new MenuItem({
  label: "Paste",
  click: () => {
    document.execCommand("paste");
  }
});
const normalMenu = new Menu();
normalMenu.append(copy);
const textEditingMenu = new Menu();
textEditingMenu.append(cut);
textEditingMenu.append(copy);
textEditingMenu.append(paste);
document.addEventListener("contextmenu", event => {
  switch (event.target.nodeName) {
    case "TEXTAREA":
    case "INPUT":
      event.preventDefault();
      textEditingMenu.popup(electron__WEBPACK_IMPORTED_MODULE_0__["remote"].getCurrentWindow());
      break;

    default:
      if (isAnyTextSelected()) {
        event.preventDefault();
        normalMenu.popup(electron__WEBPACK_IMPORTED_MODULE_0__["remote"].getCurrentWindow());
      }

  }
}, false);

/***/ }),

/***/ "./src/lib/getfiles.js":
/*!*****************************!*\
  !*** ./src/lib/getfiles.js ***!
  \*****************************/
/*! exports provided: openODS, openDir */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openODS", function() { return openODS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openDir", function() { return openDir; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app */ "./src/app.js");




const md5 = __webpack_require__(/*! md5 */ "md5");

const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const path = __webpack_require__(/*! path */ "path");

const glob = __webpack_require__(/*! glob */ "glob");

const dirTree = __webpack_require__(/*! directory-tree */ "directory-tree");

const textract = __webpack_require__(/*! textract */ "textract");

const log = console.log; // const Store = require('electron-store')
// const store = new Store()
// const Apstore = require('./apstore')
// const apstore = new Apstore()
// const yuno = require('../../../yunodb')
// const storage = require('electron-json-storage')

function extractAllText(str) {
  const re = /"(.*?)"/g;
  const results = [];
  let current;

  while (current == re.exec(str)) {
    results.push(current.pop());
  }

  return results;
}

function openODS(fpath, cb) {
  if (fpath === undefined) return;

  try {
    textract.fromFileWithPath(fpath, {
      preserveLineBreaks: true,
      delimiter: '|'
    }, function (err, str) {
      // parseCSV(str)
      cb(true);
    });
  } catch (err) {
    if (err) log('ODS ERR', err);
    cb(false);
  }
}

function parseCSV(str) {
  let rows = str.split('\n');
  let size = rows[0].length;
  let book = {};
  rows.slice(0, 2).forEach((row, idx) => {
    if (row[0] != '#') return;
    if (/title/.test(row)) book.title = row.split(',')[0].split(':')[1].trim();else book.nics = row.split(',');
  });
  let nics = ['name_a', 'name_b', 'name_c'];
  if (!book.nics) book.nics = nics.slice(1);
  book.author = nics[0];
  let auths = [];
  nics.forEach((nic, idx) => {
    let auth = {
      idx: idx,
      nic: nic,
      rows: []
    };
    if (nic == book.author) auth.author = true;
    auths.push(auth);
  });
  rows.forEach((row, idx) => {
    if (row[0] == '#') return;
    if (row == ',,') return;
    let matches = extractAllText(row);
    matches.forEach(str => {
      let corr = str.split(',').join('COMMA');
      row = row.replace(str, corr);
    });
    let cols = row.split(',');
    cols.forEach((col, idy) => {
      col = col.split('COMMA').join(',');
      if (col == ',') return; // if (!auths[idy]) log('ERR', idy, row)

      auths[idy].rows.push(col);
    });
  }); // localStorage.setItem('auths', JSON.stringify(auths))
  // localStorage.setItem('book', JSON.stringify(book))
}

function openDir(bookpath, cb) {
  if (!bookpath) return;

  try {
    let book = parseDir(bookpath);
    cb(book);
  } catch (err) {
    if (err) log('DIR ERR', err);
    cb(false);
  }
}

function walk(fns, dname, dtree, tree) {
  let fpath = dtree.path.split(dname)[1];
  tree.text = fpath.split('/').slice(-1)[0];
  tree.fpath = fpath.replace(/^\//, '');
  if (!dtree.children) return;
  let hasFiles = false;
  dtree.children.forEach(child => {
    if (child.type == 'file') hasFiles = true;
  });
  tree.hasFiles = hasFiles;
  dtree.children.forEach((child, idx) => {
    fns.push(dtree.path);
    if (child.type != 'directory') return;
    if (!tree.children) tree.children = [];
    tree.children.push({});
    walk(fns, dname, child, tree.children[idx]);
  });
}

function parseDir(bookpath) {
  let bpath = path.resolve(__dirname, bookpath);
  let dname = bookpath.split('/').slice(-1)[0]; // + '/'

  const dtree = dirTree(bpath); // log('=DTREE', dtree)

  let fns = [];
  let tree = {};
  walk(fns, dname, dtree, tree); // log('=TREE', tree)

  fns = glob.sync('**/*', {
    cwd: bpath
  });
  let ipath = path.resolve(bpath, 'info.json'); // log('IPATH', ipath)

  let info = parseInfo(ipath); // log('_INFO_', info)

  fns = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(fns, fn => {
    return fn != ipath;
  }); // log('FNS', fns.length)

  info.fns = [];
  let texts = [];
  let coms = [];
  fns.forEach(fn => {
    let comment = false;
    let com = fn.split('-')[1];
    if (com && com == 'com') comment = true, fn = fn.replace('-com', '');
    let ext = path.extname(fn);
    if (!ext) return;
    if (ext == '.info') return;
    if (ext == '.json') return;
    let nic = ext.replace(/^\./, '');

    let auth = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(info.auths, auth => {
      return auth.ext == nic;
    });

    let txt = fse.readFileSync(path.resolve(bpath, fn), 'utf8');
    let clean = txt.trim().replace(/\n+/, '\n').replace(/\s+/, ' ');

    let rows = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(clean.split('\n'));

    let fparts = fn.split('/');
    let fname = fparts.pop();
    let fpath = fparts.join('/');
    let lang;
    if (auth) lang = auth.lang; // let id = md5([info.book.author, info.book.title, fpath].join(''))

    let id = fname;
    info.fns.push(id);
    let pane = {
      _id: id,
      lang: lang,
      nic: nic,
      fpath: fpath,
      text: clean // fname: fname,

    };
    if (auth && auth.author) pane.author = true; // , info.book.author = auth.name

    if (comment) coms.push(pane);else texts.push(pane); // if (auth.author) book.map = bookWFMap(clean, info.book.title, fn)
  });
  info.fns = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(info.fns);
  let bkey = md5([info.book.author, info.book.title].join('-'));
  let id = ['info', bkey].join('-');
  info._id = id;
  info.tree = tree; // info.bkey = bkey

  info.bpath = bpath;
  let book = {
    bkey: bkey,
    info: info,
    texts: texts,
    coms: coms // , bpath: bpath

  };
  log('BOOK FROM GET', book);
  return book;
}

function done(err) {
  if (err) throw err;
  console.log('successfully added documents');
}

function bookWFMap(text, title, fn) {
  let map = {};
  let pless = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9'"<>\[\]]/g, '');
  let rows = pless.split('\n');
  rows.forEach((row, idx) => {
    let wfs = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(row.split(' '));

    wfs.forEach(wf => {
      if (!map[wf]) map[wf] = [];
      map[wf].push({
        title: title,
        fn: fn,
        idx: idx
      });
    });
  });
  return map;
}

function parseInfo(ipath) {
  let info;

  try {
    info = fse.readJsonSync(ipath);
  } catch (err) {
    log('ERR INFO', err);
    throw new Error();
  }

  let nicnames = {};
  info.auths.forEach(auth => {
    if (auth.author) {
      info.book.author = auth.name;
      return;
    }

    nicnames[auth.ext] = auth.name;
  });
  info.nicnames = nicnames;
  return info;
}

/***/ }),

/***/ "./src/lib/tree.js":
/*!*************************!*\
  !*** ./src/lib/tree.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return tree; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
//

let log = console.log;
function tree(data, deftitle) {
  // log('TREEDATA', data)
  let otree = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tree');
  let otitle = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tree-title');
  otitle.id = 'tree-title';
  otitle.textContent = 'content';
  otree.appendChild(otitle);
  let otbody = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tree-body');
  otbody.id = 'tree-body';
  otree.appendChild(otbody);
  let children = data.children;

  if (!children) {
    let onode = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tree-text');
    let osign = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('span', 'tree-branch');
    osign.textContent = '▾';
    onode.appendChild(osign);
    let otext = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('span', 'tree-node-text');
    otext.textContent = deftitle;
    otext.setAttribute('fpath', '');
    onode.appendChild(otext);
    otbody.appendChild(onode);
    return otree;
  }

  children.forEach(node => {
    let onode = createNode(node);
    otbody.appendChild(onode);
  });
  return otree;
}

function createNode(node) {
  // log('NODE', node)
  let onode = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tree-text');
  let osign = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('span', 'tree-branch');
  osign.textContent = '▾';
  osign.addEventListener('click', toggleNode, false);
  let navclass = node.hasFiles ? 'tree-node-text' : 'tree-node-empty';
  let otext = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('span', navclass);
  otext.textContent = node.text;
  otext.setAttribute('fpath', node.fpath); // otext.addEventListener('click', goNode, false)

  if (node.children) onode.appendChild(osign);
  onode.appendChild(otext);

  if (node.children) {
    node.children.forEach(child => {
      let ochild = createNode(child);
      onode.appendChild(ochild);
    });
  } // let texts = qs('.tree-text')


  return onode;
}

function toggleNode(ev) {
  let parent = ev.target.parentNode;
  parent.classList.toggle('tree-collapse');
}

/***/ }),

/***/ "./src/lib/utils.js":
/*!**************************!*\
  !*** ./src/lib/utils.js ***!
  \**************************/
/*! exports provided: q, qs, create, recreateDiv, recreate, span, br, div, p, empty, remove, removeAll, findAncestor, placePopup, log, plog, enclitic, getStore, setStore, getStore_, setStore_ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "qs", function() { return qs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recreateDiv", function() { return recreateDiv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recreate", function() { return recreate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "span", function() { return span; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "br", function() { return br; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAll", function() { return removeAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findAncestor", function() { return findAncestor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "placePopup", function() { return placePopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plog", function() { return plog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enclitic", function() { return enclitic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStore", function() { return getStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStore", function() { return setStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStore_", function() { return getStore_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStore_", function() { return setStore_; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);


let util = __webpack_require__(/*! util */ "util");

function q(sel) {
  return document.querySelector(sel);
}
function qs(sel) {
  return document.querySelectorAll(sel);
}
function create(tag, style) {
  let el = document.createElement(tag);
  if (style) el.classList.add(style);
  if (style) el.id = style;
  return el;
}
function recreateDiv(sel) {
  let el = document.querySelector(sel);
  if (el) el.parentElement.removeChild(el);
  el = document.createElement('div');
  el.classList.add(sel);
  el.id = sel;
  return el;
}
function recreate(element) {
  var newElement = element.cloneNode(true);
  element.parentNode.replaceChild(newElement, element);
} // function cret (str) {
//   return document.createTextNode(str)
// }

function span(str) {
  var oSpan = document.createElement('span');
  oSpan.textContent = str;
  return oSpan;
}
function br() {
  let oBR = document.createElement('br');
  return oBR;
}
function div(str, style) {
  let el = document.createElement('div');
  el.textContent = str;
  if (style) el.classList.add(style);
  if (style) el.id = style;
  return el;
}
function p(str) {
  var oDiv = document.createElement('p');
  oDiv.textContent = str;
  return oDiv;
}
function empty(el) {
  if (!el) return;

  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}
function remove(el) {
  if (!el) return;
  el.parentElement.removeChild(el);
}
function removeAll(sel) {
  let els = document.querySelectorAll(sel);
  els.forEach(el => {
    el.parentElement.removeChild(el);
  });
} // function closeAll() {
//     words = null
//     // window.close()
//     ipcRenderer.send('sync', 'window-hide')
// }

function findAncestor(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls)) {
    return el;
  }
}
function placePopup(coords, el) {
  var top = [coords.top, 'px'].join('');
  var left = [coords.left, 'px'].join('');
  el.style.top = top;
  el.style.left = left;
}
function log() {
  console.log.apply(console, arguments);
}
function plog() {
  var vs = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.values(arguments);

  if (vs.length === 1) vs = vs[0]; // console.log(util.inspect(vs, {showHidden: false, depth: null}))

  console.log(util.inspect(vs, {
    showHidden: false,
    depth: 3
  }));
}
function enclitic(str) {
  let syms = str.split('');
  let stress = false;
  let clean = [];
  let stresses = [ac.oxia, ac.varia, ac.peris];
  syms.forEach(sym => {
    if (!stresses.includes(sym)) clean.push(sym);else if (!stress) clean.push(sym), stress = true;
  });
  return clean.join('');
}
function getStore(name) {
  let json, obj;
  return obj;
}
function setStore(name, obj) {
  let oapp = q('#app');
  q('#app').setAttribute();
}
function getStore_(name) {
  let json, obj;

  try {
    json = localStorage.getItem(name);
    obj = JSON.parse(json);
  } catch (err) {
    log('GET ERR', err);
  }

  return obj;
}
function setStore_(name, obj) {
  localStorage.setItem(name, JSON.stringify(obj));
}

/***/ }),

/***/ "directory-tree":
/*!*********************************!*\
  !*** external "directory-tree" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("directory-tree");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "electron-clipboard-extended":
/*!**********************************************!*\
  !*** external "electron-clipboard-extended" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-clipboard-extended");

/***/ }),

/***/ "electron-store":
/*!*********************************!*\
  !*** external "electron-store" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-store");

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),

/***/ "glob":
/*!***********************!*\
  !*** external "glob" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("glob");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "md5":
/*!**********************!*\
  !*** external "md5" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("md5");

/***/ }),

/***/ "mousetrap":
/*!****************************!*\
  !*** external "mousetrap" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mousetrap");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "pouchdb":
/*!**************************!*\
  !*** external "pouchdb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pouchdb");

/***/ }),

/***/ "split.js":
/*!***************************!*\
  !*** external "split.js" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("split.js");

/***/ }),

/***/ "textract":
/*!***************************!*\
  !*** external "textract" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("textract");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
//# sourceMappingURL=app.js.map