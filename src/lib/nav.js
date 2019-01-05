//
import _ from "lodash";
import { q, qs, empty, create, remove, span, p, div, enclitic } from './utils'
import Split from 'split.js'
// import { bookData, scrollPanes, keyPanes, parseLib, parseTitle, parseBook } from './lib/book'
// import { parseLib, parseTitle } from './book'
import { getLib, getTitle, getBook } from './pouch'


const log = console.log
const settings = require('electron').remote.require('electron-settings')
const Mousetrap = require('mousetrap')
const fse = require('fs-extra')
const path = require('path')
const slash = require('slash')

// let current = {section: 'title'}
let init = {section: 'home'}
let history = [init]
let hstate = 0
// let split

function goLeft() {
  // log('<<=== LEFT', hstate)
  if (hstate - 1 < 0) return
  if (hstate - 1 >= 0) hstate--
  let state = history[hstate]
  state.old = true
  navigate(state)
}

function goRight() {
  // log('===>> RIGHT', hstate)
  if (hstate + 1 >= history.length) return
  if (hstate + 1 < history.length) hstate++
  let state = history[hstate]
  state.old = true
  navigate(state)
}

function twoPage(state) {
  log('====================================TWO PAGES')
  let srcsel = ['#', state.section, '> #source'].join('')
  let trnsel = ['#', state.section, '> #trns'].join('')
  let osource = q(srcsel)
  let otrns = q(trnsel)
  empty(osource)
  empty(otrns)

  let gutsel = ['#', state.section, '> .gutter'].join('')
  let ogutter = q(gutsel)
  if (ogutter) return

  // херня полная
  // let sizes
  // if (split) {
  //   sizes = settings.get('split-sizes')
  //   if (state.cnics && state.cnics.length == 1) sizes = [100, 0]
  //   split.setSizes(sizes)
  //   return
  // } else {
  //   if (!sizes) sizes = [50, 50]
  //   settings.set('split-sizes', sizes)
  // }
  let sizes = settings.get('split-sizes')
  if (!sizes) sizes = [50, 50]
  settings.set('split-sizes', sizes)


  if (state.cnics && state.cnics.length == 1) log('SIZE 100')
  let split = Split([srcsel, trnsel], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
      // log('RESIZED', sizes)
      settings.set('split-sizes', sizes)
    }
  })
  // let obook = q('#book')
  // obook.addEventListener("wheel", scrollPanes, false)
  // document.addEventListener("keydown", keyPanes, false)
  return split
}

// arrows
Mousetrap.bind(['alt+left', 'alt+right'], function(ev) {
  if (ev.which == 37) goLeft()
  else if (ev.which == 39) goRight()
})

Mousetrap.bind(['alt+1', 'alt+2'], function(ev) {
  if (ev.which == 49) log('----1')
  else if (ev.which == 50) log('----2')
})

function hideAll () {
  const sections = document.querySelectorAll('.section.is-shown')
  Array.prototype.forEach.call(sections, (section) => {
    section.classList.remove('is-shown')
  })
}

function sectionTrigger(section) {
  hideAll()
  const sectionId = ['#', section].join('')
  q(sectionId).classList.add('is-shown')
}

export function navigate(state) {
  log('NAV-state', state)
  let progress = q('#progress')
  progress.classList.add('is-shown')
  let section = state.section
  sectionTrigger(section)
  if (!state.old) {
    // history.push(_.clone(state))
    history.push(state)
    hstate = history.length-1
  }
  delete state.old
  // log('STATES', hstate, history)

  if (['title', 'book'].includes(state.section)) twoPage(state)

  if (section == 'home')  getLib()
  else if (section == 'title') getTitle(state)
  else if (section == 'book') getBook(state)
  // else if (section == 'cleanup') goCleanup(state)
  // else if (section == 'search') parseQuery(libdb, current)
  // else showSection(section)
  settings.set('state', state)
}