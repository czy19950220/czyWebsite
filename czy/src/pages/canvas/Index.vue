<template>
  <div id="body">
    <canvas id="canvas-turn" ref="canvas" :click="getPosition"></canvas>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        handPosition: {x: 400, y: 800}
      }
    },
    methods: {
      getPosition(e) {
        var x, y = 0;
        while (e != null) {
          x += e.offsetLeft;
          y += e.offsetTop;
          e = e.offsetParent;
        }
        return {x: x, y: y};
      },
      fanShu() {
        let self = this;

        class begin {
          constructor() {
            /*a是触摸点，
            f是触摸点相对的边缘角
            ，eh我们设置为af的垂直平分线，
            则g是af的中点，ab、ak、dj是直线；
            曲线cdb是起点为c，控制点为e，
            终点为b的二阶贝塞尔曲线；
            曲线kij是起点为k，控制点为h，
            终点为j的二阶贝塞尔曲线，
            区域A、B、C就由这些点和线划分开来。*/
            this.pointPaint = undefined;
            this.bgPaint = undefined;
            //region:获取画布
            this.fno = 0;
            this.canvas = document.getElementById(params.id);
            this.ctx = this.canvas.getContext("2d");
            this.defaultWidth = document.documentElement.clientWidth;//默认宽度
            this.defaultHeight = document.documentElement.clientHeight;//默认高度
            this.viewWidth = this.defaultWidth;
            this.viewHeight = this.defaultHeight;
            this.a = self.handPosition;
            this.f = {x: this.viewWidth, y: this.viewHeight};
            this.g = new MyPoint();
            this.e = new MyPoint();
            this.h = new MyPoint();
            this.c = new MyPoint();
            this.j = new MyPoint();
            this.b = new MyPoint();
            this.k = new MyPoint();
            this.d = new MyPoint();
            this.i = new MyPoint();
            this.reSize();//窗口大小改变
            this.startTopRight = false;//是否从右上角开始的翻书
            if (!this.canvas.getContext) {
              alert("不支持")
            }
            //endregion
            this.init();//canvas大小
            this.calcPointsXY(this.a, this.f);//各个点的坐标
            this.startTouch();//判断触摸点
            this.touchMove();//滑动式绘图
          }
          //开始触摸
          startTouch() {
            this.canvas.ontouchstart = (e) => {
              let x, y = 0;
              e = e || window.event;
              x = e.clientX || e.y || e.changedTouches[0].clientX;
              y = e.clientY || e.x || e.changedTouches[0].clientY;
              let windowWidth = document.documentElement.clientWidth;
              let windowHeight = document.documentElement.clientHeight;
              this.f = y > this.viewHeight / 2 ? {x: this.viewWidth, y: this.viewHeight} : {x: this.viewWidth, y: 0};
              this.startTopRight = y > this.viewHeight / 2 ? false : true;
              console.log(this.startTopRight);
            }
          }
          //触摸滑动中
          touchMove() {
            this.canvas.ontouchmove = (e) => {
              this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
              this.ctx.fillStyle = "#fff";
              let x, y = 0;
              e = e || window.event;
              x = (e.clientX || e.y || e.changedTouches[0].clientX) > this.viewWidth - 100 ? this.viewWidth / 2 - 100 : (e.clientX || e.y || e.changedTouches[0].clientX);
              if (this.startTopRight) {
                y = (e.clientY || e.x || e.changedTouches[0].clientY) > this.viewHeight / 2 ? this.viewHeight / 2 : (e.clientY || e.x || e.changedTouches[0].clientY);
              } else {
                y = (e.clientY || e.x || e.changedTouches[0].clientY) < this.viewHeight / 2 ? this.viewHeight / 2 : (e.clientY || e.x || e.changedTouches[0].clientY);
              }

              let windowWidth = document.documentElement.clientWidth;
              let windowHeight = document.documentElement.clientHeight;
              this.a = {x: x, y: y};
              this.calcPointsXY(this.a, this.f);
              /*if(this.calcPointCX(this.a,this.f)>0){
                this.a.x = x;
                this.a.y = y;
                this.calcPointsXY(this.a,this.f);
              }else {
                this.calcPointsXY(this.a,this.f);
              }*/
              //cbd 起点为c，控制点为e，终点为b；kij是起点为k，控制点为h，终点为j
              //绘制二次贝塞尔曲线
              /*this.drawQuXian(this.c.x, this.c.y, this.e.x, this.e.y, this.b.x, this.b.y);
              this.drawQuXian(this.k.x, this.k.y, this.h.x, this.h.y, this.j.x, this.j.y);
              this.drawZhiXian(this.a.x, this.a.y, this.b.x, this.b.y);
              this.drawZhiXian(this.a.x, this.a.y, this.k.x, this.k.y);
              this.drawZhiXian(this.d.x, this.d.y, this.i.x, this.i.y);*/
              this.makeAreaContentB();
              this.makeAreaContentC();
              if (this.startTopRight) {
                this.makeAreaContentATopRight();
              } else {
                this.makeAreaContentA();
              }
              this.onDraw();//描点
            }
          }

          /*区域A是由View左上角，左下角，曲线cdb，
           直线ab、ak，曲线kij，
           右上角连接而成的区域，
           修改BookPageView，
           利用path绘制处区域A*/
          makeAreaContentA() {
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.viewHeight);//移动到左下角
            this.ctx.lineTo(this.c.x, this.c.y);//移动到c点
            this.ctx.quadraticCurveTo(this.e.x, this.e.y, this.b.x, this.b.y);//从c到b画贝塞尔曲线，控制点为e
            this.ctx.lineTo(this.a.x, this.a.y);//移动到a点
            this.ctx.lineTo(this.k.x, this.k.y);//移动到k点
            this.ctx.quadraticCurveTo(this.h.x, this.h.y, this.j.x, this.j.y);//从k到j画贝塞尔曲线，控制点为h
            this.ctx.lineTo(this.viewWidth, 0);//移动到右上角
            this.ctx.lineTo(0, 0);//移动到右上角
            this.ctx.fillStyle = "#d6da81";
            this.ctx.fill();
          }

          makeAreaContentATopRight() {
            this.ctx.beginPath();
            this.ctx.lineTo(this.c.x, this.c.y);//移动到c点
            this.ctx.quadraticCurveTo(this.e.x, this.e.y, this.b.x, this.b.y);//从c到b画贝塞尔曲线，控制点为e
            this.ctx.lineTo(this.a.x, this.a.y);//移动到a点
            this.ctx.lineTo(this.k.x, this.k.y);//移动到k点
            this.ctx.quadraticCurveTo(this.h.x, this.h.y, this.j.x, this.j.y);//从k到j画贝塞尔曲线，控制点为h
            this.ctx.lineTo(this.viewWidth, this.viewHeight);//移动到右下角
            this.ctx.lineTo(0, this.viewHeight);//移动到左下角
            this.ctx.lineTo(0, 0);//移动到左上角
            this.ctx.fillStyle = "#d6da81";
            this.ctx.fill();
          }

          /*区域C理论上应该是由点a,b,d,i,k连接而成的闭合区域,
          但由于d和i是曲线上的点，我们没办法直接从d出发通过path绘制路径连接b点（i,k同理），
          也就不能只用path的情况下直接绘制出区域C，我们需要用PorterDuffXfermode方面的知识“曲线救国”。
          我们试着先将点a,b,d,i,k连接起来，观察闭合区域与区域A之间的联系。*/
          makeAreaContentC() {
            //this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.moveTo(this.i.x, this.i.y);//移动到i点
            this.ctx.lineTo(this.d.x, this.d.y);//移动到d点
            this.ctx.lineTo(this.b.x, this.b.y);//移动到b点
            this.ctx.lineTo(this.a.x, this.a.y);//移动到a点
            this.ctx.lineTo(this.k.x, this.k.y);//移动到k点
            this.ctx.fillStyle = "#da7556";
            this.ctx.fill();
          }

          makeAreaContentB() {
            //this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.lineTo(0, this.viewHeight);//移动到左下角
            this.ctx.lineTo(this.viewWidth, this.viewHeight);//移动到右下角
            this.ctx.lineTo(this.viewWidth, 0);//移动到右上角
            this.ctx.lineTo(0, 0);//移动到左上角
            this.ctx.fillStyle = "#9c7dda";
            this.ctx.fill();
          }

          //起始点,//控制点,// 结束点
          drawQuXian(begin1, begin2, control1, control2, end1, end2) {
            //this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx.moveTo(begin1, begin2); //起始点
            //绘制二次贝塞尔曲线
            this.ctx.quadraticCurveTo(control1, control2, end1, end2);
            this.ctx.stroke();
          }

          //起点，终点
          drawZhiXian(begin1, begin2, end1, end2) {
            this.ctx.beginPath();
            //设定笔触的位置
            this.ctx.moveTo(begin1, begin2);
            //设置移动的位置
            this.ctx.lineTo(end1, end2);
            //画线
            this.ctx.stroke();//这个时候的线已经出来了
            //关闭路径
          }


          //初始化设置画布宽高
          init() {
            let windowWidth = document.documentElement.clientWidth;
            let windowHeight = document.documentElement.clientHeight;
            /*if (windowWidth > 600) {
              windowWidth = 600;
            } else if (windowWidth < 600) {
              windowWidth = 600;
            }
            if (windowHeight > 1000) {
              windowHeight = 1000;
            } else if (windowHeight < 1000) {
              windowHeight = 1000;
            }*/
            this.canvas.width = windowWidth;
            this.canvas.height = windowHeight;
          }

          onDraw() {
            //绘制各标识点
            this.ctx.font = "20px 宋体";
            this.ctx.fillStyle = "#000000";
            this.ctx.fillText("a", this.a.x, this.a.y);
            this.ctx.fillText("f", this.f.x, this.f.y);
            this.ctx.fillText("g", this.g.x, this.g.y);
            this.ctx.fillText("e", this.e.x, this.e.y);
            this.ctx.fillText("h", this.h.x, this.h.y);
            this.ctx.fillText("c", this.c.x, this.c.y);
            this.ctx.fillText("j", this.j.x, this.j.y);
            this.ctx.fillText("b", this.b.x, this.b.y);
            this.ctx.fillText("k", this.k.x, this.k.y);
            this.ctx.fillText("d", this.d.x, this.d.y);
            this.ctx.fillText("i", this.i.x, this.i.y);
          }

          /**
           * 计算各点坐标
           * @param a
           * @param f
           */
          calcPointsXY(a, f) {
            this.g.x = (a.x + f.x) / 2;
            this.g.y = (a.y + f.y) / 2;
            this.e.x = this.g.x - (f.y - this.g.y) * (f.y - this.g.y) / (f.x - this.g.x);
            this.e.y = f.y;
            this.h.x = f.x;
            this.h.y = this.g.y - (f.x - this.g.x) * (f.x - this.g.x) / (f.y - this.g.y);
            this.c.x = this.e.x - (f.x - this.e.x) / 2;
            this.c.y = f.y;
            this.j.x = f.x;
            this.j.y = this.h.y - (f.y - this.h.y) / 2;
            this.b = this.getIntersectionPoint(a, this.e, this.c, this.j);
            this.k = this.getIntersectionPoint(a, this.h, this.c, this.j);
            this.d.x = (this.c.x + 2 * this.e.x + this.b.x) / 4;
            this.d.y = (2 * this.e.y + this.c.y + this.b.y) / 4;
            this.i.x = (this.j.x + 2 * this.h.x + this.k.x) / 4;
            this.i.y = (2 * this.h.y + this.j.y + this.k.y) / 4;
          }

          /**
           * 计算C点的X值
           * @param a
           * @param f
           * @return
           */
          calcPointCX(a, f) {
            this.g = new MyPoint();
            this.e = new MyPoint();
            this.g.x = (a.x + f.x) / 2;
            this.g.y = (a.y + f.y) / 2;

            this.e.x = this.g.x - (f.y - this.g.y) * (f.y - this.g.y) / (f.x - this.g.x);
            this.e.y = f.y;

            return this.e.x - (f.x - this.e.x) / 2;
          }

          /**
           * 计算两线段相交点坐标
           * @param lineOne_My_pointOne
           * @param lineOne_My_pointTwo
           * @param lineTwo_My_pointOne
           * @param lineTwo_My_pointTwo
           * @return 返回该点
           */
          getIntersectionPoint(lineOne_My_pointOne, lineOne_My_pointTwo, lineTwo_My_pointOne, lineTwo_My_pointTwo) {
            let x1, y1, x2, y2, x3, y3, x4, y4;
            x1 = lineOne_My_pointOne.x;
            y1 = lineOne_My_pointOne.y;
            x2 = lineOne_My_pointTwo.x;
            y2 = lineOne_My_pointTwo.y;
            x3 = lineTwo_My_pointOne.x;
            y3 = lineTwo_My_pointOne.y;
            x4 = lineTwo_My_pointTwo.x;
            y4 = lineTwo_My_pointTwo.y;
            let pointX = ((x1 - x2) * (x3 * y4 - x4 * y3) - (x3 - x4) * (x1 * y2 - x2 * y1)) / ((x3 - x4) * (y1 - y2) - (x1 - x2) * (y3 - y4));
            let pointY = ((y1 - y2) * (x3 * y4 - x4 * y3) - (x1 * y2 - x2 * y1) * (y3 - y4)) / ((y1 - y2) * (x3 - x4) - (x1 - x2) * (y3 - y4));
            return {x: pointX, y: pointY};
          }

          /*窗口大小改变*/
          reSize() {
            window.onresize = () => {
              this.defaultWidth = document.documentElement.clientWidth;//默认宽度
              this.defaultHeight = document.documentElement.clientHeight;//默认高度
              this.viewWidth = this.defaultWidth;
              this.viewHeight = this.defaultHeight;
              this.init();//canvas大小
              this.calcPointsXY(this.a, this.f);//各个点的坐标
            }
          }
        }

        class BookPageView {
          constructor() {
          }

        }

        class MyPoint {
          constructor() {
            this.x;
            this.y;
          }

          MyPoint() {
          }

          MyPoint(x, y) {
            this.x = x;
            this.y = y;
          }
        }


        let params = {id: "canvas-turn"};
        let fanShu = new begin(params);
      }
    },
    mounted() {
      this.fanShu();
    }
  }


</script>

<style scoped>
  #body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  canvas {
    position: relative;
    width: auto;
    height: auto;
  }
</style>
