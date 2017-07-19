

之前使用React开发没有使用proptypes来定义类型，特此学习，并拓展到现有的项目里。


我对技术的认识在于，增加一个库或者插件，它能够解决实际项目中的哪些问题，多引入的部分代码能否解决相应的问题，如果对现有的业务代码，可维护性没有任何的帮助，那何必引入多余的代码，浪费资源。


试想一下，如此日常的一个小组件。

```
const Message = function(props){
    return (
        this.props.number > 0 && <div>{this.props.text}</div>
    )
}
```

如果我们调用组件的时候
```
<Message number={'string'} text={this.someHandle} />

```

如上，如果我传的参数不是我需要的，控制台可能会报出`uncaught error`。

也许，在你眼里，这是个很小的问题，或者会说，参数的问题可能是开发人员故意传错的。但是，如此的低级错误可能我们需要很多时间去排查。

__这时候开发人员就会想，如果我能为这个组件的prop-types设定类型校验，如果传值错了，就丢出相应的定位错误就好了__

`prop-types` 就完美的解决了这个问题。 

### 安装 ###

```
npm install --save prop-types
```

### 基本用法 ###

该类库提供基本的类型的判断

- PropTypes.array 数组
- PropTypes.bool  布尔
- PropTypes.func  函数
- PropTypes.string 字符串
- PropTypes.number  数组
- PropTypes.object  对象
- PropTypes.symbol  symbol类型

以上，只是一些基础的判断，当然有一些相对负责的判断

- React.PropTypes.node   所有可以被渲染的对象：数字，字符串，DOM 元素或包含这些类型的数组。
- React.PropTypes.element  一个React 元素
- React.PropTypes.instanceOf(Message) 用 JS 的 instanceof 操作符声明 prop 为类的实例。
- React.PropTypes.oneOf(['News', 'Photos']) 用 enum 来限制 prop 只接受指定的值。
- React.PropTypes.arrayOf(React.PropTypes.number) 指定类型组成的数组
- React.PropTypes.objectOf(React.PropTypes.number) 具有某种类型的属性值的对象
- React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    })
采取特定样式的对象

- React.PropTypes.func.isRequired  将isRequired类型连接到上边的任一类型上，表示这个属性是必须的

- React.PropTypes.func.isRequired  任何数据类型

- 自定义校验
    接收一个函数，参数以此为props，propName，和componentName ，记住他应该返回的是一个`Error`对象，不要console.warn或者throw 直接return new Error(...)就行

```
function(props,propName,componentName){
     if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
}
```

- 针对arrayof 和 objectof的自定义判断

```
  // 您还可以为`arrayOf`和`objectOf`提供自定义类型检查器。 如果检查失败，它应该返回一个Error对象。 
  // 检查器将为数组或对象中的每个键调用验证函数。 
  // 检查器有两个参数，第一个参数是数组或对象本身，第二个是当前项的键。
React.PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
```

使用的方法简单如下，写点demo好了

```
import React from 'react'
import ReactDOM from "react-dom";

import PropTypes from 'prop-types';
class Son extends React.Component{
   render(){
        return (<div style ={{padding:30}}>
                      {this.props.number}
                      <br/>
                      {this.props.array}
                      <br/>
                      {this.props.boolean.toString()}
                    </div>)
                  }
}
Son.propTypes = {
        number:PropTypes.number,
        array:PropTypes.array,
        boolean:PropTypes.bool,
        testOneOfType: PropTypes.oneOfType([PropTypes.number,PropTypes.string]).isRequired,
        testOneOf : PropTypes.oneOf(["1",2]),
        testObjShape: PropTypes.shape({
          key1: PropTypes.func,
          key2: PropTypes.array 
        }).isRequired

      }
class Father extends React.Component{
    render(){
         return (<Son
                       number = {1}

                       array = {[1,2,3]}
                       boolean = {true}
                       testOneOfType = {1}
                        testOneOf = {2}

                        testObjShape = {
                          {
                            key1: function(){},
                            key2: [1,2,3,4,5]
                          }
                        }
                       
                        />)
                  }
}

ReactDOM.render(<Father/> , div);


```

写了一些demo，复制执行就可以看到基本的用法。

Prop-Types 就是对你的props做了类型限定，能够快速的定位错误，同样，指定了类型，也能避免开发中一些很尴尬的问题。虽然多写了一些代码，但确实提高了工作效率和代码的可维护性。

__开发中使用了cdn上react生产版本，导致没有错误发现，后来将webpack里的externals中的react和react-dom替换为开发版本就出现了报错信息__



> 设置默认prop的值

```
Component.defaultProps = {
  key: value
}
```

在封装组件的时候，`defaultProps`显的特别有用。

特定的值，我们需要传递一个Object的参数来传递不同的参数来启动组件，有些时候，当然，这些字段里肯定有相关的默认值。

这样，我们的defaultProps就有了他的用武之地。

demo

```
ComName.defaultProps = {
  isY: true,
  tipText: 'this is a bad name'
}

```

The defaultProps will be used to ensure that this.props.name will have a value if it was not specified by the parent component. The propTypes typechecking happens after defaultProps are resolved, so typechecking will also apply to the defaultProps.

如果this.props.key没有被指定value，`defaultProps`用来保证this.props.key会有一个默认值。类型检查发生在defaultProps被解决后，所以类型检查也可以应用于defaultProps.
