'use strict'

import _ from 'lodash'
import { ipcRenderer } from "electron";
const { dialog } = require('electron').remote
import { log, q, create, zerofill, cleanDname, cleanStr } from './lib/utils'

// import { compressDGL, uncompressDGL } from '../../b/dgl-utils'
import { compressDGL, uncompressDGL } from 'dgl-utils'
import { md2json } from 'book-md2json'

import { pushDocs, pushImgs } from './lib/pouch'
import { book } from './book'

import { router } from './app'
const isZip = require('is-zip')
const franc = require('franc')

const fse = require('fs-extra')
const path = require("path")
const Store = require('electron-store')
const bkstore = new Store({name: 'libks'})
const ftstore = new Store({name: 'fts'})
const prefstore = new Store({name: 'prefs'})
const appstore = new Store({name: 'app'})

const JSON5 = require('json5')

import { progress } from './lib/progress'
import { message } from './lib/message'

import { remote } from "electron"
let dgl = remote.getGlobal('dgl')

const { app } = require('electron').remote
let homepath = app.getPath('home');
let exportpath = appstore.get('exportpath')

const mouse = require('mousetrap')
const ftsopts = remote.getGlobal('ftsopts')

export const getImportBook = {}

ipcRenderer.on('importBook', function (event) {
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'DGL, FB2, EPUB, HTML, MD', extensions: ['dgl', 'json', 'epub', 'pdf', 'md', 'fb2', 'fb2.zip'] }]})
    .then(result => {
      const bpath = result.filePaths[0]
      if (!bpath) {
        message.show('can not locate book. Select a book', 'darkred')
        return
      }
      let ext = path.extname(bpath)
      if (!ext) {
        message.show('can not locate book. Select a book', 'darkred')
        return
      }
      progress.show()
      if (ext == '.dgl') importDgl(bpath)
      else if (ext == '.json') importDglJson(bpath)
      else ipcRenderer.send('importBook', {bpath})
    }).catch(err => {
      message.show('can not import book', 'darkred')
      console.log(err)
    })
})

ipcRenderer.on('addParallelBook', function (event) {
  if (!checkBooks()) return
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'PDF, FB2, EPUB, PDF, HTML, MD', extensions: ['epub', 'md', 'pdf', 'fb2', 'fb2.zip'] }]})
    .then(result => {
      const bpath = result.filePaths[0]
      if (!bpath) return
      if (!book) {
        message.show('select book to add to', 'darkred')
        return
      }
      progress.show()
      let origin = dgl.origin(book.sbooks)
      ipcRenderer.send('importBook', {bpath, orbid: origin.bid})

    }).catch(err => {
      message.show('can not read book', 'darkred')
      console.log(err)
    })
})

ipcRenderer.on('importBookResult', function (event, result) {
  log('_importBookR', result)
  if (!result.docs) {
    message.show('can not parse book', 'darkred')
    return
  }
  importBook(result)
})

function checkBooks() {
  if (book.sbooks) return true
  else message.show('select a book', 'darkred')
}

function guessLang(docs) {
  let test = docs.map(doc=> doc.md).join(' ')
  return franc(test)
}

async function importBook(result) {
  log('_importBook')
  let { descr, docs, imgs } = result
  let half = docs.length/2
  descr.lang = guessLang(docs.slice(half, half+200))

  let newbook = parseBookInfo(descr)
  newbook.bpath = result.bpath

  newbook.cnts = parseCnts(docs)
  setDocPath(docs)
  newbook.active = true

  if (result.orbid) {
    // todo: add book
    book.sbooks.push(newbook)
    // let origin = dgl.origin(book.sbooks)
    if (book.sbooks[1]) book.sbooks[1].shown = true
    bkstore.set(result.orbid, book.sbooks)
  } else {
    newbook.origin = true
    bkstore.set(newbook.bid, [newbook])
    // let prefs = preference.initPrefs(newbook)
    // prefstore.set(newbook.bid, prefs)
  }

  await pushDocs(newbook.bid, docs)
  if (imgs.length) await pushImgs(newbook.bid, imgs)
  router({route: 'library'})

  let mess = ['book', newbook.author, newbook.title, 'loaded'].join(' ')
  message.show(mess, 'darkgreen')
} // import common book

function parseCnts(docs) {
  let cnts = docs.filter(doc=> doc.level > -1)
  cnts.forEach((cnt, idx)=> cnt.idx = idx)
  return cnts
}

function setDocPath(docs) {
  const fillsize = docs.length.toString().length
  let path = '', counter = 0, filled
  let prevheader = {}
  let parent = {level: 0, path: ''}
  let chapternum = 0
  let headers = docs.filter(doc=> doc.level > -1)
  const chaptesize = headers.length.toString().length
  for (let doc of docs) {
    if (doc.level > -1) {
      chapternum += 1
      counter = 0
      prevheader = doc
      path = zerofill(chapternum, chaptesize)
  }

    filled = zerofill(counter, fillsize)
    if (doc.footnote) {
      // if (!doc._id) doc._id = ['ref', path, doc.ref].join('-')
    } else {
      doc.path = path
      doc._id = [path, filled].join('-')
      counter++
    }
    prevheader.size = counter
  }
}

function parseBookInfo(info) {
  let bid = cleanDname(info)
  let lang = info.lang || 'unk'
  let descr = {author: info.author, title: info.title}
  let book = {bid, descr, lang}
  if (info.origin) book.origin = true
  return book
}

async function parseBookByType(bpath, type) {
  // now only md as text type
  let result
  try {
    result = await md2json(bpath)
  } catch(err) {
    console.log('import ERR: can not import markdown')
    console.log('import ERR:', bpath)
    result = {descr: 'can not import book'}
  }
  return result
}

export async function importDglJson(bpath) {
  let dirpath = bpath.substring(0, bpath.lastIndexOf(path.sep))
  let pack, dgls
  try {
    let dgljson = await fse.readFile(bpath, 'utf-8')
    pack = JSON5.parse(dgljson)
    dgls = pack.texts
  } catch(err) {
    let mess = 'not a .dgl format'
    message.show(mess, 'darkred')
    return
  }

  for (const text of pack.texts) {
    if (text.skip) continue
    if (!text.type) continue
    let srcpath = text.src
    let bpath = path.resolve(dirpath, srcpath)
    let str = await fse.readFile(bpath, 'utf-8')
    text.mds = str.split('\n')
  }
  saveDglBook(pack)
} // import bare uncompressed dgl-json

export async function importDgl(dglpath) {
  progress.show()
  let iszip = isZip(fse.readFileSync(dglpath))
  if (!iszip) {
    let mess = 'not compressed file, not a .dgl format'
    message.show(mess, 'darkred')
    return
  }

  let pack = await uncompressDGL(dglpath)
  saveDglBook(pack)
  message.show('zip in progress', 'darkgreen')
} // import compressed dgl

async function saveDglBook(pack) {
  let books = []
  for (const text of pack.texts)  {
    let book = parseBookInfo(text)
    book.active = true

    let mess = [book.lang, '-', book.title, 'loading...'].join(' ')
    message.show(mess, 'darkgreen', true)

    let {descr, docs, imgs} = await md2json(text.mds)
    setDocPath(docs)
    book.cnts = parseCnts(docs) // dgl
    books.push(book)

    await pushDocs(book.bid, docs)
    if (imgs && imgs.length) await pushImgs(book.bid, imgs)
  } // for texts

  // todo: now: установить отметку synced ?
  let origin = books.find(book=> book.origin)
  let nonorigin = books.find(book=> !book.origin)
  if (nonorigin) nonorigin.shown = true
  bkstore.set(origin.bid, books)

  let prefs = pack
  delete prefs.texts
  prefs.exportpath = appstore.get('exportpath')
  prefstore.set(origin.bid, prefs)

  router({route: 'library'})
  let mess = ['book', origin.descr.author, origin.descr.title, 'loaded'].join(' ')
  message.show(mess, 'darkgreen')
}
