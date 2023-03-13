Page({
    data: {
        menuList: [
            '猪杂汤饭', '热干面', '麻辣香锅', '饺子', '螺蛳粉', '猪脚饭',
            '汤米粉', '过桥米线', '肯德基', '麦当劳', '冬菇滑鸡饭',
            '沙县小吃', '炒牛河', '凉皮', '炒米粉', '烧鸭饭',
            '鸡公煲', '茄子肉末饭', '红烧排骨饭', '炸鸡', '寿司'
        ],
        result: "今天吃什么",
        isStart: true,
        btnTxt: '开始'
    },
    onShow() {
        console.log(111);
        let avatarUrl = wx.getStorageSync('avatarUrl');
        let username = wx.getStorageSync('username');
        this.setData({
            avatarUrl,
            username
        })
    },
    handleLogin() {
        wx.navigateTo({
            url: '/pages/userInfo/userInfo'
        })
        /* wx.getUserProfile({
            desc: '获取用户基础信息',
            success: (result) => {
                // this.setData({'userInfo'})
                let {
                    nickName,
                    avatarUrl
                } = result.userInfo;
                let userInfo = {
                    nickName,
                    avatarUrl
                };
                this.setData({
                    "userInfo": userInfo
                });
            },
        }) */
    },
    timer: false,
    handleChangeResult() {
        let {
            avatarUrl,
            username,
            result,
            menuList,
            isStart
        } = this.data;
        let randomNumber;
        if (avatarUrl || username) {
            this.setData({
                'isStart': !isStart
            })
            if (isStart) {
                this.setData({
                    'btnTxt': '停止'
                })
                this.timer = setInterval(() => {
                    randomNumber = Math.floor(Math.random() * menuList.length)
                    this.setData({
                        'result': menuList[randomNumber]
                    })
                }, 100);
            } else {
                this.setData({
                    'btnTxt': '开始'
                })
                clearInterval(this.timer);
                wx.showToast({
                    title: '那就吃 ' + result + ' 噜',
                    duration: 3000,
                    mask: true,
                    icon: 'none'
                })
            }
        } else {
            wx.showToast({
                title: '请先登录哦',
                duration: 3000,
                mask: true,
                icon: 'error'
            })
        }
    },
    onShareAppMessage() {
        return {
            title: '自定义分享标题',
            path: '/page/user?id=123',
            success: function (res) {
                // 分享成功
            },
            fail: function (res) {
                // 分享失败
            }
        }
    },
})