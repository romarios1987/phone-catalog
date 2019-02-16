export default class Component {
  constructor({ element }) {
    this._element = element;
    this._callbackMap = {};
    this._props = {};
    this._state = {};
  }

  hide() {
    this._element.hidden = true;
  }

  show() {
    this._element.hidden = false;
  }

  // ПРАВИЛЬНОЕ ИЗМЕНЕНИЕ ВНУТРЕННЕГО СОСТОЯНИЯ
  _setState(newState) {
    this._state = {
      ...this._state,
      ...newState,
    };
    this._updateView(this._props, this._state);
  }


  // ПРАВИЛЬНОЕ ИЗМЕНЕНИЕ СВОЙСТВ
  setProps(newProps) {
    // Здесь пишем проверки
    // if (deepEqual(newProps, this._props)) {
    //   return;
    // }w

    this._props = {
      ...this._props,
      ...newProps,
    };
    this._updateView(this._props, this._state);
  }

  _updateView(props = {}, state = {}) {
    console.warn('Please implement _updateView');
  }


  on(eventName, elementName, callback) {
    this._element.addEventListener(eventName, (event) => {
      const delegateTarget = event.target.closest(`[data-element=${elementName}]`);
      if (!delegateTarget || !this._element.contains(delegateTarget)) {
        return;
      }
      callback(event);
    });
  }


  // subscribe(eventName, callback) {
  //   this._callbackMap[eventName] = callback;
  // }
  subscribe(eventName, callback) {
    if (!this._callbackMap[eventName]) {
      this._callbackMap[eventName] = [];
    }

    this._callbackMap[eventName].push(callback);
  }

  // emit(eventName, data) {
  //   const callback = this._callbackMap[eventName];
  //   if (!callback) return;
  //   callback(data);
  // }

  emit(eventName, data) {
    const eventCallbacks = this._callbackMap[eventName];

    if (!eventCallbacks) {
      return;
    }

    eventCallbacks.forEach((callback) => {
      callback(data);
    });
  }

  debounce(originalFunc, time) {
    this.originalFunc = originalFunc;
    let interval;
    return (...args) => {
      clearTimeout(interval);
      interval = setTimeout(() => {
        interval = null;
        this.originalFunc(...args);
      }, time);
    };
  }
}
