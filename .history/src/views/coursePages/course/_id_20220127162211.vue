<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="/courseIndex" title class="c-999 fsize14">首页</a>
        \
        <a href="/allCourseIndex" title class="c-999 fsize14">课程列表</a>
        \
        <span class="c-333 fsize14">{{ course.title }}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px">
          <section class="p-h-video-box" id="videoPlay">
            <img
              src="https://edu-firstly.oss-cn-hangzhou.aliyuncs.com/2022/01/21/5eb1dff3d14f413aa901a871d4805468wallhaven-g75r7d.jpg"
              alt="Java精品课程"
              class="dis c-v-pic"
            />
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ course.title }}</span>
            </h2>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14"
                >主讲： {{ course.teacherName }}&nbsp;&nbsp;&nbsp;</span
              >
            </section>
            <section class="c-attr-mt of"></section>
            <section class="c-attr-mt">
              <a
                :href="
                  '/video/' + course.chapterVos[0].children[0].videoSourceId
                "
                target="_blank"
                title="立即观看"
                class="comm-btn c-btn-3"
                >立即观看</a
              >
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol clearfix">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ course.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ course.viewCount }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p>
                        {{ course.description }}
                      </p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li
                            class="lh-menu-stair"
                            v-for="chapter in course.chapterVos"
                            :key="chapter.id"
                          >
                            <a
                              href="javascript: void(0)"
                              title="第一章"
                              class="current-1"
                            >
                              <em class="lh-menu-i-1 icon18 mr10"></em
                              >{{ chapter.title }}
                            </a>
                            <ol
                              class="lh-menu-ol"
                              style="display: block"
                              v-for="video in chapter.children"
                              :key="video.id"
                            >
                              <li class="lh-menu-second ml30">
                                <a
                                  :href="'/video/' + video.videoSourceId"
                                  target="_blank"
                                >
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em
                                  >{{ video.title }}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="评价">评价</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto">
                  <li>
                    <div class="u-face">
                      <router-link :to="'/teacher/' + course.teacherId">
                        <img
                          alt
                          :src="course.teacherAvatar"
                          width="50"
                          height="50"
                        />
                      </router-link>
                    </div>
                    <section class="hLh30 txtOf">
                      <router-link
                        :to="'/teacher/' + course.teacherId"
                        class="c-333 fsize16 fl"
                      >
                        {{ course.teacherName }}
                      </router-link>
                      <!-- <a class="c-333 fsize16 fl" href="#">{{course.teacherName}}</a> -->
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ course.career }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
  </div>
</template>

<script>
import { findByCourseId, getVideoPlayAuth } from "@/api/index/course";
import Comment from "@/components/Comment";
export default {
  components: { Comment },
  data() {
    return {
      course: {},
    };
  },
  created() {
    this.findByCourseId();
  },
  methods: {
    findByCourseId() {
      if (this.$route.params && this.$route.params.id) {
        let data = { id: this.$route.params.id };
        findByCourseId(data).then((response) => {
          // console.log("info: ",response.data)
          this.course = response.data;
        });
      }
    },
  },
};
</script>
