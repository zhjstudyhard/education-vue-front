<template>
  <div>
    <Navbar
      class="navbar"
      id="nav"
      v-show="$route.name !== 'Home' || this.focusMode"
    ></Navbar>
    <!-- <div class="index_bgf9"> -->
    <div>
      <!-- 网校课程 开始 -->
      <div class="index_title">
        <h2>热门课程</h2>
      </div>
      <div class="main">
        <div class="index_video">
          <div class="bd">
            <ul>
              <li v-for="course in eduList" :key="course.id">
                <div class="img">
                  <img :src="course.cover" />
                </div>
                <div class="t">
                  <h4>{{ course.title }}</h4>
                  <p>
                    <span> 查看详情 </span>
                    <i>9634人学习</i>
                    <i>9634评论</i>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 网校名师 开始 -->
    <div class="index">
      <div class="teacher_sh moudle_sh">
        <div class="index_title2">
          <h2>名师大咖</h2>
        </div>
        <div class="main">
          <div class="teacher_b">
            <ul id="da-thumbs" class="da-thumbs clearfix">
              <li v-for="teacher in teacherList" :key="teacher.id">
                <a href="#">
                  <div class="img">
                    <img :src="teacher.avatar" />
                  </div>
                  <div
                    style="
                      display: block;
                      left: 100%;
                      top: 0px;
                      transition: all 300ms ease 0s;
                    "
                  >
                    <h3>{{ teacher.name }}</h3>
                    <p>{{ teacher.intro }}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIndexData } from "@/api/index/index";
import Navbar from "../../components/Navbar";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: ".swiper-pagination", //分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: ".swiper-button-next", //下一页dom节点
          prevEl: ".swiper-button-prev", //前一页dom节点
        },
      },
      //banner数组
      bannerList: [],
      eduList: [],
      teacherList: [],
    };
  },
  created() {
    // //调用查询banner的方法
    // this.getBannerList();
    //调用查询热门课程和名师的方法
    this.getHotCourseTeacher();
  },
  methods: {
    //查询热门课程和名师
    getHotCourseTeacher() {
      getIndexData().then((response) => {
        //  console.log("edu: ",response)
        this.eduList = response.eduList;
        this.teacherList = response.teacherList;
      });
    },
  },
};
</script>
<style scoped>
.index{
  margin-top: 200px;
}
.index_bgf9 {
  background: #f9fbff;
  /* background-color: black; */
  /* position: relative; */
}
.index_title {
  /* background-color: black; */
  padding: 10px 0 10px;
  text-align: center;
}
.index_title2 {
  /* background-color: black; */
  margin: 0px;
  text-align: center;
}
.main {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.index_video .bd ul {
  position: relative;
  width: 1220px;
}
ul,
li,
dl,
dt,
dd {
  list-style: none;
}
.index_video .bd ul li .img {
  position: relative;
  width: 224px;
  height: 148px;
}
.index_video .bd ul li .img img {
  width: 224px;
  border-radius: 10px;
  height: 148px;
}
img {
  border: none;
}
.index_video .bd ul li .t p {
  padding-top: 10px;
  font-size: 14px;
  color: #666;
  text-align: right;
}
.index_video .bd ul li {
  width: 224px;
  float: left;
  margin: 20px 20px 10px 0;
}
.index_video .bd ul li .t p span {
  float: left;
}
ul,
li,
dl,
dt,
dd {
  list-style: none;
}
ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
.teacher_b ul li {
  float: left;
  width: 20%;
  margin-bottom: 40px;
}
ul,
li,
dl,
dt,
dd {
  list-style: none;
}
.teacher_b ul li a {
  display: block;
  width: 165px;
  height: 165px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  overflow: hidden;
}
a {
  text-decoration: none;
  color: #000;
  cursor: pointer;
}
.teacher_b ul li a div {
  width: 165px;
  height: 165px;
  position: absolute;
  overflow: hidden;
  background: #fa534a;
}
.teacher_b ul li a div p {
  width: 95%;
  margin: 0 auto;
  font-size: 14px;
  color: #fff;
  line-height: 24px;
  text-align: left;
}
p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>