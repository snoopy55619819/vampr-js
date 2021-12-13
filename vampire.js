class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
    }
    return currentVampire.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let currentVampire = this;
    let countParentNodes = 0;

    while (currentVampire.creator) {
      countParentNodes += 1;
      currentVampire = currentVampire.creator;
    }
    return countParentNodes;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const thisVampireDecendents = this.numberOfVampiresFromOriginal;
    const otherVampireDecendents = vampire.numberOfVampiresFromOriginal;
    return (thisVampireDecendents < otherVampireDecendents);
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this === vampire) {
      return this;
    }
    const youngerVampireParents = {};
    let youngerVampire = (this.isMoreSeniorThan(vampire) ? vampire : this);
    let olderVampire = (this.isMoreSeniorThan(vampire) ? this : vampire);

    while (youngerVampire.creator) {
      youngerVampireParents[youngerVampire.creator.name] = youngerVampire.creator.name;
      youngerVampire = youngerVampire.creator;
    }
    const condition = true;
    while (condition) {
      if (youngerVampireParents[olderVampire.name]) {
        return olderVampire;
      } else if (!olderVampire.creator) {
        return olderVampire;
      }
      olderVampire = olderVampire.creator;
    }
  }
}

module.exports = Vampire;

