/** Anything which produces a dice roll */
interface Dice extends Testable default Oracle {
  DiceRoll roll();
  Dice.data(JsonObject json);
  Dice.type(String type);
}
interface DiceData extends JsonObject {
  String type;
}
class SupportedDices extends ImmutableL<Dice> {
  SupportedDices() : super([new RandomDice(), new PredictableDice(), new StackDice()]);
}
interface DiceRollData extends JsonObject {
  int dice1;
  int dice2;
}
class DiceRoll implements Jsonable {
  int dice1;
  int dice2;

  int total() => dice1 + dice2;
  DiceRoll(this.dice1, this.dice2);
  DiceRoll.fromTotal(int total) {
    if (total > 6) {
      dice1 = 6;
      dice2 = total - 6;
    } else {
      dice1 = total - 1;
      dice2 = 1;
    }
  }
  DiceRoll.data(JsonObject json) {
    DiceRollData data = json;
    dice1=data.dice1;
    dice2=data.dice2;
  }
  JsonObject get data() {
    DiceRollData d = new JsonObject();
    d.dice1 = dice1;
    d.dice2 = dice2;
    return d;
  }
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new DiceRoll(dice1, dice2) : new DiceRoll.data(data);
}
/** Produces a random roll each time this dice is rolled */
class RandomDice implements Dice, Jsonable {
  Random random;
  RandomDice([this.random]) {
    if (random == null) {
      random = new ClientRandom();
    }
  }
  DiceRoll roll() => new DiceRoll(random.intFromOne(6), random.intFromOne(6));
  JsonObject get data() {
    DiceData json = new JsonObject();
    json.type = Dartan.name(this);
    return json;
  }
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new RandomDice() : new Dice.data(data);
  test() {
    RandomDice dice = new RandomDice(new ClientRandom());
    HashMap<int, int> rolls = new HashMap<int, int>();
    for (int i=0; i<1000; i++) { // Roll the dice many times, add it to the roll count
      DiceRoll rollll = dice.roll();
      if (rolls[rollll.total()] == null)
        rolls[rollll.total()] = 0;
      rolls[rollll.total()]++;
    }

    for (int i=2; i< 13; i++) { // 2-12
      Expect.isTrue(rolls[i] != null, "${i} should have rolled at least once");
      Expect.isTrue(rolls[i] > 0, "${i} should have rolled at least once");
    }
  }
}
/** Takes a roll from 36 predefined rolls */
class StackDice implements Dice, Jsonable {
  List<int> rolls;
  int reshuffleTreshold;
  int rollCount = 0;
  Random random;
  StackDice.data(JsonObject json) {
  }
  StackDice([this.random]) {
    if (random == null)
      random = new ClientRandom();
    resetRolls();
  }
  /** Returns roll from 36 predefined rolls. Reshuffles if x rolls are left,
  where x is a random count between 1-6. */
  DiceRoll roll() {
    int totalRoll = rolls[random.intFromZero(rolls.length)];
    rolls.removeRange(rolls.indexOf(totalRoll), 1);
    rollCount++;
    if ((36-rollCount) == reshuffleTreshold)
      resetRolls();
    return new DiceRoll.fromTotal(totalRoll);
  }
  /** Remove all rolls and add 36 new dice rolls */
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
  JsonObject get data() {
    DiceData json = new JsonObject();
    json.type = Dartan.name(this);
    return json;
  }
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new StackDice() : new StackDice.data(data);
  test() {
    StackDice dice = new StackDice();
    dice.reshuffleTreshold = 0;
    HashMap<int, int> testRolls = new HashMap<int, int>();
    for (int i=1; i<37; i++) {
      DiceRoll rollll = dice.roll();
      if (testRolls[rollll.total()] == null)
        testRolls[rollll.total()]=0;
      testRolls[rollll.total()]++;
    }
    Expect.isTrue(testRolls[2] == 1, "2 should have been rolled 1x");
    Expect.isTrue(testRolls[3] == 2, "3 should have been rolled 2x");
    Expect.isTrue(testRolls[4] == 3, "4 should have been rolled 3x");
    Expect.isTrue(testRolls[5] == 4, "5 should have been rolled 4x");
    Expect.isTrue(testRolls[6] == 5, "6 should have been rolled 5x");
    Expect.isTrue(testRolls[7] == 6, "7 should have been rolled 6x");
    Expect.isTrue(testRolls[8] == 5, "8 should have been rolled 5x");
    Expect.isTrue(testRolls[9] == 4, "9 should have been rolled 4x");
    Expect.isTrue(testRolls[10] == 3, "10 should have been rolled 3x");
    Expect.isTrue(testRolls[11] == 2, "11 should have been rolled 2x");
    Expect.isTrue(testRolls[12] == 1, "12 should have been rolled 1x");
  }
}
/** Dice where the rolls are known up-front for testing purposes */
class PredictableDice implements Dice {
  List<int> rolls; // the rolls to produce [DiceRoll]s from
  Iterator<int> rollsIterator;
  PredictableDice([this.rolls]) {
    if (rolls == null)
      rolls = new List<int>();
    rollsIterator = rolls.iterator();
  }
  /** Returns next diceroll from stack */
  DiceRoll roll()  {
    Expect.isTrue(rollsIterator.hasNext(), "Out of rolls");
    int totalRoll = rollsIterator.next();
    return new DiceRoll.fromTotal(totalRoll);
  }
  test() {
    PredictableDice dice = new PredictableDice([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    for (int i=2; i< 13; i++) {
      DiceRoll diceRoll = dice.roll();
      Expect.isTrue(diceRoll.total() == i, "Expected to roll ${i}, instead got ${diceRoll.total()}");
    }
  }
  predict(int predictedRoll) {
    rolls.add(predictedRoll);
  }
}