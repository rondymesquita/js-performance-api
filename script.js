window.onload = function () {
  console.log('>> Page Loaded')
  const p = performance
  const calc = document.getElementById('calc')
  const load = document.getElementById('load')
  const image = document.getElementById('img')

  function addScript () {
    const head = document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.type = 'text/javascript';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/plotly.js/1.51.1/plotly-finance.min.js'
    head.appendChild(script)
  }

  function print (name, value) {
    console.log(`${name}: ${value} seconds`)
  }

  function parseDate (date) {
    return dayjs(date).format('DD/MM/YYYY HH:mm:ss SSS [Z] A')
  }

  function calculate () {

    const table = []
    const keys = Object.keys(performance.timing.toJSON())
    keys.forEach(function (key) {
      table.push({
        key: key,
        value: parseDate(new Date(performance.timing[key])),
        milliseconds: performance.timing[key]
      })
    })

    const sortedTable = table.sort(function (a, b){
      return a.milliseconds - b.milliseconds
    })
    console.table(sortedTable)

    const domContentLoadedEventEndSeconds = (p.timing.domContentLoadedEventEnd - p.timing.domLoading) / 1000
    print('domContentLoadedEventEnd', domContentLoadedEventEndSeconds)

    const loadEventSeconds = (p.timing.loadEventEnd - p.timing.responseEnd) / 1000
    print('load page', loadEventSeconds)

  }

  calc.addEventListener('click', function () {
    calculate()
  })
  load.addEventListener('click', function () {
    addScript()
  })
  // image.onload = function () {
  //   console.log("The image has loaded!");
  // };
  setTimeout(function () {
    calculate()
  }, 0)
}
