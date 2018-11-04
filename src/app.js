//

// import "./stylesheets/app.css";
// import "./stylesheets/main.css";
// import { BrowserWindow } from "electron";


import "./lib/context_menu.js";
import _ from "lodash";
import Split from 'split.js'
import { remote } from "electron";
import { shell } from 'electron'
import { ipcRenderer } from "electron";
import { q, qs, empty, create, remove, span, p, div, enclitic } from './lib/utils'
import { twoPages, parseTitle, parseBook } from './lib/book'
// import { nav } from './lib/nav'
import { openODS, openDir } from './lib/getfiles'

const Mousetrap = require('mousetrap')
let fse = require('fs-extra')
const log = console.log
const Store = require('electron-store')
const store = new Store()
// const elasticlunr = require('elasticlunr')

// const Mousetrap = require('mousetrap')
// const axios = require('axios')
const path = require('path')

const clipboard = require('electron-clipboard-extended')
const {dialog} = require('electron').remote

// const isDev = require('electron-is-dev')
// const isDev = false
const isDev = true
const app = remote.app;
const apath = app.getAppPath()
let upath = app.getPath("userData")
// const watch = require('node-watch')

const PouchDB = require('pouchdb')
let libPath = path.resolve(upath, 'pouch', 'lib')
let pouch = new PouchDB(libPath)

ipcRenderer.on('save-state', function (event) {
  store.set('navpath', window.navpath)
  ipcRenderer.send('state-saved', window.navpath)
})

ipcRenderer.on('home', function (event) {
  navigate({section: 'lib'})
})

ipcRenderer.on('section', function (event, name) {
  log('SECTION NAME', name)
  navigate({section: name})
})

ipcRenderer.on('parseDir', function (event, name) {
  log('PARSE DIR', name)
  // dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'book', extensions: ['ods'] }]}, showBook)
  dialog.showOpenDialog({properties: ['openDirectory'] }, getFNS)
})

// let hstates =   store.get('hstates') || []
// let hstate = store.get('hstate') || -1
let hstates = []
let hstate =  -1
// let hstakey = {}

// log('HSTATE=>', hstate)
// log('HSTATES=>', hstates)
// let position = hstates[hstate] || {section: 'lib'}
// log('HSTATES=>POS', position)

window.split = twoPages()
// window.split.setSizes([50,50])

pouch.get('_local/current').then(function (current) {
  log('CURRENT:', current)
  if (current.section == 'lib') navigate({section: 'lib'})
  else getDir(current)
}).catch(function (err) {
  // log('CURERR', err)
  pouch.put({ _id: '_local/current', section: 'lib'}).then(function() {
    navigate({section: 'lib'})
  })
})

// let navpath = store.get('navpath') || {section: 'lib'}
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

function parseLib() {
  window.split.setSizes([100,0])
  let lib = store.get('lib') || []
  let infos = _.values(lib)
  // log('LIB INFOS', infos)

  let osource = q('#source')
  empty(osource)
  let oul = create('ul')
  osource.appendChild(oul)

  if (!infos.length) oul.textContent = 'no book in lib'
  infos.forEach(info => {
    let ostr = create('li', 'libauth')
    ostr.bkey = info.bkey
    oul.appendChild(ostr)
    let author = span(info.book.author)
    let title = span(info.book.title)
    author.classList.add('lib-auth')
    title.classList.add('lib-title')
    ostr.appendChild(author)
    ostr.appendChild(title)
  })
  oul.addEventListener('click', goBook, false)
}

function goBook(ev) {
  if (ev.target.parentNode.nodeName != 'LI') return
  let bkey = ev.target.parentNode.bkey
  navigate({section: 'title', bkey: bkey})
}

export function navigate(navpath) {
  let osource = q('#source')
  let otrns = q('#trns')
  empty(osource)
  empty(otrns)
  let ohleft = q('.hleft')
  let ohright = q('.hright')
  remove(ohleft)
  remove(ohright)

  let sec = navpath.section
  if (sec == 'lib') parseLib()
  else if (sec == 'title') parseTitle(navpath)
  else if (sec == 'book') parseBook(navpath)
  else showSection(sec)

  // let hkey = JSON.stringify(navpath)
  // // log('HKEY', hkey)
  // if (!hstakey[hkey]) {
  //   hstates.push(navpath)
  //   hstate = hstates.length-1
  //   hstakey[hkey] = true
  //   // log('ADD-SEC', navpath.section)
  // }

  store.set('navpath', navpath)
  // log('STORE-navpath', navpath)
  log('Navigate:', navpath)
  window.navpath = navpath
}

Mousetrap.bind(['alt+left', 'alt+right'], function(ev) {
  // log('EV', ev.which, hstate, hstate - 1 > -1, hstates[hstate])
  // if (ev.which == 37 && hstate - 1 > -1) log('LEFT', hstate, hstates[hstate-1])
  // if (ev.which == 39 && hstate + 1 < hstates.length) log('RIGHT', hstate, hstates[hstate+1])
  if (ev.which == 37 && hstate - 1 > -1) hstate--
  if (ev.which == 39 && hstate + 1 < hstates.length) hstate++
  // navpath = hstates[hstate]
  // log('_arrow_navpath_', navpath)
  // store.set('hstate', hstate)
  navigate(navpath)
})

function showSection(name) {
  window.split.setSizes([100,0])
  let osource = q('#source')
  let secpath = path.resolve(apath, 'src/sections', [name, 'html'].join('.'))
  const section = fse.readFileSync(secpath)
  osource.innerHTML = section
}

// let lunr = elasticlunr(function () {
//   this.addField('nic')
//   this.addField('lang')
//   this.addField('fpath')
//   this.addField('text')
//   this.setRef('id')
// })


// унести в getFile, и грязно пока
function getFNS(fns) {
  if (!fns) return
  let bpath = fns[0]
  // log('Bpath:', bpath)
  getDir(bpath)
}

function getDir(bpath, navpath) {
  openDir(bpath, (book) => {
    if (!book) return
    // log('BKEY', book.texts)
    let lib = store.get('lib') || {}
    // lib = {}
    lib[book.bkey] = book.info
    store.set('lib', lib)

    store.set(book.bkey, book.texts)
    // startWatcher(book.bpath)

    pushTexts(book.texts)
    // pushKuku()

    // if (navpath) navigate(navpath)
    // else navigate({section: 'lib'})
  })
}


function pushTexts(newdocs) {
  // log('PUSH-NEW-TEXTS', newdocs)

  pouch.allDocs({include_docs: true})
    .then(function(res) {
      let docs = res.rows.map(row=>{ return row.doc})
      let cleandocs = []
      let hdoc = {}
      docs.forEach(doc=> { hdoc[doc._id] = doc })
      newdocs.forEach(newdoc=> {
        let doc = hdoc[newdoc._id]
        if (doc) {
          if (newdoc.text == doc.text) return
          else doc.text = newdoc.text, cleandocs.push(doc)
        } else {
          cleandocs.push(newdoc)
        }
      })

      pouch.bulkDocs(cleandocs).then(function (result) {
        navigate({section: 'lib'})
      })
    }).catch(function (err) {
      console.log('ERR GET DBs', err)
    })
}



function setSearch_(bkey, texts) {
  texts.forEach(text => {
    if (!text.author) return
    let id = [bkey, text.fpath].join('/')
    let panee = { id: id, lang: text.lang, nic: text.nic, fpath: text.fpath, text: _.flatten(text.rows)[0] }
    // lunr.addDoc(panee)
  })
}

const historyMode_ = event => {
  const checkArrow = element => {
    // if (!element.classList.contains("arrow")) return
    if (element.id === "new-version") {
      // log('NEW VERS CLICKED')
    }
    if (element.id === "arrow-left") {
      if (hstate - 1 > -1) hstate--
      // showText(hstates[hstate])
    } else if (element.id === "arrow-right") {
      if (hstate + 1 < hstates.length) hstate++
      // showText(hstates[hstate])
    }
  };
  checkArrow(event.target);
}

// document.addEventListener("click", historyMode, false)

// не работает - почему?
// function startWatcher(bpath) {
//   watch(bpath, { recursive: true }, function(evt, name) {
//     log('%s changed.', name);
//     // navigate(navpath)
//     navigate({section: 'lib'})
//   })
// }
