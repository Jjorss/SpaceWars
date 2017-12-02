class EntityController {
  // takes in all entity controllers
  constructor(playerController, enemiesController) {
    this.playerController = playerController;
    this.enemiesController = enemiesController;
  }

  collisionCheck(){
    this.isPlayerEnemies();
    this.isMissileEneimes();
  }

  isPlayerEnemies(){
    //console.log(this.enemiesController.getEnemies());
    this.enemiesController.getEnemies().forEach((e)=>{
      if(e.getStatus && this.isCollided(e, this.playerController)) {
        e.setStatus(0);
        console.log("BOOM!");
      }
    });
  }

  isMissileEneimes() {
    this.enemiesController.getEnemies().forEach((e)=>{
      this.playerController.getMissilesController().getMissiles().forEach((m)=>{
        if(e.status && m.status) {
          if(this.isCollided(e, m)) {
            e.setStatus(0);
            m.setStatus(0);
          }
        }
      });
    });
  }

  isCollided(obj1, obj2) {
    let collided = false;
    if ((obj1.getX() < obj2.getX() + obj2.getWidth() &&
     obj1.getX() + obj1.getWidth() > obj2.getX() &&
     obj1.getY() < obj2.getY() + obj2.getHeight() &&
     obj1.getHeight() + obj1.getY() > obj2.getY())){
      collided = true;
    }
    return collided;
  }

  update(){
    this.collisionCheck();
    this.playerController.update();
    this.enemiesController.update();
  }

  render(){
    this.playerController.render();
    this.enemiesController.render();
  }

}
