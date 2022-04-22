let timer:any = null
const Debounce = (time:number=200, callback:Function) => {
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback()
        }, time)
    }
}

export default Debounce
