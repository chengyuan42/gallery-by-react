require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

// 获取图片相关的数据
let imageDatas = require('../data/imageDatas.json');

// 利用自执行函数,将图片名信息转成图片URL路径信息
imageDatas = (function getImageURL(imageDatasArr) {
    for (let i = 0; i < imageDatasArr.length; i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' +
            singleImageData.fileName);
    }
})(imageDatas);

class AppComponent extends React.Component {
    render() {
        return ( 
        	// < div className = "index" >
         //    < img src = { yeomanImage }
         //    alt = "Yeoman Generator" / >
         //    < div className = "notice" > Please edit < code > src / components / Main.js < /code> to get started!</div >
         //    < /div>
         <section className="stage" >
         	<section className="img-sec">
         	</section>
         	<nav className="controller-nav">
         	</nav>
         </section>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;