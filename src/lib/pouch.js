//
import _ from "lodash";
import { remote } from "electron";

const log = console.log
const path = require('path')
let fse = require('fs-extra')

const isDev = require('electron-is-dev')
// const isDev = false
// const isDev = true
log('=====IS-DEV', isDev)

const app = remote.app;
const apath = app.getAppPath()
let upath = app.getPath("userData")

let dbPath = path.resolve(upath, 'pouch')
fse.ensureDirSync(dbPath)

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

let ftdbPath = path.resolve(upath, 'pouch/fulltext')
let ftdb = new PouchDB(ftdbPath)
let libPath = path.resolve(upath, 'pouch/library')
let libdb = new PouchDB(libPath)

function pushBook(info, book) {
  if (!book || !book.pars || !book.pars.length) return
  Promise.all([
    pushInfo(info),
    pushTexts(book.pars),
    pushMap(book.mapdocs)
  ])
    .then(function(res) {
      if (res[1].length) {
        libdb.createIndex({
          index: {fields: ['fpath', 'pos']},
          name: 'fpathindex'
        })
          .then(function(res) {
            // log('INDEX CREATED')
          })
      }
      navigate(current)
    }).catch(function(err) {
      log('ALL RES ERR', err)
    })
}

function pushInfo(ndoc) {
  return libdb.get(ndoc._id).catch(function (err) {
    if (err.name === 'not_found') return
    else throw err
  }).then(function (doc) {
    if (doc) {
      let testdoc = _.clone(doc)
      delete testdoc._rev
      if (_.isEqual(ndoc, testdoc)) return
      else {
        ndoc._rev = doc._rev
        return libdb.put(ndoc)
      }
    } else {
      return libdb.put(ndoc)
    }
  })
}
