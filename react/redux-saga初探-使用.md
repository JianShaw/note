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

