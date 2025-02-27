// let videoList = document.querySelectorAll('.video-list-container .list');

// videoList.forEach(vid => {
//   vid.onclick = () => {
//     let src = vid.querySelector('.list-video').src;
//     let title = vid.querySelector('.list-title').innerHTML;
//     console.log(title);
//     document.querySelector('.main-video-container .main-video').src = src;
//     document.querySelector('.main-video-container .main-video').play();
//     document.querySelector('.main-video-container .main-vid-title').innerHTML = title;
//   };
// });



$.ajax({
  type: "get",
  url: "/get/getVideo",
  success: function (res) {
    // console.log(res);
    // var newimgurl = res[0].url
    console.log(res);
    res.forEach(function (item, index) {
      // console.log(res[index].type)
      if (res[index].type === "iframe") {
        var newDiv = $("<div></div>").addClass("list")
        // console.log(newDiv)
        var newIf = $("<iframe></iframe>").attr("src", res[index].url).attr("width", "100%").attr("height", "100%").attr("frameborder", "0").attr("scrolling", "no").attr("allowfullscreen", "true").addClass("list-video iframe-size")
        var newh3 = $("<h3></h3>").addClass("list-title").text(res[index].title)
        newDiv.append(newIf).append(newh3)
        $(".video-list-container").append(newDiv)
        // console.log($(".video-list-container").length)
        // var target = $(".video-list-container .list")
        // target.append(newIf).append(newh3)
      } else if (res[index].type === "mp4") {
        var newDiv = $("<div></div>").addClass("list")
        console.log(newDiv)
        var newIf = $("<video></video>").attr("src", res[index].url).addClass("list-video")
        var newh3 = $("<h3></h3>").addClass("list-title").text(res[index].title)
        newDiv.append(newIf).append(newh3)
        $(".video-list-container").append(newDiv)
        // console.log($(".video-list-container").length)
      }

    });
    let videoList = document.querySelectorAll('.video-list-container .list');
    console.log($(".video-list-container").length)
    console.log(videoList.length)

    videoList.forEach(vid => {
      vid.onclick = () => {
        let media = vid.querySelector('.list-video');
        let title = vid.querySelector('.list-title').innerHTML;
        console.log(title);

        let mainVideoContainer = document.querySelector('.main-video-container .video-wrapper');

        // 检查是否是iframe
        if (media.tagName === 'IFRAME') {
          // 创建一个新的iframe元素，并设置其src
          let newIframe = document.createElement('iframe');
          newIframe.src = media.src;
          newIframe.style.height = "413px";
          newIframe.style.width = "735px";
          //是否显示滚动条，no是不显示
          newIframe.setAttribute('scrolling', 'no');
          //边框 0是无边框
          newIframe.setAttribute('border', '0');
          //也是边框
          newIframe.setAttribute('frameborder', 'no');
          //与内容间的距离
          newIframe.setAttribute('framespacing', '0');
          //是否允许内容在全屏显示
          newIframe.setAttribute('allowfullscreen', 'true');
          newIframe.classList.add('list-video'); // 可以根据需要添加或移除类名

          // 清空主视频容器，并插入新的iframe
          mainVideoContainer.innerHTML = '';
          mainVideoContainer.appendChild(newIframe);
        } else {
          // 对于非iframe视频，直接设置video元素的src并播放
          mainVideoContainer.innerHTML = '';
          var newVideo = document.createElement('video')
          newVideo.classList.add('main-video')
          // newVideo.class = 'main-video',这个方式添加不了类名
          // var box = document.getElement('mainVideoContainer')
          // box.appendChild(newVideo)
          newVideo.controls = true;
          newVideo.loop = true;
          mainVideoContainer.appendChild(newVideo)
          let mainVideo = document.querySelector('.main-video-container .main-video');
          console.log(mainVideo);
          mainVideo.src = media.src;
          mainVideo.play();

          //现代浏览器可能阻止没有用户交互的自动播放
          mainVideo.play().catch(error => {
            console.Console.error('自动播放被阻止', error)
          })
        }

        document.querySelector('.main-video-container .main-vid-title').innerHTML = title;
      };
    });
  },
  error: function (xhr, status, error) {
    console.error("获取最新动态出错：", error);
  }
});


// let videoList = document.querySelectorAll('.video-list-container .list');
// console.log($(".video-list-container").length)
// console.log(videoList.length)

// videoList.forEach(vid => {
//   vid.onclick = () => {
//     let media = vid.querySelector('.list-video');
//     let title = vid.querySelector('.list-title').innerHTML;
//     console.log(title);

//     let mainVideoContainer = document.querySelector('.main-video-container .video-wrapper');

//     // 检查是否是iframe
//     if (media.tagName === 'IFRAME') {
//       // 创建一个新的iframe元素，并设置其src
//       let newIframe = document.createElement('iframe');
//       newIframe.src = media.src;
//       newIframe.style.height = "413px";
//       newIframe.style.width = "735px";
//       //是否显示滚动条，no是不显示
//       newIframe.setAttribute('scrolling', 'no');
//       //边框 0是无边框
//       newIframe.setAttribute('border', '0');
//       //也是边框
//       newIframe.setAttribute('frameborder', 'no');
//       //与内容间的距离
//       newIframe.setAttribute('framespacing', '0');
//       //是否允许内容在全屏显示
//       newIframe.setAttribute('allowfullscreen', 'true');
//       newIframe.classList.add('list-video'); // 可以根据需要添加或移除类名

//       // 清空主视频容器，并插入新的iframe
//       mainVideoContainer.innerHTML = '';
//       mainVideoContainer.appendChild(newIframe);
//     } else {
//       // 对于非iframe视频，直接设置video元素的src并播放
//       mainVideoContainer.innerHTML = '';
//       var newVideo = document.createElement('video')
//       newVideo.classList.add('main-video')
//       // newVideo.class = 'main-video',这个方式添加不了类名
//       // var box = document.getElement('mainVideoContainer')
//       // box.appendChild(newVideo)
//       newVideo.controls = true;
//       newVideo.loop = true;
//       mainVideoContainer.appendChild(newVideo)
//       let mainVideo = document.querySelector('.main-video-container .main-video');
//       console.log(mainVideo);
//       mainVideo.src = media.src;
//       mainVideo.play();

//       //现代浏览器可能阻止没有用户交互的自动播放
//       mainVideo.play().catch(error => {
//         console.Console.error('自动播放被阻止', error)
//       })
//     }

//     document.querySelector('.main-video-container .main-vid-title').innerHTML = title;
//   };
// });

