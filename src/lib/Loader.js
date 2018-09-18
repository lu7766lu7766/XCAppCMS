
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

class Loader {

  _elements = {}
  _index = 0

  add() {
    return {
      script: (html) => {
        var el = document.createElement('script')
        el.innerHTML = html
        document.head.appendChild(el)
        this._elements['script' + this._index++] = el
      },
      scripts: async (srcList) => {
        return new Promise(resolve => {
          asyncForEach(srcList, async (src) => {
            await this.load(src)
          })
          resolve()
        })
      }
    }
  }

  load(src) {
    return new Promise((resolve, rejects) => {
      var el = document.createElement('script')
      el.src = src
      el.onload = resolve
      el.onerror = rejects
      document.head.appendChild(el)
      this._elements[src] = el
    })
  }

  clear() {
    _.forEach(this._elements, (el) => {
      el.parentNode.removeChild(el)
    })
  }
}

export { Loader as default }