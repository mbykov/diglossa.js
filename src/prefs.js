'use strict'

import { log, q, qs, create, empty, cleanDname } from './lib/utils'
import _ from 'lodash'
import { router, render } from './app'
const mouse = require('mousetrap')
const { app } = require('electron').remote
import { remote } from "electron"
let dgl = remote.getGlobal('dgl')
const { dialog } = require('electron').remote
import { book } from './book'
import { progress } from './lib/progress'
import { message } from './lib/message'

const Store = require('electron-store')
const prefstore = new Store({name: 'prefs'})
const appstore = new Store({name: 'appstore'})

let homepath = app.getPath('home');
let exportpath = appstore.get('exportpath')
if (!exportpath) {
  exportpath = homepath
  appstore.set('exportpath', exportpath)
}

export const preference = {
  async ready() {
    if (!checkBooks()) return
    render('prefs')
    this.tbody = q('#prefs-table .tbody')
    const odata = q('#pref-package-data')

    let origin = dgl.origin(book.sbooks)
    let oauthor = odata.querySelector('#pref-book-author')
    oauthor.textContent = origin.descr.author
    let otitle = odata.querySelector('#pref-book-title')
    otitle.textContent = origin.descr.title
    this.origin = origin

    let prefs = prefstore.get(origin.bid) || this.initPrefs(origin)
    this.prefs = prefs

    const oexportpath = q('#exportpath')
    oexportpath.textContent = exportpath

    for (let name in prefs) {
      if (name == 'exportpath') continue
      if (name == 'bpath') continue
      if (name == 'files') {
        let files = prefs.files
        for (let fn in files) {
          // let value = files[fn]
          // this.addRow('file', fn, value)
        }
      } else {
        this.addRow('str', name, prefs[name])
      }
    }
    this.stripes()
  },

  initPrefs(origin) {
    let defaults = {
      name: '',
      version: '1.0.0',
      'editor': 'John Doe',
      email: 'john.doe@example.com',
      homepage: 'http://example.com',
      license: 'CC BY-SA',
      keywords: 'diglossa, bilingua, dgl',
      // 'exportpath': exportpath,
      // files: {
      //   css: 'path-to-file',
      //   images: 'path-to-file',
      //   info: 'path-to-file',
      //   annotation: 'path-to-file',
      //   license: 'path-to-file',
      //   acknowledgements: 'path-to-file'
      // },
    }
    defaults.name = [origin.descr.author, origin.descr.title].join(' ').replace(/ +/g, '-')
    prefstore.set(origin.bid, defaults)
    return defaults
  },

  addRow(type, name, value) {
    const tmpl = q('.prefs-line.tmpl')
    const orow = tmpl.cloneNode(true)
    orow.classList.remove('tmpl')
    orow.setAttribute('type', type)
    orow.setAttribute('prefname', name)
    let oname = orow.querySelector('.td-name')
    let ovalue = orow.querySelector('.td-value')
    ovalue.setAttribute('contenteditable', true)
    oname.textContent = name
    ovalue.textContent = value
    this.tbody.appendChild(orow)
  },

  stripes() {
    let orows = qs('.prefs-line:not(.hidden)')
    let n = 0
    for (let orow of orows) {
      if ((n % 2) === 1) orow.classList.remove('odd'), orow.classList.add('even')
      else orow.classList.add('odd'), orow.classList.remove('even')
      n++
    }
  },
}

document.addEventListener('click',  (ev) => {
  let opack = ev.target.closest('#package')
  if (opack) openDialogExportPath()
})

function openDialogExportPath() {
  dialog.showOpenDialog({properties: ['openDirectory'] })
    .then(result => {
      const bpath = result.filePaths[0]
      if (!bpath) return
      exportpath = bpath
      appstore.set('exportpath', bpath)
      preference.ready()
    }).catch(err => {
      console.log(err)
    })
}

document.addEventListener('keydown', ev => {
  if (ev.key !== 'Enter') return
  if (dgl.route != 'preference') return
  ev.preventDefault()
  if (!checkBooks()) return
  let orow = ev.target.closest('.prefs-line')
  if (!orow) return
  let origin = dgl.origin(book.sbooks)
  let prefs = prefstore.get(origin.bid)

  let name = orow.querySelector('.td-name').textContent.trim()
  let value = orow.querySelector('.td-value').textContent.trim()
  let prefname = [preference.origin.bid, name].join('.')
  prefstore.set(prefname, value)

  prefstore.set(origin.bid, prefs)
  preference.ready()

})

mouse.bind('ctrl+p', function(ev) {
  const state = {route: 'preference'}
  router(state)
})

function checkBooks() {
  if (dgl.bid && book.sbooks) return true
  message.show('select a book', 'darkred')
}
