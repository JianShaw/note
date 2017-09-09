requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
  }
});

require([
    'ramda',
    'jquery'
  ],
  function (_, $) {
    var trace = _.curry(function(tag, x) {
      console.log(tag, x);
      return x;
    });
    // app goes here
    var Impure = {
        getJSON: _.curry(function(callback, url) {
            $.getJSON(url, callback);
        }),

        setHtml: _.curry(function(sel, html) {
            $(sel).html(html);
        })
    };
    var url = function (term) {
        return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?';
    };
    // var app = _.compose(Impure.getJSON(trace("response")), url);


    var obj = {a:5}
    var prop = _.curry(function(property, object){
        return object[property];
    });
    var _prop = prop('a');

    var img = function (url) {
        return $('<img />', { src: url });
    };
    //获取对象上的media 下的m
    var mediaUrl = _.compose( img, _.prop('m'), _.prop('media') );
    //获取items => 取来mediaUrl对象
    var srcs = _.compose(_.map(mediaUrl), _.prop('items'));
    // console.log(_prop(obj))
    //一旦得到了 items，就必须使用 map 来分解每一个 url；这样就得到了一个包含所有 src 的数组。把它和 app 联结起来，打印结果看看。
    var renderImages = _.compose(Impure.setHtml("body"), srcs);
    var app = _.compose(Impure.getJSON(renderImages), url);
        app("cats");

  });