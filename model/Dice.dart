/** Anything which produces a dice roll */
interface Dice {
  DiceRoll roll();
}
class DiceRoll {
  int dice1;
  int dice2;
  int total() => dice1 + dice2;
  DiceRoll(this.dice1, this.dice2);
}
/** Produces a random roll each time this dice is rolled */
class RandomDice implements Dice {
  Random random;
  RandomDice(this.random);
  DiceRoll roll() => new DiceRoll(random.intFromOne(11) + 1, random.intFromOne(11) + 1);
}
/** Takes a roll from 36 predefined rolls */
class StackDice implements Dice {
  List<int> rolls;
  int reshuffleTreshold;
  int rollCount = 0;
  Random random;
  StackDice(this.random) {
    resetRolls();
  }
  DiceRoll roll() {
    rollCount++;
    if ((36-rollCount)== reshuffleTreshold)
      resetRolls();
    int totalRoll = rolls[random.intFromZero(rolls.length)];
    rolls.removeRange(rolls.indexOf(totalRoll), 1);
    return new DiceRoll(totalRoll / 6, totalRoll % 6);
  }
  void resetRolls() {
    if (rolls==null) {
      rolls = new List<int>();
    }
    rolls.clear();
    
    for (int first=1; first< 7; first++)
      for (int second=1; second<7; second++)
        rolls.add(first + second);
    reshuffleTreshold = random.intFromOne(6); 
  }
}
/** Dice where the rolls are known up-front for testing purposes */
class PredictableDice implements Dice {
  List<int> rolls; // the rolls to produce [DiceRoll]s from
  Iterator<int> rollsIterator;
  PredictableDice(this.rolls) {
    rollsIterator = rolls.iterator();
  }
  DiceRoll roll()  {
    int totalRoll = rollsIterator.next();
    return new DiceRoll(totalRoll / 6, totalRoll % 6);
  }
}