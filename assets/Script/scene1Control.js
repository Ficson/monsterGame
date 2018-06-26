// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //玩家位置
        playerPostion: cc.v2(0, 0),
        //鼠标位置
        mousePosition: cc.v2(0, 0),
        //对象池
   
        //分数
        bulletPrefab: {
            type: cc.Prefab,
            default: null
        },

        //公告
        bulletin: {
            type: cc.Label,
            default: null
        },
        //玩家
        player: {
            type: cc.Node,
            default: null
        },
        //地面
        ground: {
            type: cc.Node,
            default: null
        }
    },


    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         //鼠标事件
         this.node.on(cc.Node.EventType.MOUSE_DOWN,this.onHandleMouseClick, this); // 开启物理系统
         var physics = cc.director.getPhysicsManager();
         physics.enabled = true;
         physics.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit;


         //初始化对象池---场景初始化加载中，创建需要数量的节点，放到对象池中
         /* this.bulletPool = new cc.NodePool();
         let initCount = 5;
         for (let i = 0; i < initCount; ++i) {
             let bullet = cc.instantiate(this.bulletPrefab); // 创建节点
             this.bulletPool.put(bullet); // 通过 putInPool 接口放入对象池
             cc.log("创建对象池对象");
            // cc.log('对象池大小'+ this.bulletPool.size);
         } */
         
     },

     //获取位置
     onHandleMouseClick: function (event) {
         cc.log("鼠标点击");
        // touchmove事件中 event.getLocation() 获取当前已左下角为锚点的触点位置（world point）
        this.mousePosition = event.getLocation();
        // 实际hero是background的子元素，所以坐标应该是随自己的父元素进行的，所以我们要将“world point”转化为“node point”
        this.playerPosition = this.player.getPosition();
        this.createBullet();
        cc.log("玩家所在位置" +  this.playerPosition.x,  this.playerPosition.y);
        cc.log("鼠标当前位置：", this.mousePosition.x, this.mousePosition.y);
        
    },  

    //产生子弹
      createBullet: function () {
         /*
            let bullet = null;
            //c1、当前对象池中的可用对象数量
            if (this.bulletPool.size > 0) {
                //_1、从对象池中获取对象
                bullet= this.bulletPool.get();  
                bullet.setPosition(this.playerPosition);  
                cc.log("我是子弹哦" + bullet);
            } else {
                //_2、若没有空闲的对象，也就是对象不够用时，就克隆节点
                bullet = cc.instantiate(this.bulletPrefab);
            }
            //c2、将生成的节点挂载到节点树上
           bullet.parent = this.node; //(或者node.addChild(新节点))
           bullet.getComponent("bullet").scene1Control = this;
           cc.log("产生一颗子弹")
            //c3、调用enemy的脚本进行初始化
            // bullet.getComponent('bullet').init();
            */
            cc.log("产生一颗子弹")

            var bullet = cc.instantiate(this.bulletPrefab);
            bullet.setPosition(this.playerPosition); 
            this.node.addChild(bullet);
            bullet.getComponent(cc.RigidBody).linearVelocity = this.mousePosition;
            bullet.getComponent("bullet").scene1Control = this;
            
        },

        //销毁子弹
        onBulletKilled: function (bullet) {
            this.bulletPool.put(bullet);
        },

    start () {

    },

    // update (dt) {},
});
