//
import _ from "lodash"
import { remote } from "electron"
import { q } from './utils'
import { parseLib, parseTitle, parseBook } from './book'
const { getCurrentWindow } = require('electron').remote

const log = console.log
const path = require('path')
let fse = require('fs-extra')

const isDev = require('electron-is-dev')
// const isDev = false
// const isDev = true
log('=====IS-DEV', isDev)
const limit = 20

const app = remote.app
const apath = app.getAppPath()
const upath = app.getPath("userData")

let dbPath = path.resolve(upath, 'pouch')
fse.ensureDirSync(dbPath)

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

let ftdbPath = path.resolve(upath, 'pouch/fulltext')
let ftdb = new PouchDB(ftdbPath)
let libPath = path.resolve(upath, 'pouch/library')
let libdb = new PouchDB(libPath)

export function pushBook(info, book) {
  return Promise.all([
    pushInfo(info),
    pushTexts(book.pars),
    pushMap(book.mapdocs)
  ])
    .then(function(res) {
      // if (res[1].length) {
      libdb.createIndex({
        index: {fields: ['fpath', 'pos']},
        name: 'fpathindex'
      })
      // }
    })
    .then(function(res) {
      ftdb.createIndex({
        index: {fields: ['wf']},
        name: 'wfindex'
      })
    })
}

export function pushInfo(ndoc) {
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

function pushTexts(newdocs) {
  return libdb.allDocs({include_docs: true})
    .then(function(res) {
      let docs = res.rows.map(row=>{ return row.doc })
      // log('========= DOCS', docs[0])
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
      // log('========= CLEANDOCS', cleandocs)
      return libdb.bulkDocs(cleandocs)
    })
}

// ndocs = ndocs.slice(0,3)
// ftdb.bulkDocs(ndocs)
//   .then(function () {
//   return ftdb.allDocs({include_docs: true});
// }).then(function (res) {
//   log('ALLDOCS', res);
// }).catch(function (err) {
//   console.log(err);
// });

// MAP
function pushMap(ndocs) {
  log('MAP NEW-DOCS', ndocs[100])
  return ftdb.allDocs({ include_docs: true })
    .then(function(res) {
      // log('MAP OLD-RES', res)
      log('MAP OLD-RES-ROWS', res.rows.length)
      let odocs = res.rows.map(row=>{ return row.doc})
      log('MAP OLD-DOCS', odocs.length, odocs)
      let hdoc = {}
      odocs.forEach(doc=> { hdoc[doc._id] = doc })

      let cleandocs = []
      ndocs.forEach(ndoc=> {
        let doc = hdoc[ndoc._id]
        if (doc) {
          let testdoc = _.clone(doc)
          delete testdoc._rev
          if (_.isEqual(ndoc, testdoc)) return
          else {
            // неверно - нужны только уникальные значения, uniq не катит
            doc.docs = ndoc.docs //  _.uniq(doc.docs.concat(ndoc.docs))
            cleandocs.push(doc)
          }
        } else {
          cleandocs.push(ndoc)
        }
      })
      log('MAP CLEANDOCS', cleandocs.length)
      return ftdb.bulkDocs(cleandocs)
    })
    .catch(function (err) {
      log('MAP ERR', err)
    })
}


export function getLib() {
  let options = {
    include_docs: true,
    startkey: 'info',
    endkey: 'info\ufff0'
  }
  libdb.allDocs(options)
    .then(function (result) {
      let infos = result.rows.map(row=> { return row.doc})
      parseLib(infos)
    })
    .catch(function (err) {
      log('getLibErr', err)
    })
}

export function getInfo(infoid) {
  return libdb.get(infoid)
    .catch(function (err) {
      log('getTitleErr', err)
    })
}

export function getTitle(state) {
  if (!state.infoid) return
  libdb.get(state.infoid)
    .then(function (info) {
      parseTitle(state, info)
    }).catch(function (err) {
      log('getTitleErr', err)
    })
}

export function getBook(state) {
  // log('PARS GOT BEFORE')
  libdb.get(state.infoid)
    .then(function (info) {
      getText(state)
        .then(function(res) {
          let pars = _.compact(res.docs)
          // log('PARS.LENGTH', pars.length)
          parseBook(state, info, pars)
        })
    }).catch(function (err) {
      log('getBookErr', err)
    })
}

export function getText(state, endpos) {
  let fpath = state.fpath
  let start = state.pos*1 || 0
  let end = endpos*1 || start*1 + limit*1
  let selector = {fpath: fpath, pos: {$gte: start, $lt: end}}
  log('SELECTOR1', selector)
  return libdb.find({selector: selector}) // sort: ['idx'], , limit: 20
}

export function cleanup() {
  log('before destroy')
  return Promise.all([
    libdb.destroy(),
    ftdb.destroy()
  ])
}

export function searchBook(state) {
  let selector = {wf: state.query}
  ftdb.find({selector: selector})
    .then(function (res) {
      let ftdocs = res.docs
      if (ftdocs.length > 1) throw new Error('FTDOCS > 1')
      let docs = ftdocs[0].docs
      let selector = {$or: docs.map(doc=> { return {fpath: doc.fpath, pos: doc.pos }})}
      libdb.find({selector: selector})
        .then(function(res) {
          let qtree = {}
          log('SEARCH res', res.docs.length)
          let qinfos = _.groupBy(res.docs, 'infoid')
          log('QINFOS', qinfos)

          for (let infoid in qinfos) {
            let gqinfo = qinfos[infoid]
            let qfpath = _.groupBy(gqinfo, 'fpath')
            qtree[infoid] = {}
            for (let fpath in qfpath) {
              let qgroup = qfpath[fpath]
              let qpos = _.groupBy(qgroup, 'pos')
              qtree[infoid][fpath] = {}
              for (let pos in qpos) {
                let qlines = qpos[pos]
                qtree[infoid][fpath][pos] = qlines
              }
            }
          }
          log('QTRE', qtree)
        })
    }).catch(function (err) {
      log('SEARCH ERR:', err)
    })

}

export function searchBook_(ftselector) {
  return ftdb.find({selector: ftselector})
    .then(function (res) {
      // log('SEARCH RES:', res)
      let ftdocs = res.docs
      if (ftdocs.length > 1) throw new Error('FTDOCS > 1')
      // log('SEARCH FDOCS:', ftdocs.length)
      // log('SEARCH FDOCS:', ftdocs[0].wf)
      let docs = ftdocs[0].docs
      // log('SEARCH FDOCS:', ftdocs[0].docs)

      let selector = {$or: docs.map(doc=> { return {fpath: doc.fpath, pos: doc.pos }})}
      // log('SELECTOR2', selector)
      // return libdb.find({selector: selector, use_index: 'fpathindex'})
      return libdb.find({selector: selector})
      // return ftdocs
    }).catch(function (err) {
      log('SEARCH ERR:', err)
    })


  // return ftdb.get(query)

  // .then(function (wfdoc) {
    //   let opts = { include_docs: true, keys: wfdoc.parids }
    //   return libdb.allDocs(opts)
    //     .then(function (result) {
    //       let qdocs = _.compact(result.rows.map(row=> { return row.doc}))
    //       let qinfos = _.groupBy(qdocs, 'infoid')
    //       log('POUCH-QINFOS', qinfos)
    //       for (let infoid in qinfos) {
    //         let gqinfo = qinfos[infoid]
    //         let qgroups = _.groupBy(gqinfo, 'fpath')
    //         for (let fpath in qgroups) {
    //           let qgroup = qgroups[fpath]
    //           let qpos = _.groupBy(qgroup, 'pos')
    //           for (let pos in qpos) {
    //             let qlines = qpos[pos]
    //             // log('Id', infoid, 'fp', fpath, 'p', pos, 'ql', qlines)
    //           }
    //         }

    //       }

    //       return qinfos
    //     })
    // })
    // .catch(function (err) {
    //   log('SEARCH ERR:', err)
    // })
}
