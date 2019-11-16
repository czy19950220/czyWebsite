<template>
  <div id="app">
    <router-view/>
    <canvas id="c" style="position: absolute;z-index: -1;text-align: center;z-index: -1;top: 0px;left: 0px;"></canvas>
    <span style="color: #999;position: fixed;bottom: 20px;left: calc(50% - 140px);">ICP主体备案号:豫ICP备19022986号-1<i class="icon-beian"></i></span>
  </div>
</template>

<script>
  import './assets/css/basic.css';//引入格式化样式
  import jwtDecode from 'jwt-decode'

  export default {
    name: 'App',
    methods: {
      /**
       * @param value 值为object或者string、undefined、null
       * 判断该项内容是否为空
       * */
      isEmpty(value) {
        return (
          value === undefined ||
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
        );
      },
      aiXin() {
        return new Promise((resolve,reject) => {
          class Love {
            constructor() {
              //帧
              this.fno = 0;
              //获取画布
              this.canvas = document.getElementById(params.id);
              //上下文
              this.ctx = this.canvas.getContext("2d");
              //this.c = $("#c");
              this.w = 0;
              this.h = 0;//宽高
              this.pi = Math.PI;
              this.all_attribute = {
                num: 100,
                start_probability: 0.1,
                size_min: 1,
                size_max: 2,
                size_add_min: 0.3,
                size_add_max: 0.5,
                opacity_min: 0.3,
                opacity_max: 0.5,
                opacity_prev_min: .003,
                opacity_prev_max: .005,
                light_min: 0,
                light_max: 90,
              };
              this.style_color = this.find_random(0, 360);
              this.all_element = [];
              this.window_resize();
              $(window).resize(() => {
                this.window_resize();
              });
              this.start();
            }

            start = () => {
              let that = this;
              window.requestAnimationFrame(this.start);
              this.style_color += 0.1;
              this.ctx.fillStyle = 'hsl(' + this.style_color + ',100%,97%)';
              this.ctx.fillRect(0, 0, this.w, this.h);
              if (this.all_element.length < this.all_attribute.num && Math.random() < this.all_attribute.start_probability) {
                that.all_element.push(new ready_run);
              }
              this.all_element.map(function (line) {
                line.to_step();
              })
            }

            window_resize() {
              this.w = window.innerWidth;
              this.h = window.innerHeight;
              this.canvas.width = this.w;
              this.canvas.height = this.h;
            }

            find_random(num_one, num_two) {
              return Math.random() * (num_two - num_one) + num_one;
            }
          }

          class ready_run {
            constructor() {
              let t = Love;
              this.x = this.find_random(0, t.w);
              this.y = this.find_random(0, t.h);
              this.size = 0;
              this.size_change = 0;
              this.opacity = 0;
              this.opacity_change = 0;
              this.light = 0;
              this.color = 'hsl(' + t.style_color + ',100%,' + this.light + '%)';
            }

            to_reset() {
              let t = love || new Love(params);
              love = love || new Love(params);
              this.x = this.find_random(0, love.w);
              this.y = this.find_random(0, love.h);
              this.size = this.find_random(t.all_attribute.size_min, t.all_attribute.size_max);
              this.size_change = this.find_random(t.all_attribute.size_add_min, t.all_attribute.size_add_max);
              this.opacity = this.find_random(t.all_attribute.opacity_min, t.all_attribute.opacity_max);
              this.opacity_change = this.find_random(t.all_attribute.opacity_prev_min, t.all_attribute.opacity_prev_max);
              this.light = this.find_random(t.all_attribute.light_min, t.all_attribute.light_max);
              this.color = 'hsl(' + t.style_color + ',100%,' + this.light + '%)';
            }

            to_step() {
              let t = this;
              t.opacity -= t.opacity_change;
              t.size += t.size_change;
              if (t.opacity <= 0) {
                t.to_reset();
                return false;
              }
              love.ctx.fillStyle = t.color;
              love.ctx.globalAlpha = t.opacity;
              love.ctx.beginPath();
              this.arc_heart(t.x, t.y, t.size, t.size);
              love.ctx.closePath();
              love.ctx.fill();
              love.ctx.globalAlpha = 1;
            }

            find_random(num_one, num_two) {
              return Math.random() * (num_two - num_one) + num_one;
            }

            arc_heart(x, y, z, m) {
              y -= m * 10;
              love.ctx.moveTo(x, y);
              z *= 0.05;
              love.ctx.bezierCurveTo(x, y - 3 * z, x - 5 * z, y - 15 * z, x - 25 * z, y - 15 * z);
              love.ctx.bezierCurveTo(x - 55 * z, y - 15 * z, x - 55 * z, y + 22.5 * z, x - 55 * z, y + 22.5 * z);
              love.ctx.bezierCurveTo(x - 55 * z, y + 40 * z, x - 35 * z, y + 62 * z, x, y + 80 * z);
              love.ctx.bezierCurveTo(x + 35 * z, y + 62 * z, x + 55 * z, y + 40 * z, x + 55 * z, y + 22.5 * z);
              love.ctx.bezierCurveTo(x + 55 * z, y + 22.5 * z, x + 55 * z, y - 15 * z, x + 25 * z, y - 15 * z);
              love.ctx.bezierCurveTo(x + 10 * z, y - 15 * z, x, y - 3 * z, x, y);
            }
          }

          let params = {id: "c"};
          let love = new Love(params);
        })

      }
    },
    created() {
      if (localStorage.token) {
        //console.log(1111)
        let users = jwtDecode(localStorage.token);
        this.$store.dispatch('setisAuthenicated', !this.isEmpty(users));
        this.$store.dispatch('setUsers', users);
      }
    },
    mounted() {
      this.aiXin();
    }
  }
</script>

<style>
  html,body,#app {
    min-width: 300px;
    overflow: hidden;
  }

  .el-scrollbar {
    height: 100%;
  }

  .el-scrollbar__wrap {
    overflow: scroll;
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar {
    z-index: 9999;
  }

  .icon-beian{
    display: inline-block;
    width: 14px;
    height: 17px;
    background: url("https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/global/img/icons_441e82f.png") no-repeat -623px -96px;

  }

</style>
