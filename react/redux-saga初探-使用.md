概念

Effects
    Effect 是一个 javascript 对象，里面包含描述副作用的信息，可以通过 yield 传达给 sagaMiddleware 执行
```
yield call(fetch, UrlMap.fetchData)
```
API

- takeEvery
    循环监听某个触发动作，我们通常会使用while循环替代。

- call
    有阻塞地调用 saga 或者返回 promise 的函数，只在触发某个动作。


`
我们使用了 call(fn, ...args) 这个函数。与前面的例子不同的是，现在我们不立即执行异步调用，相反，call 创建了一条描述结果的信息。 就像在 Redux 里你使用 action 创建器，创建一个将被 Store 执行的、描述 action 的纯文本对象。 call 创建一个纯文本对象描述函数调用。redux-saga middleware 确保执行函数调用并在响应被 resolve 时恢复 generator。 
`

- put
    触发某个action， 作用和dispatch相同：

- select
    作用和 redux thunk 中的 getState 相同。
 ```  
var id = yield select(state=>state)
```
- take
    等待 dispatch 匹配某个 action 。

- fork(fn,...args)
  创建一条 Effect 描述信息，指示 middleware 以 无阻塞调用 方式执行 fn。

- cancel(task)
  创建一条Effect信息，指示middleware取消之前的fork任务。
  
## 结合示例代码分析


### 目录结构
    src
        main.js
        actions
        components
        reducers
        sagas
        services


#### main.js

```
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'
import sagaMonitor from '../../sagaMonitor'

const sagaMiddleware = createSagaMiddleware({sagaMonitor})
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

有关saga的部分 。暂时只需要知道将sagaMiddleware组装成一个sagaMiddleware交给sotre来处理。当可以上手实践了，我们再讨论源码的实现和更深入的原理

```
sagaMiddleware.run(rootSaga)

```

动态执行 saga。用于 applyMiddleware 阶段之后执行 Sagas。

#### saga.js

```
/* eslint-disable no-constant-condition */

import { take, put, call, fork, select, takeEvery, all } from '../../../../src/effects'
import * as actions from '../actions'
import { getCart } from '../reducers'
import { api } from '../services'

export function* getAllProducts() {
  const products = yield call(api.getProducts)
  
  yield put(actions.receiveProducts(products))
}

export function* checkout() {
    try {
      const cart = yield select(getCart)
      yield call(api.buyProducts, cart)
      yield put(actions.checkoutSuccess(cart))
    } catch(error) {
      yield put(actions.checkoutFailure(error))
    }
}

export function* watchGetProducts() {
  /*
    takeEvery will fork a new `checkout` task on each GET_ALL_PRODUCTS actions
    i.e. concurrent GET_ALL_PRODUCTS actions are allowed
  */
  yield takeEvery(actions.GET_ALL_PRODUCTS, getAllProducts)
}

export function* watchCheckout() {
  while(true) {
    yield take(actions.CHECKOUT_REQUEST)
    var time = yield call(checkout)
  }
}

export default function* root() {
  yield all([
    fork(getAllProducts),
    fork(watchGetProducts),
    fork(watchCheckout)
  ])
}

```


`rootSaga`被export 暴露出来 供sagaMiddleware使用。

`all` 有点类似于Promise.all.
当我们有三个需求，需要同时发出3个请求，并等待三个请求全部返回成功的情况下，我们就会用上Promise.all

```
Promise.all([fetchA,fetchB,fetchC])
      .then(Arr)
```

同样的场景，如果我们需要3个调用effect

我们可以像如下这样

```
function* rootSaga(){
  yield all([
    call(fetchA),
    call(fetchB),
    call(fetchC)
  ])

}
```
当我们run这个saga的时候，他会等待fetchA，B，C都执行成功，或者其中任何一个被rejected。


```
    fork(watchCheckout)

```
我们在来看一下fork这个方法。
call方法是阻塞调用，fork这个方法是无阻塞调用。

我们知道genrator生成器是阻塞的。
如下。
```
function* foo(){
  yield 1;
  yield 2;
  yield 3
} 
var it = foo()
it.next();
it.next()
it.next()
```
当foo执行时，会在第一个yield的位置暂停，只有调用next的时候才会向下执行到下一个yield的位置再度停止。也就是说。只有yield 1 执行完，调用next才会执行2 。

回到fork这个方法，fork是无阻塞调用

```
function* root(){
  yield fork(fetchA)
  yield fork(fetchB)
  yield fork(fetchC)
}
```
用fork调用。不会存在fetchA 之后 才会请求fetchB ,继而调用fetchC.不会造成阻塞。


再来说下take这个方法（take(pattern)）

创建一条effect描述信息，指示middleware等待store上指定的action。Generator会暂停，直到一个与pattern匹配的action被发起。

匹配条件pattern
  - pattern为空或者`*`,匹配所有的action

  - 如果是一个function,action会在如果是一个函数，action 会在 pattern(action) 返回为 true 时被匹配（例如，take(action => action.entities) 会匹配那些 entities 字段为真的 action）。
  - 如果是一个字符串，action 会在 action.type === pattern 时被匹配（例如，take(INCREMENT_ASYNC)）。
  - 如果参数是一个数组，会针对数组所有项，匹配与 action.type 相等的 action（例如，take([INCREMENT, DECREMENT]) 会匹配 INCREMENT 或 DECREMENT 类型的 action）。


  ```
  function* foo(){
    while(true){
      var action = yield take() //只要有任何action再执行
      var nowState = yield select()
      console.log(action)
      console.log(nowState)
    }
  }
  ```

甚至可以简单粗暴把take理解为在匹配对应的action然后执行对应的操作。这样的好处是我们不需要在action中做任何复杂的处理。保持了action的纯净。
用take匹配对应的action  ，执行相应的操作。

就像redux-thunk
如果是异步，我们可能需要将payload返回一个promise。而saga这部分逻辑就在generator里。action的功能更单一。抽象。

