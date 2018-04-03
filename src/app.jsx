import xs from 'xstream'

const bases = [
  {
    base: 2,
    slice: 8
  },
  {
    base: 8,
    slice: 3
  },
  {
    base: 16,
    slice: 2
  }
]

export function App (sources) {
  const buf = new window.Uint8Array(1)

  const click$ = sources.DOM.select('#root').events('click')
  
  const base$ = click$
    .fold((prev, x) => (prev + 1) % bases.length, 2)
    .map(x => bases[x])

  const random$ = xs.periodic(700)
    .map(() => {
      crypto.getRandomValues(buf)
      return buf[0]
    })

  const randomInBase$ = xs.combine(base$, random$)
    .map(([base, random]) => ('0'.repeat(base.slice) + random.toString(base.base)).slice(-base.slice))

  const vtree$ = randomInBase$

  const sinks = {
    DOM: vtree$
  }

  return sinks
}
