export default class Component {
    constructor({element}) {
        this._element = element;
    }

    hide() {
        this._element.hidden = true;
    }

    show() {
        this._element.hidden = false;
    }


    on(eventName, selector, callback) {
        this._element.addEventListener('click', (e) => {
            const delegateTarget = e.target.closest(selector);
            if (!delegateTarget || !this._element.contains(delegateTarget)) {
                return;
            }
            callback(e);
        })
    }
}