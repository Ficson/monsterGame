

cc.Class({
    extends: cc.Component,

    properties: {
        //玩家位置
        playerPostion: cc.v2(0, 0),
        //鼠标位置
        mousePosition: cc.v2(0, 0),
        //子弹数目
        bulletCount:cc.Integer,

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
         this.node.on(cc.Node.EventType.MOUSE_DOWN,this.onHandleMouseClick, this); 
         
         // 开启物理系统
         var physics = cc.director.getPhysicsManager();
         physics.enabled = true;
         physics.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit;
         physics.gravity = cc.v2(0,0);

         //开启碰撞检测
        /* var mngr = cc.director.getCollisionManager();
         mngr.enabled = true;
         mngr.enabledDebugDraw = true; */

         //初始化
         this.bulletCount = 3;

         
     },

     //获取位置
     onHandleMouseClick: function (event) {
        this.mousePosition = event.getLocation();
        this.mousePosition = this.player.parent.convertToNodeSpaceAR(this.mousePosition)
        this.playerPosition = this.player.getPosition();
        cc.log("玩家当前位置：", this.playerPosition.x, this.playerPosition.y);
        cc.log("鼠标当前位置：", this.mousePosition.x, this.mousePosition.y);
        this.createBullet();
        
    },  

    //产生子弹
      createBullet: function () {
          if (this.bulletCount > 0){
            this.bulletCount--;
            cc.log("产生一颗子弹")
            var bullet = cc.instantiate(this.bulletPrefab);
            bullet.setPosition(this.playerPosition); 
            this.node.addChild(bullet);
            var linearV = cc.pMult(cc.pNormalize(cc.pSub(this.mousePosition, this.playerPosition)),300);
            bullet.getComponent(cc.RigidBody).linearVelocity = linearV;
            bullet.getComponent("bullet").scene1Control = this;
          }else {
              cc.log("不够子弹");
          }
            
        },

        //销毁子弹
        onBulletKilled: function () {
           this.bulletCount++;
        },

    start () {

    },

    // update (dt) {},
});