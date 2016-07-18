require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

// 获取图片相关的数据
let imageDatas = require('../data/imageDatas.json');

// 利用自执行函数,将图片名信息转成图片URL路径信息
imageDatas = (function getImageURL(imageDatasArr) {
    for (let i = 0; i < imageDatasArr.length; i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' +
            singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
})(imageDatas);


class ImgFigure extends React.Component {
    render(){

        return (
            <figure className="img-figure">
                <img src={this.props.data.imageURL}
                    alt={this.props.data.desc} />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        );
    }
}

class AppComponent extends React.Component {
    render() {

        let controllerUnits = [],
            imgFigures = [];

        imageDatas.forEach(function(value){
            imgFigures.push(<ImgFigure data={value} />);
        });


        return (
             <section className="stage" >
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
             </section>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;
