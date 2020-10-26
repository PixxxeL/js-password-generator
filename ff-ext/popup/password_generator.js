const STORAGE_PREFIX = 'password-generator:'
const DEFAULT_CONF = {
    len: 16,
    lower: true,
    upper: true,
    digits: true,
    special: false
}

class LocalStorage {
    static get(key, deflt=null) {
        let value = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}${key}`))
        if (value === null) {
            value = deflt
        }
        return value
    }
    static set(key, value) {
        try {
            localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value))
        } catch (e) {}
    }
}

const CONFIG = LocalStorage.get('conf', DEFAULT_CONF)

let lenControl,
    lowerControl,
    upperControl,
    digitsControl,
    specialControl,
    outputControl,
    genBtn,
    copyBtn

const onNumberChange = (e) => {
    const key = e.target.name.substr(9)
    CONFIG[key] = parseInt(e.target.value, 10) || DEFAULT_CONF[key]
    LocalStorage.set('conf', CONFIG)
}

const onChangeCheckbox = (e) => {
    const key = e.target.name.substr(9)
    CONFIG[key] = e.target.checked
    LocalStorage.set('conf', CONFIG)
}

const getCharsRange = (start, end) => {
    const chars = []
    for (let n = start; n <= end; n++) {
        chars.push(String.fromCharCode(n))
    }
    return chars
}

const getChars = () => {
    let chars = []
    if (CONFIG.digits) {
        chars = chars.concat(getCharsRange(48, 57))
    }
    if (CONFIG.upper) {
        chars = chars.concat(getCharsRange(65, 90))
    }
    if (CONFIG.lower) {
        chars = chars.concat(getCharsRange(97, 122))
    }
    if (CONFIG.special) {
        chars = chars.concat(getCharsRange(33, 47)).concat(getCharsRange(58, 64)).concat(getCharsRange(91, 96)).concat(getCharsRange(123, 126))
    }
    return chars.length ? chars.join('') : 'x'
}

const generatePassword = () => {
    const chars = getChars()
    outputControl.value = [...Array(CONFIG.len)].map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
    outputControl.select()
}

const copyPassword = () => {
    outputControl.focus()
    document.execCommand('copy')
}

const onLoad = () => {
    lenControl = document.querySelector('#password-length-control')
    lowerControl = document.querySelector('#password-lower-control')
    upperControl = document.querySelector('#password-upper-control')
    digitsControl = document.querySelector('#password-digits-control')
    specialControl = document.querySelector('#password-special-control')
    outputControl = document.querySelector('#output-control')
    genBtn = document.querySelector('#generate-btn')
    copyBtn = document.querySelector('#copy-btn')
    lenControl.value = parseInt(CONFIG.len, 10) || DEFAULT_CONF.len
    lowerControl.checked = CONFIG.lower
    upperControl.checked = CONFIG.upper
    digitsControl.checked = CONFIG.digits
    specialControl.checked = CONFIG.special
    lenControl.addEventListener('change', onNumberChange)
    lowerControl.addEventListener('change', onChangeCheckbox)
    upperControl.addEventListener('change', onChangeCheckbox)
    digitsControl.addEventListener('change', onChangeCheckbox)
    specialControl.addEventListener('change', onChangeCheckbox)
    genBtn.addEventListener('click', generatePassword)
    copyBtn.addEventListener('click', copyPassword)
}

const onUnload = () => {
    lenControl.removeEventListener('change', onNumberChange)
    lowerControl.removeEventListener('change', onChangeCheckbox)
    upperControl.removeEventListener('change', onChangeCheckbox)
    digitsControl.removeEventListener('change', onChangeCheckbox)
    specialControl.removeEventListener('change', onChangeCheckbox)
    genBtn.removeEventListener('click', generatePassword)
    copyBtn.removeEventListener('click', copyPassword)
}

window.addEventListener('load', onLoad)
window.addEventListener('unload', onUnload)
