
cc.Class({
    extends: cc.Component,
    properties: {
        speed: 0,
        // 暂存 Game 对象的引用
        scene1Control:{
            default:null,
            serializable: false
        },
        bulletPrefab: {
            type: cc.Prefab,
            default: null,
        },

    },

    // use this for initialization
    onLoad: function () {

    },
     onBeginContact: function (contact, selfCollider, otherCollider) {
        cc.log("撞上了啊啊啊啊啊啊");
        var selfNode = selfCollider.node;
        selfNode.parent.getComponent("scene1Control").onBulletKilled();
        selfNode.destroy();

    }, 
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        /* this.node.y = dt * this.speed;
        if (this.node.y > this.node.parent.width){
            this.bulletGroup.destroyBullet(this.node);
        } */
    },


});
