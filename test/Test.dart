part of Dartan;

/** Shows all objects grouped by interface with test results per object */
class Test extends View {
  bool performed = false;

  Test() {
    div = document.query(id);
  }
  show() {
    if (!performed) { // only test when plaed into view
      testAll();
      performed = true;
    }
  }
  /** Test all supported objects and show results in a table grouped per interface */
  void testAll() {
    String check = "<span class=checkOk>&#10004</span>";
    String noCheck = "&#10006";
    AllSupportedLists groups = new AllSupportedLists();
    int totalTests = 0;
    int passed = 0;
    int failed = 0;
    int none = 0;
    int groupsCount = 0;
    StringBuffer groupMsg = new StringBuffer();
    StringBuffer msg = new StringBuffer();
    for (Iterable<Testable> things in groups) {
      groupMsg.add("""<h3>${Dartan.supName(things)}</h3><ul class="testResults">""");
      groupsCount ++;
      for (Testable thing in things) {
        bool fail = false;
        String n = Dartan.name(thing);
        try {
          thing.test();
        } on Exception catch (ex) {
          fail = true;
          failed++;
          groupMsg.add("""<li><span class="failure">${noCheck} <strong>Fail: </strong></span><strong>${n} </strong><span class="failure">${ex.toString()}</span></li>""");
        }
        if (!fail) {
          passed++;
          groupMsg.add("""<li><span class="pass">${check} </span>${Dartan.name(thing)}</li>""");
        }
      }
      groupMsg.add("""</ul>""");
    }
    int totalClasses = failed+passed;
    msg.add("""<p>Performed total of <span class="number">${totalTests}</span> tests on <span class="number">${totalClasses}</span> classes grouped by <span class="number">${groupsCount}</span> interfaces</p>""");

    msg.add("""<ul class="testResults">""");
    msg.add("""<li><span class="failure">${noCheck} Failed:</span> ${failed}</li>""");
    msg.add("""<li><span class="pass">${check} Passed:</span> ${passed}</li>""");
    msg.add("""<li><span class="none"><strong>&#8709;</strong> Empty:</span> ${none}</p>""");
    msg.add("""</ul>""");
    msg.add(groupMsg.toString());
    div.innerHTML = msg.toString();
  }
}
