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

/*
 *  获取区间一个随机数
 */
function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}


class ImgFigure extends React.Component {
    render() {
        let styleObj = {};

        // 如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }

        return ( < figure className = "img-figure"
            style = { styleObj } >
            < img src = { this.props.data.imageURL }
            alt = { this.props.data.desc }
            /> < figcaption >
            < h2 className = "img-title" > { this.props.data.title } < /h2> < /figcaption> < /figure>
        );
    }
}

class AppComponent extends React.Component {

        Constant: {
            centerPos: {
                left: 0,
                right: 0
            },

            hPosRange: { // 水平方向的取值范围
                leftSecX: [0, 0],
                rightSecX: [0, 0],
                y: [0, 0]
            },

            vPosRange: { // 垂直方向的取值范围
                x: [0, 0],
                topY: [0, 0]
            }
        }

        getInitialState() {
          return {
            imgsArrangeArr: []
          };
        }

        componentDidMount() {
            //首先拿到舞台的大小
            let stageDOM = React.findDOMNode(this.refs.stage),
                stageW = stageDOM.scrollWidth,
                stageH = stageDOM.scrollHeight,
                halfStageW = Math.ceil(stageW / 2),
                halfStageH = Math.ceil(stageH / 2);

            // imageFigure的大小
            let imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
                imgW = imgFigureDOM.scrollWidth,
                imgH = imgFigureDOM.scrollHeight,
                halfImgW = Math.ceil(imgW / 2),
                halfImgH = Math.ceil(imgH / 2);

            //计算中心图片的位置点
            this.Constant.centerPos = {
                left: halfStageW - halfImgW,
                top: halfStageH - halfImgH
            };

            // 计算左侧 右侧区域图片拍不排布位置的取值范围
            this.Constant.hPosRange.leftSecX[0] = -halfImgW;
            this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
            this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
            this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
            this.Constant.hPosRange.y[0] = -halfImgH;
            this.Constant.hPosRange.y[0] = stageH - halfImgH;


            //计算上侧区域图片排布位置的取值范围
            this.Constant.vPosRange.topY[0] = -halfImgH;
            this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
            this.Constant.vPosRange.x[0] = halfStageW - halfImgW;
            this.Constant.vPosRange.x[1] = halfStageW;

            this.rearrange(0);
        }

        /**
         *   重新布局所有图片
         *   @param centerIndex 指定居中排布哪张图片
         */
        rearrange(centerIndex) {
            let imgsArrangeArr = this.state.imgsArrangeArr,
                Constant = this.state.Constant,
                centerPos = Constant.centerPos,
                hPosRange = Constant.hPosRange,
                vPosRange = Constant.vPosRange,
                hPosRangeLeftSecX = hPosRange.leftSecX,
                hPosRangeRightSecX = hPosRange.rightSecX,
                hPosRangeY = hPosRange.Y,
                vPosRangeTopY = vPosRange.topY,
                vPosRangeX = vPosRange.x,

                imgsArrangeTopArr = [], //存储上侧区域图片状态信息
                topImgNum = Math.ceil(Math.random() * 2), // 取一个或者不取
                topImgSpliceIndex = 0, // 上侧图片是数组图片的索引

                imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

            //首先居中 centerIndex 的图片
            imgsArrangeCenterArr[0].pos = centerPos;

            //取出要布局上侧的图片的状态信息
            topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
            imgsArrangeTopArr = imgsArrangeTopArr.splice(topImgSpliceIndex, topImgNum);

            // 布局位于上侧的图片
            imgsArrangeTopArr.for(function(value, index) {
                imgsArrangeTopArr[index].pos = {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                }
            });

            // 布局左右两侧的图片
            for (let i = 0, j = imgsArrangeTopArr.length, k = j / 2; i < j; i++) {
                let hPosRangeLORX = null;

                // 前半部分布局左边，右半部分布局右边
                if (i < k) {
                    hPosRangeLORX = hPosRangeLeftSecX;
                } else {
                    hPosRangeLORX = hPosRangeRightSecX;
                }

                imgsArrangeArr[i].pos = {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                }

            }

            if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
                imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
            }

            imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });

        }

        //组件加载以后,为每张图片计算其位置的范围

        render() {
            let controllerUnits = [],
                imgFigures = [];

            imageDatas.forEach(function(value, index) {

                if (!this.state.imgsArrangeArr[index]) {
                    this.state.imgsArrangeArr[index] = {
                        pos: {
                            left: 0,
                            top: 0
                        }
                    }
                }

                imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]}/>);

            }.bind(this));

                return (
                    <section className="stage" ref="stage">
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
