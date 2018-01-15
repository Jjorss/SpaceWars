class LevelController {
  constructor() {
    this.difficulty = 1;
    this.difficultyChanged = false;
    this.basicSpawnRate = 0.2;
    this.sniperSpawnRate = 0.7;
    this.flagShipSpawnRate = 0.95;
    this.numberOfEnenemies = 4;
  }

  update() {
    this.determineDifficulty();
  }

  determineDifficulty() {
    if(KILLS % 5 === 0 && !this.difficultyChanged) {
      this.difficulty++;
      this.difficultyChanged = true;
      this.determineSpawnRates();
      if(this.difficulty % 7 === 0) {
        this.numberOfEnenemies++;
      }
      console.log('changing difficulty: ', this.difficulty, this.difficultyChanged);
      console.log('current enemy count: ', this.numberOfEnenemies);
      console.log(KILLS % 5 === 0 && !this.difficultyChanged);
    } else {
      if(KILLS % 5 != 0) {
        this.difficultyChanged = false;
      }
    }
  }


  determineSpawnRates() {
    this.basicSpawnRate -= this.difficulty/1000;
    this.sniperSpawnRate -= this.difficulty/1000;
    this.flagShipSpawnRate -= this.difficulty/1000;
  }
}
