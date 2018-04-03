import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { App } from './app'

const main = App

const drivers = {
  DOM: makeDOMDriver('#root'),
  log: (something) => console.log(something)
}

run(main, drivers)
