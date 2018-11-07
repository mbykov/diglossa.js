import _ from 'lodash'
import Split from 'split.js'
import { q, qs, empty, create, span, p, div, remove } from './utils'
import tree from './tree';
import {navigate} from '../app';

const fse = require('fs-extra')
const path = require('path')
const log = console.log
const Store = require('electron-store')
const store = new Store()
// const Apstore = require('./apstore')
// const store = new Apstore()
// const elasticlunr = require('elasticlunr');
const clipboard = require('electron-clipboard-extended')

let current // = window.current
let info //  = window.info

export function twoPages() {
  var sizes = store.get('split-sizes')
  if (sizes) sizes = JSON.parse(sizes)
  else sizes = [50, 50]
  let split = Split(['#source', '#trns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
      // reSetBook()
    }
  })
  let obook = q('#book')
  obook.addEventListener("wheel", scrollPanes, false)
  document.addEventListener("keydown", keyScroll, false)
  return split
}

function scrollPanes(ev) {
  if (ev.shiftKey == true) return;
  let delta = (ev.deltaY > 0) ? 24 : -24
  let source = q('#source')
  let trns = q('#trns')
  source.scrollTop += delta
  trns.scrollTop = source.scrollTop

  // let start = qs('#source > p').length
  // if (!start) return
  // if (!window.navpath || window.navpath.section != 'book') return
  if (!current || current.section != 'book') return

  let el = ev.target
  let oapp = q('#app')
  let book = oapp.book
  if (source.scrollHeight - source.scrollTop - source.clientHeight <= 3.0) {
    let start = qs('#source > p').length
    log('___START', start)
    s_etChunk(start, book)
  }
}

function keyScroll(ev) {
  let source = q('#source')
  let trns = q('#trns')
  if (!source || !trns) return
  trns.scrollTop = source.scrollTop
  if (ev.keyCode == 38) {
    source.scrollTop = source.scrollTop - 24
  } else if (ev.keyCode == 40) {
    source.scrollTop = source.scrollTop + 24
  } else if (ev.keyCode == 33) {
    let height = source.clientHeight
    source.scrollTop = source.scrollTop - height + 60
  } else if (ev.keyCode == 34) {
    let height = source.clientHeight
    source.scrollTop = source.scrollTop + height - 60
  }
  trns.scrollTop = source.scrollTop

  // let start = qs('#source > p').length
  // if (!start) return
  // if (!window.navpath || window.navpath.section != 'book') return
  if (!current || current.section != 'book') return

  let book = window.book
  if (source.scrollHeight - source.scrollTop - source.clientHeight <= 3.0) {
    let start = qs('#source > p').length
    // log('___KEY START', start)
    // ошибка при прокрутке всегда
    s_etChunk(start, book)
  }
}


export function parseTitle(bookinfo, bookcurrent) {
  // log('========= parse title =============')
  window.split.setSizes([50,50])
  info = bookinfo
  current = bookcurrent
  log('TITLEinfo', info)

  let osource = q('#source')
  let otrns = q('#trns')
  let obookTitle = div('')
  obookTitle.classList.add('bookTitle')
  osource.appendChild(obookTitle)

  let oauthor = div(info.book.author, 'author')
  let otitle = div(info.book.title, 'title')
  obookTitle.appendChild(oauthor)
  obookTitle.appendChild(otitle)

  // problem if not all names in nics list ?
  let onics = create('ul')
  for (let nic in info.nicnames) {
    let name = info.nicnames[nic]
    let onicli = create('li')
    let ocheck = create('input')
    ocheck.type = 'checkbox'
    ocheck.checked = true
    let oname = span(name)
    oname.classList.add('check-name')
    onicli.appendChild(ocheck)
    onicli.appendChild(oname)
    onics.appendChild(onicli)
  }
  obookTitle.appendChild(onics)

  let obookCont = div('')
  obookCont.classList.add('bookTitle')
  otrns.appendChild(obookCont)
  let otree = tree(info.tree, info.book.title)
  obookCont.appendChild(otree)
  let otbody = q('#tree-body')
  otree.addEventListener('click', goBookEvent, false)
}

function goBookEvent(ev) {
  if (!ev.target.classList.contains('tree-node-text')) return
  // let navpath = window.navpath
  let fpath = ev.target.getAttribute('fpath')
  current.fpath = fpath
  current.section = 'book'
  navigate(current)
}

export function parseBook(bookcurrent, bookinfo, texts) {
  info = bookinfo
  current = bookcurrent
  log('_ info', info)
  log('_ cur', current)
  if (!texts) return
  window.split.setSizes([50,50])
  let osource = q('#source')
  let otrns = q('#trns')
  empty(osource)
  empty(otrns)

  let start = 0
  setBookText(texts, start)

  osource.addEventListener("mouseover", copyToClipboard, false)
  otrns.addEventListener("wheel", cyclePar, false)
}

function setBookText(texts, start) {
  let fpath = current.fpath
  let author = _.filter(texts, auth=> { return auth.author && auth.fpath == fpath})[0]
  let trns = _.filter(texts, auth=> { return !auth.author && auth.fpath == fpath})

  author.rows = _.compact(author.text.split('\n'))
  trns.forEach(trn=> { trn.rows = _.compact(trn.text.split('\n')) })
  window.author = author
  window.trns = trns

  let cnics = trns.map(auth=> { return auth.nic })
  let nic = window.currentNic
  if (!nic) nic = cnics[0]
  if (!cnics.includes(nic)) nic = cnics[0]
  // window.nics = cnics
  window.currentNic = nic

  // log('BEFORE CHUNK nic', nic)
  // window.book = book

  setChunk(start)
  createRightHeader(cnics)
  createLeftHeader()
}

function setChunk(start) {
  let limit = 20
  let author = window.author
  let trns = window.trns
  // log('HERE auth', author)
  // log('HERE trns', trns)
  if (!author) return

  let authrows = author.rows.slice(start, start+limit)
  let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)'
  let rePunct = new RegExp(punct, 'g')
  let osource = q('#source')
  let otrns = q('#trns')
  let nic = window.currentNic

  authrows.forEach((astr, idx) => {
    let oleft = p()
    let html = astr.replace(rePunct, " <span class=\"active\">$1</span>")
    oleft.innerHTML = html
    oleft.setAttribute('idx', start+idx)
    oleft.setAttribute('nic', author.nic)
    osource.appendChild(oleft)
    let orights = []
    trns.forEach(trn => {
      let rstr = trn.rows[start+idx]
      let oright = p(rstr)
      oright.setAttribute('idx', start+idx)
      oright.setAttribute('nic', trn.nic)
      otrns.appendChild(oright)
      if (trn.nic == nic) oright.setAttribute('active', true)
      orights.push(oright)
    })
    alignPars(oleft, orights)
  })
}

function copyToClipboard(ev) {
  if (ev.shiftKey == true) return
  if (ev.ctrlKey == true) return

  if (ev.target.nodeName != 'SPAN') return
  let wf = ev.target.textContent
  clipboard.writeText(wf)
}

function alignPars(oleft, orights) {
  orights.push(oleft)
  let heights = orights.map(par => { return par.scrollHeight })
  let max = _.max(heights)
  orights.forEach(par => {
    par.style.height = max + 'px'
    if (!par.getAttribute('active')) par.classList.add('hidden')
  })
}

function cyclePar(ev) {
  if (ev.shiftKey != true) return
  let idx = ev.target.getAttribute('idx')

  let selector = '#trns [idx="'+idx+'"]'
  let pars = qs(selector)
  let nics = _.map(pars, par=> { return par.getAttribute('nic') })
  let curpar = _.find(pars, par=> { return !par.classList.contains('hidden') })
  let nic = curpar.getAttribute('nic')
  let nicidx = nics.indexOf(nic)
  let nextnic = (nicidx+1 == nics.length) ? nics[0] : nics[nicidx+1]
  let next = _.find(pars, par=> { return par.getAttribute('nic') == nextnic })
  next.classList.remove('hidden')
  curpar.classList.add('hidden')
}

function createLeftHeader() {
  let obook = q('#book')
  let arect = obook.getBoundingClientRect()
  let ohleft = div()
  obook.appendChild(ohleft)
  ohleft.classList.add('hleft')
  ohleft.style.left = arect.width*0.15 + 'px'
  ohleft.addEventListener("click", clickLeftHeader, false)

  // let info = window.info
  let otree = tree(info.tree, info.book.title)
  ohleft.appendChild(otree)
  // let navpath = window.navpath
  let otitle = q('#tree-title')
  let otbody = q('#tree-body')
  if (current.fpath) {
    otitle.textContent = current.fpath
    otbody.classList.add('tree-collapse')
  } else {
    otitle.textContent = info.book.title
    remove(otbody)
  }
}

function clickLeftHeader(ev) {
  let fpath = ev.target.getAttribute('fpath')
  // log('LEFT', ev.target)
  let otbody = q('#tree-body')
  if (!otbody) return
  if (fpath) {
    if (ev.target.classList.contains('tree-node-empty')) return
    let otitle = q('#tree-title')
    // let navpath = window.navpath
    current.fpath = fpath
    otitle.textContent = current.fpath
    otbody.classList.add('tree-collapse')
    navigate(current)
  } else {
    otbody.classList.remove('tree-collapse')
    let ohleft = q('.hleft')
    ohleft.classList.add('header')
  }
}

function createRightHeader(nics) {
  // let book = window.book
  let obook = q('#book')
  let arect = obook.getBoundingClientRect()
  let ohright = div()
  ohright.classList.add('hright')
  ohright.style.left = arect.width*0.70 + 'px'

  let oul = create('ul')
  oul.setAttribute('id', 'namelist')
  oul.addEventListener("click", clickRightHeader, false)
  ohright.appendChild(oul)
  obook.appendChild(ohright)
  createNameList(nics)
  let nic = window.currentNic
  collapseRightHeader(nic)
}

function createNameList(nics) {
  // let info = window.info
  if (!info) {
    log('NO INFO ???')
    return
  }
  let nicnames = info.nicnames
  let oul = q('#namelist')
  empty(oul)
  oul.setAttribute('nics', nics)
  nics.forEach(nic=> {
    let oli = create('li')
    let name = nicnames[nic] ? nicnames[nic] : nic
    oli.textContent = name
    oli.setAttribute('nic', nic)
    oul.appendChild(oli)
  })
}

function clickRightHeader(ev) {
  if (ev.target.classList.contains('active')) {
    expandRightHeader()
  } else {
    let nic = ev.target.getAttribute('nic')
    // window.navpath.nic = nic
    current.nic = nic
    if (!nic) return
    collapseRightHeader(nic)
    otherNic(nic)
  }
}

function otherNic(nic) {
  let pars = qs('#trns > p')
  pars.forEach((par, idx) => {
    if (par.getAttribute('nic') == nic) par.setAttribute('active', true), par.classList.remove('hidden')
    else par.classList.add('hidden')
  })
}

function collapseRightHeader(nic) {
  let oright = q('.hright')
  oright.classList.remove('header')
  let olis = qs('#namelist > li')
  _.each(olis, oli=> {
    if (oli.getAttribute('nic') == nic) oli.classList.add('active')
    else oli.classList.add('hidden')
  })
}

function expandRightHeader() {
  let oright = q('.hright')
  oright.classList.add('header')
  let olis = qs('#namelist > li')
  _.each(olis, oli=> {
    oli.classList.remove('hidden')
    oli.classList.remove('active')
  })
}
