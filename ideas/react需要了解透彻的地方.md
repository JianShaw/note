
something  need to know

- [Immutable.js](https://juejin.im/post/5948985ea0bb9f006bed7472)    

- [protypes](https://www.npmjs.com/package/prop-types)

在最近的版本中，已经将proptypes抽离，如果需要使用，需要独立安装，


```
//  cnpm install prop-types --save
import PropTypes from 'prop-types'; // ES6 
//基本用法
MyConponent.propTypes = {
    optionArray: PropTypes.array,
    optionReactElement: PropTypes.element
    //必须
    option: ProTypes.array.isRequired,
    //任何类型都可以
    optionany: Prototype.any.isRequired
}
```

使用方法可以访问[链接](https://www.npmjs.com/package/prop-types)

- context 

React的单向数据流可以很容易跟踪组件里的数据流动。

当然我们想通过组建树，而不是通过props一层层传递下去，这个时候可以使用context

首先在外层组件，添加`getChildContext()`和`childContextTypes`，

在需要调用的组件中，就可以用`context`属性来访问它


```
import PropTypes from 'prop-types'; // ES6 


import "./style.css"
import ReactDOM from "react-dom";
import React, { Component } from 'react';

// import App from './container/app';

class Button extends Component {
    constructor(props,context){
        super(props,context)
        console.log(context)
    }
    componentWillUpdate(nextProps,nextState,nextContext) {
        console.log(nextProps,nextState,nextContext)
    }
    
    render() {
        let css = `background: ${this.context.color}`;
        return (
            <button>
                {this.props.children}
            </button>
        );
    }
}
// 必须设定contextTypes不然传不到参数
Button.contextTypes = {
  color: PropTypes.string
};


class Message extends Component {
    render() {
        return (
            <div>
                {this.props.text} && <Button>Delete</Button>
            </div>
        );
    }
}

class MessageList extends Component {
    getChildContext() {
        return {color: "purple"};
    }
    render() {
        let children = this.props.messages.map(message=>{
            return <Message text={ message.text }/>
        });
        return (
            <div>
                {children}
            </div>
        );
    }
}
// 只能这么传
MessageList.childContextTypes = {
    color: PropTypes.string
}
var div = document.querySelector('#root');

var messages = [
    {
        text: '1111'
    },
     {
        text: '2222'
    },

]

ReactDOM.render(<MessageList messages={messages} /> , div);
```

- hook


- 路由是如何通过context传递下去的?