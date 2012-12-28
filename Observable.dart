// Makes events very terse!

part of Dartan;

typedef void Changed<T>();
typedef void Added<T>(T item);
typedef void Inserted<T>(T item, int insertedIndex);
typedef void Removed<T>(T item);
typedef void Sorted();
typedef void Replaced<T>(T item);
typedef void ListRemoved<T extends List<T>>(T removedList);
typedef void ListAdded<T extends Collection<T>>(T addedCollection);
typedef void ListInserted<T extends List<T>>(T insertedList);
typedef void ListReplaced<T extends List<T>>(T replacedList, int startIndex);
typedef void PropertyChanged<T>(T oldValue, T newValue);

/* Now if I could just...

  class ListenableList<T> implements List<T>, Testable {
    List<T> _internal;
    bool _fireIndividualItems = true;



                   past-tense event instance
                   ↓

    on Added added; // added.fire( { ... } );

                        // default: lazy instance by VM

    // calling event
    var newItem = new Item();
    added.fire(newItem);

    somewhere else...
    someListenableList.on.changed((T t) {
      print(t);
    });
  }

*/

class SupportedListenableLists extends ImmutableL<ListenableList> {
  SupportedListenableLists() : super([new ListenableList<String>()]);
}

abstract class Observable {
  void onSetted(String property, PropertyChanged handler);
  void offSetted(String property, PropertyChanged handler);
}

/** Helper for Observable implementors */
class ObservableHelper {
  Map<String, List<PropertyChanged>> listeners;
  ObservableHelper() : listeners = new Map();
  void addListener(String propertyName, PropertyChanged handler) {
    if (handler != null) {
      if (listeners[propertyName] == null) {
        listeners[propertyName] = new List<PropertyChanged>();
      }
      listeners[propertyName].add(handler);
    }
  }
  void removeListener(String propertyName, PropertyChanged handler) {
    if (handler != null && listeners[propertyName] != null) {
      int index = listeners[propertyName].indexOf(handler, 0);
      if (index != -1) {
        listeners[propertyName].removeRange(index, 1); //TODO: change to remove when possible
      }
    }
  }
  void fire(String propertyName, dynamic oldValue, dynamic newValue) {
    if (listeners[propertyName] != null && !listeners[propertyName].isEmpty) {
      for (PropertyChanged handler in listeners[propertyName]) {
        handler(oldValue, newValue);
      }
    }
  }
}

/* A list with removed, changed, added, listAdded, listInserted, listRemoved events
    ListenableList<String> list = new ListenableList.from(["yo"]);
    list.onRemoved((String removed) {
      print(removed);
    });
    list.remove("yo");
*/
class ListenableList<T> implements List<T>, Testable {
  List<T> _internal;
  bool _fireIndividualItems = true;

  List<Changed> changedListeners; // fired on *Removed, *Inserted, *Added
  List<Added> addedListeners;
  List<Inserted> insertedListeners;
  List<Removed> removedListeners;
  List<ListRemoved> listRemovedListeners;
  List<ListAdded> listAddedListeners;
  List<ListInserted> listInsertedListeners;

  /*
  on Changed changed;
  on Added added;
  on Removed removed;
  on Inserted inserted;
  on ListAdded listAdded;
  on ListRemoved listRemoved;
  on ListInserted listInserted;

  on set fireindividualItems; // declare propertychanged

  added(thing);  // automatically calls all handlers, event is never null

  someListenableList.on.added += (Changed c) {

  };

  someListenableList.on.set.fireIndividualItems += (bool fire) {
    // some something on property change
  };

  ^^ captures intent much better

  no more fireEventName, onEventName and offEventName methods

  implicit initialization of events? Auto-generated "on" interface?

  implicit shorthand

    on Changed changed;

  implicit shorthand implementation

    on add change(Changed c) { log("added handler ${c}"); }
    on remove change(Changed c) { log("removed handler ${c}"); }
    on fire change(Changed c) { log("changed ${c}"); }



  explicit verbose initialization

    on add change(Changed c) {
      on.change += c;

      someObject.call();
      magic.do();
    }

    on remove change(Changed c) {
      on.change -= c;

      anotherObject.update();
    }

    on fire change {
      on.c.foreach(
      someLog.log(c.name);
    }

  */

  /** Fire event per item when list mutations happen */
  bool get fireIndividualItems => _fireIndividualItems;

  init() {
    _internal = new List<T>();

    changedListeners = new List<Changed>();
    addedListeners = new List<Added>();
    insertedListeners = new List<Inserted>();
    removedListeners = new List<Removed>();
    listRemovedListeners = new List<ListRemoved>();
    listAddedListeners = new List<ListAdded>();
    listInsertedListeners = new List<ListInserted>();
  }

  ListenableList() {
    init();
  }

  ListenableList.from(Iterable<T> other)  {
    init();

    for (T item in other) {
      _internal.add(item);
    }
  }

  /* Changed */
  void onChanged(Changed changed) {
    changedListeners.add(changed);
  }
  void offChange(Changed changed) {
    _removeFromList(changedListeners, changed);
  }
  void _fireChanged() {
    for (Changed changed in changedListeners) {
      changed();
    }
  }

  /* Added */
  void onAdded(Added listener) {
    if (addedListeners == null) {
      addedListeners = new List<Added>();
    }

    addedListeners.add(listener);
  }
  void offAdded(Added added) {
    _removeFromList(addedListeners, added);
  }
  void _fireAdded(T item) {
    for (Added added in addedListeners) {
      added(item);
    }
  }
  void add(T toAdd) {
    _internal.add(toAdd);
    _fireAdded(toAdd);
    _fireChanged();
  }
  void addLast(T value)  {
    add(value);
  }



  /* Remove */
  void onRemoved(Removed removed) {
    removedListeners.add(removed);
  }
  void offRemoved(Removed<T> removed) {
    _removeFromList(removedListeners, removed);
  }
  void _fireRemoved(T item){
    for (Removed removed in removedListeners) {
      removed(item);
    }
  }
  bool remove(T item) {
    int index = _internal.indexOf(item);
    if (index != -1) {
      _internal.removeRange(index, 1);
      _fireRemoved(item);
      _fireChanged();
      return true;
    } else {
      return false;
    }
  }
  void _removeFromList(List list, Object item) {
    int index = list.indexOf(item, 0);
    if (index != -1) {
      list.removeRange(index, 1);
    }
  }
  T removeLast() {
    if (!_internal.isEmpty) {
      remove(_internal[_internal.length-1]);
    }
  }


  /* insert */
  void onInserted(Inserted<T> inserted) {
    insertedListeners.add(inserted);
  }
  void offInserted(Inserted<T> inserted) {
    _removeFromList(insertedListeners, inserted);
  }
  void _fireInserted(T insertedItem, int index) {
    for (Inserted<T> inserted in insertedListeners) {
      inserted(insertedItem, index);
    }
  }


  /* AddList */
  void onListAdded(ListAdded listAdded) {
    listAddedListeners.add(listAdded);
  }
  void _fireListAdded(Collection<T> added) {
    for (ListAdded listAdded in listAddedListeners) {
      listAdded(added);
    }

    if (_fireIndividualItems) {
      for (T item in added) {
        _fireAdded(item);
    }
      }
  }
  void addAll(Collection<T> collection)  {
    _internal.addAll(collection);
    _fireListAdded(collection);
    _fireChanged();
  }
  void offListAdded(ListAdded<T> listAdded){
    _removeFromList(listAddedListeners, listAdded);
  }

  /* RemoveList */
  void onListRemoved(ListRemoved<T> listRemoved) {
    listRemovedListeners.add(listRemoved);
  }
  void _fireListRemoved(List<T> removedList) {
    for (ListRemoved removed in listRemovedListeners) {
      removed(removedList);
    }

    if (_fireIndividualItems) {
      for (T item in removedList) {
        _fireRemoved(item);
    }
      }
  }
  void clear() {
    List<T> removedItems = _internal;
    _internal.clear();
    _fireListRemoved(removedItems);
    _fireChanged();
  }
  void removeRange(int start, int len){
    List<T> removedItems = new List();
    if (len != 0 && start < _internal.length){
      for (int i = 0; i < len; i++) {
        removedItems.add(_internal[start + i]);
      }

      Expect.equals(len, removedItems.length);
      _internal.removeRange(start, len);
      _fireListRemoved(removedItems);
      _fireChanged();
    }
  }
  void offListRemoved(ListRemoved<T> listRemoved) {
    _removeFromList(listRemovedListeners, listRemoved);
  }

  /* List inserted */
  void onListInsert(ListInserted<T> listInserted) {
    listInsertedListeners.add(listInserted);
  }
  void offListInsert(ListInserted<T> listInserted) {
    _removeFromList(listInsertedListeners, listInserted);
  }
  void _fireListInserted(List<T> insertedList) {
    for (ListInserted inserted in listInsertedListeners) {
      inserted(insertedList);
    }
  }

  void insertRange(int start, int length, [T initialValue]) {
    if (length > 0) {
      List<T> insertedItems = new List();
      for (int i=start; i < start+length; i++) {
        insertedItems.add(initialValue);
      }
      _internal.insertRange(start, length, initialValue);
      _fireListInserted(insertedItems);
      _fireChanged();

      int index = start;
      if (_fireIndividualItems) {
        for (T item in insertedItems) {
          _fireInserted(item, index);
        }
        index++;
      }
    }
  }

  void setRange(int start, int length, List<T> from, [int startFrom]) {
    if (from.length > 0) {
      List<T> removedItems = new List();
      for (int i = start; i< start + length; i++) {
        removedItems.add(_internal[i]);
      }
      _internal.setRange(start, length, from, startFrom);
      _fireListRemoved(removedItems);
      _fireListAdded(from);
      _fireChanged();
    }
  }

  void operator []=(int index, T value) {
    T old = _internal[index];
    _internal[index] = value;
    _fireRemoved(old);
    _fireAdded(value);
    _fireChanged();
  }

  void onSorted(Sorted sorted) {

  }

  // List<T>:
  T get first => _internal.first;
  T removeAt(int index) => _internal.removeAt(index);
  T operator [](int index) { return _internal[index]; }
  void set length(int newLength)  { /* nothing */ }
  T get last  { return _internal.last; }
  void sort([int compare(T a, T b)])  { _internal.sort(compare); }
  int indexOf(T element, [int start = 0]) { return _internal.indexOf(element, start); }
  int lastIndexOf(T element, [int start])  { return _internal.lastIndexOf(element, start); }
  List<T> getRange(int start, int length) { return _internal.getRange(start, length); }

  // Iterable<T>:
  Iterator<T> iterator() => _internal.iterator();

  // Collection<T>:
  T reduce(initial, combine(previous, T element)) => _internal.reduce(initial, combine);
  bool contains(T element) => _internal.contains(element);
  Collection<T> filter(bool f(T element)) => _internal.filter(f);
  Collection map(f(T element)) => _internal.map(f);
  bool every(bool f(T element)) => _internal.every(f);
  bool some(bool f(T element)) => _internal.some(f);
  void forEach(void f(T element)) { _internal.forEach(f); }
  bool get isEmpty => _internal.isEmpty;
  int get length => _internal.length;

  test() {
    return new ListenableListTest().test();
  }
}