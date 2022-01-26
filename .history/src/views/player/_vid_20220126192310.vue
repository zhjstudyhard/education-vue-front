<template>
    <!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="IE=edge" >
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
<title>Aliplayer在线配置</title>
<link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css" />
<script type="text/javascript" charset="utf-8" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"></script>
</head>
<body>
<div class="prism-player" id="player-con"></div>
</template>


<script>
// // import { getVideoPlayAuth } from "@/api/index/course";
// // export default {
// //   layout: "video", //应用video布局
//   //   asyncData({ params, error }) {

//   //     return getVideoPlayAuth(params.vid).then((response) => {
//   //       console.log("pay: ", response.data.data);
//   //       return {
//   //         playAuth: response.data.data.playAuth,
//   //         vid: params.vid,
//   //       };
//   //     });
//   //   },
// //   created() {
// //     if (this.$route.params && this.$route.params.id) {
// //       let data = { videoSourceId: this.$route.params.id };
// //       getVideoPlayAuth(data).then((response) => {
// //         // console.log("pay: ", response.data);
// //         return {
// //           playAuth: response.data,
// //           vid: this.$route.params.id,
// //         };

// //       });
// //     }
// //   },
// //   mounted() {
// //     new Aliplayer(
// //       {
// //         id: "J_prismPlayer",
// //         vid: this.vid, // 视频id
// //         playauth: this.playAuth, // 播放凭证
// //         encryptType: "1", // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
// //         width: "100%",
// //         height: "500px",
// //         // 以下可选设置
// //         cover: "http://guli.shop/photo/banner/1525939573202.jpg", // 封面
// //         qualitySort: "asc", // 清晰度排序
// //         mediaType: "video", // 返回音频还是视频
// //         autoplay: false, // 自动播放
// //         isLive: false, // 直播
// //         rePlay: false, // 循环播放
// //         preload: true,
// //         controlBarVisibility: "hover", // 控制条的显示方式：鼠标悬停
// //         useH5Prism: true, // 播放器类型：html5
// //       },
// //       function (player) {
// //         console.log("播放器创建成功");
// //       }
// //     );
// //   },
// // };
//
</script>
