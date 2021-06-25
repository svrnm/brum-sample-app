
function delay(callback) {
    setTimeout(callback, Math.floor(Math.random() * 1500 + 500))
}

function loadLogo(callback) {
    delay(() => {
        const logo = document.getElementById('logo')
        logo.src = 'logo.png'
        callback()
    })
}

function callBackend(endpoint, callback) {
    fetch(endpoint).then((r) => {
        return r.text()
    }).then(response => {
        delay(() => callback(response));
    })
}

function next(cb) {
    return new Promise((resolve, reject) => { 
        delay(() => {
            cb();
            resolve();
        });
    });
}

let resolver = () => {};

window.resolvePayment = () => {}

class AppPaynamicsAPI extends EventTarget {
    constructor() {
        super();
    }
    pay(paymentProvider) {
        if(paymentProvider === 'invoice') {
            this.dispatchEvent(new Event('payed'));
        } else {
            const p = window.open('payment.html', 'Payment', 'width=600,height=400')
            window.resolvePayment = () => {
                this.dispatchEvent(new Event('payed'));
            }
            p.focus();
        }
    }
}

window.appPaynamicsAPI = new AppPaynamicsAPI();


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }