part of Dartan;

class ListenableListTest {
  test() {
    testOnAdded();
    testOnRemoved();
    testAddList();
    testOffAdd();
  }
  void checkAdded(String item) {
    Expect.fail("Listener to add event should have been removed");
  }
  testOffAdd() {
    ListenableList<String> list = new ListenableList.from(["yo"]);
    final fail = (e) {
      Expect.fail("Listener to add event should have been removed");
    };
    list.onAdded(fail);
    list.offAdded(fail);
    list.add("wassup");
  }

  testSet() {
    ListenableList<String> list = new ListenableList.from(["yo"]);
    int eventHitCount = 0;
    list.onAdded((Resource r) {
      eventHitCount++;
    });
    list.onRemoved((Resource r) {
      eventHitCount++;
    });
    list[0] = "woei";
    Expect.equals(2, eventHitCount, "2 events fired");
  }

  testOnAdded() {
    ListenableList<String> list = new ListenableList.from(["yo"]);
    bool addedEventFired = false;
    bool changedEventFired = false;
    list.onAdded((String added) {
      Expect.equals("woei", added);
      Expect.equals(2, list.length, "2 items in the list");
      addedEventFired = true;
    });
    list.onChanged(() {
      changedEventFired = true;
    });
    list.add("woei");
    Expect.isTrue(addedEventFired, "Expected added event to be fired");
    Expect.isTrue(changedEventFired, "Expected changed event to be fired");
    Expect.equals(2, list.length, "Expected 2 items in the list");
  }

  testOnRemoved() {
    ListenableList<String> list = new ListenableList.from(["yo"]);
    bool removedEventFired = false;
    list.onRemoved((String removed) {
      removedEventFired = true;
      Expect.equals("yo", removed);
    });
    list.remove("yo");
    Expect.isTrue(removedEventFired, "expected remove event to be fired");
    Expect.equals(0, list.length, "Expected 0 items in the list");

    ListenableList<String> list2 = new ListenableList.from(["yo", "yo", "yo"]);
    int removedEventsFired = 0;
    list2.onRemoved((String removed) {
      removedEventsFired++;
      Expect.equals("yo", removed);
    });
    list2.onRemoved((String removed) {
      removedEventsFired++;
      Expect.equals("yo", removed);
    });
    list2.remove("yo");
    Expect.equals(2, removedEventsFired, "2 events caught");
    list2.remove("yo");
    Expect.equals(4, removedEventsFired, "4 events caught");
    Expect.equals(1, list2.length, "Expected 1 item in the list");
    var l = (String removed) {
      Expect.fail("handle should be ignored");
    };
    list2.onRemoved(l);
    list2.offRemoved(l);
    list2.remove("yo");
  }

  testAddList() {
    ListenableList<String> list = new ListenableList.from(["yo"]);
    bool listAddedEventFired = false;
    list.onListAdded((Collection<String> added) {
      Expect.equals(list[1], "yey", "Expected yey item in index=1");
      Expect.equals(list[2], "lol", "Expected lol item in index=2");

      Iterator<String> it = list.iterator();
      it.next(); // skip index=0;
      Expect.equals(it.next(), "yey", "Expected yey item in index=1");
      Expect.equals(it.next(), "lol", "Expected lol item in index=2");
      Expect.equals(list.length, 3, "Expected 3 items in the list");
      listAddedEventFired = true;
    });

    list.addAll(["yey", "lol"]);
    //Expect(
    Expect.isTrue(listAddedEventFired, "Expected listAdded event to be fired");
  }
}