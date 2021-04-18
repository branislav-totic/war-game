class Cat {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.rechargeTime = (1000 * this.health) / 100;
    this.damage = this.health / 100;
    this.critChance = 10 - (this.health / 10);
  }

  init(cats) {
    const loop = () =>{
      const targets = cats.filter((i) => i.name !== this.name && i.health > 0);
        const target = targets[Math.floor(Math.random() * targets.length)];
        this.attack(target);
        setTimeout(loop, this.rechargeTime)
    }
      this.attackInterval = setTimeout(loop, this.rechargeTime);
  }

  setHealth(dmg) {
    this.health = this.health - dmg;
    this.updateStats()
    if (this.health <= 0) {
      console.log(`\x1b[31m${this.name} eliminated! \x1b[0m`);
      clearInterval(this.attackInterval);
    } else {
      console.log(`${this.name} health`, this.health);
    }
  }

  updateStats() {
    this.rechargeTime = (1000 * this.health) / 100;
    this.damage = this.health / 100;
    this.critChance = 10 - (this.health / 10);
  }

  getDmg() {
    const critRole = Math.random() * 100 <= this.critChance;
    const critDmg = Math.random() * 5 * this.damage;
    return { isCrit: critRole, damage: critRole ? critDmg : this.damage };
  }

  attack(target) {
    if (this.health > 0 && target) {
      const { isCrit, damage } = this.getDmg();
      if (isCrit) {
        console.log(
          `${this.name} \x1b[31mcritical hit ${target.name} for ${damage} \x1b[0m`
        );
      } else {
        console.log(`${this.name} hit ${target.name} for ${damage}`);
      }
      target.setHealth(damage);
    } else {
      clearInterval(this.attackInterval);
    }
  }
}

module.exports = Cat;
