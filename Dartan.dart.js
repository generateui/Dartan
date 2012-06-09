function Isolate() {}
init();

var $ = Isolate.$isolateProperties;
Isolate.$defineClass("ExceptionImplementation", "Object", ["_msg"], {
 toString$0: function() {
  var t1 = this._msg;
  if (t1 === (void 0)) {
    t1 = 'Exception';
  } else {
    t1 = 'Exception: ' + $.S(t1);
  }
  return t1;
 },
 is$Exception: true
});

Isolate.$defineClass("HashMapImplementation", "Object", ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"], {
 toString$0: function() {
  return $.mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.list_16 = list;
  t1.i_22 = 0;
  this.forEach$1(new $.Closure40(t1));
  return t1.list_16;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.list_14 = list;
  t1.i_2 = 0;
  this.forEach$1(new $.Closure26(t1));
  return t1.list_14;
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(f, 1, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    if (!(key === (void 0)) && !(key === $.CTC9)) {
      f.$call$2(key, $.index(this._values, i));
    }
  }
 },
 forEach$1$bailout: function(f, state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      var length$ = $.get$length(this._keys);
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, length$)) break L0;
        var key = $.index(this._keys, i);
        if (!(key === (void 0)) && !(key === $.CTC9)) {
          f.$call$2(key, $.index(this._values, i));
        }
        ++i;
      }
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, (void 0));
    $.indexSet(this._keys, index, $.CTC9);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) {
    return;
  }
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  if ($.index(this._keys, index) === (void 0) || $.index(this._keys, index) === $.CTC9) {
    this._numberOfEntries = $.add(this._numberOfEntries, 1);
  }
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, (void 0));
    $.indexSet(this._values, i, (void 0));
  }
 },
 clear$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      this._numberOfEntries = 0;
      this._numberOfDeleted = 0;
      var length$ = $.get$length(this._keys);
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, length$)) break L0;
        $.indexSet(this._keys, i, (void 0));
        $.indexSet(this._values, i, (void 0));
        ++i;
      }
  }
 },
 _grow$1: function(newCapacity) {
  $.assert($._isPowerOfTwo(newCapacity));
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number') return this._grow$1$bailout(newCapacity, 1, capacity, 0, 0);
  this._loadLimit = $._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object'||oldKeys.constructor !== Array)) return this._grow$1$bailout(newCapacity, 2, capacity, oldKeys, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object'||oldValues.constructor !== Array)) return this._grow$1$bailout(newCapacity, 3, capacity, oldKeys, oldValues);
  this._keys = $.List(newCapacity);
  var t1 = $.List(newCapacity);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
  for (var i = 0; i < capacity; ++i) {
    t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    if (t2 === (void 0) || t2 === $.CTC9) {
      continue;
    }
    t1 = oldValues.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t3 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t3);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(newCapacity, state, env0, env1, env2) {
  switch (state) {
    case 1:
      capacity = env0;
      break;
    case 2:
      capacity = env0;
      oldKeys = env1;
      break;
    case 3:
      capacity = env0;
      oldKeys = env1;
      oldValues = env2;
      break;
  }
  switch (state) {
    case 0:
      $.assert($._isPowerOfTwo(newCapacity));
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $._computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.List(newCapacity);
      var t1 = $.List(newCapacity);
      $.setRuntimeTypeInfo(t1, ({E: 'V'}));
      this._values = t1;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, capacity)) break L0;
        c$0:{
          var key = $.index(oldKeys, i);
          if (key === (void 0) || key === $.CTC9) {
            break c$0;
          } else {
          }
          var value = $.index(oldValues, i);
          var newIndex = this._probeForAdding$1(key);
          $.indexSet(this._keys, newIndex, key);
          $.indexSet(this._values, newIndex, value);
        }
        ++i;
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree)) {
    this._grow$1($.get$length(this._keys));
  }
 },
 _probeForLookup$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
  for (var numberOfProbes = 1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) {
      return -1;
    }
    if ($.eqB(existingKey, key)) {
      return hash;
    }
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(key, 1, hash);
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) {
      if ($.ltB(insertionIndex, 0)) {
        return hash;
      }
      return insertionIndex;
    } else {
      if ($.eqB(existingKey, key)) {
        return hash;
      } else {
        if ($.ltB(insertionIndex, 0) && $.CTC9 === existingKey) {
          insertionIndex = hash;
        }
      }
    }
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1$bailout: function(key, state, env0) {
  switch (state) {
    case 1:
      hash = env0;
      break;
  }
  switch (state) {
    case 0:
      var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
      L0: while (true) {
        if (!true) break L0;
        var existingKey = $.index(this._keys, hash);
        if (existingKey === (void 0)) {
          if ($.ltB(insertionIndex, 0)) {
            return hash;
          } else {
          }
          return insertionIndex;
        } else {
          if ($.eqB(existingKey, key)) {
            return hash;
          } else {
            if ($.ltB(insertionIndex, 0) && $.CTC9 === existingKey) {
              insertionIndex = hash;
            }
          }
        }
        var numberOfProbes0 = numberOfProbes + 1;
        hash = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
        numberOfProbes = numberOfProbes0;
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $._computeLoadLimit(8);
  this._keys = $.List(8);
  var t1 = $.List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("HashSetImplementation", "Object", ["_backingMap?"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $.HashSetIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 filter$1: function(f) {
  var t1 = ({});
  t1.f_14 = f;
  var result = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  t1.result_2 = result;
  $.forEach(this._backingMap, new $.Closure37(t1));
  return t1.result_2;
 },
 forEach$1: function(f) {
  var t1 = ({});
  t1.f_13 = f;
  $.forEach(this._backingMap, new $.Closure36(t1));
 },
 addAll$1: function(collection) {
  $.forEach(collection, new $.Closure35(this));
 },
 remove$1: function(value) {
  if (this._backingMap.containsKey$1(value) !== true) {
    return false;
  }
  this._backingMap.remove$1(value);
  return true;
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  $.indexSet(this._backingMap, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$0();
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("HashSetIterator", "Object", ["_nextValidIndex", "_entries"], {
 _advance$0: function() {
  var length$ = $.get$length(this._entries);
  if (typeof length$ !== 'number') return this._advance$0$bailout(1, length$);
  var entry = (void 0);
  do {
    var t1 = $.add(this._nextValidIndex, 1);
    this._nextValidIndex = t1;
    if ($.geB(t1, length$)) {
      break;
    }
    entry = $.index(this._entries, this._nextValidIndex);
  } while ((entry === (void 0) || entry === $.CTC9));
 },
 _advance$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      var length$ = $.get$length(this._entries);
    case 1:
      state = 0;
      var entry = (void 0);
      L0: while (true) {
        var t1 = $.add(this._nextValidIndex, 1);
        this._nextValidIndex = t1;
        if ($.geB(t1, length$)) {
          break;
        } else {
        }
        entry = $.index(this._entries, this._nextValidIndex);
        if (!(entry === (void 0) || entry === $.CTC9)) break L0;
      }
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC3);
  }
  var res = $.index(this._entries, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  if ($.geB(this._nextValidIndex, $.get$length(this._entries))) {
    return false;
  }
  if ($.index(this._entries, this._nextValidIndex) === $.CTC9) {
    this._advance$0();
  }
  return $.lt(this._nextValidIndex, $.get$length(this._entries));
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
});

Isolate.$defineClass("_DeletedKeySentinel", "Object", [], {
});

Isolate.$defineClass("KeyValuePair", "Object", ["value=", "key?"], {
});

Isolate.$defineClass("LinkedHashMapImplementation", "Object", ["_map", "_lib2_list"], {
 toString$0: function() {
  return $.mapToString(this);
 },
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._lib2_list);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._map);
 },
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
 },
 forEach$1: function(f) {
  var t1 = ({});
  t1.f_12 = f;
  $.forEach(this._lib2_list, new $.Closure19(t1));
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.list_15 = list;
  t1.index_22 = 0;
  $.forEach(this._lib2_list, new $.Closure39(t1));
  $.assert($.eq(t1.index_22, $.get$length(this)));
  return t1.list_15;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.list_13 = list;
  t1.index_2 = 0;
  $.forEach(this._lib2_list, new $.Closure25(t1));
  $.assert($.eq(t1.index_2, $.get$length(this)));
  return t1.list_13;
 },
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry === (void 0)) {
    return;
  }
  entry.remove$0();
  return entry.get$element().get$value();
 },
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry === (void 0)) {
    return;
  }
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  if (this._map.containsKey$1(key) === true) {
    $.index(this._map, key).get$element().set$value(value);
  } else {
    $.addLast(this._lib2_list, $.KeyValuePair$2(key, value));
    $.indexSet(this._map, key, this._lib2_list.lastEntry$0());
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$0();
  var t1 = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(t1, ({E: 'KeyValuePair<K, V>'}));
  this._lib2_list = t1;
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("DoubleLinkedQueueEntry", "Object", ["_lib2_element?", "_next=", "_previous="], {
 get$element: function() {
  return this._lib2_element;
 },
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
 },
 _asNonSentinelEntry$0: function() {
  return this;
 },
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = (void 0);
  this._previous = (void 0);
  return this._lib2_element;
 },
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$1(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this._previous, this);
 },
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._lib2_element = e;
 }
});

Isolate.$defineClass("_DoubleLinkedQueueEntrySentinel", "DoubleLinkedQueueEntry", ["_lib2_element", "_next", "_previous"], {
 get$element: function() {
  throw $.captureStackTrace($.CTC8);
 },
 _asNonSentinelEntry$0: function() {
  return;
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC8);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 }
});

Isolate.$defineClass("DoubleLinkedQueue", "Object", ["_sentinel"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$1(this._sentinel);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(other, ({E: 'E'}));
  var entry = this._sentinel.get$_next();
  for (; !(entry === this._sentinel); ) {
    var nextEntry = entry.get$_next();
    if (f.$call$1(entry.get$_lib2_element()) === true) {
      other.addLast$1(entry.get$_lib2_element());
    }
    entry = nextEntry;
  }
  return other;
 },
 forEach$1: function(f) {
  var entry = this._sentinel.get$_next();
  for (; !(entry === this._sentinel); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_lib2_element());
    entry = nextEntry;
  }
 },
 clear$0: function() {
  var t1 = this._sentinel;
  this._sentinel.set$_next(t1);
  t1 = this._sentinel;
  this._sentinel.set$_previous(t1);
 },
 isEmpty$0: function() {
  return this._sentinel.get$_next() === this._sentinel;
 },
 get$length: function() {
  var t1 = ({});
  t1.counter_1 = 0;
  this.forEach$1(new $.Closure18(t1));
  return t1.counter_1;
 },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
 },
 last$0: function() {
  return this._sentinel.get$_previous().get$element();
 },
 first$0: function() {
  return this._sentinel.get$_next().get$element();
 },
 get$first: function() { return new $.Closure82(this, 'first$0'); },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection); t1.hasNext$0() === true; ) {
    this.add$1(t1.next$0());
  }
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$0();
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  this._sentinel = t1;
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_DoubleLinkedQueueIterator", "Object", ["_currentEntry", "_sentinel"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC3);
  }
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 hasNext$0: function() {
  return !(this._currentEntry.get$_next() === this._sentinel);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
});

Isolate.$defineClass("StringBufferImpl", "Object", ["_length", "_buffer"], {
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) {
    return '';
  }
  if ($.get$length(this._buffer) === 1) {
    return $.index(this._buffer, 0);
  }
  var result = $.concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this._buffer = t1;
  this._length = 0;
  return this;
 },
 addAll$1: function(objects) {
  for (var t1 = $.iterator(objects); t1.hasNext$0() === true; ) {
    this.add$1(t1.next$0());
  }
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str === (void 0) || $.isEmpty(str) === true) {
    return this;
  }
  $.add$1(this._buffer, str);
  this._length = $.add(this._length, $.get$length(str));
  return this;
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
});

Isolate.$defineClass("JSSyntaxRegExp", "Object", ["ignoreCase?", "multiLine?", "pattern?"], {
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$2(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m === (void 0)) {
    return;
  }
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$5(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
});

Isolate.$defineClass("MatchImplementation", "Object", ["_groups", "_end", "_lib2_start", "str", "pattern?"], {
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 },
 get$group: function() { return new $.Closure84(this, 'group$1'); },
 end$0: function() {
  return this._end;
 },
 start$0: function() {
  return this._lib2_start;
 }
});

Isolate.$defineClass("_AllMatchesIterable", "Object", ["_str", "_re"], {
 iterator$0: function() {
  return $._AllMatchesIterator$2(this._re, this._str);
 }
});

Isolate.$defineClass("_AllMatchesIterator", "Object", ["_done", "_next=", "_str", "_re"], {
 hasNext$0: function() {
  if (this._done === true) {
    return false;
  } else {
    if (!$.eqNullB(this._next)) {
      return true;
    }
  }
  this._next = this._re.firstMatch$1(this._str);
  if ($.eqNullB(this._next)) {
    this._done = true;
    return false;
  } else {
    return true;
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC3);
  }
  var next = this._next;
  this._next = (void 0);
  return next;
 }
});

Isolate.$defineClass("DateImplementation", "Object", ["_isUtc", "value?"], {
 _asJs$0: function() {
  return $.lazyAsJsDate(this);
 },
 add$1: function(duration) {
  $.checkNull(duration);
  return $.DateImplementation$fromEpoch$2($.add(this.value, duration.get$inMilliseconds()), this.isUtc$0());
 },
 toString$0: function() {
  var t1 = new $.Closure32();
  var t2 = new $.Closure33();
  var t3 = new $.Closure34();
  var y = t1.$call$1(this.get$year());
  var m = t3.$call$1(this.get$month());
  var d = t3.$call$1(this.get$day());
  var h = t3.$call$1(this.get$hours());
  var min = t3.$call$1(this.get$minutes());
  var sec = t3.$call$1(this.get$seconds());
  var ms = t2.$call$1(this.get$milliseconds());
  if (this.isUtc$0() === true) {
    return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms) + 'Z';
  } else {
    return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms);
  }
 },
 isUtc$0: function() {
  return this._isUtc;
 },
 get$milliseconds: function() {
  return $.getMilliseconds(this);
 },
 get$seconds: function() {
  return $.getSeconds(this);
 },
 get$minutes: function() {
  return $.getMinutes(this);
 },
 get$hours: function() {
  return $.getHours(this);
 },
 get$day: function() {
  return $.getDay(this);
 },
 get$month: function() {
  return $.getMonth(this);
 },
 get$year: function() {
  return $.getYear(this);
 },
 hashCode$0: function() {
  return this.value;
 },
 operator$ge$1: function(other) {
  return $.ge(this.value, other.get$value());
 },
 operator$gt$1: function(other) {
  return $.gt(this.value, other.get$value());
 },
 operator$le$1: function(other) {
  return $.le(this.value, other.get$value());
 },
 operator$lt$1: function(other) {
  return $.lt(this.value, other.get$value());
 },
 operator$eq$1: function(other) {
  if (!((typeof other === 'object') && !!other.is$DateImplementation)) {
    return false;
  }
  return $.eq(this.value, other.value);
 },
 DateImplementation$now$0: function() {
  this._asJs$0();
 },
 is$DateImplementation: true,
 is$Hashable: true
});

Isolate.$defineClass("ListIterator", "Object", ["list!", "i"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.NoMoreElementsException$0());
  }
  var value = (this.list[this.i]);
  this.i = $.add(this.i, 1);
  return value;
 },
 hasNext$0: function() {
  return $.lt(this.i, (this.list.length));
 }
});

Isolate.$defineClass("Closure83", "Object", [], {
 toString$0: function() {
  return 'Closure';
 }
});

Isolate.$defineClass("ConstantMap", "Object", ["_lib4_keys?", "_jsObject", "length?"], {
 clear$0: function() {
  return this._throwImmutable$0();
 },
 remove$1: function(key) {
  return this._throwImmutable$0();
 },
 operator$indexSet$2: function(key, val) {
  return this._throwImmutable$0();
 },
 _throwImmutable$0: function() {
  throw $.captureStackTrace($.CTC18);
 },
 toString$0: function() {
  return $.mapToString(this);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 getValues$0: function() {
  var t1 = ({});
  t1.result_12 = [];
  $.forEach(this._lib4_keys, new $.Closure55(this, t1));
  return t1.result_12;
 },
 getKeys$0: function() {
  return this._lib4_keys;
 },
 forEach$1: function(f) {
  var t1 = ({});
  t1.f_15 = f;
  $.forEach(this._lib4_keys, new $.Closure54(this, t1));
 },
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true) {
    return;
  }
  return $.jsPropertyAccess(this._jsObject, key);
 },
 containsKey$1: function(key) {
  if ($.eqB(key, '__proto__')) {
    return false;
  }
  return $.jsHasOwnProperty(this._jsObject, key);
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("MetaInfo", "Object", ["set?", "tags", "tag?"], {
});

Isolate.$defineClass("StringMatch", "Object", ["pattern?", "str", "_start"], {
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(group_));
  }
  return this.pattern;
 },
 get$group: function() { return new $.Closure84(this, 'group$1'); },
 operator$index$1: function(g) {
  return this.group$1(g);
 },
 end$0: function() {
  return $.add(this._start, $.get$length(this.pattern));
 },
 start$0: function() {
  return this._start;
 }
});

Isolate.$defineClass("Object", "", [], {
 noSuchMethod$2: function(name$, args) {
  throw $.captureStackTrace($.NoSuchMethodException$4(this, name$, args, (void 0)));
 },
 toString$0: function() {
  return $.objectToString(this);
 },
 _lib3_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib5_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib6_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib6_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib7_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib4_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 createTileVisual$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('createTileVisual', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'createTileVisual', [])
},
 hasActions$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasActions', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasActions', [arg0])
},
 equals$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('equals', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'equals', [arg0])
},
 getValues$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getValues', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getValues', [])
},
 showText$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('showText', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'showText', [arg0, arg1, arg2])
},
 $dom_addEventListener$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_addEventListener', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_addEventListener', [arg0, arg1, arg2])
},
 highestOrLeftestCell$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('highestOrLeftestCell', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'highestOrLeftestCell', [])
},
 removeUser$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeUser', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeUser', [arg0])
},
 floor$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('floor', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'floor', [])
},
 testAll$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('testAll', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'testAll', [])
},
 truncate$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('truncate', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'truncate', [])
},
 operator$le$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$le', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$le', [arg0])
},
 charCodeAt$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('charCodeAt', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'charCodeAt', [arg0])
},
 $dom_getItem$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getItem', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getItem', [arg0])
},
 openNewGame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('openNewGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'openNewGame', [])
},
 total$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('total', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'total', [])
},
 isInfinite$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isInfinite', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isInfinite', [])
},
 clearTimeout$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('clearTimeout', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'clearTimeout', [arg0])
},
 chatSomething$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('chatSomething', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'chatSomething', [])
},
 $dom_querySelectorAll$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_querySelectorAll', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_querySelectorAll', [arg0])
},
 $dom_querySelectorAll$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_querySelectorAll', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_querySelectorAll', [arg0])
},
 $dom_querySelectorAll$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_querySelectorAll', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_querySelectorAll', [arg0])
},
 joinNewGame$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('joinNewGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'joinNewGame', [])
},
 chatABitMore$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('chatABitMore', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'chatABitMore', [])
},
 onSetted$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('onSetted', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'onSetted', [arg0, arg1])
},
 placeChits$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('placeChits', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'placeChits', [arg0])
},
 _lib3_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib5_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib6_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib6_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib7_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib4_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib5_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib6_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib6_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib7_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib2_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib2_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib4_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib5_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib6_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib6_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib7_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib2_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib2_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 _lib4_swapCellsIfNecesary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_swapCellsIfNecesary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_swapCellsIfNecesary', [])
},
 fromDirection$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('fromDirection', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'fromDirection', [arg0])
},
 round$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('round', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'round', [])
},
 operator$div$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$div', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$div', [arg0])
},
 $dom_setItem$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_setItem', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_setItem', [arg0, arg1])
},
 _lib3_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib6_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib6_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib7_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib2_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib2_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib4_isDigit$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isDigit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isDigit', [arg0])
},
 _lib3_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib6_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib6_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib7_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib2_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib2_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 _lib4_token$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_token', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_token', [])
},
 addAllPhasesToList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addAllPhasesToList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addAllPhasesToList', [])
},
 _lib3_classname$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_classname', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_classname', [])
},
 _lib5_classname$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_classname', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_classname', [])
},
 _lib6_classname$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_classname', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_classname', [])
},
 _lib6_classname$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_classname', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_classname', [])
},
 _lib7_classname$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_classname', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_classname', [])
},
 _lib2_classname$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_classname', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_classname', [])
},
 _classname$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_classname', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_classname', [])
},
 _lib2_classname$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_classname', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_classname', [])
},
 _lib4_classname$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_classname', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_classname', [])
},
 operator$tdiv$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$tdiv', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$tdiv', [arg0])
},
 from2DMatrix$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('from2DMatrix', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'from2DMatrix', [arg0, arg1])
},
 _calculateCells$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateCells', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateCells', [])
},
 _lib5_calculateCells$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateCells', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateCells', [])
},
 _lib6_calculateCells$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateCells', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateCells', [])
},
 _lib6_calculateCells$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateCells', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateCells', [])
},
 _lib7_calculateCells$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateCells', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateCells', [])
},
 _lib2_calculateCells$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateCells', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateCells', [])
},
 _lib_calculateCells$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateCells', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateCells', [])
},
 _lib2_calculateCells$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateCells', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateCells', [])
},
 _lib4_calculateCells$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateCells', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateCells', [])
},
 toInt$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('toInt', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'toInt', [])
},
 setupUI$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setupUI', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setupUI', [])
},
 sendToUser$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('sendToUser', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'sendToUser', [arg0, arg1])
},
 _lib3_read$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_read', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_read', [])
},
 _lib5_read$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_read', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_read', [])
},
 _lib6_read$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_read', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_read', [])
},
 _lib6_read$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_read', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_read', [])
},
 _lib7_read$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_read', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_read', [])
},
 _lib2_read$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_read', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_read', [])
},
 _read$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_read', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_read', [])
},
 _lib2_read$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_read', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_read', [])
},
 _lib4_read$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_read', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_read', [])
},
 showAllEdges$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('showAllEdges', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'showAllEdges', [])
},
 _addEventHandlers$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEventHandlers', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEventHandlers', [arg0])
},
 _lib5_addEventHandlers$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEventHandlers', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEventHandlers', [arg0])
},
 _lib6_addEventHandlers$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEventHandlers', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEventHandlers', [arg0])
},
 _lib6_addEventHandlers$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEventHandlers', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEventHandlers', [arg0])
},
 _lib7_addEventHandlers$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEventHandlers', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEventHandlers', [arg0])
},
 _lib2_addEventHandlers$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEventHandlers', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEventHandlers', [arg0])
},
 _lib_addEventHandlers$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEventHandlers', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEventHandlers', [arg0])
},
 _lib2_addEventHandlers$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEventHandlers', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEventHandlers', [arg0])
},
 _lib4_addEventHandlers$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEventHandlers', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEventHandlers', [arg0])
},
 _setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib5_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib6_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib6_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib7_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib2_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib2_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib4_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib5_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib6_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib6_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib7_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib2_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib2_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib4_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib5_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib6_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib6_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib7_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib2_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib2_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib4_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib5_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib6_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib6_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib7_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib2_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib2_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib4_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib5_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib6_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib6_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib7_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib2_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib2_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 _lib4_setFromData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setFromData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setFromData', [arg0])
},
 $dom_appendChild$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_appendChild', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_appendChild', [arg0])
},
 isUtc$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isUtc', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isUtc', [])
},
 isUtc$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isUtc', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isUtc', [])
},
 firstMatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('firstMatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'firstMatch', [arg0])
},
 doGame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('doGame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'doGame', [arg0])
},
 _lib3_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib6_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib6_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib7_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib2_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib2_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 _lib4_char$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_char', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_char', [])
},
 remove$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('remove', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'remove', [])
},
 remove$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('remove', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'remove', [arg0])
},
 remove$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('remove', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'remove', [arg0])
},
 noRedChitsAround$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('noRedChitsAround', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'noRedChitsAround', [arg0])
},
 hasNext$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasNext', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasNext', [])
},
 _add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0])
},
 _lib5_add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0])
},
 _lib6_add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0])
},
 _lib6_add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0])
},
 _lib7_add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0])
},
 _lib2_add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0])
},
 _lib_add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0])
},
 _lib2_add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0])
},
 _lib4_add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0])
},
 _add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib5_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib6_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib6_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib7_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib2_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib2_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib4_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 $dom_removeChild$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_removeChild', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_removeChild', [arg0])
},
 previousEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('previousEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'previousEntry', [])
},
 allMatches$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('allMatches', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'allMatches', [arg0])
},
 copy$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('copy', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'copy', [])
},
 copy$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('copy', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'copy', [arg0])
},
 addUser$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addUser', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addUser', [arg0])
},
 changeTile$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('changeTile', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'changeTile', [arg0])
},
 changeTile$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('changeTile', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'changeTile', [arg0])
},
 xyVertice$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('xyVertice', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'xyVertice', [arg0])
},
 doLobby$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('doLobby', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'doLobby', [arg0])
},
 updateCircle$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('updateCircle', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'updateCircle', [])
},
 $dom_getElementsByName$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getElementsByName', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getElementsByName', [arg0])
},
 operator$mul$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$mul', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$mul', [arg0])
},
 click$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('click', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'click', [])
},
 click$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('click', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'click', [arg0])
},
 add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'add', [arg0])
},
 toTable$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('toTable', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'toTable', [arg0])
},
 horizontalLine$4: function (arg0, arg1, arg2, arg3) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('horizontalLine', [arg0, arg1, arg2, arg3])
      : $.Object.prototype.noSuchMethod$2.call(this, 'horizontalLine', [arg0, arg1, arg2, arg3])
},
 $dom_querySelector$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_querySelector', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_querySelector', [arg0])
},
 $dom_querySelector$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_querySelector', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_querySelector', [arg0])
},
 $dom_querySelector$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_querySelector', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_querySelector', [arg0])
},
 contains$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('contains', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'contains', [arg0])
},
 contains$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('contains', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'contains', [arg0, arg1])
},
 initr$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('initr', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'initr', [])
},
 ensureAllPhasesPresent$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('ensureAllPhasesPresent', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'ensureAllPhasesPresent', [])
},
 userById$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('userById', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'userById', [arg0])
},
 inlineResourceList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('inlineResourceList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'inlineResourceList', [arg0])
},
 addAll$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addAll', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addAll', [arg0])
},
 _portChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_portChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_portChange', [arg0, arg1])
},
 _lib5_portChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_portChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_portChange', [arg0, arg1])
},
 _lib6_portChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_portChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_portChange', [arg0, arg1])
},
 _lib6_portChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_portChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_portChange', [arg0, arg1])
},
 _lib7_portChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_portChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_portChange', [arg0, arg1])
},
 _lib2_portChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_portChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_portChange', [arg0, arg1])
},
 _lib_portChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_portChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_portChange', [arg0, arg1])
},
 _lib2_portChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_portChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_portChange', [arg0, arg1])
},
 _lib4_portChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_portChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_portChange', [arg0, arg1])
},
 makeSeaSurrounding$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('makeSeaSurrounding', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'makeSeaSurrounding', [])
},
 endsWith$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('endsWith', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'endsWith', [arg0])
},
 _chitChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_chitChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_chitChange', [arg0, arg1])
},
 _lib5_chitChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_chitChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_chitChange', [arg0, arg1])
},
 _lib6_chitChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_chitChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_chitChange', [arg0, arg1])
},
 _lib6_chitChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_chitChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_chitChange', [arg0, arg1])
},
 _lib7_chitChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_chitChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_chitChange', [arg0, arg1])
},
 _lib2_chitChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_chitChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_chitChange', [arg0, arg1])
},
 _lib_chitChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_chitChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_chitChange', [arg0, arg1])
},
 _lib2_chitChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_chitChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_chitChange', [arg0, arg1])
},
 _lib4_chitChange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_chitChange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_chitChange', [arg0, arg1])
},
 _lib3_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib6_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib6_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib7_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib2_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib2_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 _lib4_parseList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseList', [])
},
 update$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('update', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'update', [arg0])
},
 _calculateVertices$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateVertices', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateVertices', [])
},
 _lib5_calculateVertices$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateVertices', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateVertices', [])
},
 _lib6_calculateVertices$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateVertices', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateVertices', [])
},
 _lib6_calculateVertices$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateVertices', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateVertices', [])
},
 _lib7_calculateVertices$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateVertices', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateVertices', [])
},
 _lib2_calculateVertices$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateVertices', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateVertices', [])
},
 _lib_calculateVertices$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateVertices', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateVertices', [])
},
 _lib2_calculateVertices$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateVertices', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateVertices', [])
},
 _lib4_calculateVertices$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_calculateVertices', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_calculateVertices', [])
},
 writeSummary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('writeSummary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'writeSummary', [])
},
 queryAll$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('queryAll', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'queryAll', [arg0])
},
 addItem$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addItem', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addItem', [arg0])
},
 _lib3_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib6_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib6_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib7_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib2_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib2_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 _lib4_parseNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseNumber', [])
},
 $dom_createElementNS$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_createElementNS', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_createElementNS', [arg0, arg1])
},
 indexOf$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('indexOf', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'indexOf', [arg0])
},
 indexOf$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('indexOf', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'indexOf', [arg0, arg1])
},
 _lib3_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib6_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib6_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib7_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib2_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib2_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 _lib4_parseValue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseValue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseValue', [])
},
 operator$sub$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$sub', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$sub', [arg0])
},
 _extractElements$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_extractElements', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_extractElements', [arg0])
},
 _lib5_extractElements$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_extractElements', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_extractElements', [arg0])
},
 _lib6_extractElements$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_extractElements', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_extractElements', [arg0])
},
 _lib6_extractElements$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_extractElements', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_extractElements', [arg0])
},
 _lib7_extractElements$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_extractElements', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_extractElements', [arg0])
},
 _lib2_extractElements$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_extractElements', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_extractElements', [arg0])
},
 _lib_extractElements$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_extractElements', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_extractElements', [arg0])
},
 _lib2_extractElements$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_extractElements', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_extractElements', [arg0])
},
 _lib4_extractElements$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_extractElements', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_extractElements', [arg0])
},
 abs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('abs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'abs', [])
},
 clear$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('clear', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'clear', [])
},
 $dom_key$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_key', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_key', [arg0])
},
 addTile$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addTile', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addTile', [arg0])
},
 addTile$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addTile', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addTile', [arg0])
},
 addTile$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addTile', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addTile', [arg0])
},
 $dom_removeEventListener$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_removeEventListener', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_removeEventListener', [arg0, arg1, arg2])
},
 mouseOut$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('mouseOut', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'mouseOut', [arg0])
},
 $call$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [])
},
 $call$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [arg0])
},
 $call$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [arg0, arg1])
},
 forEach$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('forEach', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'forEach', [arg0])
},
 operator$indexSet$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$indexSet', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$indexSet', [arg0, arg1])
},
 _lib3_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib6_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib6_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib7_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib2_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib2_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib4_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib3_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib6_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib6_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib7_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib2_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib2_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 _lib4_stringify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_stringify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_stringify', [arg0])
},
 xyEdge$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('xyEdge', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'xyEdge', [arg0, arg1, arg2])
},
 _lib3_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib5_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib6_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib6_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib7_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib4_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 isNegative$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isNegative', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isNegative', [])
},
 hasMatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasMatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasMatch', [arg0])
},
 operator$add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$add', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib3_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib5_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib6_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib7_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib2_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 _lib4_get$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_get', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_get', [arg0])
},
 offRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('offRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'offRemoved', [arg0])
},
 _lib3_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib5_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib6_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib6_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib7_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib4_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib3_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib5_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib6_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib6_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib7_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib2_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _lib2_throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 _throwImmutable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_throwImmutable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_throwImmutable', [])
},
 test$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('test', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'test', [])
},
 onListAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('onListAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'onListAdded', [arg0])
},
 _fireRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireRemoved', [arg0])
},
 _lib5_fireRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireRemoved', [arg0])
},
 _lib6_fireRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireRemoved', [arg0])
},
 _lib6_fireRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireRemoved', [arg0])
},
 _lib7_fireRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireRemoved', [arg0])
},
 _lib2_fireRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireRemoved', [arg0])
},
 _lib_fireRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireRemoved', [arg0])
},
 _lib2_fireRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireRemoved', [arg0])
},
 _lib4_fireRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireRemoved', [arg0])
},
 intFromZero$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('intFromZero', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'intFromZero', [arg0])
},
 intFromZero$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('intFromZero', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'intFromZero', [arg0])
},
 roll$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('roll', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'roll', [])
},
 changeBoard$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('changeBoard', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'changeBoard', [arg0, arg1])
},
 changeBoard$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('changeBoard', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'changeBoard', [arg0, arg1])
},
 removeRange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeRange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeRange', [arg0, arg1])
},
 removeRange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeRange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeRange', [arg0, arg1])
},
 replaceFirst$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('replaceFirst', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'replaceFirst', [arg0, arg1])
},
 registerRoll$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('registerRoll', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'registerRoll', [arg0, arg1, arg2])
},
 _lib3_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib5_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib6_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib6_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib7_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib4_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 onChanged$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('onChanged', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'onChanged', [arg0])
},
 show$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('show', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'show', [])
},
 show$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('show', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'show', [arg0])
},
 show$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('show', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'show', [arg0])
},
 _addVertices$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addVertices', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addVertices', [arg0])
},
 _lib5_addVertices$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addVertices', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addVertices', [arg0])
},
 _lib6_addVertices$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addVertices', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addVertices', [arg0])
},
 _lib6_addVertices$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addVertices', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addVertices', [arg0])
},
 _lib7_addVertices$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addVertices', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addVertices', [arg0])
},
 _lib2_addVertices$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addVertices', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addVertices', [arg0])
},
 _lib_addVertices$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addVertices', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addVertices', [arg0])
},
 _lib2_addVertices$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addVertices', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addVertices', [arg0])
},
 _lib4_addVertices$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addVertices', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addVertices', [arg0])
},
 _remove$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0])
},
 _lib5_remove$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0])
},
 _lib6_remove$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0])
},
 _lib6_remove$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0])
},
 _lib7_remove$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0])
},
 _lib2_remove$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0])
},
 _lib_remove$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0])
},
 _lib2_remove$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0])
},
 _lib4_remove$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0])
},
 _remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib5_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib6_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib6_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib7_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib2_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib2_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib4_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _degreesToRadians$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_degreesToRadians', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_degreesToRadians', [arg0])
},
 _lib5_degreesToRadians$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_degreesToRadians', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_degreesToRadians', [arg0])
},
 _lib6_degreesToRadians$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_degreesToRadians', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_degreesToRadians', [arg0])
},
 _lib6_degreesToRadians$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_degreesToRadians', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_degreesToRadians', [arg0])
},
 _lib7_degreesToRadians$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_degreesToRadians', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_degreesToRadians', [arg0])
},
 _lib2_degreesToRadians$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_degreesToRadians', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_degreesToRadians', [arg0])
},
 _lib_degreesToRadians$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_degreesToRadians', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_degreesToRadians', [arg0])
},
 _lib2_degreesToRadians$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_degreesToRadians', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_degreesToRadians', [arg0])
},
 _lib4_degreesToRadians$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_degreesToRadians', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_degreesToRadians', [arg0])
},
 prepareLobby$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('prepareLobby', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'prepareLobby', [arg0])
},
 split$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('split', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'split', [arg0])
},
 _lib3_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib6_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib6_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib7_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib2_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib2_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 _lib4_checkCycle$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_checkCycle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_checkCycle', [arg0])
},
 performAtLobbyServer$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('performAtLobbyServer', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'performAtLobbyServer', [arg0])
},
 watchLobby$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('watchLobby', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'watchLobby', [])
},
 send$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('send', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'send', [arg0])
},
 hashCode$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hashCode', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hashCode', [])
},
 writeTiles$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('writeTiles', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'writeTiles', [])
},
 _fireChanged$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireChanged', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireChanged', [])
},
 _lib5_fireChanged$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireChanged', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireChanged', [])
},
 _lib6_fireChanged$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireChanged', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireChanged', [])
},
 _lib6_fireChanged$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireChanged', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireChanged', [])
},
 _lib7_fireChanged$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireChanged', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireChanged', [])
},
 _lib2_fireChanged$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireChanged', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireChanged', [])
},
 _lib_fireChanged$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireChanged', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireChanged', [])
},
 _lib2_fireChanged$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireChanged', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireChanged', [])
},
 _lib4_fireChanged$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireChanged', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireChanged', [])
},
 $dom_removeAttribute$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_removeAttribute', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_removeAttribute', [arg0])
},
 $dom_getElementsByTagName$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getElementsByTagName', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getElementsByTagName', [arg0])
},
 ofType$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('ofType', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'ofType', [arg0])
},
 ofType$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('ofType', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'ofType', [arg0])
},
 getRange$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getRange', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getRange', [arg0, arg1])
},
 xyCell$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('xyCell', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'xyCell', [arg0])
},
 xyCell$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('xyCell', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'xyCell', [arg0])
},
 hasUserAmount$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasUserAmount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasUserAmount', [arg0])
},
 startsWith$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('startsWith', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'startsWith', [arg0])
},
 createTestBoard$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('createTestBoard', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'createTestBoard', [])
},
 createTestBoard$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('createTestBoard', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'createTestBoard', [])
},
 $dom_hasAttribute$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_hasAttribute', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_hasAttribute', [arg0])
},
 addChat$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addChat', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addChat', [arg0])
},
 init$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('init', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'init', [])
},
 init$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('init', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'init', [])
},
 init$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('init', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'init', [])
},
 toText$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('toText', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'toText', [])
},
 receiveData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('receiveData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'receiveData', [arg0])
},
 $dom_getElementById$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getElementById', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getElementById', [arg0])
},
 trim$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('trim', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'trim', [])
},
 showAllVertices$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('showAllVertices', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'showAllVertices', [])
},
 types$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('types', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'types', [])
},
 $dom_removeItem$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_removeItem', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_removeItem', [arg0])
},
 hide$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hide', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hide', [])
},
 testOffAdd$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('testOffAdd', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'testOffAdd', [])
},
 _fireAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireAdded', [arg0])
},
 _lib5_fireAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireAdded', [arg0])
},
 _lib6_fireAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireAdded', [arg0])
},
 _lib6_fireAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireAdded', [arg0])
},
 _lib7_fireAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireAdded', [arg0])
},
 _lib2_fireAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireAdded', [arg0])
},
 _lib_fireAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireAdded', [arg0])
},
 _lib2_fireAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireAdded', [arg0])
},
 _lib4_fireAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireAdded', [arg0])
},
 lastEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('lastEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'lastEntry', [])
},
 testUpperRow1$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('testUpperRow1', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'testUpperRow1', [])
},
 ensureType$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('ensureType', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'ensureType', [arg0])
},
 hasAction$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasAction', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasAction', [arg0])
},
 identify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('identify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'identify', [arg0])
},
 _lib3_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib6_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib6_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib7_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib2_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib2_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 _lib4_parseString$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseString', [])
},
 replaceWith$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('replaceWith', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'replaceWith', [arg0])
},
 hasUser$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasUser', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasUser', [arg0])
},
 containsKey$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('containsKey', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'containsKey', [arg0])
},
 setCurrent$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setCurrent', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setCurrent', [arg0])
},
 last$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('last', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'last', [])
},
 last$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('last', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'last', [])
},
 last$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('last', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'last', [])
},
 last$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('last', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'last', [])
},
 hasActionAmount$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasActionAmount', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasActionAmount', [arg0])
},
 testAddList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('testAddList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'testAddList', [])
},
 onAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('onAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'onAdded', [arg0])
},
 newPortsBag$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('newPortsBag', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'newPortsBag', [])
},
 executeNext$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('executeNext', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'executeNext', [])
},
 next$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'next', [])
},
 next$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'next', [arg0])
},
 _addEdges$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEdges', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEdges', [arg0])
},
 _lib5_addEdges$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEdges', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEdges', [arg0])
},
 _lib6_addEdges$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEdges', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEdges', [arg0])
},
 _lib6_addEdges$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEdges', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEdges', [arg0])
},
 _lib7_addEdges$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEdges', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEdges', [arg0])
},
 _lib2_addEdges$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEdges', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEdges', [arg0])
},
 _lib_addEdges$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEdges', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEdges', [arg0])
},
 _lib2_addEdges$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEdges', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEdges', [arg0])
},
 _lib4_addEdges$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_addEdges', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_addEdges', [arg0])
},
 toSvg$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('toSvg', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'toSvg', [])
},
 operator$ge$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$ge', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$ge', [arg0])
},
 _lib3_toList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_toList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_toList', [])
},
 _lib5_toList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_toList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_toList', [])
},
 _lib6_toList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_toList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_toList', [])
},
 _lib6_toList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_toList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_toList', [])
},
 _lib7_toList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_toList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_toList', [])
},
 _lib2_toList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_toList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_toList', [])
},
 _toList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_toList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_toList', [])
},
 _lib2_toList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_toList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_toList', [])
},
 _lib4_toList$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_toList', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_toList', [])
},
 filter$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('filter', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'filter', [arg0])
},
 joinSpectatorInLobby$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('joinSpectatorInLobby', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'joinSpectatorInLobby', [])
},
 toLowerCase$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('toLowerCase', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'toLowerCase', [])
},
 deSelect$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('deSelect', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'deSelect', [])
},
 writeResourcesTable$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('writeResourcesTable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'writeResourcesTable', [])
},
 _lib3_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib6_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib6_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib7_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib2_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib2_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 _lib4_isToken$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_isToken', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_isToken', [arg0])
},
 updatePort$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('updatePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'updatePort', [])
},
 toDouble$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('toDouble', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'toDouble', [])
},
 prepend$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('prepend', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'prepend', [arg0])
},
 perform$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('perform', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'perform', [arg0])
},
 _lib3_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib5_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib6_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib6_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib7_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib2_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib2_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib4_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib3_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib5_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib6_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib6_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib7_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib2_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib2_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 _lib4_formatSet$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_formatSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_formatSet', [arg0])
},
 $dom_setAttribute$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_setAttribute', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_setAttribute', [arg0, arg1])
},
 makeRandomPorts$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('makeRandomPorts', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'makeRandomPorts', [])
},
 replaceRandomTiles$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('replaceRandomTiles', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'replaceRandomTiles', [arg0])
},
 setChit$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setChit', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setChit', [arg0, arg1])
},
 toSummary$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('toSummary', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'toSummary', [])
},
 _lib3_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib6_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib6_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib7_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib2_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib2_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 _lib4_expectKeyword$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_expectKeyword', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_expectKeyword', [arg0, arg1])
},
 fire$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('fire', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'fire', [arg0, arg1, arg2])
},
 resetRolls$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('resetRolls', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'resetRolls', [])
},
 performServer$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('performServer', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'performServer', [arg0])
},
 _lib3_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib6_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib6_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib7_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib2_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib2_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 _lib4_nextChar$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nextChar', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nextChar', [])
},
 make$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('make', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'make', [arg0])
},
 query$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('query', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'query', [arg0])
},
 _lib3_write$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_write', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_write', [arg0])
},
 _lib5_write$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_write', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_write', [arg0])
},
 _lib6_write$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_write', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_write', [arg0])
},
 _lib6_write$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_write', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_write', [arg0])
},
 _lib7_write$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_write', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_write', [arg0])
},
 _lib2_write$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_write', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_write', [arg0])
},
 _write$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_write', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_write', [arg0])
},
 _lib2_write$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_write', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_write', [arg0])
},
 _lib4_write$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_write', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_write', [arg0])
},
 _lib3_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib5_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib6_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib6_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib7_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 _lib4_asJs$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asJs', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asJs', [])
},
 onRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('onRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'onRemoved', [arg0])
},
 updateChit$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('updateChit', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'updateChit', [])
},
 offAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('offAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'offAdded', [arg0])
},
 hasNotUser$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasNotUser', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasNotUser', [arg0])
},
 xyCellCenter$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('xyCellCenter', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'xyCellCenter', [arg0])
},
 joinPlayer3InLobby$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('joinPlayer3InLobby', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'joinPlayer3InLobby', [])
},
 addLast$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addLast', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addLast', [arg0])
},
 not$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('not', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'not', [arg0])
},
 _initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib5_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib7_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib4_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib5_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib7_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib4_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib5_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib7_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib4_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib5_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib7_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib4_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib5_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib7_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib4_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib5_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib7_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib4_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib5_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib7_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib4_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib5_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib7_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib4_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib5_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib7_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib4_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib5_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib7_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib4_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib5_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib7_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib4_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib5_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib7_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib4_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib5_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib6_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib7_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib2_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 _lib4_initByData$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_initByData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_initByData', [arg0])
},
 mouseOver$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('mouseOver', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'mouseOver', [arg0])
},
 swap$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('swap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'swap', [])
},
 addPortAt$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addPortAt', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addPortAt', [arg0, arg1, arg2])
},
 hideAllEdges$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hideAllEdges', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hideAllEdges', [])
},
 addAction$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addAction', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addAction', [arg0])
},
 halfCount$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('halfCount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'halfCount', [])
},
 group$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('group', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'group', [arg0])
},
 group$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('group', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'group', [arg0])
},
 group$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('group', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'group', [arg0])
},
 calculateHexSizes$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('calculateHexSizes', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'calculateHexSizes', [])
},
 operator$index$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$index', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$index', [arg0])
},
 _fireListRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListRemoved', [arg0])
},
 _lib5_fireListRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListRemoved', [arg0])
},
 _lib6_fireListRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListRemoved', [arg0])
},
 _lib6_fireListRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListRemoved', [arg0])
},
 _lib7_fireListRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListRemoved', [arg0])
},
 _lib2_fireListRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListRemoved', [arg0])
},
 _lib_fireListRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListRemoved', [arg0])
},
 _lib2_fireListRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListRemoved', [arg0])
},
 _lib4_fireListRemoved$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListRemoved', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListRemoved', [arg0])
},
 operator$mod$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$mod', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$mod', [arg0])
},
 $dom_replaceChild$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_replaceChild', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_replaceChild', [arg0, arg1])
},
 writeResourceLists$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('writeResourceLists', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'writeResourceLists', [])
},
 joinPlayer12InLobby$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('joinPlayer12InLobby', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'joinPlayer12InLobby', [])
},
 operator$lt$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$lt', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$lt', [arg0])
},
 select$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('select', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'select', [])
},
 hasType$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasType', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasType', [arg0])
},
 hasType$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasType', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasType', [arg0])
},
 getPropertyValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getPropertyValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getPropertyValue', [arg0])
},
 addGame$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addGame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addGame', [arg0])
},
 makeRaandomFields$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('makeRaandomFields', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'makeRaandomFields', [])
},
 intFromOne$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('intFromOne', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'intFromOne', [arg0])
},
 _lib3_modify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_modify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_modify', [arg0])
},
 _lib5_modify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_modify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_modify', [arg0])
},
 _lib6_modify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_modify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_modify', [arg0])
},
 _lib6_modify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_modify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_modify', [arg0])
},
 _lib7_modify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_modify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_modify', [arg0])
},
 _lib2_modify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_modify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_modify', [arg0])
},
 _modify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_modify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_modify', [arg0])
},
 _lib2_modify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_modify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_modify', [arg0])
},
 _lib4_modify$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_modify', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_modify', [arg0])
},
 $dom_clear$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_clear', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_clear', [])
},
 testOnAdded$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('testOnAdded', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'testOnAdded', [])
},
 _init$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_init', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_init', [])
},
 _lib5_init$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_init', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_init', [])
},
 _lib6_init$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_init', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_init', [])
},
 _lib6_init$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_init', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_init', [])
},
 _lib7_init$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_init', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_init', [])
},
 _lib2_init$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_init', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_init', [])
},
 _lib_init$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_init', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_init', [])
},
 _lib2_init$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_init', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_init', [])
},
 _lib4_init$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_init', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_init', [])
},
 start$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('start', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'start', [])
},
 start$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('start', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'start', [arg0])
},
 prepare$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('prepare', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'prepare', [arg0])
},
 _fireListAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListAdded', [arg0])
},
 _lib5_fireListAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListAdded', [arg0])
},
 _lib6_fireListAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListAdded', [arg0])
},
 _lib6_fireListAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListAdded', [arg0])
},
 _lib7_fireListAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListAdded', [arg0])
},
 _lib2_fireListAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListAdded', [arg0])
},
 _lib_fireListAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListAdded', [arg0])
},
 _lib2_fireListAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListAdded', [arg0])
},
 _lib4_fireListAdded$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_fireListAdded', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_fireListAdded', [arg0])
},
 operator$and$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$and', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$and', [arg0])
},
 addTradeOffer$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addTradeOffer', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addTradeOffer', [arg0])
},
 addTradeResponse$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addTradeResponse', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addTradeResponse', [arg0, arg1])
},
 hideAllVertices$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hideAllVertices', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hideAllVertices', [])
},
 offSetted$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('offSetted', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'offSetted', [arg0, arg1])
},
 prepareDevelopmentCards$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('prepareDevelopmentCards', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'prepareDevelopmentCards', [])
},
 createElements$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('createElements', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'createElements', [])
},
 removeLast$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeLast', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeLast', [])
},
 testOnRemoved$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('testOnRemoved', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'testOnRemoved', [])
},
 _lib3_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib6_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib6_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib7_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib2_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib2_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib4_error$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_error', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_error', [arg0])
},
 _lib3_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib5_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib6_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib6_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib7_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib4_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 setCellAndDirection$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setCellAndDirection', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setCellAndDirection', [arg0, arg1])
},
 setCellAndDirection$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setCellAndDirection', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setCellAndDirection', [arg0, arg1])
},
 updateNumber$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('updateNumber', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'updateNumber', [])
},
 newChitsBag$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('newChitsBag', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'newChitsBag', [])
},
 removeListener$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeListener', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeListener', [arg0, arg1])
},
 setState$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setState', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setState', [arg0])
},
 sendData$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('sendData', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'sendData', [arg0, arg1])
},
 updateType$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('updateType', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'updateType', [arg0])
},
 operator$gt$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$gt', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$gt', [arg0])
},
 _lib3_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib6_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib6_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib7_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib2_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib2_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 _lib4_parseObject$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_parseObject', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_parseObject', [])
},
 playerById$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('playerById', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'playerById', [arg0])
},
 placePorts$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('placePorts', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'placePorts', [arg0])
},
 joinAndLeavePlayerInLobby$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('joinAndLeavePlayerInLobby', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'joinAndLeavePlayerInLobby', [])
},
 newTileBag$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('newTileBag', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'newTileBag', [])
},
 $dom_getAttribute$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getAttribute', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getAttribute', [arg0])
},
 showCell$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('showCell', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'showCell', [arg0])
},
 setProperty$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setProperty', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setProperty', [arg0, arg1])
},
 setProperty$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setProperty', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setProperty', [arg0, arg1, arg2])
},
 _removeFromList$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_removeFromList', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_removeFromList', [arg0, arg1])
},
 _lib5_removeFromList$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_removeFromList', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_removeFromList', [arg0, arg1])
},
 _lib6_removeFromList$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_removeFromList', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_removeFromList', [arg0, arg1])
},
 _lib6_removeFromList$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_removeFromList', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_removeFromList', [arg0, arg1])
},
 _lib7_removeFromList$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_removeFromList', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_removeFromList', [arg0, arg1])
},
 _lib2_removeFromList$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_removeFromList', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_removeFromList', [arg0, arg1])
},
 _lib_removeFromList$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_removeFromList', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_removeFromList', [arg0, arg1])
},
 _lib2_removeFromList$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_removeFromList', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_removeFromList', [arg0, arg1])
},
 _lib4_removeFromList$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_removeFromList', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_removeFromList', [arg0, arg1])
},
 getBBox$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getBBox', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getBBox', [])
},
 end$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('end', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'end', [])
},
 end$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('end', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'end', [arg0])
},
 _lib3_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib5_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib6_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib6_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib7_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib4_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 isEmpty$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isEmpty', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isEmpty', [])
},
 ceil$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('ceil', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'ceil', [])
},
 setTimeout$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setTimeout', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setTimeout', [arg0, arg1])
},
 hasAtLeast$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasAtLeast', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasAtLeast', [arg0])
},
 operator$shr$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$shr', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$shr', [arg0])
},
 receive$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('receive', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'receive', [arg0])
},
 setStartingState$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setStartingState', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setStartingState', [])
},
 substring$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('substring', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'substring', [arg0])
},
 substring$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('substring', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'substring', [arg0, arg1])
},
 iterator$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('iterator', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'iterator', [])
},
 nextId$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('nextId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'nextId', [])
},
 writeLists$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('writeLists', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'writeLists', [])
},
 first$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('first', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'first', [])
},
 getKeys$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getKeys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getKeys', [])
},
 addListener$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addListener', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addListener', [arg0, arg1])
},
 setPosition$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setPosition', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setPosition', [arg0])
},
 fillItems$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('fillItems', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'fillItems', [])
},
 get$_lib3_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib5_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib6_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib6_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib7_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib2_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib2_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib4_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib3_result: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _result', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _result', [])
},
 get$_result: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _result', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _result', [])
},
 get$_lib6_result: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _result', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _result', [])
},
 get$_lib6_result: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _result', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _result', [])
},
 get$_lib7_result: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _result', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _result', [])
},
 get$_lib2_result: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _result', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _result', [])
},
 get$_lib_result: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _result', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _result', [])
},
 get$_lib2_result: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _result', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _result', [])
},
 get$_lib4_result: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _result', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _result', [])
},
 get$email: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get email', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get email', [])
},
 get$currentId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get currentId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get currentId', [])
},
 get$_lib3_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib6_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib6_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib7_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib2_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib2_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$_lib4_sb: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sb', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sb', [])
},
 get$$$dom_children: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_children', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_children', [])
},
 get$won: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get won', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get won', [])
},
 get$canHavePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get canHavePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get canHavePort', [])
},
 get$isDetermineFirstPlayer: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isDetermineFirstPlayer', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isDetermineFirstPlayer', [])
},
 get$hash: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get hash', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get hash', [])
},
 get$width: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get width', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get width', [])
},
 get$_lib3_functionName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _functionName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _functionName', [])
},
 get$_lib5_functionName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _functionName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _functionName', [])
},
 get$_functionName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _functionName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _functionName', [])
},
 get$_functionName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _functionName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _functionName', [])
},
 get$_lib7_functionName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _functionName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _functionName', [])
},
 get$_lib2_functionName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _functionName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _functionName', [])
},
 get$_lib_functionName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _functionName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _functionName', [])
},
 get$_lib2_functionName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _functionName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _functionName', [])
},
 get$_lib4_functionName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _functionName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _functionName', [])
},
 get$spectator: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get spectator', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get spectator', [])
},
 get$leaverUser: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get leaverUser', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get leaverUser', [])
},
 get$month: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get month', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get month', [])
},
 get$resource: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get resource', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get resource', [])
},
 get$users: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get users', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get users', [])
},
 get$sideLength: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get sideLength', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get sideLength', [])
},
 get$strokeWidth: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get strokeWidth', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get strokeWidth', [])
},
 get$$$dom_attributes: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_attributes', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_attributes', [])
},
 get$edgeWidthFactor: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get edgeWidthFactor', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get edgeWidthFactor', [])
},
 get$_jsonString: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _jsonString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _jsonString', [])
},
 get$_lib5_jsonString: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _jsonString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _jsonString', [])
},
 get$_lib6_jsonString: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _jsonString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _jsonString', [])
},
 get$_lib6_jsonString: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _jsonString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _jsonString', [])
},
 get$_lib7_jsonString: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _jsonString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _jsonString', [])
},
 get$_lib2_jsonString: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _jsonString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _jsonString', [])
},
 get$_lib_jsonString: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _jsonString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _jsonString', [])
},
 get$_lib2_jsonString: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _jsonString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _jsonString', [])
},
 get$_lib4_jsonString: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _jsonString', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _jsonString', [])
},
 get$expectClientLobby: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get expectClientLobby', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get expectClientLobby', [])
},
 get$halfHeight: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get halfHeight', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get halfHeight', [])
},
 get$_boardState: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _boardState', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _boardState', [])
},
 get$_lib5_boardState: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _boardState', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _boardState', [])
},
 get$_lib6_boardState: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _boardState', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _boardState', [])
},
 get$_lib6_boardState: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _boardState', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _boardState', [])
},
 get$_lib7_boardState: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _boardState', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _boardState', [])
},
 get$_lib2_boardState: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _boardState', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _boardState', [])
},
 get$_lib_boardState: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _boardState', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _boardState', [])
},
 get$_lib2_boardState: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _boardState', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _boardState', [])
},
 get$_lib4_boardState: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _boardState', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _boardState', [])
},
 get$turnPlayedId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get turnPlayedId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get turnPlayedId', [])
},
 get$value: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get value', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get value', [])
},
 get$isTradeable: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isTradeable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isTradeable', [])
},
 get$c1: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get c1', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get c1', [])
},
 get$exceptionName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get exceptionName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get exceptionName', [])
},
 get$territoryId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get territoryId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get territoryId', [])
},
 get$chit: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get chit', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get chit', [])
},
 get$_objectData: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _objectData', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _objectData', [])
},
 get$_lib5_objectData: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _objectData', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _objectData', [])
},
 get$_lib6_objectData: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _objectData', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _objectData', [])
},
 get$_lib6_objectData: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _objectData', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _objectData', [])
},
 get$_lib7_objectData: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _objectData', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _objectData', [])
},
 get$_lib2_objectData: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _objectData', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _objectData', [])
},
 get$_lib_objectData: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _objectData', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _objectData', [])
},
 get$_lib2_objectData: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _objectData', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _objectData', [])
},
 get$_lib4_objectData: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _objectData', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _objectData', [])
},
 get$player3: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get player3', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get player3', [])
},
 get$user: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get user', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get user', [])
},
 get$id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get id', [])
},
 get$partialHeight: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get partialHeight', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get partialHeight', [])
},
 get$tag: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get tag', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get tag', [])
},
 get$data: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get data', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get data', [])
},
 get$verticePieces: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get verticePieces', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get verticePieces', [])
},
 get$boardState: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get boardState', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get boardState', [])
},
 get$type: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get type', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get type', [])
},
 get$click: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get click', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get click', [])
},
 get$div: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get div', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get div', [])
},
 get$add: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get add', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get add', [])
},
 get$_lib3_cssClassSet: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _cssClassSet', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _cssClassSet', [])
},
 get$_lib5_cssClassSet: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _cssClassSet', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _cssClassSet', [])
},
 get$_lib6_cssClassSet: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _cssClassSet', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _cssClassSet', [])
},
 get$_lib6_cssClassSet: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _cssClassSet', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _cssClassSet', [])
},
 get$_lib7_cssClassSet: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _cssClassSet', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _cssClassSet', [])
},
 get$_lib2_cssClassSet: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _cssClassSet', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _cssClassSet', [])
},
 get$_cssClassSet: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _cssClassSet', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _cssClassSet', [])
},
 get$_lib2_cssClassSet: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _cssClassSet', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _cssClassSet', [])
},
 get$_lib4_cssClassSet: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _cssClassSet', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _cssClassSet', [])
},
 get$isLobby: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isLobby', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isLobby', [])
},
 get$server: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get server', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get server', [])
},
 get$ended: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get ended', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get ended', [])
},
 get$cell: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get cell', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get cell', [])
},
 get$_portChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _portChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _portChange', [])
},
 get$_lib5_portChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _portChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _portChange', [])
},
 get$_lib6_portChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _portChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _portChange', [])
},
 get$_lib6_portChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _portChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _portChange', [])
},
 get$_lib7_portChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _portChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _portChange', [])
},
 get$_lib2_portChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _portChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _portChange', [])
},
 get$_lib_portChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _portChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _portChange', [])
},
 get$_lib2_portChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _portChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _portChange', [])
},
 get$_lib4_portChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _portChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _portChange', [])
},
 get$territory: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get territory', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get territory', [])
},
 get$_chitChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _chitChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _chitChange', [])
},
 get$_lib5_chitChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _chitChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _chitChange', [])
},
 get$_lib6_chitChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _chitChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _chitChange', [])
},
 get$_lib6_chitChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _chitChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _chitChange', [])
},
 get$_lib7_chitChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _chitChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _chitChange', [])
},
 get$_lib2_chitChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _chitChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _chitChange', [])
},
 get$_lib_chitChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _chitChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _chitChange', [])
},
 get$_lib2_chitChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _chitChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _chitChange', [])
},
 get$_lib4_chitChange: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _chitChange', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _chitChange', [])
},
 get$board2d: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get board2d', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get board2d', [])
},
 get$addItem: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get addItem', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get addItem', [])
},
 get$on: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get on', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get on', [])
},
 get$ignoreCase: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get ignoreCase', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get ignoreCase', [])
},
 get$inAmount: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get inAmount', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get inAmount', [])
},
 get$day: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get day', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get day', [])
},
 get$inMilliseconds: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get inMilliseconds', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get inMilliseconds', [])
},
 get$hours: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get hours', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get hours', [])
},
 get$textElement: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get textElement', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get textElement', [])
},
 get$winnerUserId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get winnerUserId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get winnerUserId', [])
},
 get$gameId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get gameId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get gameId', [])
},
 get$mouseOut: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get mouseOut', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get mouseOut', [])
},
 get$_sideLength: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sideLength', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sideLength', [])
},
 get$_lib5_sideLength: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sideLength', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sideLength', [])
},
 get$_lib6_sideLength: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sideLength', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sideLength', [])
},
 get$_lib6_sideLength: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sideLength', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sideLength', [])
},
 get$_lib7_sideLength: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sideLength', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sideLength', [])
},
 get$_lib2_sideLength: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sideLength', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sideLength', [])
},
 get$_lib_sideLength: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sideLength', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sideLength', [])
},
 get$_lib2_sideLength: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sideLength', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sideLength', [])
},
 get$_lib4_sideLength: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _sideLength', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _sideLength', [])
},
 get$isPartOfGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isPartOfGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isPartOfGame', [])
},
 get$player: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get player', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get player', [])
},
 get$initialPlacement: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get initialPlacement', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get initialPlacement', [])
},
 get$turnPhase: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get turnPhase', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get turnPhase', [])
},
 get$lobby: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get lobby', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get lobby', [])
},
 get$edges: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get edges', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get edges', [])
},
 get$userId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get userId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get userId', [])
},
 get$towns: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get towns', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get towns', [])
},
 get$producesResource: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get producesResource', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get producesResource', [])
},
 get$offerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get offerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get offerId', [])
},
 get$isRandom: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isRandom', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isRandom', [])
},
 get$hex2d: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get hex2d', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get hex2d', [])
},
 get$boardVisual: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get boardVisual', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get boardVisual', [])
},
 get$currentGamePhase: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get currentGamePhase', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get currentGamePhase', [])
},
 get$tiles: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get tiles', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get tiles', [])
},
 get$chance: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get chance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get chance', [])
},
 get$turnBoughtId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get turnBoughtId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get turnBoughtId', [])
},
 get$userAgent: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get userAgent', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get userAgent', [])
},
 get$number: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get number', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get number', [])
},
 get$multiLine: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get multiLine', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get multiLine', [])
},
 get$expectServerLobby: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get expectServerLobby', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get expectServerLobby', [])
},
 get$isGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isGame', [])
},
 get$_lib3_ptr: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _ptr', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _ptr', [])
},
 get$_lib5_ptr: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _ptr', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _ptr', [])
},
 get$_lib6_ptr: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _ptr', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _ptr', [])
},
 get$_lib6_ptr: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _ptr', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _ptr', [])
},
 get$_lib7_ptr: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _ptr', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _ptr', [])
},
 get$_lib2_ptr: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _ptr', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _ptr', [])
},
 get$_ptr: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _ptr', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _ptr', [])
},
 get$_lib2_ptr: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _ptr', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _ptr', [])
},
 get$_lib4_ptr: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _ptr', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _ptr', [])
},
 get$knights: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get knights', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get knights', [])
},
 get$points: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get points', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get points', [])
},
 get$rolledDice: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get rolledDice', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get rolledDice', [])
},
 get$$$dom_lastElementChild: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_lastElementChild', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_lastElementChild', [])
},
 get$dice1: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get dice1', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get dice1', [])
},
 get$playerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get playerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get playerId', [])
},
 get$actions: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get actions', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get actions', [])
},
 get$phases: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get phases', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get phases', [])
},
 get$key: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get key', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get key', [])
},
 get$vertice: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get vertice', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get vertice', [])
},
 get$y: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get y', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get y', [])
},
 get$leaver: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get leaver', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get leaver', [])
},
 get$cellNeighbours: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get cellNeighbours', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get cellNeighbours', [])
},
 get$portsBag: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get portsBag', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get portsBag', [])
},
 get$name: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get name', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get name', [])
},
 get$player1: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get player1', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get player1', [])
},
 get$offers: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get offers', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get offers', [])
},
 get$hasChit: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get hasChit', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get hasChit', [])
},
 get$isPiratePlaceable: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isPiratePlaceable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isPiratePlaceable', [])
},
 get$isTurns: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isTurns', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isTurns', [])
},
 get$length: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get length', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get length', [])
},
 get$elements: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get elements', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get elements', [])
},
 get$halfStrokeWidth: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get halfStrokeWidth', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get halfStrokeWidth', [])
},
 get$winnerPlayerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get winnerPlayerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get winnerPlayerId', [])
},
 get$board: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get board', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get board', [])
},
 get$_lib3_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib5_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib6_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib6_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib7_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib4_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$chats: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get chats', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get chats', [])
},
 get$currentActionId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get currentActionId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get currentActionId', [])
},
 get$game: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get game', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get game', [])
},
 get$executeNext: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get executeNext', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get executeNext', [])
},
 get$$$dom_childNodes: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_childNodes', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_childNodes', [])
},
 get$navigator: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get navigator', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get navigator', [])
},
 get$attributes: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get attributes', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get attributes', [])
},
 get$canHaveChit: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get canHaveChit', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get canHaveChit', [])
},
 get$turn: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get turn', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get turn', [])
},
 get$determinFirstPlayer: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get determinFirstPlayer', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get determinFirstPlayer', [])
},
 get$_lib3_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib5_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib6_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib6_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib7_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib4_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$hasPort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get hasPort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get hasPort', [])
},
 get$minutes: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get minutes', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get minutes', [])
},
 get$stock: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get stock', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get stock', [])
},
 get$c3: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get c3', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get c3', [])
},
 get$dice2: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get dice2', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get dice2', [])
},
 get$_lib3_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib5_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib6_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib6_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib7_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib4_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$tilesBag: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get tilesBag', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get tilesBag', [])
},
 get$edgePieces: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get edgePieces', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get edgePieces', [])
},
 get$resources: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get resources', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get resources', [])
},
 get$territories: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get territories', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get territories', [])
},
 get$random: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get random', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get random', [])
},
 get$chitsBag: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get chitsBag', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get chitsBag', [])
},
 get$height: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get height', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get height', [])
},
 get$performedTime: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get performedTime', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get performedTime', [])
},
 get$turns: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get turns', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get turns', [])
},
 get$expectClientGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get expectClientGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get expectClientGame', [])
},
 get$victoryPoints: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get victoryPoints', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get victoryPoints', [])
},
 get$dice: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get dice', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get dice', [])
},
 get$message: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get message', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get message', [])
},
 get$seconds: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get seconds', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get seconds', [])
},
 get$offered: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get offered', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get offered', [])
},
 get$style: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get style', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get style', [])
},
 get$playedDevelopmentCards: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get playedDevelopmentCards', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get playedDevelopmentCards', [])
},
 get$svg: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get svg', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get svg', [])
},
 get$direction: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get direction', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get direction', [])
},
 get$color: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get color', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get color', [])
},
 get$mouseOver: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get mouseOver', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get mouseOver', [])
},
 get$row: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get row', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get row', [])
},
 get$milliseconds: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get milliseconds', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get milliseconds', [])
},
 get$$$dom_length: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_length', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_length', [])
},
 get$wanted: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get wanted', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get wanted', [])
},
 get$halfWidth: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get halfWidth', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get halfWidth', [])
},
 get$group: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get group', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get group', [])
},
 get$tileChanged: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get tileChanged', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get tileChanged', [])
},
 get$edgeDirection: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get edgeDirection', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get edgeDirection', [])
},
 get$cities: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get cities', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get cities', [])
},
 get$bank: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get bank', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get bank', [])
},
 get$ports: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get ports', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get ports', [])
},
 get$removeItem: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get removeItem', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get removeItem', [])
},
 get$isRed: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isRed', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isRed', [])
},
 get$seaCell: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get seaCell', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get seaCell', [])
},
 get$isRobberPlaceable: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isRobberPlaceable', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isRobberPlaceable', [])
},
 get$element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get element', [])
},
 get$$$dom_firstElementChild: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_firstElementChild', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_firstElementChild', [])
},
 get$player2: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get player2', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get player2', [])
},
 get$_lib3_filtered: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _filtered', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _filtered', [])
},
 get$_lib5_filtered: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _filtered', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _filtered', [])
},
 get$_lib6_filtered: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _filtered', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _filtered', [])
},
 get$_lib6_filtered: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _filtered', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _filtered', [])
},
 get$_lib7_filtered: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _filtered', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _filtered', [])
},
 get$_lib2_filtered: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _filtered', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _filtered', [])
},
 get$_filtered: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _filtered', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _filtered', [])
},
 get$_lib2_filtered: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _filtered', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _filtered', [])
},
 get$_lib4_filtered: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _filtered', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _filtered', [])
},
 get$nodes: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get nodes', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get nodes', [])
},
 get$canHaveTerritory: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get canHaveTerritory', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get canHaveTerritory', [])
},
 get$expectServerGame: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get expectServerGame', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get expectServerGame', [])
},
 get$games: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get games', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get games', [])
},
 get$acts: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get acts', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get acts', [])
},
 get$location: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get location', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get location', [])
},
 get$year: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get year', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get year', [])
},
 get$expectServer: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get expectServer', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get expectServer', [])
},
 get$set: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get set', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get set', [])
},
 get$c2: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get c2', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get c2', [])
},
 get$bottomHeight: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get bottomHeight', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get bottomHeight', [])
},
 get$$$dom_className: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_className', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_className', [])
},
 get$producers: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get producers', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get producers', [])
},
 get$pattern: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get pattern', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get pattern', [])
},
 get$port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get port', [])
},
 get$roads: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get roads', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get roads', [])
},
 get$portPicker: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get portPicker', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get portPicker', [])
},
 get$column: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get column', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get column', [])
},
 get$bonusName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get bonusName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get bonusName', [])
},
 get$x: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get x', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get x', [])
},
 get$_lib3_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib5_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib6_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib6_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib7_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib4_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$edge: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get edge', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get edge', [])
},
 get$landCell: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get landCell', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get landCell', [])
},
 get$vertices: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get vertices', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get vertices', [])
},
 get$gameClient: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get gameClient', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get gameClient', [])
},
 get$parent: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get parent', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get parent', [])
},
 get$classes: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get classes', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get classes', [])
},
 get$cells: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get cells', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get cells', [])
},
 get$first: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get first', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get first', [])
},
 get$players: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get players', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get players', [])
},
 set$playerId: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set playerId', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set playerId', [arg0])
},
 set$newGame: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set newGame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set newGame', [arg0])
},
 set$showInfo: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set showInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set showInfo', [arg0])
},
 set$vertice: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set vertice', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set vertice', [arg0])
},
 set$currentVisual: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set currentVisual', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set currentVisual', [arg0])
},
 set$wanted: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set wanted', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set wanted', [arg0])
},
 set$list: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set list', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set list', [arg0])
},
 set$name: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set name', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set name', [arg0])
},
 set$cities: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set cities', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set cities', [arg0])
},
 set$gameId: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set gameId', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set gameId', [arg0])
},
 set$length: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set length', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set length', [arg0])
},
 set$elements: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set elements', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set elements', [arg0])
},
 set$text: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set text', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set text', [arg0])
},
 set$board: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set board', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set board', [arg0])
},
 set$player: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set player', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set player', [arg0])
},
 set$_lib3_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib5_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib6_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib6_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib7_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib4_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_jsonString: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _jsonString', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _jsonString', [arg0])
},
 set$_lib5_jsonString: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _jsonString', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _jsonString', [arg0])
},
 set$_lib6_jsonString: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _jsonString', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _jsonString', [arg0])
},
 set$_lib6_jsonString: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _jsonString', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _jsonString', [arg0])
},
 set$_lib7_jsonString: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _jsonString', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _jsonString', [arg0])
},
 set$_lib2_jsonString: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _jsonString', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _jsonString', [arg0])
},
 set$_lib_jsonString: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _jsonString', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _jsonString', [arg0])
},
 set$_lib2_jsonString: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _jsonString', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _jsonString', [arg0])
},
 set$_lib4_jsonString: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _jsonString', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _jsonString', [arg0])
},
 set$userId: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set userId', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set userId', [arg0])
},
 set$expectServerGame: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set expectServerGame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set expectServerGame', [arg0])
},
 set$towns: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set towns', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set towns', [arg0])
},
 set$value: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set value', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set value', [arg0])
},
 set$game: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set game', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set game', [arg0])
},
 set$fontWeight: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set fontWeight', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set fontWeight', [arg0])
},
 set$c1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set c1', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set c1', [arg0])
},
 set$startedDateTime: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set startedDateTime', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set startedDateTime', [arg0])
},
 set$offerId: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set offerId', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set offerId', [arg0])
},
 set$c2: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set c2', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set c2', [arg0])
},
 set$isRandom: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set isRandom', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set isRandom', [arg0])
},
 set$_objectData: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _objectData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _objectData', [arg0])
},
 set$_lib5_objectData: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _objectData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _objectData', [arg0])
},
 set$_lib6_objectData: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _objectData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _objectData', [arg0])
},
 set$_lib6_objectData: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _objectData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _objectData', [arg0])
},
 set$_lib7_objectData: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _objectData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _objectData', [arg0])
},
 set$_lib2_objectData: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _objectData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _objectData', [arg0])
},
 set$_lib_objectData: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _objectData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _objectData', [arg0])
},
 set$_lib2_objectData: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _objectData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _objectData', [arg0])
},
 set$_lib4_objectData: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _objectData', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _objectData', [arg0])
},
 set$chit: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set chit', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set chit', [arg0])
},
 set$innerHTML: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set innerHTML', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set innerHTML', [arg0])
},
 set$user: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set user', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set user', [arg0])
},
 set$id: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set id', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set id', [arg0])
},
 set$boardVisual: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set boardVisual', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set boardVisual', [arg0])
},
 set$$$dom_className: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set $dom_className', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set $dom_className', [arg0])
},
 set$attributes: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set attributes', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set attributes', [arg0])
},
 set$port: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set port', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set port', [arg0])
},
 set$roads: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set roads', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set roads', [arg0])
},
 set$isExtendable: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set isExtendable', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set isExtendable', [arg0])
},
 set$type: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set type', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set type', [arg0])
},
 set$boardState: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set boardState', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set boardState', [arg0])
},
 set$_lib3_cssClassSet: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _cssClassSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _cssClassSet', [arg0])
},
 set$_lib5_cssClassSet: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _cssClassSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _cssClassSet', [arg0])
},
 set$_lib6_cssClassSet: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _cssClassSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _cssClassSet', [arg0])
},
 set$_lib6_cssClassSet: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _cssClassSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _cssClassSet', [arg0])
},
 set$_lib7_cssClassSet: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _cssClassSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _cssClassSet', [arg0])
},
 set$_lib2_cssClassSet: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _cssClassSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _cssClassSet', [arg0])
},
 set$_cssClassSet: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _cssClassSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _cssClassSet', [arg0])
},
 set$_lib2_cssClassSet: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _cssClassSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _cssClassSet', [arg0])
},
 set$_lib4_cssClassSet: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _cssClassSet', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _cssClassSet', [arg0])
},
 set$selectedTriangle: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set selectedTriangle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set selectedTriangle', [arg0])
},
 set$_lib3_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib5_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib6_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib6_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib7_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib4_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$bonusName: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set bonusName', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set bonusName', [arg0])
},
 set$edgePieces: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set edgePieces', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set edgePieces', [arg0])
},
 set$isLobby: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set isLobby', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set isLobby', [arg0])
},
 set$server: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set server', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set server', [arg0])
},
 set$fontSize: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set fontSize', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set fontSize', [arg0])
},
 set$cell: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set cell', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set cell', [arg0])
},
 set$performedTime: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set performedTime', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set performedTime', [arg0])
},
 set$expectClientGame: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set expectClientGame', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set expectClientGame', [arg0])
},
 set$turns: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set turns', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set turns', [arg0])
},
 set$knights: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set knights', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set knights', [arg0])
},
 set$gameClient: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set gameClient', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set gameClient', [arg0])
},
 set$territory: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set territory', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set territory', [arg0])
},
 set$message: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set message', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set message', [arg0])
},
 set$host: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set host', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set host', [arg0])
},
 set$rolledDice: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set rolledDice', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set rolledDice', [arg0])
},
 set$offered: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set offered', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set offered', [arg0])
},
 set$display: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set display', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set display', [arg0])
}
});

Isolate.$defineClass("IndexOutOfRangeException", "Object", ["_index"], {
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._index);
 },
 is$Exception: true
});

Isolate.$defineClass("IllegalAccessException", "Object", [], {
 toString$0: function() {
  return 'Attempt to modify an immutable object';
 },
 is$Exception: true
});

Isolate.$defineClass("NoSuchMethodException", "Object", ["_existingArgumentNames", "_arguments", "_functionName?", "_receiver"], {
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; i < t1.length; ++i) {
    if (i > 0) {
      sb.add$1(', ');
    }
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this.toString$0$bailout(2, sb, t1);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$1('');
  for (i = 0; i < t1.length; ++i) {
    if (i > 0) {
      sb.add$1(', ');
    }
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
 },
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      sb = env0;
      t1 = env1;
      break;
    case 2:
      sb = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$1('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, $.get$length(t1))) break L0;
        if (i > 0) {
          sb.add$1(', ');
        }
        sb.add$1($.index(t1, i));
        ++i;
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 === (void 0)) {
        return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      } else {
        var actualParameters = sb.toString$0();
        sb = $.StringBufferImpl$1('');
        i = 0;
        L1: while (true) {
          if (!$.ltB(i, $.get$length(t1))) break L1;
          if (i > 0) {
            sb.add$1(', ');
          }
          sb.add$1($.index(t1, i));
          ++i;
        }
        var formalParameters = sb.toString$0();
        t1 = this._functionName;
        return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
      }
  }
 },
 is$NoSuchMethodException: true,
 is$Exception: true
});

Isolate.$defineClass("ObjectNotClosureException", "Object", [], {
 toString$0: function() {
  return 'Object is not closure';
 },
 is$Exception: true
});

Isolate.$defineClass("IllegalArgumentException", "Object", ["_arg"], {
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
 },
 is$Exception: true
});

Isolate.$defineClass("StackOverflowException", "Object", [], {
 toString$0: function() {
  return 'Stack Overflow';
 },
 is$Exception: true
});

Isolate.$defineClass("BadNumberFormatException", "Object", ["_s"], {
 toString$0: function() {
  return 'BadNumberFormatException: \'' + $.S(this._s) + '\'';
 },
 is$Exception: true
});

Isolate.$defineClass("NullPointerException", "Object", ["arguments", "functionName"], {
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  var t1 = this.functionName;
  if ($.eqNullB(t1)) {
    return this.get$exceptionName();
  } else {
    return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
  }
 },
 is$Exception: true
});

Isolate.$defineClass("NoMoreElementsException", "Object", [], {
 toString$0: function() {
  return 'NoMoreElementsException';
 },
 is$Exception: true
});

Isolate.$defineClass("EmptyQueueException", "Object", [], {
 toString$0: function() {
  return 'EmptyQueueException';
 },
 is$Exception: true
});

Isolate.$defineClass("UnsupportedOperationException", "Object", ["_message"], {
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
 },
 is$Exception: true
});

Isolate.$defineClass("NotImplementedException", "Object", ["_message"], {
 toString$0: function() {
  var t1 = this._message;
  if (!(t1 === (void 0))) {
    t1 = 'NotImplementedException: ' + $.S(t1);
  } else {
    t1 = 'NotImplementedException';
  }
  return t1;
 },
 is$Exception: true
});

Isolate.$defineClass("IllegalJSRegExpException", "Object", ["_errmsg", "_pattern"], {
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
 },
 is$Exception: true
});

Isolate.$defineClass("ExpectException", "Object", ["message="], {
 toString$0: function() {
  return this.message;
 },
 is$Exception: true
});

Isolate.$defineClass("AssertionError", "Object", [], {
});

Isolate.$defineClass("TypeError", "AssertionError", ["msg"], {
 toString$0: function() {
  return this.msg;
 }
});

Isolate.$defineClass("DefaultJsonable", "Object", ["id="], {
 test$0: function() {
  $.JsonableTest$0().test$0();
 },
 equals$1: function(other) {
  return $.eq(this.id, other.get$id());
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.DefaultJsonable$0();
  } else {
    t1 = $.DefaultJsonable$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$type($.name(this));
  return data;
 },
 DefaultJsonable$data$1: function(json) {
  this.id = json.get$id();
 },
 is$Jsonable: true,
 is$Copyable: true,
 is$Hashable: true,
 is$Identifyable: true,
 is$Testable: true
});

Isolate.$defineClass("ImmutableL", "Object", [], {
 iterator$0: function() {
  return $.iterator(this.wrapped);
 },
 ImmutableL$1: function(list) {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'T'}));
  this.wrapped = t1;
  for (t1 = $.iterator(list); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    $.add$1(this.wrapped, t2);
  }
 }
});

Isolate.$defineClass("AllSupportedLists", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("SupportedVariouss", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("Dartan", "Object", ["viewRouter"], {
 Dartan$0: function() {
  this.viewRouter = $.ViewRouter$0();
 }
});

Isolate.$defineClass("SupportedListenableLists", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("ObservableHelper", "Object", ["listeners"], {
 fire$3: function(propertyName, oldValue, newValue) {
  if (!$.eqNullB($.index(this.listeners, propertyName)) && $.isEmpty($.index(this.listeners, propertyName)) !== true) {
    for (var t1 = $.iterator($.index(this.listeners, propertyName)); t1.hasNext$0() === true; ) {
      t1.next$0().$call$2(oldValue, newValue);
    }
  }
 },
 removeListener$2: function(propertyName, handler) {
  if (!$.eqNullB(handler) && !$.eqNullB($.index(this.listeners, propertyName))) {
    var index = $.indexOf$2($.index(this.listeners, propertyName), handler, 0);
    if (!$.eqB(index, -1)) {
      $.removeRange($.index(this.listeners, propertyName), index, 1);
    }
  }
 },
 addListener$2: function(propertyName, handler) {
  if (!$.eqNullB(handler)) {
    if ($.eqNullB($.index(this.listeners, propertyName))) {
      var t1 = this.listeners;
      var t2 = $.List((void 0));
      $.setRuntimeTypeInfo(t2, ({E: '(Dynamic, Dynamic) -> void'}));
      $.indexSet(t1, propertyName, t2);
    }
    $.add$1($.index(this.listeners, propertyName), handler);
  }
 }
});

Isolate.$defineClass("ListenableList", "Object", ["listInsertedListeners", "listAddedListeners", "listRemovedListeners", "removedListeners", "insertedListeners", "addedListeners", "changedListeners", "_fireIndividualItems", "_internal"], {
 test$0: function() {
  return $.ListenableListTest$0().test$0();
 },
 get$length: function() {
  return $.get$length(this._internal);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._internal);
 },
 forEach$1: function(f) {
  $.forEach(this._internal, f);
 },
 filter$1: function(f) {
  return $.filter(this._internal, f);
 },
 iterator$0: function() {
  return $.iterator(this._internal);
 },
 getRange$2: function(start, length$) {
  return $.getRange(this._internal, start, length$);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._internal, element, start);
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,(void 0))
},
 last$0: function() {
  return $.last(this._internal);
 },
 set$length: function(newLength) {
 },
 operator$index$1: function(index) {
  return $.index(this._internal, index);
 },
 operator$indexSet$2: function(index, value) {
  var old = $.index(this._internal, index);
  $.indexSet(this._internal, index, value);
  this._fireRemoved$1(old);
  this._fireAdded$1(value);
  this._fireChanged$0();
 },
 removeRange$2: function(start, len) {
  if (typeof start !== 'number') return this.removeRange$2$bailout(start, len, 1, start, 0);
  if (typeof len !== 'number') return this.removeRange$2$bailout(start, len, 2, start, len);
  var removedItems = $.List((void 0));
  if (!(len === 0) && $.ltB(start, $.get$length(this._internal))) {
    for (var i = 0; i < len; ++i) {
      removedItems.push($.index(this._internal, start + i));
    }
    $.equals(len, removedItems.length, (void 0));
    $.removeRange(this._internal, start, len);
    this._fireListRemoved$1(removedItems);
    this._fireChanged$0();
  }
 },
 removeRange$2$bailout: function(start, len, state, env0, env1) {
  switch (state) {
    case 1:
      start = env0;
      break;
    case 2:
      start = env0;
      len = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      var removedItems = $.List((void 0));
      if (!$.eqB(len, 0) && $.ltB(start, $.get$length(this._internal))) {
        var i = 0;
        L0: while (true) {
          if (!$.ltB(i, len)) break L0;
          removedItems.push($.index(this._internal, $.add(start, i)));
          ++i;
        }
        $.equals(len, removedItems.length, (void 0));
        $.removeRange(this._internal, start, len);
        this._fireListRemoved$1(removedItems);
        this._fireChanged$0();
      }
  }
 },
 clear$0: function() {
  var removedItems = this._internal;
  $.clear(this._internal);
  this._fireListRemoved$1(removedItems);
  this._fireChanged$0();
 },
 _fireListRemoved$1: function(removedList) {
  for (var t1 = $.iterator(this.listRemovedListeners); t1.hasNext$0() === true; ) {
    t1.next$0().$call$1(removedList);
  }
  if (this._fireIndividualItems === true) {
    for (t1 = $.iterator(removedList); t1.hasNext$0() === true; ) {
      this._fireRemoved$1(t1.next$0());
    }
  }
 },
 addAll$1: function(collection) {
  $.addAll(this._internal, collection);
  this._fireListAdded$1(collection);
  this._fireChanged$0();
 },
 _fireListAdded$1: function(added) {
  for (var t1 = $.iterator(this.listAddedListeners); t1.hasNext$0() === true; ) {
    t1.next$0().$call$1(added);
  }
  if (this._fireIndividualItems === true) {
    for (t1 = $.iterator(added); t1.hasNext$0() === true; ) {
      this._fireAdded$1(t1.next$0());
    }
  }
 },
 onListAdded$1: function(listAdded) {
  $.add$1(this.listAddedListeners, listAdded);
 },
 removeLast$0: function() {
  if ($.isEmpty(this._internal) !== true) {
    this.remove$1($.index(this._internal, $.sub($.get$length(this._internal), 1)));
  }
 },
 _removeFromList$2: function(list, item) {
  var index = $.indexOf$2(list, item, 0);
  if (!$.eqB(index, -1)) {
    $.removeRange(list, index, 1);
  }
 },
 remove$1: function(item) {
  var index = $.indexOf$1(this._internal, item);
  if (!$.eqB(index, -1)) {
    $.removeRange(this._internal, index, 1);
    this._fireRemoved$1(item);
    this._fireChanged$0();
    return true;
  } else {
    return false;
  }
 },
 _fireRemoved$1: function(item) {
  for (var t1 = $.iterator(this.removedListeners); t1.hasNext$0() === true; ) {
    t1.next$0().$call$1(item);
  }
 },
 offRemoved$1: function(removed) {
  this._removeFromList$2(this.removedListeners, removed);
 },
 onRemoved$1: function(removed) {
  $.add$1(this.removedListeners, removed);
 },
 addLast$1: function(value) {
  this.add$1(value);
 },
 add$1: function(toAdd) {
  $.add$1(this._internal, toAdd);
  this._fireAdded$1(toAdd);
  this._fireChanged$0();
 },
 _fireAdded$1: function(item) {
  for (var t1 = $.iterator(this.addedListeners); t1.hasNext$0() === true; ) {
    t1.next$0().$call$1(item);
  }
 },
 offAdded$1: function(added) {
  this._removeFromList$2(this.addedListeners, added);
 },
 onAdded$1: function(listener) {
  if ($.eqNullB(this.addedListeners)) {
    var t1 = $.List((void 0));
    $.setRuntimeTypeInfo(t1, ({E: '(Dynamic) -> void'}));
    this.addedListeners = t1;
  }
  $.add$1(this.addedListeners, listener);
 },
 _fireChanged$0: function() {
  for (var t1 = $.iterator(this.changedListeners); t1.hasNext$0() === true; ) {
    t1.next$0().$call$0();
  }
 },
 onChanged$1: function(changed) {
  $.add$1(this.changedListeners, changed);
 },
 init$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'T'}));
  this._internal = t1;
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: '() -> void'}));
  this.changedListeners = t1;
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: '(Dynamic) -> void'}));
  this.addedListeners = t1;
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: '(Dynamic, int) -> void'}));
  this.insertedListeners = t1;
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: '(Dynamic) -> void'}));
  this.removedListeners = t1;
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: '(Dynamic) -> void'}));
  this.listRemovedListeners = t1;
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: '(Dynamic) -> void'}));
  this.listAddedListeners = t1;
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: '(Dynamic) -> void'}));
  this.listInsertedListeners = t1;
 },
 ListenableList$from$1: function(other) {
  this.init$0();
  for (var t1 = $.iterator(other); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    $.add$1(this._internal, t2);
  }
 },
 ListenableList$0: function() {
  this.init$0();
 },
 is$Testable: true,
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("JsonObject", "Object", ["isExtendable!", "__concrete", "expectConcrete", "_objectData=", "_jsonString="], {
 equals$1: function(other) {
  var t1 = ({});
  t1.other_1 = other;
  if (!$.eqB($.get$length(t1.other_1), $.get$length(this))) {
    return false;
  }
  this.forEach$1(new $.Closure20(t1));
  return true;
 },
 clear$0: function() {
  if ($.eqB(this.isExtendable, true)) {
    $.clear(this._objectData);
  } else {
    throw $.captureStackTrace($.UnsupportedOperationException$1('JsonObject is not extendable'));
  }
 },
 remove$1: function(key) {
  if ($.eqB(this.isExtendable, true) || this.containsKey$1(key) === true) {
    return this._objectData.remove$1(key);
  } else {
    throw $.captureStackTrace($.UnsupportedOperationException$1('JsonObject is not extendable'));
  }
 },
 operator$indexSet$2: function(key, value) {
  if ($.eqB(this.isExtendable, true) || this.containsKey$1(key) === true) {
    $.indexSet(this._objectData, key, value);
    return value;
  } else {
    throw $.captureStackTrace($.UnsupportedOperationException$1('JsonObject is not extendable'));
  }
 },
 isEmpty$0: function() {
  return $.isEmpty(this._objectData);
 },
 get$length: function() {
  return $.get$length(this._objectData);
 },
 getValues$0: function() {
  return this._objectData.getValues$0();
 },
 getKeys$0: function() {
  return this._objectData.getKeys$0();
 },
 forEach$1: function(func) {
  return $.forEach(this._objectData, func);
 },
 operator$index$1: function(key) {
  return $.index(this._objectData, key);
 },
 containsKey$1: function(value) {
  return this._objectData.containsKey$1(value);
 },
 _extractElements$1: function(data) {
  var t1 = ({});
  t1.data_1 = data;
  var t2 = t1.data_1;
  if (typeof t2 === 'object' && t2.is$Map()) {
    $.forEach(t1.data_1, new $.Closure17(this, t1));
  } else {
    t2 = t1.data_1;
    if (typeof t2 === 'object' && (t2.constructor === Array || t2.is$Collection())) {
      var list = t1.data_1;
      if (typeof list !== 'object'||list.constructor !== Array||!!list.immutable$list) return this._extractElements$1$bailout(data, 1, t1, list);
      for (var i = 0; $.ltB(i, $.get$length(t1.data_1)); ++i) {
        t2 = list.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        var t3 = list[i];
        if (typeof t3 === 'object' && (t3.constructor === Array || t3.is$Collection())) {
          this._extractElements$1(t3);
        } else {
          if (typeof t3 === 'object' && t3.is$Map()) {
            t2 = $.JsonObject$fromMap$1(t3);
            var t4 = list.length;
            if (i < 0 || i >= t4) throw $.ioore(i);
            list[i] = t2;
          }
        }
      }
    }
  }
 },
 _extractElements$1$bailout: function(data, state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      list = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = ({});
      t1.data_1 = data;
      var t2 = t1.data_1;
    case 1:
      if ((state == 0 && (typeof t2 === 'object' && t2.is$Map()))) {
        $.forEach(t1.data_1, new $.Closure17(this, t1));
      } else {
        switch (state) {
          case 0:
            t2 = t1.data_1;
          case 1:
            if (state == 1 || (state == 0 && (typeof t2 === 'object' && ((t2.constructor === Array || t2.is$Collection()))))) {
              switch (state) {
                case 0:
                  var list = t1.data_1;
                case 1:
                  state = 0;
                  var i = 0;
                  L0: while (true) {
                    if (!$.ltB(i, $.get$length(t1.data_1))) break L0;
                    var listItem = $.index(list, i);
                    if (typeof listItem === 'object' && (listItem.constructor === Array || listItem.is$Collection())) {
                      this._extractElements$1(listItem);
                    } else {
                      if (typeof listItem === 'object' && listItem.is$Map()) {
                        $.indexSet(list, i, $.JsonObject$fromMap$1(listItem));
                      }
                    }
                    ++i;
                  }
              }
            }
        }
      }
  }
 },
 noSuchMethod$2: function(function_name, args) {
  if ($.eqB($.get$length(args), 0) && $.startsWith(function_name, 'get:') === true) {
    var property = $.replaceFirst(function_name, 'get:', '');
    if (this.containsKey$1(property) === true) {
      return this.operator$index$1(property);
    }
  } else {
    if ($.eqB($.get$length(args), 1) && $.startsWith(function_name, 'set:') === true) {
      property = $.replaceFirst(function_name, 'set:', '');
      this.operator$indexSet$2(property, $.index(args, 0));
      return this.operator$index$1(property);
    }
  }
  $.Object.prototype.noSuchMethod$2.call(this, function_name, args);
 },
 toString$0: function() {
  return this._jsonString;
 },
 JsonObject$0: function() {
  this._objectData = $.HashMapImplementation$0();
  this.isExtendable = true;
  this.expectConcrete = true;
 },
 JsonObject$fromMap$1: function(map) {
  this._jsonString = $.stringify(map);
  this._objectData = map;
  this._extractElements$1(this._objectData);
  this.isExtendable = false;
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("SupportedResources", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("AbstractResource", "Object", ["id="], {
 test$0: function() {
 },
 equals$1: function(other) {
  return $.eq(this.id, other.get$id());
 },
 get$data: function() {
  var d = $.JsonObject$0();
  d.set$id(this.id);
  d.set$type($.name(this));
  return d;
 },
 copy$1: function(data) {
  return $.AbstractResource$1((void 0));
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 get$isTradeable: function() {
  return false;
 },
 get$color: function() {
  return 'black';
 },
 AbstractResource$data$1: function(json) {
  this.id = json.get$id();
 },
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Identifyable: true,
 is$Hashable: true
});

Isolate.$defineClass("Timber", "AbstractResource", ["id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Timber$1((void 0));
  } else {
    t1 = $.Timber$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$isTradeable: function() {
  return true;
 },
 get$color: function() {
  return 'green';
 }
});

Isolate.$defineClass("Wheat", "AbstractResource", ["id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Wheat$1((void 0));
  } else {
    t1 = $.Wheat$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$isTradeable: function() {
  return true;
 },
 get$color: function() {
  return 'gold';
 }
});

Isolate.$defineClass("Ore", "AbstractResource", ["id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Ore$1((void 0));
  } else {
    t1 = $.Ore$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$isTradeable: function() {
  return true;
 },
 get$color: function() {
  return 'purple';
 }
});

Isolate.$defineClass("Sheep", "AbstractResource", ["id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Sheep$1((void 0));
  } else {
    t1 = $.Sheep$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$isTradeable: function() {
  return true;
 },
 get$color: function() {
  return 'lightgreen';
 }
});

Isolate.$defineClass("Clay", "AbstractResource", ["id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Clay$1((void 0));
  } else {
    t1 = $.Clay$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$isTradeable: function() {
  return true;
 },
 get$color: function() {
  return 'Red';
 }
});

Isolate.$defineClass("SupportedResourceLists", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("DevelopmentCardCost", "ResourceListIm", ["wrapped"], {
});

Isolate.$defineClass("TownCost", "ResourceListIm", ["wrapped"], {
});

Isolate.$defineClass("RoadCost", "ResourceListIm", ["wrapped"], {
});

Isolate.$defineClass("CityCost", "ResourceListIm", ["wrapped"], {
});

Isolate.$defineClass("MonopolyableResources", "ResourceListIm", ["wrapped"], {
});

Isolate.$defineClass("ResourceListIm", "Object", ["wrapped"], {
 test$0: function() {
  $.ResourceListImTest$0().test$0();
 },
 get$length: function() {
  return $.get$length(this.wrapped);
 },
 isEmpty$0: function() {
  return $.isEmpty(this.wrapped);
 },
 forEach$1: function(f) {
  $.forEach(this.wrapped, f);
 },
 filter$1: function(f) {
  return $.filter(this.wrapped, f);
 },
 iterator$0: function() {
  return $.iterator(this.wrapped);
 },
 hasAtLeast$1: function(toHave) {
  return this.wrapped.hasAtLeast$1(toHave);
 },
 toSummary$0: function() {
  return this.wrapped.toSummary$0();
 },
 types$0: function() {
  return this.wrapped.types$0();
 },
 ofType$1: function(type) {
  return this.wrapped.ofType$1(type);
 },
 hasType$1: function(type) {
  return this.wrapped.hasType$1(type);
 },
 halfCount$0: function() {
  return $.toInt(this.wrapped.halfCount$0());
 },
 ResourceListIm$1: function(other) {
  if (!$.eqNullB(other)) {
    this.wrapped = $.ResourceListMu$from$1(other);
  } else {
    this.wrapped = $.ResourceListMu$0();
  }
 },
 is$Testable: true,
 is$Collection: function() { return true; }
});

Isolate.$defineClass("ResourceListMu", "ListenableList", ["_res", "listInsertedListeners", "listAddedListeners", "listRemovedListeners", "removedListeners", "insertedListeners", "addedListeners", "changedListeners", "_fireIndividualItems", "_internal"], {
 test$0: function() {
  $.ResourceListMuTest$0().test$0();
 },
 ofType$1: function(type) {
  this.ensureType$1(type);
  return $.ResourceListIm$1($.index(this._res, type));
 },
 hasType$1: function(type) {
  this.ensureType$1(type);
  return !($.eqNullB($.index(this._res, type)) || $.eqB($.get$length($.index(this._res, type)), 0));
 },
 hasAtLeast$1: function(toHave) {
  for (var t1 = $.iterator(toHave.types$0()); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (this.hasType$1(t2) === true) {
      if ($.ltB($.get$length(this.ofType$1(t2)), $.get$length(toHave.ofType$1(t2)))) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
 },
 types$0: function() {
  return this._res.getKeys$0();
 },
 ensureType$1: function(t) {
  if ($.eqNullB($.index(this._res, t))) {
    var t1 = this._res;
    var t2 = $.List((void 0));
    $.setRuntimeTypeInfo(t2, ({E: 'Resource'}));
    $.indexSet(t1, t, t2);
  }
 },
 addAll$1: function(resources) {
  for (var t1 = $.iterator(resources); t1.hasNext$0() === true; ) {
    this._add$1(t1.next$0());
  }
  $.ListenableList.prototype.addAll$1.call(this, resources);
 },
 add$1: function(r) {
  this._add$1(r);
  $.ListenableList.prototype.add$1.call(this, r);
 },
 _add$1: function(r) {
  var n = $.name(r);
  this.ensureType$1(n);
  $.add$1($.index(this._res, n), r);
 },
 remove$1: function(r) {
  this._remove$1(r);
  return $.ListenableList.prototype.remove$1.call(this, r);
 },
 _remove$1: function(toRemove) {
  var name$ = $.name(toRemove);
  if (this.hasType$1(name$) === true) {
    var ind = $.indexOf$1($.index(this._res, name$), toRemove);
    $.removeRange($.index(this._res, name$), ind, 1);
  }
 },
 toSummary$0: function() {
  var s = $.StringBufferImpl$1('');
  for (var t1 = $.iterator(this.types$0()); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (this.hasType$1(t2) === true) {
      s.add$1($.S($.get$length(this.ofType$1(t2))) + ' ' + $.S(t2) + ', ');
    }
  }
  var tmp = s.toString$0();
  if ($.gtB($.get$length(tmp), 0)) {
    return $.substring$2(tmp, 0, $.sub($.get$length(tmp), 2));
  } else {
    return 'Empty';
  }
 },
 halfCount$0: function() {
  var temp = $.get$length(this._internal);
  if (!$.eqB($.mod(temp, 2), 0)) {
    temp = $.add(temp, 1);
  }
  return $.div(temp, 2);
 },
 initr$0: function() {
  this._res = $.HashMapImplementation$0();
  for (var t1 = $.iterator(this._internal); t1.hasNext$0() === true; ) {
    this._add$1(t1.next$0());
  }
 },
 ResourceListMu$from$1: function(other) {
  this.initr$0();
 },
 ResourceListMu$0: function() {
  this.initr$0();
 },
 is$Testable: true,
 is$Collection: function() { return true; }
});

Isolate.$defineClass("SupportedGames", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("Game", "Object", ["turn?", "status", "currentTurnPhase", "currentGamePhase?", "settings", "phases?", "largestArmy", "longestRoad", "robber", "bank?", "players?", "developmentCards", "queue", "chats?", "turns?", "actions?", "users?", "spectators", "developmentCardCount", "id=", "name=", "board=", "host!", "playerOnTurn", "startedDateTime!", "observable"], {
 test$0: function() {
  $.GameTest$0().test$0();
 },
 equals$1: function(other) {
  return $.eq(other.get$id(), this.id);
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$type($.name(this));
  data.set$name(this.name);
  data.users = $.nullOrDataListFrom(this.users);
  return data;
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Game$0();
  } else {
    t1 = $.Game$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 offSetted$2: function(property, handler) {
  this.observable.removeListener$2(property, handler);
 },
 onSetted$2: function(property, handler) {
  this.observable.addListener$2(property, handler);
 },
 playerById$1: function(playerId) {
  return $.byId(playerId, this.players);
 },
 userById$1: function(userId) {
  return $.byId(userId, this.users);
 },
 prepareDevelopmentCards$0: function() {
 },
 start$0: function() {
  this.phases.next$1(this);
 },
 _init$0: function() {
  this.observable = $.ObservableHelper$0();
  var t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Say'}));
  this.chats = t1;
  if ($.eqNullB(this.users)) {
    t1 = $.ListenableList$0();
    $.setRuntimeTypeInfo(t1, ({T: 'User'}));
  } else {
    t1 = this.users;
  }
  this.users = t1;
  if ($.eqNullB(this.phases)) {
    t1 = $.AllPhases$0();
  } else {
    t1 = this.phases;
  }
  this.phases = t1;
  if ($.eqNullB(this.status)) {
    t1 = $.Playing$0();
  } else {
    t1 = this.status;
  }
  this.status = t1;
  if ($.eqNullB(this.turns)) {
    t1 = $.ListenableList$0();
    $.setRuntimeTypeInfo(t1, ({T: 'Turn'}));
  } else {
    t1 = this.turns;
  }
  this.turns = t1;
  if ($.eqNullB(this.players)) {
    t1 = $.PlayerListMu$0();
  } else {
    t1 = this.players;
  }
  this.players = t1;
  if ($.eqNullB(this.bank)) {
    t1 = $.ResourceListMu$0();
  } else {
    t1 = this.bank;
  }
  this.bank = t1;
  if ($.eqNullB(this.actions)) {
    t1 = $.ListenableList$0();
    $.setRuntimeTypeInfo(t1, ({T: 'GameAction'}));
  } else {
    t1 = this.actions;
  }
  this.actions = t1;
  if ($.eqNullB(this.queue)) {
    t1 = $.ListenableList$0();
    $.setRuntimeTypeInfo(t1, ({T: 'Action'}));
  } else {
    t1 = this.queue;
  }
  this.queue = t1;
 },
 Game$data$1: function(json) {
  this.id = json.get$id();
  this.users = $.llFrom(json.get$users());
  this.status = $.Playing$0();
  this.players = $.PlayerListMu$0();
  this.observable = $.ObservableHelper$0();
  this.bank = $.ResourceListMu$0();
  var t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'GameAction'}));
  this.actions = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Action'}));
  this.queue = t1;
  this._init$0();
 },
 Game$0: function() {
  this._init$0();
 },
 is$Jsonable: true,
 is$Copyable: true,
 is$Identifyable: true,
 is$Hashable: true,
 is$Observable: true,
 is$Testable: true
});

Isolate.$defineClass("Board", "Object", ["territories?", "portsBag?", "chitsBag?", "tilesBag?", "edgePieces?", "verticePieces?", "_forbiddenVertices", "_edges", "_vertices", "_tilesByCell", "id=", "name=", "rows", "columns", "observable"], {
 test$0: function() {
  $.BoardTest$0().test$0();
 },
 equals$1: function(other) {
  return $.eq(other.get$name(), this.name);
 },
 offSetted$2: function(property, handler) {
  this.observable.removeListener$2(property, handler);
 },
 onSetted$2: function(property, handler) {
  this.observable.addListener$2(property, handler);
 },
 hashCode$0: function() {
  return $.hashCode(this.name);
 },
 _addVertices$1: function(c) {
  $.addAll(this._vertices, c.get$vertices());
 },
 _addEdges$1: function(c) {
  $.addAll(this._edges, c.get$edges());
 },
 noRedChitsAround$1: function(tile) {
  for (var t1 = $.iterator(tile.get$cell().get$cells()); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    var withChit = $.index(this._tilesByCell, t2);
    if (!$.eqNullB(withChit) && withChit.get$hasChit() === true && withChit.get$chit().get$isRed() === true) {
      return false;
    }
  }
  return true;
 },
 changeTile$1: function(newTile) {
  var oldCell = newTile.get$cell();
  if (this._tilesByCell.containsKey$1(oldCell) !== true) {
    this.addTile$1(newTile);
  } else {
    var old = $.index(this._tilesByCell, newTile.get$cell());
    $.indexSet(this._tilesByCell, newTile.get$cell(), newTile);
    this.observable.fire$3('changeTile', old, newTile);
  }
 },
 addTile$1: function(t) {
  $.indexSet(this._tilesByCell, t.get$cell(), t);
  this._addVertices$1(t.get$cell());
  this._addEdges$1(t.get$cell());
 },
 from2DMatrix$2: function(totalCols, totalRows) {
  if (typeof totalCols !== 'number') return this.from2DMatrix$2$bailout(totalCols, totalRows, 1, totalCols, 0);
  if (typeof totalRows !== 'number') return this.from2DMatrix$2$bailout(totalCols, totalRows, 2, totalCols, totalRows);
  for (var column = 0; column < totalCols; ++column) {
    for (var row = 0; row < totalRows; ++row) {
      this.addTile$1($.Sea$1($.Cell$2(row, column)));
    }
  }
 },
 from2DMatrix$2$bailout: function(totalCols, totalRows, state, env0, env1) {
  switch (state) {
    case 1:
      totalCols = env0;
      break;
    case 2:
      totalCols = env0;
      totalRows = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      var column = 0;
      L0: while (true) {
        if (!$.ltB(column, totalCols)) break L0;
        var row = 0;
        L1: while (true) {
          if (!$.ltB(row, totalRows)) break L1;
          this.addTile$1($.Sea$1($.Cell$2(row, column)));
          ++row;
        }
        ++column;
      }
  }
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$name(this.name);
  data.set$id(this.id);
  data.set$type($.name(this));
  data.tiles = $.toDataList(this._tilesByCell.getValues$0());
  data.chitsBag = $.toDataList(this.chitsBag);
  data.tilesBag = $.toDataList(this.tilesBag);
  data.portsBag = $.toDataList(this.portsBag);
  data.territories = $.toDataList(this.territories);
  return data;
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Board$2((void 0), (void 0));
  } else {
    t1 = $.Board$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 init$0: function() {
  this._tilesByCell = $.HashMapImplementation$0();
  var t1 = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(t1, ({E: 'Vertice'}));
  this._vertices = t1;
  t1 = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(t1, ({E: 'Edge'}));
  this._edges = t1;
  t1 = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(t1, ({E: 'Vertice'}));
  this._forbiddenVertices = t1;
  this.observable = $.ObservableHelper$0();
 },
 setStartingState$0: function() {
 },
 make$1: function(random) {
 },
 get$tiles: function() {
  return $.List$from(this._tilesByCell.getValues$0());
 },
 get$edges: function() {
  return this._edges;
 },
 get$vertices: function() {
  return this._vertices;
 },
 Board$data$1: function(json) {
  this.id = json.get$id();
  this.name = json.get$name();
  this.chitsBag = $.llFrom(json.get$chitsBag());
  this.portsBag = $.llFrom(json.get$portsBag());
  this.tilesBag = $.llFrom(json.get$tilesBag());
  this.territories = $.llFrom(json.get$territories());
 },
 Board$2: function(columns, rows) {
  this.init$0();
  var t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Tile'}));
  this.tilesBag = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Chit'}));
  this.chitsBag = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Port'}));
  this.portsBag = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Territory'}));
  this.territories = t1;
  if (!$.eqNullB(this.columns) && !$.eqNullB(this.rows)) {
    this.name = 'Unnamed ' + $.S(this.columns) + 'x' + $.S(this.rows);
    if ($.gtB(this.columns, -1) && $.gtB(this.rows, -1)) {
      this.from2DMatrix$2(this.rows, this.columns);
    }
  }
 },
 is$Testable: true,
 is$Identifyable: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Hashable: true,
 is$Observable: true
});

Isolate.$defineClass("Standard4p", "Board", ["randomFields", "mainIsland", "territories", "portsBag", "chitsBag", "tilesBag", "edgePieces", "verticePieces", "_forbiddenVertices", "_edges", "_vertices", "_tilesByCell", "id", "name", "rows", "columns", "observable"], {
 replaceRandomTiles$1: function(random) {
  this.makeRaandomFields$0();
  this.newTileBag$0();
  var rts = $.List((void 0));
  $.setRuntimeTypeInfo(rts, ({E: 'RandomTile'}));
  for (var t1 = $.iterator(this.get$tiles()); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (t2.get$isRandom() === true) {
      rts.push(t2);
    }
  }
  for (t1 = $.iterator(rts); t1.hasNext$0() === true; ) {
    t2 = t1.next$0();
    var intPick = random.intFromZero$1($.sub($.get$length(this.tilesBag), 1));
    var tilePick = $.index(this.tilesBag, intPick);
    tilePick.set$cell(t2.get$cell());
    tilePick.set$chit(t2.get$chit());
    $.removeRange(this.tilesBag, intPick, 1);
    this.changeTile$1(tilePick);
  }
  $.print('jeuuj');
 },
 not$1: function(b) {
  return b !== true;
 },
 placeChits$1: function(random) {
  this.newChitsBag$0();
  var randomChitTiles = $.List((void 0));
  $.setRuntimeTypeInfo(randomChitTiles, ({E: 'Tile'}));
  $.HashMapImplementation$0();
  for (var t1 = $.iterator(this.get$tiles()); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (t2.get$hasChit() === true) {
      var t3 = t2.get$chit();
      t3 = typeof t3 === 'object' && !!t3.is$RandomChit;
    } else {
      t3 = false;
    }
    if (t3) {
      randomChitTiles.push(t2);
    }
  }
  var hotChits = $.filter(this.chitsBag, new $.Closure44());
  if (typeof hotChits !== 'string' && (typeof hotChits !== 'object'||hotChits.constructor !== Array)) return this.placeChits$1$bailout(random, 1, randomChitTiles, hotChits);
  $.setRuntimeTypeInfo($.List((void 0)), ({E: 'Tile'}));
  for (; $.isEmpty(hotChits) !== true; ) {
    var intPick = random.intFromZero$1(hotChits.length - 1);
    if (intPick !== (intPick | 0)) throw $.iae(intPick);
    t1 = hotChits.length;
    if (intPick < 0 || intPick >= t1) throw $.ioore(intPick);
    t2 = hotChits[intPick];
    var intTilePick = random.intFromZero$1(randomChitTiles.length - 1);
    if (intTilePick !== (intTilePick | 0)) throw $.iae(intTilePick);
    t3 = randomChitTiles.length;
    if (intTilePick < 0 || intTilePick >= t3) throw $.ioore(intTilePick);
    var t4 = randomChitTiles[intTilePick];
    if (this.noRedChitsAround$1(t4) === true) {
      t4.set$chit(t2);
      $.removeRange(hotChits, intPick, 1);
      $.removeRange(randomChitTiles, intTilePick, 1);
    }
  }
  for (var twins = true; twins; ) {
    var chitsBagCopy = $.List$from($.filter(this.chitsBag, new $.Closure45(this)));
    for (t1 = $.iterator(randomChitTiles); t1.hasNext$0() === true; ) {
      t2 = t1.next$0();
      var intChitPick = random.intFromZero$1(chitsBagCopy.length - 1);
      if (intChitPick !== (intChitPick | 0)) throw $.iae(intChitPick);
      t3 = chitsBagCopy.length;
      if (intChitPick < 0 || intChitPick >= t3) throw $.ioore(intChitPick);
      t2.set$chit(chitsBagCopy[intChitPick]);
      $.removeRange(chitsBagCopy, intChitPick, 1);
    }
    twins = false;
  }
 },
 placeChits$1$bailout: function(random, state, env0, env1) {
  switch (state) {
    case 1:
      randomChitTiles = env0;
      hotChits = env1;
      break;
  }
  switch (state) {
    case 0:
      this.newChitsBag$0();
      var randomChitTiles = $.List((void 0));
      $.setRuntimeTypeInfo(randomChitTiles, ({E: 'Tile'}));
      $.HashMapImplementation$0();
      var t1 = $.iterator(this.get$tiles());
      L0: while (true) {
        if (!(t1.hasNext$0() === true)) break L0;
        var t2 = t1.next$0();
        if (t2.get$hasChit() === true) {
          var t3 = t2.get$chit();
          t3 = typeof t3 === 'object' && !!t3.is$RandomChit;
        } else {
          t3 = false;
        }
        if (t3) {
          randomChitTiles.push(t2);
        }
      }
      var hotChits = $.filter(this.chitsBag, new $.Closure44());
    case 1:
      state = 0;
      $.setRuntimeTypeInfo($.List((void 0)), ({E: 'Tile'}));
      L1: while (true) {
        if (!($.isEmpty(hotChits) !== true)) break L1;
        var intPick = random.intFromZero$1($.sub($.get$length(hotChits), 1));
        var t = $.index(hotChits, intPick);
        var intTilePick = random.intFromZero$1(randomChitTiles.length - 1);
        if (intTilePick !== (intTilePick | 0)) throw $.iae(intTilePick);
        t1 = randomChitTiles.length;
        if (intTilePick < 0 || intTilePick >= t1) throw $.ioore(intTilePick);
        t2 = randomChitTiles[intTilePick];
        if (this.noRedChitsAround$1(t2) === true) {
          t2.set$chit(t);
          $.removeRange(hotChits, intPick, 1);
          $.removeRange(randomChitTiles, intTilePick, 1);
        }
      }
      var twins = true;
      L2: while (true) {
        if (!twins) break L2;
        var chitsBagCopy = $.List$from($.filter(this.chitsBag, new $.Closure45(this)));
        t1 = $.iterator(randomChitTiles);
        L3: while (true) {
          if (!(t1.hasNext$0() === true)) break L3;
          t2 = t1.next$0();
          var intChitPick = random.intFromZero$1(chitsBagCopy.length - 1);
          if (intChitPick !== (intChitPick | 0)) throw $.iae(intChitPick);
          t3 = chitsBagCopy.length;
          if (intChitPick < 0 || intChitPick >= t3) throw $.ioore(intChitPick);
          t2.set$chit(chitsBagCopy[intChitPick]);
          $.removeRange(chitsBagCopy, intChitPick, 1);
        }
        twins = false;
      }
  }
 },
 addPortAt$3: function(row, col, direction) {
  var first = $.Cell$2(row, col);
  $.index(this._tilesByCell, first).set$port($.RandomPort$2(first, direction));
 },
 placePorts$1: function(random) {
  this.makeRandomPorts$0();
  this.newPortsBag$0();
  for (var t1 = $.iterator($.filter(this.get$tiles(), new $.Closure43())); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    var intPick = random.intFromZero$1($.sub($.get$length(this.portsBag), 1));
    var newPort = $.index(this.portsBag, intPick);
    newPort.setCellAndDirection$2(t2.get$port().get$seaCell(), t2.get$port().get$edgeDirection());
    t2.set$port(newPort);
    $.removeRange(this.portsBag, intPick, 1);
  }
 },
 make$1: function(random) {
  this.replaceRandomTiles$1(random);
  this.placeChits$1(random);
  this.placePorts$1(random);
 },
 newTileBag$0: function() {
  var newTiles = $.List((void 0));
  $.addAll(newTiles, $.copiesOf($.Field$1((void 0)), 4));
  $.addAll(newTiles, $.copiesOf($.Mountain$1((void 0)), 3));
  $.addAll(newTiles, $.copiesOf($.Pasture$1((void 0)), 4));
  $.addAll(newTiles, $.copiesOf($.Forest$1((void 0)), 4));
  $.addAll(newTiles, $.copiesOf($.Hill$1((void 0)), 3));
  newTiles.push($.Desert$1((void 0)));
  $.clear(this.tilesBag);
  $.addAll(this.tilesBag, newTiles);
 },
 newChitsBag$0: function() {
  $.clear(this.chitsBag);
  $.addAll(this.chitsBag, [$.Chit2$0(), $.Chit3$0(), $.Chit3$0(), $.Chit4$0(), $.Chit4$0(), $.Chit5$0(), $.Chit5$0(), $.Chit6$0(), $.Chit6$0(), $.Chit8$0(), $.Chit8$0(), $.Chit9$0(), $.Chit9$0(), $.Chit10$0(), $.Chit10$0(), $.Chit11$0(), $.Chit11$0(), $.Chit12$0()]);
 },
 newPortsBag$0: function() {
  $.clear(this.portsBag);
  $.addAll(this.portsBag, [$.TwoToOnePort$3($.Wheat$1((void 0)), (void 0), (void 0)), $.TwoToOnePort$3($.Timber$1((void 0)), (void 0), (void 0)), $.TwoToOnePort$3($.Clay$1((void 0)), (void 0), (void 0)), $.TwoToOnePort$3($.Sheep$1((void 0)), (void 0), (void 0)), $.TwoToOnePort$3($.Ore$1((void 0)), (void 0), (void 0))]);
  $.addAll(this.portsBag, $.copiesOf($.ThreeToOnePort$2((void 0), (void 0)), 4));
 },
 setStartingState$0: function() {
  this.makeRaandomFields$0();
  this.makeRandomPorts$0();
 },
 makeSeaSurrounding$0: function() {
  this.addTile$1($.Sea$1($.Cell$2(0, 1)));
  this.addTile$1($.Sea$1($.Cell$2(0, 2)));
  this.addTile$1($.Sea$1($.Cell$2(0, 3)));
  this.addTile$1($.Sea$1($.Cell$2(0, 4)));
  this.addTile$1($.Sea$1($.Cell$2(1, 1)));
  this.addTile$1($.Sea$1($.Cell$2(1, 5)));
  this.addTile$1($.Sea$1($.Cell$2(2, 0)));
  this.addTile$1($.Sea$1($.Cell$2(2, 5)));
  this.addTile$1($.Sea$1($.Cell$2(3, 0)));
  this.addTile$1($.Sea$1($.Cell$2(3, 6)));
  this.addTile$1($.Sea$1($.Cell$2(4, 0)));
  this.addTile$1($.Sea$1($.Cell$2(4, 5)));
  this.addTile$1($.Sea$1($.Cell$2(5, 1)));
  this.addTile$1($.Sea$1($.Cell$2(5, 5)));
  this.addTile$1($.Sea$1($.Cell$2(6, 1)));
  this.addTile$1($.Sea$1($.Cell$2(6, 2)));
  this.addTile$1($.Sea$1($.Cell$2(6, 3)));
  this.addTile$1($.Sea$1($.Cell$2(6, 4)));
 },
 makeRandomPorts$0: function() {
  this.addPortAt$3(0, 1, $.Deg120180);
  this.addPortAt$3(0, 3, $.Deg120180);
  this.addPortAt$3(2, 0, $.Deg60120);
  this.addPortAt$3(3, 6, $.Deg240300);
  this.addPortAt$3(4, 0, $.Deg060);
  this.addPortAt$3(5, 5, $.Deg3000);
  this.addPortAt$3(1, 5, $.Deg180240);
  this.addPortAt$3(6, 1, $.Deg060);
  this.addPortAt$3(6, 3, $.Deg3000);
 },
 makeRaandomFields$0: function() {
  for (var r = 0; $.ltB(r, $.get$length(this.randomFields)); ++r) {
    for (var row = r + 1, c = 0; $.ltB(c, $.get$length($.index(this.randomFields, r))); ++c) {
      var tile = $.RandomTile$1($.Cell$2(row, $.index($.index(this.randomFields, r), c)));
      tile.set$chit($.RandomChit$0());
      tile.set$territory(this.mainIsland);
      this.changeTile$1(tile);
    }
  }
 },
 Standard4p$0: function() {
  this.mainIsland = $.MainIsland$1((void 0));
  $.add$1(this.territories, this.mainIsland);
  this.name = 'Standard 4player';
  this.makeRaandomFields$0();
  this.makeSeaSurrounding$0();
  this.makeRandomPorts$0();
 }
});

Isolate.$defineClass("Vertice", "Object", ["_edges", "_vertices", "_cells", "_type", "_topMost", "c3?", "c2?", "c1?"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Vertice$3(this.c1, this.c2, this.c3);
  } else {
    t1 = $.Vertice$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$edges: function() {
  if ($.eqNullB(this._edges)) {
    var t1 = $.HashSetImplementation$from([$.Edge$2(this.c1, this.c2), $.Edge$2(this.c1, this.c3), $.Edge$2(this.c2, this.c3)]);
    $.setRuntimeTypeInfo(t1, ({E: 'Edge'}));
    this._edges = t1;
  }
  return this._edges;
 },
 get$type: function() {
  if ($.eqB(this._type, -1)) {
    var cells = $.List$from([this.c1, this.c2, this.c3]);
    $.setRuntimeTypeInfo(cells, ({E: 'Cell'}));
    for (var t1 = $.iterator(cells), rmax = 220; t1.hasNext$0() === true; ) {
      var t2 = t1.next$0();
      if ($.ltB(t2.get$row(), rmax)) {
        rmax = t2.get$row();
      }
    }
    for (t1 = $.iterator(cells), count = 0; t1.hasNext$0() === true; ) {
      if ($.eqB(t1.next$0().get$row(), rmax)) {
        ++count;
      }
    }
    if (count === 1) {
      t1 = $.UpperRow1;
    } else {
      t1 = $.UpperRow2;
    }
    this._type = t1;
  }
  return this._type;
  var count;
 },
 get$cells: function() {
  if ($.eqNullB(this._cells)) {
    var t1 = $.List$from([this.c1, this.c2, this.c3]);
    $.setRuntimeTypeInfo(t1, ({E: 'Cell'}));
    this._cells = t1;
  }
  return this._cells;
 },
 _swapCellsIfNecesary$0: function() {
  var cs = $.List$from([this.c1, this.c2, this.c3]);
  $.setRuntimeTypeInfo(cs, ({E: 'Cell'}));
  var leftTop = this.c1;
  for (var i = 0; i < 3; ++i) {
    var t1 = cs.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.ltB(cs[i].get$row(), leftTop.get$row())) {
      t1 = cs.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      leftTop = cs[i];
    }
    t1 = cs.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(cs[i].get$row(), leftTop.get$row())) {
      t1 = cs.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = $.ltB(cs[i].get$column(), leftTop.get$column());
      t1 = t2;
    } else {
      t1 = false;
    }
    if (t1) {
      t1 = cs.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      leftTop = cs[i];
    }
  }
  $.removeRange(cs, cs.indexOf(leftTop), 1);
  if ($.eqB(this.get$type(), $.UpperRow1)) {
    t1 = cs.length;
    if (0 >= t1) throw $.ioore(0);
    t2 = cs[0].get$column();
    var t3 = cs.length;
    if (1 >= t3) throw $.ioore(1);
    if ($.ltB(t2, cs[1].get$column())) {
      t1 = cs.length;
      if (0 >= t1) throw $.ioore(0);
      var second = cs[0];
      t2 = cs.length;
      if (1 >= t2) throw $.ioore(1);
      var third = cs[1];
    } else {
      t1 = cs.length;
      if (1 >= t1) throw $.ioore(1);
      second = cs[1];
      t2 = cs.length;
      if (0 >= t2) throw $.ioore(0);
      third = cs[0];
    }
  } else {
    t1 = cs.length;
    if (0 >= t1) throw $.ioore(0);
    t2 = cs[0].get$row();
    t3 = cs.length;
    if (1 >= t3) throw $.ioore(1);
    if ($.ltB(t2, cs[1].get$row())) {
      t1 = cs.length;
      if (0 >= t1) throw $.ioore(0);
      second = cs[0];
      t2 = cs.length;
      if (1 >= t2) throw $.ioore(1);
      third = cs[1];
    } else {
      t1 = cs.length;
      if (1 >= t1) throw $.ioore(1);
      second = cs[1];
      t2 = cs.length;
      if (0 >= t2) throw $.ioore(0);
      third = cs[0];
    }
  }
  this.c1 = leftTop;
  this.c2 = second;
  this.c3 = third;
 },
 test$0: function() {
  $.VerticeTest$0().test$0();
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$c1(this.c1.get$data());
  data.set$c2(this.c2.get$data());
  data.c3 = this.c3.get$data();
  data.set$type($.name(this));
  return data;
 },
 operator$eq$1: function(other) {
  if (other === this) {
    return true;
  }
  if ($.eqNullB(other)) {
    return false;
  }
  return this.equals$1(other);
 },
 toText$0: function() {
  return 'Vertice [cell1: ' + $.S($.toString(this.c1)) + ', cell2: ' + $.S($.toString(this.c2)) + ', cell3: ' + $.S($.toString(this.c3)) + ']\n';
 },
 equals$1: function(o) {
  return $.eq(this.hashCode$0(), $.hashCode(o));
 },
 hashCode$0: function() {
  return $.mul($.mul($.hashCode(this.c1), $.hashCode(this.c2)), $.hashCode(this.c3));
 },
 Vertice$3: function(c1, c2, c3) {
  this._swapCellsIfNecesary$0();
 },
 Vertice$data$1: function(json) {
  this.c1 = $.Cell$data$1(json.get$c1());
  this.c2 = $.Cell$data$1(json.get$c2());
  this.c3 = $.Cell$data$1(json.get$c3());
  this._swapCellsIfNecesary$0();
 },
 is$Testable: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Hashable: true
});

Isolate.$defineClass("Edge", "Object", ["_neighbourEdges", "_neighbourCells", "nieghbourVertices", "_direction", "v2", "v1", "c2?", "c1?"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Edge$2(this.c1, this.c2);
  } else {
    t1 = $.Edge$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 test$0: function() {
  $.EdgeTest$0().test$0();
 },
 get$direction: function() {
  if ($.eqB(this._direction, -1)) {
    if ($.eqB(this.c1.get$row(), this.c2.get$row())) {
      return $.Vertical;
    }
    if ($.eqB($.mod(this.highestOrLeftestCell$0().get$row(), 2), 0)) {
      if ($.eqB(this.c1.get$column(), this.c2.get$column())) {
        this._direction = $.SlopeDown;
      } else {
        this._direction = $.SlopeUp;
      }
    } else {
      if ($.eqB(this.c1.get$column(), this.c2.get$column())) {
        this._direction = $.SlopeUp;
      } else {
        this._direction = $.SlopeDown;
      }
    }
  }
  return this._direction;
 },
 highestOrLeftestCell$0: function() {
  return this.c1;
 },
 _calculateCells$0: function() {
  var locations = $.List$from([this.v1.get$c1(), this.v1.get$c2(), this.v1.get$c3(), this.v2.get$c1(), this.v2.get$c2(), this.v2.get$c3()]);
  $.setRuntimeTypeInfo(locations, ({E: 'Cell'}));
  var t1 = locations.length;
  if (0 >= t1) throw $.ioore(0);
  this.c1 = locations[0];
  var t2 = locations.length;
  if (5 >= t2) throw $.ioore(5);
  this.c2 = locations[5];
 },
 _calculateVertices$0: function() {
  this._swapCellsIfNecesary$0();
  var lefttop = this.highestOrLeftestCell$0();
  if ($.eqB($.mod(lefttop.get$row(), 2), 0)) {
    var offset = 1;
  } else {
    offset = 0;
  }
  if ($.eqB(this.get$direction(), $.Vertical)) {
    var loc1 = $.Cell$2($.sub(lefttop.get$row(), 1), $.add(offset, lefttop.get$column()) - 1);
    var loc2 = $.Cell$2($.add(lefttop.get$row(), 1), $.add(offset, lefttop.get$column()) + 1);
  } else {
    if ($.eqB(this._direction, $.SlopeDown)) {
      loc1 = $.Cell$2($.add(lefttop.get$row(), 1), $.add(offset, lefttop.get$column()));
      loc2 = $.Cell$2(lefttop.get$row(), $.sub(lefttop.get$column(), 1));
    } else {
      if ($.eqB(this._direction, $.SlopeUp)) {
        loc1 = $.Cell$2(lefttop.get$row(), $.add(lefttop.get$column(), 1));
        loc2 = $.Cell$2($.add(lefttop.get$row(), 1), $.add($.sub(lefttop.get$column(), 1), offset));
      } else {
        loc2 = (void 0);
        loc1 = (void 0);
      }
    }
  }
  this.v1 = $.Vertice$3(this.c1, this.c2, loc1);
  this.v2 = $.Vertice$3(this.c1, this.c2, loc2);
 },
 swap$0: function() {
  var temp = this.c1;
  this.c1 = this.c2;
  this.c2 = temp;
 },
 _swapCellsIfNecesary$0: function() {
  if ($.eqNullB(this.c1) || $.eqNullB(this.c2)) {
    $.print('whoops');
  }
  if ($.eqB(this.c1.get$row(), this.c2.get$row())) {
    if ($.ltB(this.c2.get$column(), this.c1.get$column())) {
      this.swap$0();
    }
  } else {
    if ($.ltB(this.c2.get$row(), this.c1.get$row())) {
      this.swap$0();
    }
  }
 },
 equals$1: function(other) {
  return this.c1.equals$1(other.get$c1()) === true && this.c2.equals$1(other.get$c2()) === true;
 },
 operator$eq$1: function(other) {
  if (other === this) {
    return true;
  }
  if ($.eqNullB(other)) {
    return false;
  }
  return this.equals$1(other);
 },
 toText$0: function() {
  return 'c1: {' + $.S(this.c1) + '}, c2: ' + $.S(this.c2) + ', hash: ' + $.S(this.hashCode$0());
 },
 hashCode$0: function() {
  return $.mul($.hashCode(this.c1), $.hashCode(this.c2));
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$c1(this.c1.get$data());
  data.set$c2(this.c2.get$data());
  data.set$type($.name(this));
  return data;
 },
 Edge$fromVertices$2: function(v1, v2) {
  this._calculateCells$0();
 },
 Edge$data$1: function(json) {
  this.c1 = $.Cell$data$1(json.get$c1());
  this.c2 = $.Cell$data$1(json.get$c2());
  this._calculateVertices$0();
 },
 Edge$2: function(c1, c2) {
  this._calculateVertices$0();
 },
 is$Testable: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Hashable: true
});

Isolate.$defineClass("Cell", "Object", ["_edges", "_vertices", "_cells", "column?", "row?"], {
 test$0: function() {
  $.test();
 },
 get$data: function() {
  var d = $.JsonObject$0();
  d.row = this.row;
  d.column = this.column;
  d.set$type($.name(this));
  return d;
 },
 hashCode$0: function() {
  return $.add($.add(31, this.row) * 31, this.column) * 31;
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Cell$2(this.row, this.column);
  } else {
    t1 = $.Cell$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 fromDirection$1: function(direction) {
  var after = $.add(direction, 1);
  var before = $.sub(direction, 1);
  if ($.eqB(after, 6)) {
    after = 0;
  }
  if ($.eqB(before, -1)) {
    before = 5;
  }
  var result = $.List$from([$.Vertice$3(this, $.index(this.get$cells(), direction), $.index(this.get$cells(), before)), $.Vertice$3(this, $.index(this.get$cells(), direction), $.index(this.get$cells(), after))]);
  $.setRuntimeTypeInfo(result, ({E: 'Vertice'}));
  return result;
 },
 get$edges: function() {
  if ($.eqNullB(this._edges)) {
    var t1 = $.List((void 0));
    $.setRuntimeTypeInfo(t1, ({E: 'Edge'}));
    this._edges = t1;
    for (t1 = $.iterator(this.get$cells()); t1.hasNext$0() === true; ) {
      var t2 = t1.next$0();
      $.add$1(this._edges, $.Edge$2(this, t2));
    }
  }
  return this._edges;
 },
 get$vertices: function() {
  if ($.eqNullB(this._vertices)) {
    var t1 = $.List((void 0));
    $.setRuntimeTypeInfo(t1, ({E: 'Vertice'}));
    this._vertices = t1;
    for (var i = 0; i < 6; ++i) {
      if (i === 0) {
        var j = 5;
      } else {
        j = i - 1;
      }
      $.add$1(this._vertices, $.Vertice$3(this, $.index(this.get$cells(), j), $.index(this.get$cells(), i)));
    }
  }
  return this._vertices;
 },
 get$cells: function() {
  if ($.eqNullB(this._cells)) {
    var t1 = $.List((void 0));
    $.setRuntimeTypeInfo(t1, ({E: 'Cell'}));
    this._cells = t1;
    if ($.eqB($.mod(this.row, 2), 0)) {
      var offset = 0;
    } else {
      offset = -1;
    }
    $.add$1(this._cells, $.Cell$2($.sub(this.row, 1), $.add($.add(this.column, 1), offset)));
    $.add$1(this._cells, $.Cell$2(this.row, $.add(this.column, 1)));
    $.add$1(this._cells, $.Cell$2($.add(this.row, 1), $.add($.add(this.column, 1), offset)));
    $.add$1(this._cells, $.Cell$2($.add(this.row, 1), $.add(this.column, offset)));
    $.add$1(this._cells, $.Cell$2(this.row, $.sub(this.column, 1)));
    $.add$1(this._cells, $.Cell$2($.sub(this.row, 1), $.add(this.column, offset)));
  }
  return this._cells;
 },
 operator$eq$1: function(other) {
  if (other === this) {
    return true;
  }
  if ($.eqNullB(other)) {
    return false;
  }
  return this.equals$1(other);
 },
 equals$1: function(other) {
  return $.eqB(this.row, other.get$row()) && $.eqB(this.column, other.get$column());
 },
 toText$0: function() {
  return '[' + $.S(this.row) + ', ' + $.S(this.column) + ']';
 },
 get$id: function() {
  return this.hashCode$0();
 },
 Cell$data$1: function(json) {
  this.row = json.get$row();
  this.column = json.get$column();
 },
 is$Identifyable: true,
 is$Copyable: true,
 is$Jsonable: true,
 is$Testable: true,
 is$Hashable: true
});

Isolate.$defineClass("SupportedPorts", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("AbstractPort", "Object", ["_edgeDirection", "_edge", "_seaCell", "_landCell", "playerId?", "id="], {
 test$0: function() {
  $.test2();
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.AbstractPort$2((void 0), (void 0));
  } else {
    t1 = $.AbstractPort$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$isRandom(this.get$isRandom());
  data.direction = this._edgeDirection;
  data.seaCell = $.nullOrDataFrom(this.get$seaCell());
  data.set$id(this.id);
  data.resource = $.nullOrDataFrom(this.get$resource());
  data.set$type($.name(this));
  return data;
 },
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 equals$1: function(other) {
  return $.eq(other.get$id(), this.id);
 },
 divide$2: function(resources, resourceType) {
  return $.toInt($.div($.get$length(resources.ofType$1(resourceType)), this.get$inAmount()));
 },
 setCellAndDirection$2: function(seaCell, dir) {
  if ($.eqNullB(seaCell)) {
    $.print('whoops');
  }
  this._seaCell = seaCell;
  this._landCell = $.index(this._seaCell.get$cells(), dir);
  this._edge = $.Edge$2(seaCell, this.get$landCell());
  this._edgeDirection = dir;
 },
 _setFromData$1: function(json) {
  this.id = json.get$id();
  this._seaCell = $.fromData(json.get$seaCell());
  this._edgeDirection = json.get$direction();
  if (!$.eqNullB(this._seaCell) && !$.eqNullB(this._edgeDirection)) {
    var vs = this._seaCell.fromDirection$1(this._edgeDirection);
    this._edge = $.Edge$fromVertices$2($.index(vs, 0), $.index(vs, 1));
  }
 },
 get$isRandom: function() {
  return false;
 },
 get$resource: function() {
  return;
 },
 get$color: function() {
  return 'black';
 },
 get$inAmount: function() {
  return 0;
 },
 get$edgeDirection: function() {
  return this._edgeDirection;
 },
 get$edge: function() {
  return this._edge;
 },
 get$seaCell: function() {
  return this._seaCell;
 },
 get$landCell: function() {
  return this._landCell;
 },
 AbstractPort$data$1: function(json) {
  this._setFromData$1(json);
 },
 AbstractPort$2: function(_seaCell, _edgeDirection) {
  if (!$.eqNullB(this._seaCell)) {
    this.setCellAndDirection$2(this._seaCell, this._edgeDirection);
  }
 },
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Identifyable: true,
 is$Hashable: true
});

Isolate.$defineClass("FourToOnePort", "AbstractPort", ["_edgeDirection", "_edge", "_seaCell", "_landCell", "playerId", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.FourToOnePort$2((void 0), (void 0));
  } else {
    t1 = $.FourToOnePort$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$color: function() {
  return 'darkgrey';
 },
 get$inAmount: function() {
  return 4;
 },
 FourToOnePort$data$1: function(json) {
  this._setFromData$1(json);
 }
});

Isolate.$defineClass("ThreeToOnePort", "AbstractPort", ["_edgeDirection", "_edge", "_seaCell", "_landCell", "playerId", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.ThreeToOnePort$2((void 0), (void 0));
  } else {
    t1 = $.ThreeToOnePort$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$color: function() {
  return 'black';
 },
 get$inAmount: function() {
  return 3;
 },
 ThreeToOnePort$data$1: function(json) {
  this._setFromData$1(json);
 }
});

Isolate.$defineClass("TwoToOnePort", "AbstractPort", ["lib3$TwoToOnePort$resource?", "_edgeDirection", "_edge", "_seaCell", "_landCell", "playerId", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.TwoToOnePort$3(this.lib3$TwoToOnePort$resource, (void 0), (void 0));
  } else {
    t1 = $.TwoToOnePort$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$color: function() {
  return this.lib3$TwoToOnePort$resource.get$color();
 },
 get$inAmount: function() {
  return 2;
 },
 get$resource: function() {
  return this.lib3$TwoToOnePort$resource;
 },
 set$resource: function(x) {
  this.lib3$TwoToOnePort$resource = x;
 },
 TwoToOnePort$data$1: function(json) {
  this._setFromData$1(json);
  this.lib3$TwoToOnePort$resource = $.Jsonable$data(json.get$resource());
 },
 TwoToOnePort$3: function(resource, seaCell, edgeDirection) {
  if ($.eqNullB(this.lib3$TwoToOnePort$resource)) {
    var t1 = $.Wheat$1((void 0));
  } else {
    t1 = this.lib3$TwoToOnePort$resource;
  }
  this.lib3$TwoToOnePort$resource = t1;
 }
});

Isolate.$defineClass("RandomPort", "AbstractPort", ["_edgeDirection", "_edge", "_seaCell", "_landCell", "playerId", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.RandomPort$2((void 0), (void 0));
  } else {
    t1 = $.RandomPort$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$isRandom: function() {
  return true;
 },
 get$color: function() {
  return 'black';
 },
 RandomPort$data$1: function(json) {
  this._setFromData$1(json);
 },
 is$RandomPort: true
});

Isolate.$defineClass("PortListMu", "ListenableList", ["listInsertedListeners", "listAddedListeners", "listRemovedListeners", "removedListeners", "insertedListeners", "addedListeners", "changedListeners", "_fireIndividualItems", "_internal"], {
 is$Testable: true,
 is$Collection: function() { return true; }
});

Isolate.$defineClass("SupportedChits", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("AbstractChit", "Object", ["_id"], {
 test$0: function() {
  var chit3 = $.Chit3$0();
  chit3.set$id(1);
  $.isTrue(chit3.equals$1($.Jsonable$data($.JsonObject$fromMap$1($.makeLiteralMap(['id', 1, 'type', 'Chit3'])))), 'Expected equals chit after serialization');
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.AbstractChit$0();
  } else {
    t1 = $.AbstractChit$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.get$id());
  data.set$type($.name(this));
  return data;
 },
 hashCode$0: function() {
  if ($.eqNullB(this._id)) {
    this._id = $.generateHashCode(this);
  }
  return this._id;
 },
 equals$1: function(other) {
  return $.eq(other.get$id(), this.get$id());
 },
 set$id: function(id) {
  this._id = id;
 },
 get$id: function() {
  return this._id;
 },
 get$isRed: function() {
  return $.eqB(this.get$number(), 6) || $.eqB(this.get$number(), 8);
 },
 get$chance: function() {
  return 0;
 },
 get$number: function() {
  return 0;
 },
 AbstractChit$data$1: function(json) {
  this._id = json.get$id();
 },
 is$Jsonable: true,
 is$Copyable: true,
 is$Identifyable: true,
 is$Testable: true,
 is$Hashable: true
});

Isolate.$defineClass("RandomChit", "AbstractChit", ["_id"], {
 copy$1: function(data) {
  return $.RandomChit$0();
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 is$RandomChit: true
});

Isolate.$defineClass("Chit2", "AbstractChit", ["_id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Chit2$0();
  } else {
    t1 = $.Chit2$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$chance: function() {
  return 1;
 },
 get$number: function() {
  return 2;
 }
});

Isolate.$defineClass("Chit3", "AbstractChit", ["_id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Chit3$0();
  } else {
    t1 = $.Chit3$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$chance: function() {
  return 2;
 },
 get$number: function() {
  return 3;
 }
});

Isolate.$defineClass("Chit4", "AbstractChit", ["_id"], {
 copy$1: function(data) {
  return $.Chit4$0();
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$chance: function() {
  return 3;
 },
 get$number: function() {
  return 4;
 }
});

Isolate.$defineClass("Chit5", "AbstractChit", ["_id"], {
 copy$1: function(data) {
  return $.Chit5$0();
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$chance: function() {
  return 4;
 },
 get$number: function() {
  return 5;
 }
});

Isolate.$defineClass("Chit6", "AbstractChit", ["_id"], {
 copy$1: function(data) {
  return $.Chit6$0();
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$chance: function() {
  return 5;
 },
 get$number: function() {
  return 6;
 }
});

Isolate.$defineClass("Chit8", "AbstractChit", ["_id"], {
 copy$1: function(data) {
  return $.Chit8$0();
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$chance: function() {
  return 5;
 },
 get$number: function() {
  return 8;
 }
});

Isolate.$defineClass("Chit9", "AbstractChit", ["_id"], {
 copy$1: function(data) {
  return $.Chit9$0();
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$chance: function() {
  return 4;
 },
 get$number: function() {
  return 9;
 }
});

Isolate.$defineClass("Chit10", "AbstractChit", ["_id"], {
 copy$1: function(data) {
  return $.Chit10$0();
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$chance: function() {
  return 3;
 },
 get$number: function() {
  return 10;
 }
});

Isolate.$defineClass("Chit11", "AbstractChit", ["_id"], {
 copy$1: function(data) {
  return $.Chit11$0();
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$chance: function() {
  return 2;
 },
 get$number: function() {
  return 11;
 }
});

Isolate.$defineClass("Chit12", "AbstractChit", ["_id"], {
 copy$1: function(data) {
  return $.Chit12$0();
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$chance: function() {
  return 1;
 },
 get$number: function() {
  return 12;
 }
});

Isolate.$defineClass("SupportedTerritories", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("AbstractTerritory", "Object", ["id=", "name="], {
 test$0: function() {
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$name(this.name);
  data.set$type($.name(this));
  return data;
 },
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 equals$1: function(other) {
  return $.eqB(other.get$id(), this.id) && $.eqB(other.get$name(), this.name);
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.AbstractTerritory$1((void 0));
  } else {
    t1 = $.AbstractTerritory$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 _initByData$1: function(json) {
  this.id = json.get$id();
  this.name = json.get$name();
 },
 AbstractTerritory$data$1: function(data) {
  this._initByData$1(data);
 },
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Hashable: true,
 is$Identifyable: true
});

Isolate.$defineClass("MainIsland", "AbstractTerritory", ["id", "name"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.MainIsland$1((void 0));
  } else {
    t1 = $.MainIsland$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
}
});

Isolate.$defineClass("Island", "AbstractTerritory", ["id", "name"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Island$1((void 0));
  } else {
    t1 = $.Island$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
}
});

Isolate.$defineClass("SupportedTiles", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("AbstractTile", "Object", ["_territory", "_chit", "_port", "_cell", "territoryId?", "id=", "observable"], {
 test$0: function() {
 },
 offSetted$2: function(property, handler) {
  this.observable.removeListener$2(property, handler);
 },
 onSetted$2: function(property, handler) {
  this.observable.addListener$2(property, handler);
 },
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$type($.name(this));
  data.set$cell($.nullOrDataFrom(this.get$cell()));
  data.chit = $.nullOrDataFrom(this.get$chit());
  data.port = $.nullOrDataFrom(this.get$port());
  if ($.eqNullB(this.get$territory())) {
    var t1 = (void 0);
  } else {
    t1 = this.get$territory().get$id();
  }
  data.territoryId = t1;
  return data;
 },
 equals$1: function(other) {
  return $.eq(other.get$id(), this.id);
 },
 get$color: function() {
  return 'black';
 },
 resource$0: function() {
  return;
 },
 get$resource: function() { return new $.Closure82(this, 'resource$0'); },
 get$producesResource: function() {
  return false;
 },
 copy$1: function(data) {
  return $.AbstractTile$1(this.get$cell());
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$isPiratePlaceable: function() {
  return false;
 },
 get$isRobberPlaceable: function() {
  return false;
 },
 get$isPartOfGame: function() {
  return false;
 },
 get$isRandom: function() {
  return false;
 },
 _initByData$1: function(json) {
  this.id = json.get$id();
  if ($.eqNullB(json.get$cell())) {
    var t1 = (void 0);
  } else {
    t1 = $.Jsonable$data(json.get$cell());
  }
  this.set$cell(t1);
  if ($.eqNullB(json.get$port())) {
    t1 = (void 0);
  } else {
    t1 = $.Jsonable$data(json.get$port());
  }
  this.set$port(t1);
  if ($.eqNullB(json.get$chit())) {
    t1 = (void 0);
  } else {
    t1 = $.Jsonable$data(json.get$chit());
  }
  this.set$chit(t1);
  this.territoryId = json.get$territoryId();
 },
 set$port: function(p) {
  if (this.get$canHavePort() === true) {
    var old = this._port;
    this._port = p;
    this.observable.fire$3('port', old, this._port);
  }
 },
 get$port: function() {
  return this._port;
 },
 get$hasPort: function() {
  return !$.eqNullB(this._port);
 },
 get$canHavePort: function() {
  return false;
 },
 set$chit: function(c) {
  if (this.get$canHaveChit() === true) {
    var old = this._chit;
    this._chit = c;
    this.observable.fire$3('chit', old, this._chit);
  }
 },
 get$chit: function() {
  return this._chit;
 },
 get$hasChit: function() {
  return !$.eqNullB(this._chit);
 },
 get$canHaveChit: function() {
  return false;
 },
 set$territory: function(t) {
  if (this.get$canHaveTerritory() === true) {
    var old = this._territory;
    this._territory = t;
    this.observable.fire$3('territory', old, this._territory);
  }
 },
 get$territory: function() {
  return this._territory;
 },
 get$canHaveTerritory: function() {
  return true;
 },
 set$cell: function(c) {
  this._cell = c;
 },
 get$cell: function() {
  return this._cell;
 },
 AbstractTile$1: function(_cell) {
  this.observable = $.ObservableHelper$0();
 },
 is$Identifyable: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Hashable: true,
 is$Observable: true
});

Isolate.$defineClass("RandomTile", "AbstractTile", ["_territory", "_chit", "_port", "_cell", "territoryId", "id", "observable"], {
 get$isRandom: function() {
  return true;
 },
 get$canHaveChit: function() {
  return true;
 },
 copy$1: function(data) {
  return $.RandomTile$1(this.get$cell());
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$color: function() {
  return 'DarkGrey';
 }
});

Isolate.$defineClass("Sea", "AbstractTile", ["_territory", "_chit", "_port", "_cell", "territoryId", "id", "observable"], {
 get$color: function() {
  return 'blue';
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Sea$1(this.get$cell());
  } else {
    t1 = $.Sea$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$canHavePort: function() {
  return true;
 },
 get$canHaveChit: function() {
  return false;
 },
 resource$0: function() {
  return;
 },
 get$resource: function() { return new $.Closure82(this, 'resource$0'); },
 get$producesResource: function() {
  return false;
 },
 get$isPiratePlaceable: function() {
  return true;
 },
 get$isRobberPlaceable: function() {
  return false;
 },
 get$isPartOfGame: function() {
  return true;
 },
 Sea$data$1: function(json) {
  this._initByData$1(json);
 }
});

Isolate.$defineClass("Desert", "AbstractTile", ["_territory", "_chit", "_port", "_cell", "territoryId", "id", "observable"], {
 resource$0: function() {
  return;
 },
 get$resource: function() { return new $.Closure82(this, 'resource$0'); },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Desert$1(this.get$cell());
  } else {
    t1 = $.Desert$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$color: function() {
  return 'lightyellow';
 },
 get$canHavePort: function() {
  return false;
 },
 get$canHaveChit: function() {
  return false;
 },
 get$producesResource: function() {
  return false;
 },
 get$isPiratePlaceable: function() {
  return false;
 },
 get$isRobberPlaceable: function() {
  return true;
 },
 get$isPartOfGame: function() {
  return true;
 },
 Desert$data$1: function(json) {
  this._initByData$1(json);
 }
});

Isolate.$defineClass("NoneTile", "AbstractTile", ["_territory", "_chit", "_port", "_cell", "territoryId", "id", "observable"], {
 resource$0: function() {
  return;
 },
 get$resource: function() { return new $.Closure82(this, 'resource$0'); },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.NoneTile$1(this.get$cell());
  } else {
    t1 = $.NoneTile$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$color: function() {
  return 'lightgrey';
 },
 get$canHavePort: function() {
  return false;
 },
 get$canHaveChit: function() {
  return false;
 },
 get$producesResource: function() {
  return false;
 },
 get$isPiratePlaceable: function() {
  return false;
 },
 get$isRobberPlaceable: function() {
  return false;
 },
 get$isPartOfGame: function() {
  return false;
 },
 NoneTile$data$1: function(data) {
  this._initByData$1(data);
 }
});

Isolate.$defineClass("Field", "AbstractTile", ["_territory", "_chit", "_port", "_cell", "territoryId", "id", "observable"], {
 resource$0: function() {
  return $.Wheat$1((void 0));
 },
 get$resource: function() { return new $.Closure82(this, 'resource$0'); },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Field$1(this.get$cell());
  } else {
    t1 = $.Field$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$color: function() {
  return 'yellow';
 },
 get$canHavePort: function() {
  return false;
 },
 get$canHaveChit: function() {
  return true;
 },
 get$producesResource: function() {
  return true;
 },
 get$isPiratePlaceable: function() {
  return false;
 },
 get$isRobberPlaceable: function() {
  return true;
 },
 get$isPartOfGame: function() {
  return true;
 },
 Field$data$1: function(data) {
  this._initByData$1(data);
 }
});

Isolate.$defineClass("Forest", "AbstractTile", ["_territory", "_chit", "_port", "_cell", "territoryId", "id", "observable"], {
 resource$0: function() {
  return $.Timber$1((void 0));
 },
 get$resource: function() { return new $.Closure82(this, 'resource$0'); },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Forest$1(this.get$cell());
  } else {
    t1 = $.Forest$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$color: function() {
  return 'darkgreen';
 },
 get$canHavePort: function() {
  return false;
 },
 get$canHaveChit: function() {
  return true;
 },
 get$producesResource: function() {
  return true;
 },
 get$isPiratePlaceable: function() {
  return false;
 },
 get$isRobberPlaceable: function() {
  return true;
 },
 get$isPartOfGame: function() {
  return true;
 },
 Forest$data$1: function(data) {
  this._initByData$1(data);
 }
});

Isolate.$defineClass("Mountain", "AbstractTile", ["_territory", "_chit", "_port", "_cell", "territoryId", "id", "observable"], {
 resource$0: function() {
  return $.Ore$1((void 0));
 },
 get$resource: function() { return new $.Closure82(this, 'resource$0'); },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Mountain$1(this.get$cell());
  } else {
    t1 = $.Mountain$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$color: function() {
  return 'purple';
 },
 get$canHavePort: function() {
  return false;
 },
 get$canHaveChit: function() {
  return true;
 },
 get$producesResource: function() {
  return true;
 },
 get$isPiratePlaceable: function() {
  return false;
 },
 get$isRobberPlaceable: function() {
  return true;
 },
 get$isPartOfGame: function() {
  return true;
 },
 Mountain$data$1: function(data) {
  this._initByData$1(data);
 }
});

Isolate.$defineClass("Pasture", "AbstractTile", ["_territory", "_chit", "_port", "_cell", "territoryId", "id", "observable"], {
 resource$0: function() {
  return $.Sheep$1((void 0));
 },
 get$resource: function() { return new $.Closure82(this, 'resource$0'); },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Pasture$1(this.get$cell());
  } else {
    t1 = $.Pasture$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$color: function() {
  return 'lightgreen';
 },
 get$canHavePort: function() {
  return false;
 },
 get$canHaveChit: function() {
  return true;
 },
 get$producesResource: function() {
  return true;
 },
 get$isPiratePlaceable: function() {
  return false;
 },
 get$isRobberPlaceable: function() {
  return true;
 },
 get$isPartOfGame: function() {
  return true;
 },
 Pasture$data$1: function(data) {
  this._initByData$1(data);
 }
});

Isolate.$defineClass("Hill", "AbstractTile", ["_territory", "_chit", "_port", "_cell", "territoryId", "id", "observable"], {
 resource$0: function() {
  return $.Clay$1((void 0));
 },
 get$resource: function() { return new $.Closure82(this, 'resource$0'); },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Hill$1(this.get$cell());
  } else {
    t1 = $.Hill$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$color: function() {
  return 'red';
 },
 get$canHavePort: function() {
  return false;
 },
 get$canHaveChit: function() {
  return true;
 },
 get$producesResource: function() {
  return true;
 },
 get$isPiratePlaceable: function() {
  return false;
 },
 get$isRobberPlaceable: function() {
  return true;
 },
 get$isPartOfGame: function() {
  return true;
 },
 Hill$data$1: function(data) {
  this._initByData$1(data);
 }
});

Isolate.$defineClass("SupportedGamePhases", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("AbstractGamePhase", "Object", ["id="], {
 test$0: function() {
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.AbstractGamePhase$0();
  } else {
    t1 = $.AbstractGamePhase$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$type($.name(this));
  return data;
 },
 equals$1: function(other) {
  return $.eq(other.get$id(), this.id);
 },
 get$isTurns: function() {
  return false;
 },
 get$isDetermineFirstPlayer: function() {
  return false;
 },
 get$isLobby: function() {
  return false;
 },
 end$1: function(game) {
 },
 start$1: function(game) {
 },
 AbstractGamePhase$data$1: function(json) {
  this.id = json.get$id();
 },
 is$Identifyable: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Hashable: true
});

Isolate.$defineClass("LobbyPhase", "AbstractGamePhase", ["readyUsers", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.LobbyPhase$0();
  } else {
    t1 = $.LobbyPhase$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$type($.name(this));
  return data;
 },
 get$isLobby: function() {
  return true;
 },
 LobbyPhase$data$1: function(json) {
 },
 LobbyPhase$0: function() {
  var t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'User'}));
  this.readyUsers = t1;
 }
});

Isolate.$defineClass("DetermineFirstPlayerGamePhase", "AbstractGamePhase", ["currentRound", "rolls", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.DetermineFirstPlayerGamePhase$0();
  } else {
    t1 = $.DetermineFirstPlayerGamePhase$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$type($.name(this));
  return data;
 },
 registerRoll$3: function(game, player, roll) {
  $.indexSet(this.currentRound, player, roll);
  if ($.eqB($.get$length(this.currentRound), $.get$length(game.get$players()))) {
  }
 },
 get$isDetermineFirstPlayer: function() {
  return true;
 },
 DetermineFirstPlayerGamePhase$data$1: function(json) {
  if ($.eqNullB(json.get$id())) {
    var t1 = (void 0);
  } else {
    t1 = json.get$id();
  }
  this.id = t1;
 },
 DetermineFirstPlayerGamePhase$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'HashMap<Player, DiceRoll>'}));
  this.rolls = t1;
  this.currentRound = $.HashMapImplementation$0();
  $.add$1(this.rolls, this.currentRound);
 }
});

Isolate.$defineClass("EndedGamePhase", "AbstractGamePhase", ["_won", "winnerPlayerId?", "winnerUserId?", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.EndedGamePhase$0();
  } else {
    t1 = $.EndedGamePhase$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$type($.name(this));
  data.won = this._won;
  data.winnerUserId = this.winnerUserId;
  data.winnerPlayerId = this.winnerPlayerId;
  return data;
 },
 EndedGamePhase$data$1: function(json) {
  this.winnerUserId = json.get$winnerUserId();
  this.winnerPlayerId = json.get$winnerPlayerId();
  this._won = json.get$won();
 }
});

Isolate.$defineClass("TurnsGamePhase", "AbstractGamePhase", ["turnPhase?", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.TurnsGamePhase$0();
  } else {
    t1 = $.TurnsGamePhase$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$type($.name(this));
  return data;
 },
 get$isTurns: function() {
  return true;
 },
 TurnsGamePhase$data$1: function(json) {
 }
});

Isolate.$defineClass("InitialPlacementGamePhase", "AbstractGamePhase", ["secondRound", "firstRound", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.InitialPlacementGamePhase$0();
  } else {
    t1 = $.InitialPlacementGamePhase$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$type($.name(this));
  return data;
 },
 InitialPlacementGamePhase$data$1: function(json) {
  if ($.eqNullB(json.get$id())) {
    var t1 = (void 0);
  } else {
    t1 = json.get$id();
  }
  this.id = t1;
 }
});

Isolate.$defineClass("AllPhases", "AbstractGamePhase", ["observable", "iterator", "allPhases", "current", "ended?", "turns?", "initialPlacement?", "determinFirstPlayer?", "lobby?", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.AllPhases$0();
  } else {
    t1 = $.AllPhases$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$isTurns: function() {
  return this.current.get$isTurns();
 },
 get$isDetermineFirstPlayer: function() {
  return this.current.get$isDetermineFirstPlayer();
 },
 get$isLobby: function() {
  return this.current.get$isLobby();
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$type($.name(this));
  data.lobby = $.nullOrDataFrom(this.lobby);
  data.determinFirstPlayer = $.nullOrDataFrom(this.determinFirstPlayer);
  data.ended = $.nullOrDataFrom(this.ended);
  data.initialPlacement = $.nullOrDataFrom(this.initialPlacement);
  data.set$turns($.nullOrDataFrom(this.turns));
  if ($.eqNullB(this.current)) {
    var t1 = (void 0);
  } else {
    t1 = this.current.get$id();
  }
  data.currentId = t1;
  return data;
 },
 next$1: function(game) {
  if (this.iterator.hasNext$0() === true) {
    var oldPhase = this.current;
    this.current.end$1(game);
    this.current = this.iterator.next$0();
    this.current.start$1(game);
    this.observable.fire$3('current', oldPhase, this.current);
  }
 },
 setCurrent$1: function(phaseId) {
  this.iterator = $.iterator(this.allPhases);
  var notFound = true;
  while (true) {
    if (!(notFound && this.iterator.hasNext$0() === true)) break;
    if ($.eqB(this.iterator.next$0().get$id(), phaseId)) {
      notFound = false;
    }
  }
 },
 addAllPhasesToList$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'GamePhase'}));
  this.allPhases = t1;
  $.add$1(this.allPhases, this.lobby);
  $.add$1(this.allPhases, this.determinFirstPlayer);
  $.add$1(this.allPhases, this.initialPlacement);
  $.add$1(this.allPhases, this.turns);
  $.add$1(this.allPhases, this.ended);
  this.iterator = $.iterator(this.allPhases);
 },
 ensureAllPhasesPresent$0: function() {
  if ($.eqNullB(this.lobby)) {
    var t1 = $.LobbyPhase$0();
  } else {
    t1 = this.lobby;
  }
  this.lobby = t1;
  if ($.eqNullB(this.determinFirstPlayer)) {
    t1 = $.DetermineFirstPlayerGamePhase$0();
  } else {
    t1 = this.determinFirstPlayer;
  }
  this.determinFirstPlayer = t1;
  if ($.eqNullB(this.initialPlacement)) {
    t1 = $.InitialPlacementGamePhase$0();
  } else {
    t1 = this.initialPlacement;
  }
  this.initialPlacement = t1;
  if ($.eqNullB(this.turns)) {
    t1 = $.TurnsGamePhase$0();
  } else {
    t1 = this.turns;
  }
  this.turns = t1;
  if ($.eqNullB(this.ended)) {
    t1 = $.EndedGamePhase$0();
  } else {
    t1 = this.ended;
  }
  this.ended = t1;
 },
 iterator$0: function() { return this.iterator.$call$0(); },
 AllPhases$data$1: function(json) {
  if ($.eqNullB(json.get$lobby())) {
    var t1 = (void 0);
  } else {
    t1 = $.LobbyPhase$data$1(json.get$lobby());
  }
  this.lobby = t1;
  this.determinFirstPlayer = $.DetermineFirstPlayerGamePhase$data$1(json.get$determinFirstPlayer());
  this.initialPlacement = $.InitialPlacementGamePhase$data$1(json.get$initialPlacement());
  this.turns = $.TurnsGamePhase$data$1(json.get$turns());
  this.ended = $.EndedGamePhase$data$1(json.get$ended());
  this.ensureAllPhasesPresent$0();
  this.addAllPhasesToList$0();
  if ($.eqNullB(json.get$currentId())) {
    this.iterator = $.iterator(this.allPhases);
    this.current = this.iterator.next$0();
  } else {
    this.setCurrent$1(json.get$currentId());
    this.addAllPhasesToList$0();
  }
 },
 AllPhases$0: function() {
  this.observable = $.ObservableHelper$0();
  this.ensureAllPhasesPresent$0();
  this.addAllPhasesToList$0();
 }
});

Isolate.$defineClass("SupportedGameStatuses", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("AllStatuses", "Object", ["_current", "waitingForReplacingUser", "lobbying", "playing", "id="], {
 test$0: function() {
 },
 equals$1: function(other) {
  return $.eq(other.get$id(), this.id);
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$type($.name(this));
  data.playing = $.nullOrDataFrom(this.playing);
  data.lobbying = $.nullOrDataFrom(this.lobbying);
  data.waitingForReplacingUser = $.nullOrDataFrom(this.waitingForReplacingUser);
  if ($.eqNullB(this._current)) {
    var t1 = (void 0);
  } else {
    t1 = this._current.get$id();
  }
  data.currentStatusId = t1;
  return data;
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.AllStatuses$0();
  } else {
    t1 = $.AllStatuses$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 hashCode$0: function() {
  return $.hashCode(this._current);
 },
 is$Copyable: true,
 is$Jsonable: true,
 is$Identifyable: true,
 is$Testable: true,
 is$Hashable: true
});

Isolate.$defineClass("AbstractGameStatus", "Object", ["id="], {
 test$0: function() {
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.AbstractGameStatus$0();
  } else {
    t1 = $.AbstractGameStatus$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 equals$1: function(other) {
  return $.eq(other.get$id(), this.id);
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$type($.name(this));
  return data;
 },
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 AbstractGameStatus$data$1: function(json) {
  this.id = json.get$id();
 },
 is$Copyable: true,
 is$Jsonable: true,
 is$Identifyable: true,
 is$Testable: true,
 is$Hashable: true
});

Isolate.$defineClass("Playing", "AbstractGameStatus", ["id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Playing$0();
  } else {
    t1 = $.Playing$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
}
});

Isolate.$defineClass("WaitingForReplacingUser", "AbstractGameStatus", ["playerWithoutUser", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.WaitingForReplacingUser$0();
  } else {
    t1 = $.WaitingForReplacingUser$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 WaitingForReplacingUser$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'Player'}));
  this.playerWithoutUser = t1;
 }
});

Isolate.$defineClass("SupportedDevelopmentCards", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("AbstractDevelopmentCard", "Object", ["_player", "turnBought", "turnPlayed", "turnPlayedId?", "turnBoughtId?", "playerId?", "id="], {
 test$0: function() {
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$type($.name(this));
  if ($.eqNullB(this.get$player())) {
    if ($.eqNullB(this.playerId)) {
      var t1 = (void 0);
    } else {
      t1 = this.playerId;
    }
  } else {
    t1 = this.get$player().get$id();
  }
  data.set$playerId(t1);
  if ($.eqNullB(this.turnBought)) {
    if ($.eqNullB(this.turnBoughtId)) {
      t1 = (void 0);
    } else {
      t1 = this.turnBoughtId;
    }
  } else {
    t1 = this.turnBought.get$id();
  }
  data.turnBoughtId = t1;
  if ($.eqNullB(this.turnPlayed)) {
    if ($.eqNullB(this.turnPlayedId)) {
      t1 = (void 0);
    } else {
      t1 = this.turnPlayedId;
    }
  } else {
    t1 = this.turnPlayed.get$id();
  }
  data.turnPlayedId = t1;
  return data;
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.AbstractDevelopmentCard$1((void 0));
  } else {
    t1 = $.AbstractDevelopmentCard$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 equals$1: function(other) {
  return $.eq(other.get$id(), this.id);
 },
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 get$player: function() {
  return this._player;
 },
 AbstractDevelopmentCard$data$1: function(json) {
  this.id = json.get$id();
  if ($.eqNullB(json.get$playerId())) {
    var t1 = (void 0);
  } else {
    t1 = json.get$playerId();
  }
  this.playerId = t1;
  this.turnBoughtId = json.get$turnBoughtId();
  this.turnPlayedId = json.get$turnPlayedId();
 },
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Hashable: true,
 is$Identifyable: true
});

Isolate.$defineClass("VictoryPoint", "AbstractDevelopmentCard", ["bonusName=", "_player", "turnBought", "turnPlayed", "turnPlayedId", "turnBoughtId", "playerId", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.VictoryPoint$2((void 0), (void 0));
  } else {
    t1 = $.VictoryPoint$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var json = $.AbstractDevelopmentCard.prototype.get$data.call(this);
  json.set$bonusName(this.bonusName);
  return json;
 },
 VictoryPoint$data$1: function(json) {
  this.bonusName = json.get$bonusName();
 }
});

Isolate.$defineClass("DummyDevelopmentCard", "AbstractDevelopmentCard", ["_player", "turnBought", "turnPlayed", "turnPlayedId", "turnBoughtId", "playerId", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.DummyDevelopmentCard$1((void 0));
  } else {
    t1 = $.DummyDevelopmentCard$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
}
});

Isolate.$defineClass("SupportedTurnPhases", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("AbstractTurnPhase", "Object", ["id="], {
 test$0: function() {
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.AbstractTurnPhase$0();
  } else {
    t1 = $.AbstractTurnPhase$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 equals$1: function(other) {
  return $.eq(other.get$id(), this.id);
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$type($.name(this));
  return data;
 },
 _initByData$1: function(json) {
  this.id = json.get$id();
 },
 AbstractTurnPhase$data$1: function(json) {
  this.id = json.get$id();
 },
 is$Identifyable: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true
});

Isolate.$defineClass("TradingTurnPhase", "AbstractTurnPhase", ["id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.TradingTurnPhase$0();
  } else {
    t1 = $.TradingTurnPhase$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 TradingTurnPhase$data$1: function(json) {
  this._initByData$1(json);
 }
});

Isolate.$defineClass("BuildingTurnPhase", "AbstractTurnPhase", ["id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.BuildingTurnPhase$0();
  } else {
    t1 = $.BuildingTurnPhase$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 BuildingTurnPhase$data$1: function(json) {
  this._initByData$1(json);
 }
});

Isolate.$defineClass("DiceRollTurnPhase", "AbstractTurnPhase", ["id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.DiceRollTurnPhase$0();
  } else {
    t1 = $.DiceRollTurnPhase$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 DiceRollTurnPhase$data$1: function(json) {
  this._initByData$1(json);
 }
});

Isolate.$defineClass("BeforeDiceRollTurnPhase", "AbstractTurnPhase", ["id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.BeforeDiceRollTurnPhase$0();
  } else {
    t1 = $.BeforeDiceRollTurnPhase$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 BeforeDiceRollTurnPhase$data$1: function(json) {
  this._initByData$1(json);
 }
});

Isolate.$defineClass("Player", "Object", ["stock?", "playedDevelopmentCards?", "knights?", "producers?", "victoryPoints?", "verticePieces?", "edgePieces?", "cities?", "towns?", "roads?", "ports?", "resources?", "observable", "color?", "userId?", "id=", "_user"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Player$1(this.get$user());
  } else {
    t1 = $.Player$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 offSetted$2: function(property, handler) {
  this.observable.removeListener$2(property, handler);
 },
 onSetted$2: function(property, handler) {
  this.observable.addListener$2(property, handler);
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  if ($.eqNullB(this.get$user())) {
    if ($.eqNullB(this.userId)) {
      var t1 = (void 0);
    } else {
      t1 = this.userId;
    }
  } else {
    t1 = this.get$user().get$id();
  }
  data.set$userId(t1);
  data.set$type($.name(this));
  data.color = this.color;
  data.resources = $.toDataList(this.resources);
  data.ports = $.toDataList(this.ports);
  data.set$roads($.toDataList(this.roads));
  data.set$cities($.toDataList(this.cities));
  data.set$towns($.toDataList(this.towns));
  data.set$edgePieces($.nullOrDataListFrom(this.edgePieces));
  data.verticePieces = $.nullOrDataListFrom(this.verticePieces);
  data.victoryPoints = $.nullOrDataListFrom(this.victoryPoints);
  data.set$knights($.nullOrDataListFrom(this.knights));
  data.playedDevelopmentCards = $.nullOrDataListFrom(this.playedDevelopmentCards);
  data.producers = $.nullOrDataListFrom(this.producers);
  data.stock = this.stock.get$data();
  return data;
 },
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 toText$0: function() {
  return $.S(this.id) + ', ' + $.S(this._user.get$name()) + ', ' + $.S(this.color);
 },
 totalPoints$0: function() {
  for (var t1 = $.iterator(this.victoryPoints), total = 0; t1.hasNext$0() === true; ) {
    total = $.add(total, t1.next$0().get$points());
  }
  return total;
 },
 init$0: function() {
  this.observable = $.ObservableHelper$0();
 },
 set$user: function(u) {
  if (!$.eqB(this.get$user(), u)) {
    var old = this.get$user();
    this.set$user(u);
    this.observable.fire$3('user', old, this.get$user());
  }
 },
 get$user: function() {
  return this._user;
 },
 Player$1: function(_user) {
  this.init$0();
  this.id = this.get$user().get$id();
  this.resources = $.ResourceListMu$0();
  this.ports = $.PortListMu$0();
  var t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Road'}));
  this.roads = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'City'}));
  this.cities = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Town'}));
  this.towns = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'EdgePiece'}));
  this.edgePieces = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'VerticePiece'}));
  this.verticePieces = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'VictoryPointItem'}));
  this.victoryPoints = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Knight'}));
  this.knights = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'DevelopmentCard'}));
  this.playedDevelopmentCards = t1;
  this.ports = $.PortListMu$0();
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Producer'}));
  this.producers = t1;
  this.stock = $.Stock$0();
 },
 Player$data$1: function(json) {
  this.init$0();
  this.id = json.get$id();
  this.userId = json.get$userId();
  this.color = json.get$color();
  $.forEach(json.get$resources(), new $.Closure21(this));
  this.ports = $.PortListMu$from$1($.listFrom(json.get$ports()));
  this.roads = $.llFrom(json.get$roads());
  this.towns = $.llFrom(json.get$towns());
  this.cities = $.llFrom(json.get$cities());
  this.edgePieces = $.llFrom(json.get$edgePieces());
  this.verticePieces = $.llFrom(json.get$verticePieces());
  this.victoryPoints = $.llFrom(json.get$victoryPoints());
  this.knights = $.llFrom(json.get$knights());
  this.playedDevelopmentCards = $.llFrom(json.get$playedDevelopmentCards());
  this.producers = $.llFrom(json.get$producers());
  this.ports = $.llFrom(json.get$ports());
  this.stock = $.Stock$data$1(json.get$stock());
 },
 is$Jsonable: true,
 is$Copyable: true,
 is$Observable: true,
 is$Identifyable: true,
 is$Hashable: true
});

Isolate.$defineClass("User", "Object", ["email?", "name=", "id="], {
 test$0: function() {
 },
 toText$0: function() {
  return '[' + $.S(this.id) + ', ' + $.S(this.name) + ', ' + $.S(this.email) + ']';
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.User$3((void 0), (void 0), (void 0));
  } else {
    t1 = $.User$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 equals$1: function(other) {
  return $.eqB(this.id, other.get$id()) && $.eqB(this.name, other.get$name()) && $.eqB(this.email, other.get$email());
 },
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$name(this.name);
  data.email = this.email;
  data.set$type($.name(this));
  return data;
 },
 User$data$1: function(json) {
  this.id = json.get$id();
  this.name = json.get$name();
  this.email = json.get$email();
 },
 is$Testable: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Identifyable: true,
 is$Hashable: true
});

Isolate.$defineClass("ServerUser", "User", ["email", "name", "id"], {
 ServerUser$0: function() {
  this.id = 0;
  this.name = 'Server';
  this.email = 'server@dartan.test';
 }
});

Isolate.$defineClass("PlayerListMu", "ListenableList", ["listInsertedListeners", "listAddedListeners", "listRemovedListeners", "removedListeners", "insertedListeners", "addedListeners", "changedListeners", "_fireIndividualItems", "_internal"], {
 next$1: function(from) {
  var index = this.indexOf$1(from);
  if ($.eqB(index, $.sub($.get$length(this), 1))) {
    index = 0;
  }
  return this.operator$index$1(index);
 }
});

Isolate.$defineClass("SupportedActions", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("Say", "AbstractGameAction", ["message=", "_isLobby", "turnPhase", "gamePhase", "performedTime", "_player", "_user", "gameId", "playerId", "userId", "id"], {
 toText$0: function() {
  return $.S(this.get$user().get$name()) + ': ' + $.S(this.message);
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Say$0();
  } else {
    t1 = $.Say$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.AbstractGameAction.prototype.get$data.call(this);
  data.set$message(this.message);
  data.set$isLobby(this.get$isLobby());
  return data;
 },
 perform$1: function(game) {
  $.add$1(game.get$chats(), this);
 },
 prepare$1: function(game) {
  if (this.get$isGame() === true) {
    $.AbstractGameAction.prototype.prepare$1.call(this, game);
  }
 },
 update$1: function(lobby) {
  $.add$1(lobby.get$chats(), this);
 },
 performAtLobbyServer$1: function(lobby) {
 },
 prepareLobby$1: function(lobby) {
  if (this.get$isLobby() === true) {
    this.set$user($.byId(this.userId, lobby.get$users()));
  }
 },
 get$isLobby: function() {
  return this._isLobby;
 },
 get$isGame: function() {
  return !$.eqNullB(this.gameId);
 },
 Say$lobby$0: function() {
  this._isLobby = true;
 },
 Say$data$1: function(json) {
  this.message = json.get$message();
  this._isLobby = json.get$isLobby();
 },
 is$GameAction: true,
 is$Action: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Identifyable: true,
 is$Hashable: true,
 is$LobbyAction: true
});

Isolate.$defineClass("SupportedDices", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("DiceRoll", "Object", ["dice2?", "dice1?"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.DiceRoll$2(this.dice1, this.dice2);
  } else {
    t1 = $.DiceRoll$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var d = $.JsonObject$0();
  d.dice1 = this.dice1;
  d.dice2 = this.dice2;
  return d;
 },
 total$0: function() {
  return $.add(this.dice1, this.dice2);
 },
 DiceRoll$data$1: function(json) {
  this.dice1 = json.get$dice1();
  this.dice2 = json.get$dice2();
 },
 DiceRoll$fromTotal$1: function(total) {
  if ($.gtB(total, 6)) {
    this.dice1 = 6;
    this.dice2 = $.sub(total, 6);
  } else {
    this.dice1 = $.sub(total, 1);
    this.dice2 = 1;
  }
 },
 is$Jsonable: true,
 is$Copyable: true
});

Isolate.$defineClass("RandomDice", "Object", ["random?"], {
 test$0: function() {
  var dice = $.RandomDice$1($.ClientRandom$0());
  var rolls = $.HashMapImplementation$0();
  for (var i = 0; i < 1000; ++i) {
    var rollll = dice.roll$0();
    if ($.eqNullB(rolls.operator$index$1(rollll.total$0()))) {
      rolls.operator$indexSet$2(rollll.total$0(), 0);
    }
    var t1 = rollll.total$0();
    rolls.operator$indexSet$2(t1, $.add(rolls.operator$index$1(t1), 1));
  }
  for (i = 2; i < 13; ++i) {
    $.isTrue(!$.eqNullB(rolls.operator$index$1(i)), $.S(i) + ' should have rolled at least once');
    $.isTrue($.gt(rolls.operator$index$1(i), 0), $.S(i) + ' should have rolled at least once');
  }
 },
 equals$1: function(other) {
  return typeof other === 'object' && !!other.is$RandomDice;
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.RandomDice$1((void 0));
  } else {
    t1 = $.RandomDice$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var json = $.JsonObject$0();
  json.set$type($.name(this));
  return json;
 },
 roll$0: function() {
  return $.DiceRoll$2(this.random.intFromOne$1(6), this.random.intFromOne$1(6));
 },
 RandomDice$1: function(random) {
  if ($.eqNullB(this.random)) {
    this.random = $.ClientRandom$0();
  }
 },
 is$RandomDice: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true
});

Isolate.$defineClass("StackDice", "Object", ["random?", "rollCount", "reshuffleTreshold", "rolls"], {
 test$0: function() {
  var dice = $.StackDice$1((void 0));
  dice.reshuffleTreshold = 0;
  var testRolls = $.HashMapImplementation$0();
  for (var i = 1; i < 37; ++i) {
    var rollll = dice.roll$0();
    if ($.eqNullB(testRolls.operator$index$1(rollll.total$0()))) {
      testRolls.operator$indexSet$2(rollll.total$0(), 0);
    }
    var t1 = rollll.total$0();
    testRolls.operator$indexSet$2(t1, $.add(testRolls.operator$index$1(t1), 1));
  }
  $.isTrue($.eq(testRolls.operator$index$1(2), 1), '2 should have been rolled 1x');
  $.isTrue($.eq(testRolls.operator$index$1(3), 2), '3 should have been rolled 2x');
  $.isTrue($.eq(testRolls.operator$index$1(4), 3), '4 should have been rolled 3x');
  $.isTrue($.eq(testRolls.operator$index$1(5), 4), '5 should have been rolled 4x');
  $.isTrue($.eq(testRolls.operator$index$1(6), 5), '6 should have been rolled 5x');
  $.isTrue($.eq(testRolls.operator$index$1(7), 6), '7 should have been rolled 6x');
  $.isTrue($.eq(testRolls.operator$index$1(8), 5), '8 should have been rolled 5x');
  $.isTrue($.eq(testRolls.operator$index$1(9), 4), '9 should have been rolled 4x');
  $.isTrue($.eq(testRolls.operator$index$1(10), 3), '10 should have been rolled 3x');
  $.isTrue($.eq(testRolls.operator$index$1(11), 2), '11 should have been rolled 2x');
  $.isTrue($.eq(testRolls.operator$index$1(12), 1), '12 should have been rolled 1x');
 },
 equals$1: function(other) {
  return typeof other === 'object' && !!other.is$StackDice;
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.StackDice$1((void 0));
  } else {
    t1 = $.StackDice$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var json = $.JsonObject$0();
  json.set$type($.name(this));
  return json;
 },
 resetRolls$0: function() {
  if ($.eqNullB(this.rolls)) {
    var t1 = $.List((void 0));
    $.setRuntimeTypeInfo(t1, ({E: 'int'}));
    this.rolls = t1;
  }
  $.clear(this.rolls);
  for (var first = 1; first < 7; ++first) {
    for (var second = 1; second < 7; ++second) {
      $.add$1(this.rolls, first + second);
    }
  }
  this.reshuffleTreshold = this.random.intFromOne$1(6);
 },
 roll$0: function() {
  var totalRoll = $.index(this.rolls, this.random.intFromZero$1($.get$length(this.rolls)));
  $.removeRange(this.rolls, $.indexOf$1(this.rolls, totalRoll), 1);
  this.rollCount = $.add(this.rollCount, 1);
  if ($.sub(36, this.rollCount) === this.reshuffleTreshold) {
    this.resetRolls$0();
  }
  return $.DiceRoll$fromTotal$1(totalRoll);
 },
 StackDice$1: function(random) {
  if ($.eqNullB(this.random)) {
    this.random = $.ClientRandom$0();
  }
  this.resetRolls$0();
 },
 is$StackDice: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true
});

Isolate.$defineClass("PredictableDice", "Object", ["rollsIterator", "rolls"], {
 equals$1: function(other) {
  return typeof other === 'object' && !!other.is$PredictableDice;
 },
 test$0: function() {
  var dice = $.PredictableDice$1([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  for (var i = 2; i < 13; ++i) {
    var diceRoll = dice.roll$0();
    $.isTrue($.eq(diceRoll.total$0(), i), 'Expected to roll ' + $.S(i) + ', instead got ' + $.S(diceRoll.total$0()));
  }
 },
 roll$0: function() {
  $.isTrue(this.rollsIterator.hasNext$0(), 'Out of rolls');
  return $.DiceRoll$fromTotal$1(this.rollsIterator.next$0());
 },
 PredictableDice$1: function(rolls) {
  if ($.eqNullB(this.rolls)) {
    var t1 = $.List((void 0));
    $.setRuntimeTypeInfo(t1, ({E: 'int'}));
    this.rolls = t1;
  }
  this.rollsIterator = $.iterator(this.rolls);
 },
 is$PredictableDice: true,
 is$Testable: true
});

Isolate.$defineClass("SupportedRandoms", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("ClientRandom", "Object", [], {
 test$0: function() {
  $.RandomTest$0().test$0();
 },
 intFromOne$1: function(length$) {
  return $.add(this.intFromZero$1(length$), 1);
 },
 intFromZero$1: function(length$) {
  if ($.eqB(length$, 1)) {
    return 0;
  }
  return $.toInt($.mul($.random(), $.toDouble(length$)));
 },
 is$Testable: true
});

Isolate.$defineClass("TradeBank", "AbstractGameAction", ["wanted=", "offered=", "turnPhase", "gamePhase", "performedTime", "_player", "_user", "gameId", "playerId", "userId", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.TradeBank$0();
  } else {
    t1 = $.TradeBank$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.AbstractGameAction.prototype.get$data.call(this);
  data.set$wanted($.nullOrDataListFrom(this.wanted));
  data.set$offered($.nullOrDataListFrom(this.offered));
  return data;
 },
 perform$1: function(game) {
  $.addAll(game.get$bank(), this.offered);
  $.addAll(this.get$player().get$resources(), this.wanted);
 },
 TradeBank$data$1: function(json) {
  this.wanted = $.ResourceListIm$1($.listFrom(json.get$wanted()));
  this.offered = $.ResourceListIm$1($.listFrom(json.get$offered()));
 }
});

Isolate.$defineClass("TradeOffer", "AbstractGameAction", ["responses", "_allPlayersResponded", "offered=", "wanted=", "turnPhase", "gamePhase", "performedTime", "_player", "_user", "gameId", "playerId", "userId", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.TradeOffer$0();
  } else {
    t1 = $.TradeOffer$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.AbstractGameAction.prototype.get$data.call(this);
  data.set$wanted($.nullOrDataListFrom(this.wanted));
  data.set$offered($.nullOrDataListFrom(this.offered));
  return data;
 },
 perform$1: function(game) {
  game.get$turn().addTradeOffer$1(this);
 },
 TradeOffer$data$1: function(json) {
  this.wanted = $.ResourceListIm$1($.listFrom(json.get$wanted()));
  this.offered = $.ResourceListIm$1($.listFrom(json.get$offered()));
 }
});

Isolate.$defineClass("RejectOffer", "AbstractGameAction", ["offerId=", "offer", "turnPhase", "gamePhase", "performedTime", "_player", "_user", "gameId", "playerId", "userId", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.RejectOffer$0();
  } else {
    t1 = $.RejectOffer$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.AbstractGameAction.prototype.get$data.call(this);
  data.set$offerId(this.offerId);
  return data;
 },
 perform$1: function(game) {
  game.get$turn().addTradeResponse$2(this, this.offer);
 },
 prepare$1: function(game) {
  this.offer = $.byId(this.offerId, game.get$turn().get$offers());
 },
 is$GameAction: true,
 is$Action: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Identifyable: true,
 is$Hashable: true
});

Isolate.$defineClass("CounterOffer", "AbstractGameAction", ["offer", "offerId=", "offered=", "wanted=", "turnPhase", "gamePhase", "performedTime", "_player", "_user", "gameId", "playerId", "userId", "id"], {
 toText$0: function() {
  return $.S(this.get$player().get$user().get$name()) + ' countered ';
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.CounterOffer$0();
  } else {
    t1 = $.CounterOffer$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.AbstractGameAction.prototype.get$data.call(this);
  data.set$offerId(this.offerId);
  data.set$wanted($.toDataList(this.wanted));
  data.set$offered($.toDataList(this.offered));
  return data;
 },
 perform$1: function(game) {
  game.get$turn().addTradeResponse$2(this, this.offer);
 },
 prepare$1: function(game) {
  this.offer = $.byId(this.offerId, game.get$turn().get$offers());
 },
 CounterOffer$data$1: function(json) {
  this.offerId = json.get$offerId();
  this.wanted = $.ResourceListIm$1($.listFrom(json.get$wanted()));
  this.offered = $.ResourceListIm$1($.listFrom(json.get$offered()));
 },
 is$GameAction: true,
 is$Action: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Identifyable: true,
 is$Hashable: true
});

Isolate.$defineClass("AcceptOffer", "AbstractGameAction", ["offerId=", "offer", "turnPhase", "gamePhase", "performedTime", "_player", "_user", "gameId", "playerId", "userId", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.AcceptOffer$0();
  } else {
    t1 = $.AcceptOffer$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.AbstractGameAction.prototype.get$data.call(this);
  if ($.eqNullB(this.offer)) {
    if ($.eqNullB(this.offerId)) {
      var t1 = (void 0);
    } else {
      t1 = this.offerId;
    }
  } else {
    t1 = this.offer.get$id();
  }
  data.set$offerId(t1);
  return data;
 },
 perform$1: function(game) {
  game.get$turn().addTradeResponse$2(this, this.offer);
 },
 prepare$1: function(game) {
  this.offer = $.byId(this.offerId, game.get$turn().get$offers());
 },
 AcceptOffer$data$1: function(json) {
  this.offerId = json.get$offerId();
 },
 is$GameAction: true,
 is$Action: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Identifyable: true,
 is$Hashable: true
});

Isolate.$defineClass("SupportedGameActions", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("AbstractGameAction", "Object", ["turnPhase?", "gamePhase", "performedTime?", "_player", "_user", "gameId=", "playerId?", "userId?", "id="], {
 test$0: function() {
 },
 equals$1: function(other) {
  return $.eq(other.get$id(), this.id);
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$type($.name(this));
  data.set$id(this.id);
  data.set$playerId(this.playerId);
  data.set$userId(this.userId);
  data.set$gameId(this.gameId);
  return data;
 },
 copy$1: function(data) {
  return $.AbstractGameAction$0();
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 toText$0: function() {
  return '[' + $.S(this.id) + ', ' + $.S($.name(this)) + ', ' + $.S(this.get$user().get$name()) + ']';
 },
 performServer$1: function(serverGame) {
 },
 perform$1: function(game) {
 },
 prepare$1: function(game) {
  this.set$user(game.userById$1(this.userId));
  this.set$player(game.playerById$1(this.playerId));
  this.gamePhase = game.get$currentGamePhase();
  if (this.gamePhase.get$isTurns() === true) {
    this.turnPhase = game.get$phases().get$turns().get$turnPhase();
  }
 },
 set$player: function(p) {
  this._player = p;
  this.playerId = p.get$id();
  this.set$user(p.get$user());
 },
 get$player: function() {
  return this._player;
 },
 set$user: function(u) {
  if (!$.eqNullB(u)) {
  }
  this._user = u;
  this.userId = u.get$id();
 },
 get$user: function() {
  return this._user;
 },
 get$isLobby: function() {
  return !!this.is$LobbyAction;
 },
 get$isGame: function() {
  return true;
 },
 AbstractGameAction$data$1: function(json) {
  this.id = json.get$id();
  this.userId = json.get$userId();
  this.playerId = json.get$playerId();
  this.gameId = json.get$gameId();
 },
 is$GameAction: true,
 is$Action: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Identifyable: true,
 is$Hashable: true
});

Isolate.$defineClass("StartGame", "AbstractGameAction", ["newGame!", "turnPhase", "gamePhase", "performedTime", "_player", "_user", "gameId", "playerId", "userId", "id"], {
 toText$0: function() {
  return $.S(this.get$user().get$name()) + ' started game ' + $.S(this.newGame.get$name());
 },
 get$data: function() {
  var data = $.AbstractGameAction.prototype.get$data.call(this);
  data.set$newGame($.nullOrDataFrom(this.newGame));
  return data;
 },
 performServer$1: function(serverGame) {
  serverGame.prepareDevelopmentCards$0();
  var t1 = $.DateImplementation$now$0();
  serverGame.get$game().set$startedDateTime(t1);
  serverGame.get$game().get$board().make$1(serverGame.get$random());
 },
 perform$1: function(game) {
  game.start$0();
  $.AbstractGameAction.prototype.perform$1.call(this, game);
 }
});

Isolate.$defineClass("RollDice", "AbstractGameAction", ["rolledDice=", "turnPhase", "gamePhase", "performedTime", "_player", "_user", "gameId", "playerId", "userId", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.RollDice$0();
  } else {
    t1 = $.RollDice$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.AbstractGameAction.prototype.get$data.call(this);
  data.set$rolledDice($.nullOrDataFrom(this.rolledDice));
  return data;
 },
 performServer$1: function(serverGame) {
  $.AbstractGameAction.prototype.performServer$1.call(this, serverGame);
  this.rolledDice = serverGame.get$dice().roll$0();
 },
 perform$1: function(game) {
  if (game.get$currentGamePhase().get$isDetermineFirstPlayer() === true) {
    game.get$phases().get$determinFirstPlayer().registerRoll$3(game, this.get$player(), this.rolledDice);
  }
  if (game.get$currentGamePhase().get$isTurns() === true) {
    if ($.eqB(this.rolledDice.total$0(), 7)) {
    }
  }
 },
 RollDice$data$1: function(json) {
  if ($.eqNullB(json.get$rolledDice())) {
    var t1 = (void 0);
  } else {
    t1 = $.DiceRoll$data$1(json.get$rolledDice());
  }
  this.rolledDice = t1;
 }
});

Isolate.$defineClass("SupportedLobbyActions", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("AbstractLobbyAction", "Object", ["_user", "userId?", "performedTime?", "id="], {
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$type($.name(this));
  data.set$id(this.id);
  data.set$userId(this.userId);
  if ($.eqNullB(this.performedTime)) {
    var t1 = (void 0);
  } else {
    t1 = $.toString(this.performedTime);
  }
  data.set$performedTime(t1);
  return data;
 },
 equals$1: function(other) {
  return $.eq(other.get$id(), this.id);
 },
 toText$0: function() {
  return $.name(this);
 },
 test$0: function() {
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.AbstractLobbyAction$0();
  } else {
    t1 = $.AbstractLobbyAction$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 set$user: function(u) {
  this._user = u;
  if (!$.eqNullB(u)) {
    this.userId = u.get$id();
  }
 },
 get$user: function() {
  return this._user;
 },
 update$1: function(lobby) {
 },
 performAtLobbyServer$1: function(lobby) {
 },
 prepareLobby$1: function(lobby) {
  this.set$user($.byId(this.userId, lobby.get$users()));
 },
 get$isLobby: function() {
  return true;
 },
 get$isGame: function() {
  return !!this.is$GameAction;
 },
 AbstractLobbyAction$data$1: function(json) {
  this.id = json.get$id();
  if ($.eqNullB(json.get$performedTime())) {
    var t1 = (void 0);
  } else {
    t1 = $.DateImplementation$fromString(json.get$performedTime());
  }
  this.performedTime = t1;
  this.userId = json.get$userId();
 },
 is$LobbyAction: true,
 is$Action: true,
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Identifyable: true,
 is$Hashable: true
});

Isolate.$defineClass("JoinLobby", "AbstractLobbyAction", ["_user", "userId", "performedTime", "id"], {
 toText$0: function() {
  return $.S(this.get$user().get$name()) + ' joins';
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.JoinLobby$0();
  } else {
    t1 = $.JoinLobby$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.AbstractLobbyAction.prototype.get$data.call(this);
  data.set$user($.nullOrDataFrom(this.get$user()));
  return data;
 },
 update$1: function(lobby) {
  $.add$1(lobby.get$users(), this.get$user());
 },
 prepareLobby$1: function(lobby) {
 },
 JoinLobby$data$1: function(json) {
  if ($.eqNullB(json.get$user())) {
    var t1 = this.get$user();
  } else {
    t1 = $.User$data$1(json.get$user());
  }
  this.set$user(t1);
 }
});

Isolate.$defineClass("LeaveLobby", "AbstractLobbyAction", ["_user", "userId", "performedTime", "id"], {
 toText$0: function() {
  return $.S(this.get$user().get$name()) + ' left';
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.LeaveLobby$0();
  } else {
    t1 = $.LeaveLobby$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 update$1: function(lobby) {
  lobby.get$users().remove$1(this.get$user());
 }
});

Isolate.$defineClass("NewGame", "AbstractLobbyAction", ["game=", "_user", "userId", "performedTime", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.NewGame$0();
  } else {
    t1 = $.NewGame$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.AbstractLobbyAction.prototype.get$data.call(this);
  data.set$game($.nullOrDataFrom(this.game));
  return data;
 },
 toText$0: function() {
  return $.S(this.get$user().get$name()) + ' created a new game: ' + $.S(this.game.get$name());
 },
 performAtLobbyServer$1: function(lobby) {
  if ($.eqNullB(this.game)) {
    this.game = $.Game$0();
    var t1 = $.Standard4p$0();
    this.game.set$board(t1);
    this.game.set$name('waitwhat?');
  }
  t1 = this.get$user();
  this.game.set$host(t1);
  $.add$1(this.game.get$users(), this.get$user());
  lobby.identify$1(this.game);
 },
 update$1: function(lobby) {
  $.add$1(lobby.get$games(), this.game);
 },
 prepareLobby$1: function(lobby) {
  $.AbstractLobbyAction.prototype.prepareLobby$1.call(this, lobby);
 },
 NewGame$data$1: function(json) {
  this.game = $.fromData(json.get$game());
 }
});

Isolate.$defineClass("JoinGame", "AbstractLobbyAction", ["game=", "gameId=", "_user", "userId", "performedTime", "id"], {
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.JoinGame$0();
  } else {
    t1 = $.JoinGame$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 get$data: function() {
  var data = $.AbstractLobbyAction.prototype.get$data.call(this);
  if ($.eqNullB(this.game)) {
    var t1 = (void 0);
  } else {
    t1 = this.game.get$id();
  }
  data.set$gameId(t1);
  return data;
 },
 update$1: function(lobby) {
  $.add$1(this.game.get$users(), this.get$user());
 },
 prepareLobby$1: function(lobby) {
  $.AbstractLobbyAction.prototype.prepareLobby$1.call(this, lobby);
  this.game = $.byId(this.gameId, lobby.get$games());
 },
 JoinGame$data$1: function(json) {
  this.gameId = json.get$gameId();
 }
});

Isolate.$defineClass("LocalServer", "Object", ["consecutiveLobbyId", "consecutiveGameId", "gameClient=", "player", "user=", "game=", "serverGame", "lobby?"], {
 sendToUser$2: function(a, u) {
  this.sendData$2($.stringify(a.get$data()), u.get$id());
 },
 message$0: function() {
 },
 get$message: function() { return new $.Closure82(this, 'message$0'); },
 receiveData$1: function(data) {
  jso = (void 0);
  obj = (void 0);
  try {
    obj = $.JsonObject$fromJsonString(data, (void 0));
    jso = $.Jsonable$data(obj);
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    if (t1 === (void 0) || typeof t1 === 'object' && !!t1.is$Exception) {
      $.print('merp');
    } else {
      throw exception;
    }
  }
  if (!$.eqNullB(jso)) {
    t1 = jso;
    if (typeof t1 === 'object' && !!t1.is$Action) {
      var action = jso;
      if (jso.get$isGame() === true) {
        this.doGame$1(action);
        this.sendToUser$2(action, this.user);
      }
      if (jso.get$isLobby() === true) {
        this.doLobby$1(action);
        this.sendToUser$2(action, this.user);
      }
    }
  }
 },
 sendData$2: function(data, userId) {
  this.gameClient.receive$1(data);
 },
 perform$1: function(action) {
 },
 doLobby$1: function(la) {
  try {
    var t1 = this.consecutiveLobbyId;
    this.consecutiveLobbyId = $.add(t1, 1);
    la.set$id(t1);
    la.prepareLobby$1(this.lobby);
    la.performAtLobbyServer$1(this.lobby);
    la.update$1(this.lobby);
    $.add$1(this.lobby.get$actions(), la);
  } catch (exception) {
    t1 = $.unwrapException(exception);
    if (t1 === (void 0) || typeof t1 === 'object' && !!t1.is$Exception) {
      ex = t1;
      $.print('Error exec LobbyAction at LocalServer');
      throw $.captureStackTrace(ex);
    } else {
      throw exception;
    }
  }
 },
 doGame$1: function(ga) {
  if ($.eqB(ga, this.game.get$id())) {
    try {
      var t1 = this.consecutiveGameId;
      this.consecutiveGameId = $.add(t1, 1);
      ga.set$id(t1);
      this.serverGame.prepare$1(ga);
      this.serverGame.performServer$1(ga);
      this.serverGame.perform$1(ga);
    } catch (exception) {
      t1 = $.unwrapException(exception);
      if (t1 === (void 0) || typeof t1 === 'object' && !!t1.is$Exception) {
        ex = t1;
        $.print('error exec game action at LocalServer');
        throw $.captureStackTrace(ex);
      } else {
        throw exception;
      }
    }
  } else {
    throw $.captureStackTrace($.ExceptionImplementation$1('Game with id ' + $.S(ga.get$gameId()) + ' not found'));
  }
 },
 LocalServer$1: function(game) {
  this.lobby = $.Lobby$0();
 }
});

Isolate.$defineClass("GameClient", "Object", ["user=", "player", "game=", "lobby?", "server="], {
 receive$1: function(data) {
  var json = $.Jsonable$data($.JsonObject$fromJsonString(data, (void 0)));
  if (!$.eqNullB(json)) {
    if (typeof json === 'object' && !!json.is$Action) {
      if (json.get$isLobby() === true) {
        json.prepareLobby$1(this.lobby);
        json.update$1(this.lobby);
        $.add$1(this.lobby.get$actions(), json);
      }
      if (json.get$isGame() === true) {
        json.prepare$1(this.game);
        json.perform$1(this.game);
      }
    }
  }
 },
 send$1: function(action) {
  var strAction = $.stringify(action.get$data());
  $.print('**' + $.S(strAction) + '**');
  this.server.receiveData$1(strAction);
 },
 GameClient$0: function() {
  this.lobby = $.Lobby$0();
 }
});

Isolate.$defineClass("Lobby", "Object", ["consecutiveId", "chats?", "actions?", "games?", "users?"], {
 identify$1: function(withId) {
  var t1 = this.consecutiveId;
  this.consecutiveId = $.add(t1, 1);
  withId.set$id(t1);
 },
 Lobby$0: function() {
  var t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'User'}));
  this.users = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Game'}));
  this.games = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'LobbyAction'}));
  this.actions = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Say'}));
  this.chats = t1;
 }
});

Isolate.$defineClass("SupportedPieces", "ImmutableL", ["wrapped"], {
});

Isolate.$defineClass("Road", "Object", ["edge?", "playerId?", "id=", "player"], {
 test$0: function() {
  $.RoadTest$0().test$0();
 },
 equals$1: function(other) {
  return $.eqB(this.id, other.get$id()) && $.eqB(this.playerId, other.get$playerId()) && $.eqB(this.edge, other.get$edge());
 },
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$type($.name(this));
  data.edge = $.nullOrDataFrom(this.edge);
  data.set$playerId(this.playerId);
  return data;
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Road$0();
  } else {
    t1 = $.Road$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 addToPlayer$1: function(p) {
  $.add$1(p.get$roads(), this);
  p.get$stock().get$roads().remove$1(this);
  $.add$1(p.get$edgePieces(), this);
 },
 Road$data$1: function(json) {
  this.id = json.get$id();
  this.playerId = json.get$playerId();
  this.edge = $.fromData(json.get$edge());
 },
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Hashable: true,
 is$Identifyable: true
});

Isolate.$defineClass("Town", "Object", ["vertice?", "player", "id=", "playerId?"], {
 test$0: function() {
  $.TownTest$0().test$0();
 },
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$playerId(this.playerId);
  data.set$type($.name(this));
  data.set$vertice($.nullOrDataFrom(this.vertice));
  return data;
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.Town$0();
  } else {
    t1 = $.Town$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 equals$1: function(other) {
  return $.eq(other.get$id(), this.id);
 },
 addToPlayer$1: function(p) {
  $.add$1(p.get$towns(), this);
  p.get$stock().get$towns().remove$1(this);
  $.add$1(p.get$victoryPoints(), this);
  $.add$1(p.get$verticePieces(), this);
  $.add$1(p.get$producers(), this);
 },
 get$points: function() {
  return 1;
 },
 Town$data$1: function(json) {
  this.id = json.get$id();
  this.playerId = json.get$playerId();
  this.vertice = $.fromData(json.get$vertice());
 },
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Hashable: true,
 is$Identifyable: true
});

Isolate.$defineClass("City", "Object", ["vertice?", "playerId?", "id=", "player"], {
 test$0: function() {
  $.CityTest$0().test$0();
 },
 equals$1: function(other) {
  return $.eqB(other.get$id(), this.id) && $.eqB(other.get$playerId(), this.playerId) && $.eqB(other.get$vertice(), this.vertice);
 },
 hashCode$0: function() {
  if ($.eqNullB(this.id)) {
    this.id = $.generateHashCode(this);
  }
  return this.id;
 },
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$id(this.id);
  data.set$playerId(this.playerId);
  data.set$type($.name(this));
  data.set$playerId(this.playerId);
  data.set$vertice($.nullOrDataFrom(this.vertice));
  return data;
 },
 copy$1: function(data) {
  if ($.eqNullB(data)) {
    var t1 = $.City$0();
  } else {
    t1 = $.City$data$1(data);
  }
  return t1;
 },
 copy$0: function() {
  return this.copy$1((void 0))
},
 addToPlayer$1: function(p) {
  $.add$1(p.get$cities(), this);
  p.get$stock().get$cities().remove$1(this);
  $.add$1(p.get$victoryPoints(), this);
  $.add$1(p.get$verticePieces(), this);
  $.add$1(p.get$producers(), this);
 },
 get$points: function() {
  return 2;
 },
 City$data$1: function(json) {
  this.id = json.get$id();
  this.playerId = json.get$playerId();
  this.vertice = $.fromData(json.get$vertice());
 },
 is$Jsonable: true,
 is$Copyable: true,
 is$Testable: true,
 is$Hashable: true,
 is$Identifyable: true
});

Isolate.$defineClass("Stock", "Object", ["tokens", "cities?", "towns?", "roads?"], {
 get$data: function() {
  var data = $.JsonObject$0();
  data.set$cities($.toDataList(this.cities));
  data.set$towns($.toDataList(this.towns));
  data.set$roads($.toDataList(this.roads));
  return data;
 },
 Stock$0: function() {
  var t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Road'}));
  this.roads = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Town'}));
  this.towns = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'City'}));
  this.cities = t1;
  t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'Piece'}));
  this.tokens = t1;
 },
 Stock$data$1: function(json) {
  for (var t1 = $.iterator(json.get$roads()); t1.hasNext$0() === true; ) {
    var r = $.Road$data$1(t1.next$0());
    $.add$1(this.roads, r);
  }
  for (t1 = $.iterator(json.get$cities()); t1.hasNext$0() === true; ) {
    var c = $.City$data$1(t1.next$0());
    $.add$1(this.cities, c);
  }
 }
});

Isolate.$defineClass("AbstractBoardState", "Object", ["boardVisual="], {
 click$1: function(visual) {
 },
 get$click: function() { return new $.Closure84(this, 'click$1'); },
 mouseOut$1: function(visual) {
 },
 get$mouseOut: function() { return new $.Closure84(this, 'mouseOut$1'); },
 mouseOver$1: function(visual) {
 },
 get$mouseOver: function() { return new $.Closure84(this, 'mouseOver$1'); },
 end$0: function() {
 },
 start$0: function() {
 }
});

Isolate.$defineClass("NoState", "AbstractBoardState", ["boardVisual"], {
});

Isolate.$defineClass("SelectOnHover", "AbstractBoardState", ["boardVisual"], {
 mouseOut$1: function(visual) {
  visual.deSelect$0();
 },
 get$mouseOut: function() { return new $.Closure84(this, 'mouseOut$1'); },
 mouseOver$1: function(visual) {
  visual.select$0();
  this.boardVisual.set$currentVisual(visual);
 },
 get$mouseOver: function() { return new $.Closure84(this, 'mouseOver$1'); }
});

Isolate.$defineClass("ChangeTile", "AbstractBoardState", ["boardVisual"], {
 click$1: function(visual) {
  if (typeof visual === 'object' && !!visual.is$TileVisual) {
    var copy = $.Desert$1(visual.tile.get$cell());
    this.boardVisual.get$board().changeTile$1(copy);
  }
 },
 get$click: function() { return new $.Closure84(this, 'click$1'); },
 mouseOut$1: function(visual) {
  visual.deSelect$0();
 },
 get$mouseOut: function() { return new $.Closure84(this, 'mouseOut$1'); },
 mouseOver$1: function(visual) {
  visual.select$0();
 },
 get$mouseOver: function() { return new $.Closure84(this, 'mouseOver$1'); }
});

Isolate.$defineClass("PickPort", "AbstractBoardState", ["boardVisual"], {
 click$1: function(visual) {
  if (typeof visual === 'object' && !!visual.is$PortPickerVisual) {
    var t1 = $.ThreeToOnePort$2((void 0), (void 0));
    visual.selectedTile.set$port(t1);
  }
 },
 get$click: function() { return new $.Closure84(this, 'click$1'); },
 mouseOver$1: function(visual) {
  if (typeof visual === 'object' && !!visual.is$TileVisual) {
    this.boardVisual.get$portPicker().setPosition$1(visual.tile);
  }
 },
 get$mouseOver: function() { return new $.Closure84(this, 'mouseOver$1'); },
 end$0: function() {
  this.boardVisual.get$portPicker().hide$0();
 },
 start$0: function() {
  this.boardVisual.get$portPicker().show$0();
 }
});

Isolate.$defineClass("BoardEditor", "View", ["boardStates", "boardVisual=", "board=", "stateName", "boardRoot", "buttonList", "element?", "div"], {
 show$0: function() {
 },
 setState$1: function(bs) {
  this.boardVisual.set$boardState(bs);
  var t1 = $.name(bs);
  this.stateName.set$innerHTML(t1);
 },
 BoardEditor$0: function() {
  this.element = $.Element$tag('div');
  this.div = $.document().query$1(this.get$id());
  this.board = $.Board$2(7, 7);
  this.boardVisual = $.SvgBoard$0();
  var t1 = this.board;
  this.boardVisual.set$board(t1);
  this.buttonList = $.Element$tag('div');
  this.stateName = $.Element$tag('span');
  t1 = $.name(this.boardVisual.get$boardState());
  this.stateName.set$innerHTML(t1);
  this.boardStates = $.List$from([$.NoState$0(), $.ChangeTile$0(), $.PickPort$0()]);
  for (t1 = $.iterator(this.boardStates); t1.hasNext$0() === true; ) {
    var t2 = ({});
    t2.s_1 = t1.next$0();
    var b = $.Element$html('<button>' + $.S($.name(t2.s_1)) + '</button>');
    $.add$1(b.get$on().get$click(), new $.Closure81(this, t2));
    $.add$1(this.buttonList.get$elements(), b);
  }
  $.add$1(this.element.get$elements(), this.stateName);
  $.add$1(this.element.get$elements(), this.buttonList);
  $.add$1(this.element.get$elements(), this.boardVisual.get$element());
  $.add$1(this.div.get$elements(), this.element);
  this.boardVisual.hideAllEdges$0();
  this.boardVisual.hideAllVertices$0();
 }
});

Isolate.$defineClass("ViewRouter", "Object", ["activeView", "views"], {
 show$1: function(view) {
  $.print(view.get$id());
  if (!$.eqNullB(this.activeView)) {
    this.activeView.get$div().get$style().set$display('none');
  }
  this.activeView = view;
  this.activeView.get$div().get$style().set$display('block');
  $.forEach($.document().queryAll$1('.active'), new $.Closure3());
  $.add$1($.document().query$1($.S(this.activeView.get$id()) + 'li').get$classes(), 'active');
  view.show$0();
 },
 ViewRouter$0: function() {
  var t1 = ({});
  this.views = $.List$from([$.Test$0(), $.BoardEditor$0(), $.Intro$0(), $.Tldr$0(), $.Play$0(), $.Views$0(), $.Objects$0()]);
  for (var t2 = $.iterator(this.views); t2.hasNext$0() === true; ) {
    var t3 = ({});
    t3.view_1 = t2.next$0();
    $.add$1($.document().query$1($.S(t3.view_1.get$id()) + 'Link').get$on().get$click(), new $.Closure(this, t3));
  }
  t1.loc_3 = $.window().get$location().get$hash();
  if ($.eqNullB(t1.loc_3) || $.eqB(t1.loc_3, '')) {
    t1.loc_3 = '#Intro';
  }
  this.show$1($.iterator($.filter(this.views, new $.Closure2(t1))).next$0());
 }
});

Isolate.$defineClass("View", "Object", ["div?"], {
 show$0: function() {
 },
 get$id: function() {
  return '#' + $.S($.name(this));
 },
 View$0: function() {
  this.div = $.document().query$1(this.get$id());
 }
});

Isolate.$defineClass("Intro", "View", ["rendered", "div"], {
 show$0: function() {
  if (this.rendered !== true) {
    this.rendered = true;
    var beEl = $.document().query$1('#welcomeEditor');
    var bv = $.BoardsViewer$0();
    $.add$1(beEl.get$elements(), bv.element);
  }
 }
});

Isolate.$defineClass("Tldr", "View", ["div"], {
});

Isolate.$defineClass("Play", "View", ["rendered", "div"], {
 show$0: function() {
  if (this.rendered !== true) {
    this.div = $.document().query$1(this.get$id());
    var sgt = $.GameTest$0();
    $.GameTester$manual$1(sgt);
    var lobbyView = $.LobbyView$1(sgt.clientLobby);
    $.add$1(this.div.get$elements(), lobbyView.toElement$0());
    this.rendered = true;
  }
 }
});

Isolate.$defineClass("Objects", "View", ["generated", "div"], {
 writeResourcesTable$0: function() {
  var supported = $.SupportedResources$0();
  var msg = $.StringBufferImpl$1('');
  msg.add$1('      <table class="table table-striped table-bordered table-condensed">\n      <th>name</th> <th>tradeable</th> <th>color</th>');
  for (var t1 = supported.iterator$0(); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    msg.add$1(' <tr>\n                    <td>' + $.S($.link(t2)) + '</td>\n                    <td>' + $.S($.toHtml(t2.get$isTradeable())) + '</td>\n                    <td><span style="background-color: ' + $.S(t2.get$color()) + ';text-shadow: 0 0 0.4em white;">' + $.S(t2.get$color()) + '</span></td>\n                  </tr>');
  }
  msg.add$1('</table>');
  t1 = msg.toString$0();
  $.document().query$1('#resources').set$innerHTML(t1);
 },
 toTable$1: function(list) {
  var msg = $.StringBufferImpl$1('');
  msg.add$1('      <table class="table table-striped table-bordered table-condensed">\n        <tr  style="height: 8em;">\n          <th>name</th>\n          <th><div class=condensed>copyable</div</th>\n          <th><div class=condensed>hashable</div></th>\n          <th><div class=condensed>observable</div></th>\n          <th><div class=condensed>testable</div></th>\n        </tr>\n    ');
  for (var t1 = $.iterator(list); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    msg.add$1('        <tr>\n          <td>' + $.S($.smallIcon(t2)) + ' ' + $.S($.name(t2)) + '</td>\n          <td>' + $.S($.toHtml(typeof t2 === 'object' && !!t2.is$Copyable)) + '</td>\n          <td>' + $.S($.toHtml(typeof t2 === 'string' || typeof t2 === 'object' && !!t2.is$Hashable)) + '</td>\n          <td>' + $.S($.toHtml(typeof t2 === 'object' && !!t2.is$Observable)) + '</td>\n          <td>' + $.S($.toHtml(typeof t2 === 'object' && !!t2.is$Testable)) + '</td>\n        </tr>\n      ');
  }
  msg.add$1('      </table>\n    ');
  return msg.toString$0();
 },
 inlineResourceList$1: function(resources) {
  var msg = $.StringBufferImpl$1('');
  msg.add$1('<span>');
  for (var t1 = $.iterator(resources.types$0()); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (resources.hasType$1(t2) === true) {
      for (t2 = $.iterator(resources.ofType$1(t2)); t2.hasNext$0() === true; ) {
        msg.add$1($.smallIcon(t2.next$0()));
      }
    }
  }
  msg.add$1('</span>');
  return msg.toString$0();
 },
 writeLists$0: function() {
  this.writeResourceLists$0();
  var msg = $.StringBufferImpl$1('');
  for (var t1 = $.AllSupportedLists$0().iterator$0(); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    msg.add$1('        <h3>' + $.S($.supName(t2)) + '</h3>\n      ');
    msg.add$1(this.toTable$1(t2));
  }
  msg.add$1(this.writeResourceLists$0());
  msg.add$1(this.writeTiles$0());
  t1 = msg.toString$0();
  $.document().query$1('#resourceLists').set$innerHTML(t1);
 },
 writeTiles$0: function() {
  var supp = $.SupportedTiles$0();
  var msg = $.StringBufferImpl$1('       <table class="table table-striped table-bordered table-condensed">\n         <tr style="height: 5em;">\n           <th>name</th> \n           <th><div class=condensed>robber</div></th> \n           <th><div class=condensed>pirate</div></th> \n           <th><div class=condensed>can have port</div></th> \n           <th><div class=condensed>can have chit</div></th> \n           <th><div class=condensed>included on game board</div></th> \n           <th><div class=condensed>has chit</div></th> \n           <th><div class=condensed>produces resource</div></th> \n         </tr>\n    ');
  for (var t1 = supp.iterator$0(); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    msg.add$1('      <tr>\n        <td>' + $.S($.link(t2)) + '</td>\n        <td>' + $.S($.toHtml(t2.get$isRobberPlaceable())) + '</td>\n        <td>' + $.S($.toHtml(t2.get$isPiratePlaceable())) + '</td>\n        <td>' + $.S($.toHtml(t2.get$canHavePort())) + '</td>\n        <td>' + $.S($.toHtml(t2.get$canHaveChit())) + '</td>\n        <td>' + $.S($.toHtml(t2.get$isPartOfGame())) + '</td>\n        <td>' + $.S($.toHtml(t2.get$hasChit())) + '</td>\n        <td>' + $.S($.toHtml(t2.get$producesResource())) + '</td>\n      </tr>');
  }
  msg.add$1('</table>');
  return msg.toString$0();
 },
 writeResourceLists$0: function() {
  $.TownCost$0();
  $.DevelopmentCardCost$0();
  $.RoadCost$0();
  $.CityCost$0();
  $.MonopolyableResources$0();
  var msg = $.StringBufferImpl$1('         <table class="table table-striped table-bordered table-condensed">\n         <th>name</th> <th>resources</th> <th>summary</th>');
  for (var t1 = $.SupportedResourceLists$0().iterator$0(); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    msg.add$1('      <tr>\n        <td>' + $.S($.link(t2)) + '</td>\n        <td>' + $.S(this.inlineResourceList$1(t2)) + '</td>\n        <td>' + $.S(t2.toSummary$0()) + '</td>\n      </tr>');
  }
  msg.add$1('</table>');
  return msg.toString$0();
 },
 writeSummary$0: function() {
  for (var t1 = $.AllSupportedLists$0().iterator$0(), g = 0, i = 0; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    ++g;
    for (t2 = $.iterator(t2); t2.hasNext$0() === true; ) {
      t2.next$0();
      ++i;
    }
  }
  var msg = 'Supports <strong>' + $.S(i) + '</strong> implementations grouped by <strong>' + $.S(g) + '</strong> interfaces';
  $.document().query$1('#objectsSummary').set$innerHTML(msg);
 },
 show$0: function() {
  if (this.generated !== true) {
    this.writeSummary$0();
    this.writeLists$0();
    this.writeResourcesTable$0();
    this.generated = true;
  }
 },
 Objects$0: function() {
  this.div = $.document().query$1(this.get$id());
 }
});

Isolate.$defineClass("Views", "View", ["isRendered", "div"], {
 show$0: function() {
  if (this.isRendered !== true) {
    var biv = $.BoardInfoView$1($.Board$2(10, 10));
    $.add$1($.document().query$1('#infoBoard').get$elements(), biv.element);
    this.isRendered = true;
  }
 },
 Views$0: function() {
  this.div = $.document().query$1(this.get$id());
 }
});

Isolate.$defineClass("BoardInfoView", "Object", ["element?", "cellNeighbours?", "board=", "boardVisual="], {
 BoardInfoView$1: function(board) {
  this.element = $.Element$tag('div');
  var boardColumn = $.Element$html('<div class=span8></div>');
  var infoColumn = $.Element$html('<div class=span4></div>');
  this.boardVisual = $.SvgBoard$0();
  var t1 = this.board;
  this.boardVisual.set$board(t1);
  $.add$1(boardColumn.get$elements(), this.boardVisual.get$element());
  $.TileMeasurementInfo$0();
  this.cellNeighbours = $.CellNeighboursView$0();
  this.boardVisual.onSetted$2('currentVisual', new $.Closure73(this));
  var buttonShowEdges = $.Element$html('<button>show edges</button>');
  $.add$1(buttonShowEdges.get$on().get$click(), new $.Closure74(this));
  $.add$1(infoColumn.get$elements(), buttonShowEdges);
  var buttonHideEdges = $.Element$html('<button>hide edges</button>');
  $.add$1(buttonHideEdges.get$on().get$click(), new $.Closure75(this));
  $.add$1(infoColumn.get$elements(), buttonHideEdges);
  var buttonShowVertices = $.Element$html('<button>show vertices</button>');
  $.add$1(buttonShowVertices.get$on().get$click(), new $.Closure76(this));
  $.add$1(infoColumn.get$elements(), buttonShowVertices);
  var buttonHideVertices = $.Element$html('<button>hide vertices</button>');
  $.add$1(buttonHideVertices.get$on().get$click(), new $.Closure77(this));
  $.add$1(infoColumn.get$elements(), buttonHideVertices);
  $.add$1(infoColumn.get$elements(), this.cellNeighbours.get$element());
  $.add$1(boardColumn.get$elements(), this.boardVisual.get$element());
  $.add$1(this.element.get$elements(), infoColumn);
  $.add$1(this.element.get$elements(), boardColumn);
 }
});

Isolate.$defineClass("CellNeighboursView", "Object", ["entries", "cells?", "fake", "boardVisual=", "board=", "element?"], {
 showText$3: function(te, cell, text) {
  te.set$text(text);
 },
 showCell$1: function(cellToShow) {
  this.showText$3($.index(this.entries, 6).get$textElement(), cellToShow, 'C: ' + $.S(cellToShow.toText$0()));
  for (var i = 0; i < 6; ++i) {
    this.showText$3($.index(this.entries, i).get$textElement(), $.index(cellToShow.get$cells(), i), $.S(i) + ' ' + $.S($.index(cellToShow.get$cells(), i).toText$0()));
  }
 },
 CellNeighboursView$0: function() {
  this.element = $.Element$tag('div');
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'Cell'}));
  this.cells = t1;
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'CellTextEntry'}));
  this.entries = t1;
  this.fake = $.Cell$2(1, 1);
  this.board = $.Board$2((void 0), (void 0));
  for (t1 = $.iterator(this.fake.get$cells()); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    $.add$1(this.cells, t2);
  }
  $.add$1(this.cells, this.fake);
  for (t1 = $.iterator(this.cells); t1.hasNext$0() === true; ) {
    t2 = t1.next$0();
    this.board.addTile$1($.Sea$1(t2));
  }
  this.boardVisual = $.SvgBoard$0();
  t1 = $.makeLiteralMap(['width', 200, 'height', 200]);
  this.boardVisual.get$svg().set$attributes(t1);
  t1 = this.board;
  this.boardVisual.set$board(t1);
  this.boardVisual.hideAllEdges$0();
  this.boardVisual.hideAllVertices$0();
  for (t1 = $.iterator(this.cells); t1.hasNext$0() === true; ) {
    t2 = t1.next$0();
    var text = $.SVGElement$tag('text');
    text.set$attributes($.makeLiteralMap(['x', $.add(this.boardVisual.get$board2d().xyCell$1(t2).get$x(), 5.0), 'y', $.add(this.boardVisual.get$board2d().xyCell$1(t2).get$y(), this.boardVisual.get$board2d().get$hex2d().get$halfHeight()), 'fill', 'white', 'text', 'woeis', 'font-family', 'Verdana', 'font-size', '12']));
    text.set$text('woei');
    $.add$1(this.entries, $.CellTextEntry$2(t2, text));
    $.add$1(this.boardVisual.get$svg().get$elements(), text);
    $.add$1(this.element.get$elements(), this.boardVisual.get$svg());
  }
 }
});

Isolate.$defineClass("CellTextEntry", "Object", ["cell=", "textElement?"], {
});

Isolate.$defineClass("TileMeasurementInfo", "Object", ["element?", "fake", "board=", "boardVisual="], {
 horizontalLine$4: function(x, y, length$, t) {
  var g = $.SVGElement$tag('g');
  var shortLeft = $.SVGElement$tag('line');
  shortLeft.set$attributes($.makeLiteralMap(['x1', x, 'x2', x, 'y1', $.sub(y, 2.5), 'y2', $.add(y, 2.5)]));
  var shortRight = $.SVGElement$tag('line');
  shortRight.set$attributes($.makeLiteralMap(['stroke-width', '2', 'x1', $.add(x, length$), 'x2', $.add(x, length$), 'y1', $.sub(y, 2.5), 'y2', $.add(y, 2.5)]));
  var long$ = $.SVGElement$tag('line');
  long$.set$attributes($.makeLiteralMap(['x1', x, 'x2', $.add(x, length$), 'y1', y, 'y2', y]));
  var text = $.SVGElement$tag('text');
  text.set$attributes($.makeLiteralMap(['x', $.add(x, 3.0), 'y', $.add(y, 10.0), 'fill', 'black', 'text', 'woeis', 'font-family', 'Verdana', 'font-size', '10']));
  text.set$text(t);
  $.add$1(this.element.get$elements(), shortLeft);
  $.add$1(this.element.get$elements(), shortRight);
  $.add$1(this.element.get$elements(), long$);
  $.add$1(this.element.get$elements(), text);
  return g;
 },
 TileMeasurementInfo$0: function() {
  this.element = $.Element$tag('svg');
  this.fake = $.Cell$2(0, 0);
  this.board = $.Board$2((void 0), (void 0));
  this.board.addTile$1($.Sea$1(this.fake));
  var board2d = $.Board2D$1($.Hexagon2D$1(50.0));
  board2d.margin = 50.0;
  this.boardVisual = $.SvgBoard$0();
  var t1 = this.board;
  this.boardVisual.set$board(t1);
  this.boardVisual.hideAllEdges$0();
  this.boardVisual.hideAllVertices$0();
  var g = this.horizontalLine$4(board2d.xyCell$1(this.fake).get$x(), $.add(board2d.xyCell$1(this.fake).get$y(), board2d.hex2d.get$height()), board2d.hex2d.get$halfWidth(), 'halfwidth');
  $.add$1(this.element.get$elements(), this.boardVisual.get$element());
  $.add$1(this.element.get$elements(), g);
 }
});

Isolate.$defineClass("LobbyView", "Object", ["elementsByGame", "elementsByUser", "server=", "lobby?", "games?", "chatTextbox", "chats?", "users?", "actions?", "root"], {
 addGame$1: function(game) {
  var gameEl = $.GameListElement$1(game);
  $.add$1(this.games.get$elements(), gameEl.element);
  $.indexSet(this.elementsByGame, game, gameEl);
 },
 addChat$1: function(said) {
  var e = $.Element$tag('li');
  e.set$innerHTML(said.toText$0());
  $.add$1(this.chats.get$elements(), e);
 },
 addAction$1: function(action) {
  var e = $.Element$tag('li');
  $.add$1(e.get$elements(), $.Element$html('<p>' + $.S($.smallIcon(action)) + ' ' + $.S(action.toText$0()) + '</p>'));
  $.add$1(this.actions.get$elements(), e);
 },
 removeUser$1: function(user) {
  $.index(this.elementsByUser, user).remove$0();
 },
 addUser$1: function(userToAdd) {
  var e = $.Element$tag('li');
  e.set$innerHTML(userToAdd.get$name());
  $.indexSet(this.elementsByUser, userToAdd, e);
  $.add$1(this.users.get$elements(), e);
 },
 toElement$0: function() {
  return this.root;
 },
 setupUI$0: function() {
  this.root = $.Element$tag('div');
  this.actions = $.Element$html('<ul class=span4><h2>actions</h2></ul>');
  this.users = $.Element$html('<ul class=span4><h2>users</h2></ul>');
  this.chats = $.Element$html('<ul class=span4><h2>chat</h2></ul>');
  this.games = $.Element$html('<ul class=span4><h2>games</h2></ul>');
  $.add$1(this.root.get$elements(), this.actions);
  $.add$1(this.root.get$elements(), this.users);
  $.add$1(this.root.get$elements(), this.chats);
  $.add$1(this.root.get$elements(), this.games);
  $.add$1(this.root.get$classes(), 'lobby');
  $.add$1(this.root.get$classes(), 'row');
 },
 watchLobby$0: function() {
  this.lobby.get$actions().onAdded$1(new $.Closure67(this));
  this.lobby.get$chats().onAdded$1(new $.Closure68(this));
  this.lobby.get$users().onAdded$1(new $.Closure69(this));
  this.lobby.get$users().onRemoved$1(new $.Closure70(this));
  this.lobby.get$games().onAdded$1(new $.Closure71(this));
 },
 LobbyView$1: function(lobby) {
  this.elementsByUser = $.HashMapImplementation$0();
  this.elementsByGame = $.HashMapImplementation$0();
  this.setupUI$0();
  this.watchLobby$0();
 }
});

Isolate.$defineClass("GameListElement", "Object", ["nameEl", "wrapper", "element?"], {
 GameListElement$1: function(game) {
  var t1 = ({});
  t1.game_1 = game;
  this.element = $.Element$tag('li');
  this.wrapper = $.Element$tag('div');
  this.nameEl = $.Element$html('<span>' + $.S(t1.game_1.get$name()) + '</span>');
  t1.amountUsersEl_2 = $.Element$tag('span');
  var t2 = $.toString($.get$length(t1.game_1.get$users()));
  t1.amountUsersEl_2.set$innerHTML(t2);
  $.add$1(this.nameEl.get$elements(), t1.amountUsersEl_2);
  $.add$1(this.wrapper.get$elements(), this.nameEl);
  $.add$1(this.element.get$elements(), this.wrapper);
  t1.game_1.get$users().onAdded$1(new $.Closure72(t1));
 }
});

Isolate.$defineClass("BoardViewer", "Object", ["tilesView", "portsView", "chitsView", "_show", "_boardVisual", "listsDiv", "element?"], {
 set$board: function(b) {
  this.get$boardVisual().set$board(b);
  var t1 = b.get$chitsBag();
  this.chitsView.set$list(t1);
  t1 = b.get$portsBag();
  this.portsView.set$list(t1);
  t1 = b.get$tilesBag();
  this.tilesView.set$list(t1);
 },
 set$showInfo: function(show) {
  this._show = show;
 },
 get$boardVisual: function() {
  return this._boardVisual;
 },
 BoardViewer$0: function() {
  this.element = $.Element$html('<div></div>');
  $.Element$html('<button>Make</button>');
  $.Element$html('<button>Start</button');
  this.chitsView = $.ListViewPerType$1('Chits');
  this.portsView = $.ListViewPerType$1('Ports');
  this.tilesView = $.ListViewPerType$1('Tiles');
  this._boardVisual = $.SvgBoard$0();
  this._boardVisual.hideAllEdges$0();
  this._boardVisual.hideAllVertices$0();
  $.add$1(this.element.get$elements(), this._boardVisual.get$element());
 }
});

Isolate.$defineClass("BoardActionBar", "Object", ["board=", "buttonRandomTiles", "buttonRender", "element?"], {
 BoardActionBar$0: function() {
  var t1 = ({});
  this.element = $.Element$tag('div');
  this.buttonRender = $.Element$html('<button>Prepare for play...</button>');
  this.buttonRandomTiles = $.Element$html('<button>Design</button');
  t1.cr_1 = $.ClientRandom$0();
  $.add$1(this.buttonRender.get$on().get$click(), new $.Closure56(this, t1));
  $.add$1(this.buttonRandomTiles.get$on().get$click(), new $.Closure57(this));
  $.add$1(this.element.get$elements(), this.buttonRandomTiles);
  $.add$1(this.element.get$elements(), this.buttonRender);
 }
});

Isolate.$defineClass("BoardsViewer", "Object", ["actionBar", "boardViewer", "jsonTextTelement", "h1Element", "currentLiElement", "actions?", "current", "elementsByBoard", "element?"], {
 changeBoard$2: function(b, li) {
  if (!$.eqNullB(this.currentLiElement)) {
    this.currentLiElement.get$classes().remove$1('selected');
  }
  this.currentLiElement = li;
  $.add$1(li.get$classes(), 'selected');
  this.boardViewer.set$board(b);
  var t1 = b.get$name();
  this.h1Element.set$innerHTML(t1);
  this.actionBar.set$board(b);
  this.current = b;
 },
 BoardsViewer$0: function() {
  this.element = $.Element$html('<div class=row-fluid></div>');
  this.jsonTextTelement = $.Element$html('<div></div>');
  this.actions = $.Element$html('<div></div>');
  this.h1Element = $.Element$html('<h2></h2>');
  var boardElement = $.Element$html('<div class=span9></div>');
  var listDiv = $.Element$html('<div class=span3></div>');
  var listElement = $.Element$html('<ul class=boardslist></ul>');
  this.boardViewer = $.BoardViewer$0();
  this.boardViewer.set$showInfo(false);
  this.actionBar = $.BoardActionBar$0();
  this.elementsByBoard = $.HashMapImplementation$0();
  var boards = $.List((void 0));
  $.setRuntimeTypeInfo(boards, ({E: 'Board'}));
  boards.push($.Standard4p$0());
  boards.push($.Board$2(7, 7));
  for (var t1 = $.iterator(boards); t1.hasNext$0() === true; ) {
    var t2 = ({});
    t2.board_1 = t1.next$0();
    t2.li_2 = $.Element$html('<li class=boardsList id=' + $.S(t2.board_1.get$name()) + '>' + $.S(t2.board_1.get$name()) + '</li>');
    $.add$1(t2.li_2.get$on().get$click(), new $.Closure53(this, t2));
    $.indexSet(this.elementsByBoard, t2.board_1, t2.li_2);
    $.add$1(listElement.get$elements(), t2.li_2);
  }
  $.add$1(boardElement.get$elements(), this.h1Element);
  $.add$1(boardElement.get$elements(), this.actionBar.get$element());
  $.add$1(boardElement.get$elements(), this.boardViewer.get$element());
  $.add$1(boardElement.get$elements(), this.jsonTextTelement);
  $.add$1(listDiv.get$elements(), listElement);
  $.add$1(this.element.get$elements(), listDiv);
  $.add$1(this.element.get$elements(), boardElement);
  t1 = boards.length;
  if (0 >= t1) throw $.ioore(0);
  t2 = boards[0];
  var t3 = this.elementsByBoard;
  var t4 = boards.length;
  if (0 >= t4) throw $.ioore(0);
  this.changeBoard$2(t2, $.index(t3, boards[0]));
 }
});

Isolate.$defineClass("ListViewPerType", "Object", ["elementsByType", "amountByType", "_lib3_list", "listEl", "element?", "title"], {
 removeItem$1: function(item) {
  var type = $.name(item);
  var t1 = this.amountByType;
  $.indexSet(t1, type, $.sub($.index(t1, type), 1));
  this.updateType$1(type);
 },
 get$removeItem: function() { return new $.Closure84(this, 'removeItem$1'); },
 updateType$1: function(type) {
  var e = $.index(this.elementsByType, type);
  var t1 = $.toString($.index(this.amountByType, type));
  e.query$1('#' + $.S(type)).set$innerHTML(t1);
 },
 addItem$1: function(item) {
  var type = $.name(item);
  if ($.eqNullB($.index(this.amountByType, type))) {
    $.indexSet(this.amountByType, type, 1);
    var li = $.Element$html('<li>' + $.S($.smallIcon(item)) + ' ' + $.S($.name(item)) + ': <span class=amount id= ' + $.S(type) + '>' + $.S($.index(this.amountByType, type)) + '</span></li>');
    $.indexSet(this.elementsByType, type, li);
    $.add$1(this.listEl.get$elements(), li);
  } else {
    this.updateType$1(type);
  }
 },
 get$addItem: function() { return new $.Closure84(this, 'addItem$1'); },
 fillItems$0: function() {
  for (var t1 = $.iterator(this._lib3_list); t1.hasNext$0() === true; ) {
    this.addItem$1(t1.next$0());
  }
 },
 set$list: function(list) {
  if (!$.eqNullB(this._lib3_list)) {
    this._lib3_list.offAdded$1(this.get$addItem());
    this._lib3_list.offRemoved$1(this.get$removeItem());
  }
  this._lib3_list = list;
  $.clear(this.amountByType);
  for (var t1 = $.iterator(this.elementsByType.getValues$0()); t1.hasNext$0() === true; ) {
    t1.next$0().remove$0();
  }
  $.clear(this.elementsByType);
  this.fillItems$0();
  list.onAdded$1(this.get$addItem());
  list.onRemoved$1(this.get$removeItem());
 },
 ListViewPerType$1: function(title) {
  this.amountByType = $.HashMapImplementation$0();
  this.elementsByType = $.HashMapImplementation$0();
  this.element = $.Element$tag('div');
  this.listEl = $.Element$tag('ul');
  if (!$.eqNullB(this.title)) {
    $.add$1(this.element.get$elements(), $.Element$html('<h2>' + $.S(this.title) + '</h2>'));
  }
  $.add$1(this.element.get$elements(), this.listEl);
 }
});

Isolate.$defineClass("SvgBoard", "Object", ["portPicker?", "_currentVisual", "observable", "_elementsByTile", "_elementsByEdge", "_elementsByVertice", "_elementsByPiece", "tiles?", "edges?", "vertices?", "_boardState?", "_board", "board2d?", "svg?", "element?"], {
 offSetted$2: function(property, handler) {
  this.observable.removeListener$2(property, handler);
 },
 onSetted$2: function(property, handler) {
  this.observable.addListener$2(property, handler);
 },
 deSelect$0: function() {
 },
 select$0: function() {
 },
 hide$0: function() {
  this.svg.get$style().set$display('none');
 },
 show$0: function() {
  this.svg.get$style().set$display('block');
 },
 _addEventHandlers$1: function(v) {
  var t1 = ({});
  t1.v_1 = v;
  $.add$1(t1.v_1.get$svg().get$on().get$click(), new $.Closure61(this, t1));
  $.add$1(t1.v_1.get$svg().get$on().get$mouseOver(), new $.Closure62(this, t1));
  $.add$1(t1.v_1.get$svg().get$on().get$mouseOut(), new $.Closure63(this, t1));
 },
 tileChanged$2: function(old, newTile) {
  if (this._elementsByTile.containsKey$1(old) === true) {
    $.index(this._elementsByTile, old).remove$0();
  }
  var visual = $.TileVisual$svg$2(this.board2d, newTile);
  $.add$1(this.tiles.get$elements(), visual.toSvg$0());
  $.indexSet(this._elementsByTile, newTile, visual);
  this._addEventHandlers$1(visual);
 },
 get$tileChanged: function() { return new $.Closure85(this, 'tileChanged$2'); },
 createElements$0: function() {
  for (var t1 = $.iterator(this.get$board().get$tiles()); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    var visual = $.TileVisual$svg$2(this.board2d, t2);
    $.indexSet(this._elementsByTile, t2, visual);
    $.add$1(this.tiles.get$elements(), visual.svg);
    this._addEventHandlers$1(visual);
  }
  for (t1 = $.iterator(this.get$board().get$vertices()); t1.hasNext$0() === true; ) {
    t2 = t1.next$0();
    visual = $.VerticeVisual$svg$2(this.board2d, t2);
    $.indexSet(this._elementsByVertice, t2, visual);
    $.add$1(this.vertices.get$elements(), visual.svg);
    this._addEventHandlers$1(visual);
  }
  for (t1 = $.iterator(this.get$board().get$edges()); t1.hasNext$0() === true; ) {
    t2 = t1.next$0();
    visual = $.EdgeVisual$svg$2(this.board2d, t2);
    $.indexSet(this._elementsByEdge, t2, visual);
    $.add$1(this.edges.get$elements(), visual.svg);
    this._addEventHandlers$1(visual);
  }
 },
 hideAllVertices$0: function() {
  this.vertices.get$style().setProperty$2('display', 'none');
 },
 showAllVertices$0: function() {
  this.vertices.get$style().setProperty$2('display', 'block');
 },
 hideAllEdges$0: function() {
  this.edges.get$style().set$display('none');
  this.edges.get$style().setProperty$2('display', 'none');
 },
 showAllEdges$0: function() {
  this.edges.get$style().setProperty$2('display', 'block');
 },
 set$boardState: function(bs) {
  if (!$.eqNullB(this._boardState)) {
    this._boardState.end$0();
  }
  var old = this._boardState;
  bs.set$boardVisual(this);
  this._boardState = bs;
  this._boardState.start$0();
  this.observable.fire$3('boardState', old, bs);
 },
 get$boardState: function() {
  return this._boardState;
 },
 set$currentVisual: function(v) {
  var old = this._currentVisual;
  this._currentVisual = v;
  this.observable.fire$3('currentVisual', old, v);
 },
 clear$0: function() {
  $.forEach(this._elementsByEdge.getValues$0(), new $.Closure64());
  $.forEach(this._elementsByVertice.getValues$0(), new $.Closure65());
  $.forEach(this._elementsByTile.getValues$0(), new $.Closure66());
  $.clear(this._elementsByEdge);
  $.clear(this._elementsByTile);
  $.clear(this._elementsByVertice);
  $.clear(this.tiles.get$elements());
  $.clear(this.edges.get$elements());
  $.clear(this.vertices.get$elements());
  if (!$.eqNullB(this._board)) {
    this._board.offSetted$2('changeTile', this.get$tileChanged());
  }
 },
 set$board: function(b) {
  var old = this._board;
  this.clear$0();
  this._board = b;
  if (!$.eqNullB(this.get$board())) {
    this.createElements$0();
    this.get$board().onSetted$2('changeTile', this.get$tileChanged());
  }
  this.observable.fire$3('board', old, this._board);
 },
 get$board: function() {
  return this._board;
 },
 SvgBoard$0: function() {
  this.svg = $.SVGElement$tag('svg');
  this.element = this.svg;
  this._elementsByEdge = $.HashMapImplementation$0();
  this._elementsByTile = $.HashMapImplementation$0();
  this._elementsByVertice = $.HashMapImplementation$0();
  this.observable = $.ObservableHelper$0();
  this.set$boardState($.SelectOnHover$0());
  this.get$boardState().set$boardVisual(this);
  this.board2d = $.Board2D$1($.Hexagon2D$1(35.0));
  this.portPicker = $.PortPickerVisual$1(this.board2d);
  this.portPicker.hide$0();
  this.tiles = $.SVGElement$tag('g');
  this.vertices = $.SVGElement$tag('g');
  this.edges = $.SVGElement$tag('g');
  $.add$1(this.svg.get$elements(), this.tiles);
  $.add$1(this.svg.get$elements(), this.edges);
  $.add$1(this.svg.get$elements(), this.vertices);
  $.add$1(this.svg.get$elements(), this.portPicker.toSvg$0());
 },
 is$Observable: true
});

Isolate.$defineClass("ChitVisual", "AbstractVisual", ["radius", "text!", "_cell", "_chit", "chanceGroup", "circle", "group?", "board2d", "svg", "isCanvas", "isSvg", "isHidden", "isSelected"], {
 updateNumber$0: function() {
  if (!$.eqNullB(this.text)) {
    this.text.remove$0();
  }
  var t1 = this._chit;
  if (typeof t1 === 'object' && !!t1.is$RandomChit) {
    var strText = 'R';
  } else {
    strText = $.toString(this._chit.get$number());
  }
  this.text = $.SVGElement$svg('<text>' + $.S(strText) + '</text>');
  t1 = this._chit;
  if (typeof t1 === 'object' && !!t1.is$RandomChit) {
    var size = 12;
    var fontWeight = 'normal';
  } else {
    if ($.eqB(this._chit.get$chance(), 5) || $.eqB(this._chit.get$chance(), 4)) {
      fontWeight = 'bold';
    } else {
      fontWeight = 'normal';
    }
    size = $.add(7, this._chit.get$chance());
  }
  var point = this.board2d.xyCellCenter$1(this._cell);
  var fontSize = $.toString(size);
  this.text.get$style().set$fontWeight(fontWeight);
  t1 = $.S(fontSize) + 'px';
  this.text.get$style().set$fontSize(t1);
  t1 = this.text.get$attributes();
  if (this._chit.get$isRed() === true) {
    var t2 = 'red';
  } else {
    t2 = 'black';
  }
  $.indexSet(t1, 'stroke', t2);
  $.add$1(this.group.get$elements(), this.text);
  var w = this.text.getBBox$0().get$width();
  var h = this.text.getBBox$0().get$height();
  $.indexSet(this.text.get$attributes(), 'x', $.toString($.sub(point.get$x(), $.div(w, 2.0))));
  $.indexSet(this.text.get$attributes(), 'y', $.toString($.add(point.get$y(), $.div(h, 4.0))));
 },
 updateCircle$0: function() {
  var point = this.board2d.xyCellCenter$1(this._cell);
  if (this._chit.get$isRed() === true) {
    var stroke = 'red';
  } else {
    stroke = 'black';
  }
  this.radius = $.div(this.board2d.get$hex2d().get$sideLength(), 3.0);
  if (this.isSelected === true) {
    var t1 = 1.5;
  } else {
    t1 = 0.0;
  }
  var strokeWidth = 3 + t1;
  t1 = $.makeLiteralMap(['cx', point.get$x(), 'cy', point.get$y(), 'r', this.radius, 'fill', 'lightyellow', 'stroke', stroke, 'stroke-width', $.S(strokeWidth) + 'px']);
  this.circle.set$attributes(t1);
 },
 updateChit$0: function() {
  if ($.eqNullB(this._chit)) {
    this.group.get$style().set$display('none');
  } else {
    this.group.get$style().set$display('block');
    this.updateCircle$0();
    this.updateNumber$0();
  }
 },
 setChit$2: function(chit, c) {
  this._cell = c;
  this._chit = chit;
  this.updateChit$0();
 },
 group$1: function(arg0) { return this.group.$call$1(arg0); },
 ChitVisual$svg$1: function(b) {
  this.group = $.SVGElement$tag('g');
  this.chanceGroup = $.SVGElement$tag('g');
  this.circle = $.SVGElement$tag('circle');
  $.add$1(this.group.get$elements(), this.circle);
  $.add$1(this.group.get$elements(), this.chanceGroup);
  this.svg = this.group;
 }
});

Isolate.$defineClass("EdgeVisual", "AbstractVisual", ["edge?", "r", "board2d", "svg", "isCanvas", "isSvg", "isHidden", "isSelected"], {
 EdgeVisual$svg$2: function(board2d, edge) {
  this.r = $.SVGElement$tag('rect');
  var rectw = $.mul(board2d.get$hex2d().get$sideLength(), 0.8);
  var recth = $.mul(board2d.get$hex2d().get$sideLength(), 0.2);
  var pos = board2d.xyEdge$3(edge, rectw, recth);
  $.add(pos.get$x(), $.div(rectw, 2));
  $.add(pos.get$y(), $.div(recth, 2));
  if ($.eqB(edge.get$direction(), $.Vertical)) {
    var rotate = 'rotate(90  ' + $.S(pos.get$x()) + ' ' + $.S(pos.get$y()) + ')';
  } else {
    if ($.eqB(edge.get$direction(), $.SlopeDown)) {
      rotate = 'rotate(30 ' + $.S(pos.get$x()) + ' ' + $.S(pos.get$y()) + ')';
    } else {
      if ($.eqB(edge.get$direction(), $.SlopeUp)) {
        rotate = 'rotate(-30  ' + $.S(pos.get$x()) + ' ' + $.S(pos.get$y()) + ')';
      } else {
        rotate = (void 0);
      }
    }
  }
  var t1 = $.makeLiteralMap(['width', rectw, 'height', recth, 'fill', 'yellow', 'x', pos.get$x(), 'y', pos.get$y(), 'transform', $.S(rotate)]);
  this.r.set$attributes(t1);
  this.svg = this.r;
 }
});

Isolate.$defineClass("VerticeVisual", "AbstractVisual", ["vertice?", "c", "board2d", "svg", "isCanvas", "isSvg", "isHidden", "isSelected"], {
 VerticeVisual$svg$2: function(board2d, vertice) {
  this.c = $.SVGElement$tag('circle');
  this.isSvg = true;
  var xy = board2d.xyVertice$1(this.vertice);
  var t1 = $.makeLiteralMap(['cx', xy.get$x(), 'cy', xy.get$y(), 'r', $.mul(board2d.get$hex2d().get$_sideLength(), 0.2), 'fill', 'orange']);
  this.c.set$attributes(t1);
  this.svg = this.c;
 }
});

Isolate.$defineClass("TileVisual", "AbstractVisual", ["port=", "chit=", "tile", "group?", "p", "board2d", "svg", "isCanvas", "isSvg", "isHidden", "isSelected"], {
 remove$0: function() {
  this.tile.offSetted$2('port', this.get$_portChange());
  this.tile.offSetted$2('chit', this.get$_chitChange());
  if (!$.eqNullB(this.port)) {
    this.port.get$svg().remove$0();
  }
  if (!$.eqNullB(this.chit)) {
    this.chit.get$svg().remove$0();
  }
  this.group.remove$0();
 },
 createTileVisual$0: function() {
  this.p = $.SVGElement$tag('polygon');
  var xy = this.board2d.xyCell$1(this.tile.get$cell());
  var t1 = $.makeLiteralMap(['fill', this.tile.get$color(), 'stroke', 'black', 'stroke-width', '2', 'transform', 'translate(' + $.S(xy.get$x()) + ', ' + $.S(xy.get$y()) + ')', 'points', '         ' + $.S(this.board2d.get$hex2d().get$width()) + ', ' + $.S(this.board2d.get$hex2d().get$bottomHeight()) + '\n         ' + $.S(this.board2d.get$hex2d().get$width()) + ', ' + $.S(this.board2d.get$hex2d().get$partialHeight()) + '\n         ' + $.S(this.board2d.get$hex2d().get$halfWidth()) + ', ' + $.S(this.board2d.get$hex2d().get$height()) + '\n         0, ' + $.S(this.board2d.get$hex2d().get$partialHeight()) + '\n         0, ' + $.S(this.board2d.get$hex2d().get$bottomHeight()) + '\n         ' + $.S(this.board2d.get$hex2d().get$halfWidth()) + ', 0\n       ']);
  this.p.set$attributes(t1);
  $.add$1(this.group.get$elements(), this.p);
 },
 _portChange$2: function(old, newPort) {
  this.port.set$port(newPort);
 },
 get$_portChange: function() { return new $.Closure85(this, '_portChange$2'); },
 _chitChange$2: function(old, newChit) {
  this.chit.setChit$2(this.tile.get$chit(), this.tile.get$cell());
 },
 get$_chitChange: function() { return new $.Closure85(this, '_chitChange$2'); },
 group$1: function(arg0) { return this.group.$call$1(arg0); },
 TileVisual$svg$2: function(board2d, tile) {
  this.group = $.SVGElement$tag('g');
  this.createTileVisual$0();
  if (this.tile.get$canHaveChit() === true) {
    this.chit = $.ChitVisual$svg$1(board2d);
    $.add$1(this.group.get$elements(), this.chit.get$svg());
    this.tile.onSetted$2('chit', this.get$_chitChange());
    if (this.tile.get$hasChit() === true) {
      this._chitChange$2((void 0), this.tile.get$chit());
    }
  }
  if (this.tile.get$canHavePort() === true) {
    this.port = $.PortVisual$svg$1(board2d);
    $.add$1(this.group.get$elements(), this.port.get$svg());
    this.tile.onSetted$2('port', this.get$_portChange());
    if (this.tile.get$hasPort() === true) {
      this._portChange$2((void 0), this.tile.get$port());
    }
  }
  if (this.tile.get$canHaveTerritory() === true) {
  }
  this.svg = this.group;
 },
 is$TileVisual: true
});

Isolate.$defineClass("PortPickerVisual", "AbstractVisual", ["selectedTile", "selectedTriangle!", "group?", "polygons", "board2d", "svg", "isCanvas", "isSvg", "isHidden", "isSelected"], {
 setPosition$1: function(tile) {
  this.selectedTile = tile;
  var point = this.board2d.xyCell$1(tile.get$cell());
  var x = point.get$x();
  var y = point.get$y();
  var c = $.Cell$2(0, 0);
  var c1 = this.board2d.xyCell$1(c);
  x = $.sub(x, c1.get$x());
  y = $.sub(y, c1.get$y());
  $.indexSet(this.group.get$attributes(), 'transform', 'translate(' + $.S(x) + ' ' + $.S(y) + ')');
 },
 group$1: function(arg0) { return this.group.$call$1(arg0); },
 PortPickerVisual$1: function(board2d) {
  this.group = $.SVGElement$tag('g');
  var box_0 = ({});
  for (box_0.i_1 = 0; $.ltB(box_0.i_1, 6); box_00 = ({}), box_00.i_1 = box_0.i_1, box_00.i_1 = $.add(box_00.i_1, 1), box_0 = box_00) {
    var c = $.Cell$2(0, 0);
    var center = board2d.xyCellCenter$1(c);
    if ($.eqB(box_0.i_1, 5)) {
      var j = 0;
    } else {
      j = $.add(box_0.i_1, 1);
    }
    var v1 = board2d.xyVertice$1($.index(c.get$vertices(), box_0.i_1));
    var v2 = board2d.xyVertice$1($.index(c.get$vertices(), j));
    var p = $.SVGElement$tag('polygon');
    p.set$attributes($.makeLiteralMap(['fill', 'purple', 'stroke', 2, 'points', $.S(center.get$x()) + ', ' + $.S(center.get$y()) + ' ' + $.S(v1.get$x()) + ', ' + $.S(v1.get$y()) + ' ' + $.S(v2.get$x()) + ', ' + $.S(v2.get$y()) + ' ' + $.S(center.get$x()) + ', ' + $.S(center.get$y())]));
    $.add$1(p.get$on().get$click(), new $.Closure58(this));
    $.add$1(p.get$on().get$mouseOver(), new $.Closure59(this, box_0));
    $.add$1(p.get$on().get$mouseOut(), new $.Closure60());
    $.add$1(this.group.get$elements(), p);
  }
  this.svg = this.group;
  var box_00;
 },
 is$PortPickerVisual: true
});

Isolate.$defineClass("PortVisual", "AbstractVisual", ["_port", "portElement", "board2d", "svg", "isCanvas", "isSvg", "isHidden", "isSelected"], {
 updatePort$0: function() {
  if ($.eqNullB(this._port)) {
    this.portElement.get$style().setProperty$2('display', 'none');
  } else {
    this.portElement.get$style().setProperty$2('display', 'block');
    $.indexSet(this.portElement.get$attributes(), 'fill', this._port.get$color());
    var center = this.board2d.xyCellCenter$1(this.get$port().get$seaCell());
    var vertices = this.get$port().get$seaCell().fromDirection$1(this.get$port().get$edgeDirection());
    var p1 = this.board2d.xyVertice$1($.index(vertices, 0));
    var p2 = this.board2d.xyVertice$1($.index(vertices, 1));
    var t1 = $.makeLiteralMap(['points', $.S(center.get$x()) + ', ' + $.S(center.get$y()) + ' ' + $.S(p1.get$x()) + ', ' + $.S(p1.get$y()) + ' ' + $.S(p2.get$x()) + ', ' + $.S(p2.get$y()) + ' ' + $.S(center.get$x()) + ', ' + $.S(center.get$y()), 'fill', this._port.get$color()]);
    this.portElement.set$attributes(t1);
  }
 },
 set$port: function(p) {
  this._port = p;
  this.updatePort$0();
 },
 get$port: function() {
  return this._port;
 },
 PortVisual$svg$1: function(board2d) {
  this.portElement = $.SVGElement$tag('polygon');
  this.svg = this.portElement;
 }
});

Isolate.$defineClass("Hexagon2D", "Object", ["_strokeWidth", "_edgeHeightFactor", "_edgeWidthFactor", "_width", "_height", "_halfWidth", "_h", "_sideLength?"], {
 calculateHexSizes$0: function() {
  this._h = $.mul($.sin(this._degreesToRadians$1(30.0)), this._sideLength);
  this._halfWidth = $.mul($.cos(this._degreesToRadians$1(30.0)), this._sideLength);
  this._height = $.add(this._sideLength, $.mul(2, this._h));
  this._width = $.mul(2, this._halfWidth);
 },
 _degreesToRadians$1: function(degrees) {
  return $.div($.mul(degrees, 3.141592653589793), 180);
 },
 get$halfStrokeWidth: function() {
  return $.div(this._strokeWidth, 2);
 },
 get$strokeWidth: function() {
  return this._strokeWidth;
 },
 get$edgeWidthFactor: function() {
  return this._edgeWidthFactor;
 },
 get$sideLength: function() {
  return this._sideLength;
 },
 get$width: function() {
  return this._width;
 },
 get$partialHeight: function() {
  return $.add(this._sideLength, this._h);
 },
 get$height: function() {
  return this._height;
 },
 get$halfWidth: function() {
  return this._halfWidth;
 },
 get$halfHeight: function() {
  return $.div(this._height, 2);
 },
 get$bottomHeight: function() {
  return this._h;
 },
 Hexagon2D$1: function(_sideLength) {
  this.calculateHexSizes$0();
 }
});

Isolate.$defineClass("Board2D", "Object", ["margin", "hex2d?"], {
 xyEdge$3: function(e, rectWidth, rectHeight) {
  var halfRectHeight = $.div(rectHeight, 2);
  var xMargin = $.div($.sub(this.hex2d.get$sideLength(), rectWidth), 2);
  var d = $.sqrt($.add($.mul(xMargin, xMargin), $.mul(halfRectHeight, halfRectHeight)));
  var p = $.mul($.sub(1.0, this.hex2d.get$edgeWidthFactor()) / 2, this.hex2d.get$sideLength());
  var x = this.xyCell$1(e.get$c1()).get$x();
  var y = this.xyCell$1(e.get$c1()).get$y();
  if ($.eqB(e.get$direction(), $.SlopeDown)) {
    x = $.add(x, d);
    y = $.add(y, this.hex2d.get$partialHeight());
  } else {
    if ($.eqB(e.get$direction(), $.SlopeUp)) {
      x = $.add(x, $.add(this.hex2d.get$halfWidth(), d));
      y = $.add(y, $.sub(this.hex2d.get$height(), $.sqrt($.sub($.mul(d, d), p * p))));
    } else {
      if ($.eqB(e.get$direction(), $.Vertical)) {
        x = $.add(x, $.add(this.hex2d.get$width(), halfRectHeight));
        y = $.add(y, $.add(this.hex2d.get$bottomHeight(), xMargin));
      }
    }
  }
  return $.Point2D$2(x, y);
 },
 xyVertice$1: function(v) {
  var point = this.xyCell$1(v.get$c1());
  var x = point.get$x();
  var y = point.get$y();
  $.assert(!$.eqNullB(v));
  if ($.eqB(v.get$type(), $.UpperRow1)) {
    x = $.add(x, this.hex2d.get$halfWidth());
    y = $.add(y, this.hex2d.get$height());
  } else {
    x = $.add(x, this.hex2d.get$width());
    y = $.add(y, this.hex2d.get$partialHeight());
  }
  return $.Point2D$2(x, y);
 },
 xyCellCenter$1: function(cell) {
  var xy = this.xyCell$1(cell);
  var x = xy.get$x();
  var y = xy.get$y();
  return $.Point2D$2($.add(x, $.add(this.hex2d.get$halfStrokeWidth(), this.hex2d.get$halfWidth())), $.add(y, $.add(this.hex2d.get$halfStrokeWidth(), this.hex2d.get$halfHeight())));
 },
 xyCell$1: function(c) {
  var x = $.add($.mul(c.get$column(), $.add(this.hex2d.get$width(), this.hex2d.get$strokeWidth())), this.margin);
  var y = $.add($.mul(c.get$row(), $.add(this.hex2d.get$partialHeight(), this.hex2d.get$halfStrokeWidth())), this.margin);
  if ($.eqB($.mod(c.get$row(), 2), 0)) {
    x = $.add(x, this.hex2d.get$halfWidth());
  } else {
    x = $.sub(x, this.hex2d.get$halfStrokeWidth());
  }
  return $.Point2D$2(x, y);
 }
});

Isolate.$defineClass("AbstractVisual", "Object", ["board2d?", "svg?"], {
 deSelect$0: function() {
  this.isSelected = false;
  if (this.isSvg === true) {
    $.indexSet(this.svg.get$attributes(), 'stroke', 'black');
  }
 },
 select$0: function() {
  this.isSelected = true;
  if (this.isSvg === true) {
    $.indexSet(this.svg.get$attributes(), 'stroke', 'yellow');
  }
 },
 hide$0: function() {
  this.isHidden = true;
  if (this.isSvg === true) {
    this.svg.get$style().setProperty$2('display', 'none');
  }
 },
 show$0: function() {
  this.isHidden = false;
  if (this.isSvg === true) {
    this.svg.get$style().setProperty$2('display', 'block');
  }
 },
 toSvg$0: function() {
  return this.svg;
 },
 AbstractVisual$svg$1: function(board2d) {
  this.isSvg = true;
 }
});

Isolate.$defineClass("Point2D", "Object", ["y?", "x?"], {
});

Isolate.$defineClass("ResourceListImTest", "Object", [], {
 test$0: function() {
  var cost = $.RoadCost$0();
  $.equals($.get$length(cost), 2, 'Two resources (Timber and Clay) expected');
  $.isTrue(cost.hasType$1('Timber'), 'roadcost should have a timber');
  $.isTrue(cost.hasType$1('Clay'), 'roadcost should have a clay');
  $.isFalse(cost.hasType$1('Ore'), 'roadcost should not have ore');
  $.isFalse(cost.hasType$1('Testing123'), 'roadcost should have a timber');
  $.isTrue(cost.hasAtLeast$1($.ResourceListIm$1([$.Timber$1((void 0)), $.Clay$1((void 0))])), 'Road costs timber + brick');
  $.isFalse(cost.hasAtLeast$1($.DevelopmentCardCost$0()), 'should\'nt be able to pay for a devcard with a roadcost');
  $.equals(1, $.get$length(cost.ofType$1('Timber')), 'Road needs at least one timber');
  $.equals(1, $.get$length(cost.ofType$1('Clay')), 'Road needs at least one clay');
  $.equals(2, $.get$length($.CityCost$0().ofType$1('Wheat')), 'Expected a city to need 2 wheat');
  $.equals($.ResourceListIm$1([$.Wheat$1((void 0)), $.Wheat$1((void 0)), $.Wheat$1((void 0)), $.Wheat$1((void 0)), $.Wheat$1((void 0)), $.Wheat$1((void 0)), $.Wheat$1((void 0)), $.Wheat$1((void 0))]).halfCount$0(), 4, 'half of 8 is 4');
  $.equals($.ResourceListIm$1([$.Wheat$1((void 0)), $.Wheat$1((void 0)), $.Wheat$1((void 0)), $.Wheat$1((void 0)), $.Wheat$1((void 0)), $.Wheat$1((void 0)), $.Wheat$1((void 0)), $.Wheat$1((void 0)), $.Wheat$1((void 0))]).halfCount$0(), 5, 'half of 9 rounded up is 5');
  var jsonWheat = $.Jsonable$data($.JsonObject$fromMap$1($.makeLiteralMap(['type', 'Wheat', 'id', 20])));
  var w = $.Wheat$1((void 0));
  w.id = 20;
  $.isTrue(jsonWheat.equals$1(w), 'Expected wheat from Jsonable and new() constructor to be equal');
  var l = $.List((void 0));
  $.setRuntimeTypeInfo(l, ({E: 'String'}));
  l.push((void 0));
  $.equals(1, l.length, 'list length 1');
 }
});

Isolate.$defineClass("ResourceListMuTest", "Object", [], {
 test$0: function() {
  var t1 = ({});
  var hand = $.ResourceListMu$0();
  hand.add$1($.Wheat$1((void 0)));
  hand.add$1($.Ore$1((void 0)));
  hand.add$1($.Sheep$1((void 0)));
  $.isTrue(hand.hasAtLeast$1($.DevelopmentCardCost$0()), (void 0));
  $.isFalse(hand.hasAtLeast$1($.RoadCost$0()), 'Cant pay for road');
  t1.ore_1 = $.Ore$1((void 0));
  t1.firedOnRemove_2 = 0;
  t1.firedOnAdd_3 = 0;
  hand.onRemoved$1(new $.Closure22(t1));
  hand.onAdded$1(new $.Closure23(t1));
  hand.add$1(t1.ore_1);
  hand.remove$1(t1.ore_1);
  $.equals(1, t1.firedOnRemove_2, 'removed event not received');
  $.equals(1, t1.firedOnAdd_3, 'add event not received');
 }
});

Isolate.$defineClass("Test", "View", ["performed", "div"], {
 testAll$0: function() {
  noCheck = '&#10006';
  var groups = $.AllSupportedLists$0();
  failed = 0;
  groupMsg = $.StringBufferImpl$1('');
  var msg = $.StringBufferImpl$1('');
  for (var t1 = groups.iterator$0(), passed = 0, groupsCount = 0; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    $.add$1(groupMsg, '<h3>' + $.S($.supName(t2)) + '</h3><ul class="testResults">');
    ++groupsCount;
    for (t2 = $.iterator(t2); t2.hasNext$0() === true; ) {
      thing = t2.next$0();
      fail = false;
      n = $.name(thing);
      try {
        thing.test$0();
      } catch (exception) {
        var t3 = $.unwrapException(exception);
        if (t3 === (void 0) || typeof t3 === 'object' && !!t3.is$Exception) {
          ex = t3;
          fail = true;
          failed = $.add(failed, 1);
          $.add$1(groupMsg, '<li><span class="failure">' + $.S(noCheck) + ' <strong>Fail: </strong></span><strong>' + $.S(n) + ' </strong><span class="failure">' + $.S($.toString(ex)) + '</span></li>');
        } else {
          throw exception;
        }
      }
      if (fail !== true) {
        ++passed;
        $.add$1(groupMsg, '<li><span class="pass">' + '<span class=checkOk>&#10004</span>' + ' </span>' + $.S($.name(thing)) + '</li>');
      }
    }
    $.add$1(groupMsg, '</ul>');
  }
  var totalClasses = $.add(failed, passed);
  msg.add$1('<p>Performed total of <span class="number">' + $.S(0) + '</span> tests on <span class="number">' + $.S(totalClasses) + '</span> classes grouped by <span class="number">' + $.S(groupsCount) + '</span> interfaces</p>');
  msg.add$1('<ul class="testResults">');
  msg.add$1('<li><span class="failure">' + $.S(noCheck) + ' Failed:</span> ' + $.S(failed) + '</li>');
  msg.add$1('<li><span class="pass">' + '<span class=checkOk>&#10004</span>' + ' Passed:</span> ' + $.S(passed) + '</li>');
  msg.add$1('<li><span class="none"><strong>&#8709;</strong> Empty:</span> ' + $.S(0) + '</p>');
  msg.add$1('</ul>');
  msg.add$1($.toString(groupMsg));
  t1 = msg.toString$0();
  this.div.set$innerHTML(t1);
 },
 show$0: function() {
  if (this.performed !== true) {
    this.testAll$0();
    this.performed = true;
  }
 },
 Test$0: function() {
  this.div = $.document().query$1(this.get$id());
 }
});

Isolate.$defineClass("EdgeTest", "Object", [], {
 test$0: function() {
  var e = $.Edge$2($.Cell$2(0, 0), $.Cell$2(0, 1));
  var copy = $.copyJsonable(e);
  $.isTrue($.eq(copy, e), 'Expected equal instance of edge');
  $.isTrue(copy.equals$1(e), 'Expected equal instance of edge');
 }
});

Isolate.$defineClass("BoardTest", "Object", [], {
 testUpperRow1$0: function() {
  var a = $.Cell$2(0, 0);
  var b = $.Cell$2(1, 0);
  var c = $.Cell$2(1, 1);
  var v1 = $.Vertice$3(a, b, c);
  var v2 = $.Vertice$3(a, c, b);
  var v3 = $.Vertice$3(b, a, c);
  var v4 = $.Vertice$3(b, c, a);
  var v5 = $.Vertice$3(c, b, a);
  var v6 = $.Vertice$3(c, a, b);
  $.isTrue($.eq($.index(v1.get$cells(), 0), a), 'v1[0] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v1.get$cells(), 1), b), 'v1[1] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v1.get$cells(), 2), c), 'v1[2] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v2.get$cells(), 0), a), 'v2[0] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v2.get$cells(), 1), b), 'v2[1] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v2.get$cells(), 2), c), 'v2[2] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v3.get$cells(), 0), a), 'v3[0] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v3.get$cells(), 1), b), 'v3[1] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v3.get$cells(), 2), c), 'v3[2] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v4.get$cells(), 0), a), 'v4[0] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v4.get$cells(), 1), b), 'v4[1] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v4.get$cells(), 2), c), 'v4[2] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v5.get$cells(), 0), a), 'v5[0] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v5.get$cells(), 1), b), 'v5[1] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v5.get$cells(), 2), c), 'v5[2] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v6.get$cells(), 0), a), 'v6[0] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v6.get$cells(), 1), b), 'v6[1] cell should be rearranged (UpperRow1)');
  $.isTrue($.eq($.index(v6.get$cells(), 2), c), 'v6[2] cell should be rearranged (UpperRow1)');
  $.equals(v1.hashCode$0(), v2.hashCode$0(), 'v1, v2 equal vertices');
  $.equals(v1.hashCode$0(), v3.hashCode$0(), 'v1, v3 equal vertices');
  $.equals(v1.hashCode$0(), v4.hashCode$0(), 'v1, v4 equal vertices');
 },
 test$0: function() {
  var a = $.Cell$2(-1, 0);
  var b = $.Cell$2(-1, 1);
  var c = $.Cell$2(0, 0);
  var v1 = $.Vertice$3(a, b, c);
  var v2 = $.Vertice$3(a, c, b);
  var v3 = $.Vertice$3(b, a, c);
  var v4 = $.Vertice$3(b, c, a);
  var v5 = $.Vertice$3(c, b, a);
  var v6 = $.Vertice$3(c, a, b);
  $.isTrue($.eq($.index(v1.get$cells(), 0), a), 'v1[0] cell should be rearranged');
  $.isTrue($.eq($.index(v1.get$cells(), 1), b), 'v1[1] cell should be rearranged');
  $.isTrue($.eq($.index(v1.get$cells(), 2), c), 'v1[2] cell should be rearranged');
  $.isTrue($.eq($.index(v2.get$cells(), 0), a), 'v2[0] cell should be rearranged');
  $.isTrue($.eq($.index(v2.get$cells(), 1), b), 'v2[1] cell should be rearranged');
  $.isTrue($.eq($.index(v2.get$cells(), 2), c), 'v2[2] cell should be rearranged');
  $.isTrue($.eq($.index(v3.get$cells(), 0), a), 'v3[0] cell should be rearranged');
  $.isTrue($.eq($.index(v3.get$cells(), 1), b), 'v3[1] cell should be rearranged');
  $.isTrue($.eq($.index(v3.get$cells(), 2), c), 'v3[2] cell should be rearranged');
  $.isTrue($.eq($.index(v4.get$cells(), 0), a), 'v4[0] cell should be rearranged');
  $.isTrue($.eq($.index(v4.get$cells(), 1), b), 'v4[1] cell should be rearranged');
  $.isTrue($.eq($.index(v4.get$cells(), 2), c), 'v4[2] cell should be rearranged');
  $.isTrue($.eq($.index(v5.get$cells(), 0), a), 'v5[0] cell should be rearranged');
  $.isTrue($.eq($.index(v5.get$cells(), 1), b), 'v5[1] cell should be rearranged');
  $.isTrue($.eq($.index(v5.get$cells(), 2), c), 'v5[2] cell should be rearranged');
  $.isTrue($.eq($.index(v6.get$cells(), 0), a), 'v6[0] cell should be rearranged');
  $.isTrue($.eq($.index(v6.get$cells(), 1), b), 'v6[1] cell should be rearranged');
  $.isTrue($.eq($.index(v6.get$cells(), 2), c), 'v6[2] cell should be rearranged');
  this.testUpperRow1$0();
  $.equals(v1.hashCode$0(), v2.hashCode$0(), 'v1, v2 equal vertices');
  $.equals(v1.hashCode$0(), v3.hashCode$0(), 'v1, v3 equal vertices');
  $.equals(v1.hashCode$0(), v4.hashCode$0(), 'v1, v4 equal vertices');
  var b1 = $.Board$2(1, 2);
  $.equals(2, $.get$length(b1.get$tiles()), '1x2 board should have 1x2=2 tiles');
  $.equals(11, $.get$length(b1.get$edges()), '1x2 board should have 11 edges');
  $.print(b1.get$vertices());
  $.equals(10, $.get$length(b1.get$vertices()), '1x2 board should have 10 vertices');
  var b2 = $.Board$2(2, 2);
  $.equals(4, $.get$length(b2.get$tiles()), '2x2 board should have 2x2=4 tiles');
  $.equals(19, $.get$length(b2.get$edges()), '2x2 board should have 19 edges');
  $.equals(16, $.get$length(b2.get$vertices()), '2x2 board should have 16 vertices');
 }
});

Isolate.$defineClass("ListenableListTest", "Object", [], {
 testAddList$0: function() {
  var t1 = ({});
  t1.list_1 = $.ListenableList$from$1(['yo']);
  t1.listAddedEventFired_2 = false;
  t1.list_1.onListAdded$1(new $.Closure9(t1));
  $.addAll(t1.list_1, ['yey', 'lol']);
  $.isTrue(t1.listAddedEventFired_2, 'Expected listAdded event to be fired');
 },
 testOnRemoved$0: function() {
  var t1 = ({});
  var list = $.ListenableList$from$1(['yo']);
  t1.removedEventFired_1 = false;
  list.onRemoved$1(new $.Closure10(t1));
  list.remove$1('yo');
  $.isTrue(t1.removedEventFired_1, 'expected remove event to be fired');
  $.equals(0, $.get$length(list), 'Expected 0 items in the list');
  var list2 = $.ListenableList$from$1(['yo', 'yo', 'yo']);
  t1.removedEventsFired_2 = 0;
  list2.onRemoved$1(new $.Closure11(t1));
  list2.onRemoved$1(new $.Closure12(t1));
  list2.remove$1('yo');
  $.equals(2, t1.removedEventsFired_2, '2 events caught');
  list2.remove$1('yo');
  $.equals(4, t1.removedEventsFired_2, '4 events caught');
  $.equals(1, $.get$length(list2), 'Expected 1 item in the list');
  var l = new $.Closure13();
  list2.onRemoved$1(l);
  list2.offRemoved$1(l);
  list2.remove$1('yo');
 },
 testOnAdded$0: function() {
  var t1 = ({});
  t1.list_12 = $.ListenableList$from$1(['yo']);
  t1.addedEventFired_2 = false;
  t1.changedEventFired_3 = false;
  t1.list_12.onAdded$1(new $.Closure14(t1));
  t1.list_12.onChanged$1(new $.Closure15(t1));
  $.add$1(t1.list_12, 'woei');
  $.isTrue(t1.addedEventFired_2, 'Expected added event to be fired');
  $.isTrue(t1.changedEventFired_3, 'Expected changed event to be fired');
  $.equals(2, $.get$length(t1.list_12), 'Expected 2 items in the list');
 },
 testOffAdd$0: function() {
  var list = $.ListenableList$from$1(['yo']);
  var fail = new $.Closure8();
  list.onAdded$1(fail);
  list.offAdded$1(fail);
  list.add$1('wassup');
 },
 test$0: function() {
  this.testOnAdded$0();
  this.testOnRemoved$0();
  this.testAddList$0();
  this.testOffAdd$0();
 }
});

Isolate.$defineClass("RandomTest", "Object", [], {
 test$0: function() {
  var cr = $.ClientRandom$0();
  for (var r = (void 0), minHit = (void 0), maxHit = (void 0), i = 0; i < 1000; ++i) {
    r = cr.intFromZero$1(10);
    $.isFalse($.gt(r, 9), 'random number should be below 9');
    $.isFalse($.lt(r, 0), 'random number should not be negative');
    if ($.eqB(r, 0)) {
      minHit = true;
    }
    if ($.eqB(r, 9)) {
      maxHit = true;
    }
  }
  $.isTrue(minHit, 'Expected 0 to be hit');
  $.isTrue(maxHit, 'Expected 9 to be hit');
  for (minHit = false, r2 = (void 0), maxHit = false, i = 0; i < 1000; ++i) {
    r2 = cr.intFromOne$1(10);
    $.isFalse($.gt(r2, 10), 'random number should be below 9');
    $.isFalse($.lt(r2, 1), 'random number should not be negative');
    if ($.eqB(r2, 1)) {
      minHit = true;
    }
    if ($.eqB(r2, 10)) {
      maxHit = true;
    }
  }
  $.isTrue(minHit, 'Expected 1 to be hit');
  $.isTrue(maxHit, 'Expected 10 to be hit');
  var r2;
 }
});

Isolate.$defineClass("GameTester", "Object", ["timeHandle", "_sgt", "tested", "acts?", "it", "optimistic", "delayInMilliseconds", "automated"], {
 executeNext$0: function() {
  if (this.it.hasNext$0() === true) {
    f = this.it.next$0();
    try {
      f.$call$0();
      $.print('OK: Performed act #' + $.S($.toString(this.tested)) + '.');
      this.timeHandle = $.window().setTimeout$2(this.get$executeNext(), this.delayInMilliseconds);
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      if (t1 === (void 0) || typeof t1 === 'object' && !!t1.is$Exception) {
        ex = t1;
        if (this.optimistic !== true) {
          $.window().clearTimeout$1(this.timeHandle);
        }
        $.print('Fail: test #' + $.S($.toString(this.tested)) + ': ' + $.S($.toString(ex)));
      } else {
        throw exception;
      }
    }
    this.tested = $.add(this.tested, 1);
  } else {
    $.window().clearTimeout$1(this.timeHandle);
    $.print('That went better then expected: all ' + $.S(this.tested) + ' passed');
  }
 },
 get$executeNext: function() { return new $.Closure82(this, 'executeNext$0'); },
 GameTester$manual$1: function(sgt) {
  this.automated = false;
  this._sgt = sgt;
  this.it = $.iterator(this._sgt.get$acts());
  this.timeHandle = $.window().setTimeout$2(this.get$executeNext(), this.delayInMilliseconds);
 },
 GameTester$auto$1: function(sgt) {
  this.automated = true;
  this._sgt = sgt;
  this.it = $.iterator(this._sgt.get$acts());
  this.delayInMilliseconds = 0;
  this.executeNext$0();
 }
});

Isolate.$defineClass("GameTest", "Object", ["expectServerLobby?", "expectClientLobby?", "expectServerGame=", "expectClientGame=", "expectServer?", "currentActionId?", "leaver?", "player3?", "player2?", "player1?", "leaverUser?", "spectator?", "user3", "user2", "user1", "server=", "gameClient=", "clientLobby", "game=", "dice?", "mainIsland", "acts?"], {
 createTestBoard$0: function() {
  var board = $.Board$2((void 0), (void 0));
  board.addTile$1($.Sea$1($.Cell$2(0, 1)));
  board.addTile$1($.Sea$1($.Cell$2(0, 2)));
  board.addTile$1($.Sea$1($.Cell$2(0, 3)));
  board.addTile$1($.Sea$1($.Cell$2(0, 4)));
  board.addTile$1($.Sea$1($.Cell$2(1, 1)));
  board.addTile$1($.Sea$1($.Cell$2(1, 5)));
  board.addTile$1($.Sea$1($.Cell$2(2, 0)));
  board.addTile$1($.Sea$1($.Cell$2(2, 5)));
  board.addTile$1($.Sea$1($.Cell$2(3, 0)));
  board.addTile$1($.Sea$1($.Cell$2(3, 6)));
  board.addTile$1($.Sea$1($.Cell$2(4, 0)));
  board.addTile$1($.Sea$1($.Cell$2(4, 5)));
  board.addTile$1($.Sea$1($.Cell$2(5, 1)));
  board.addTile$1($.Sea$1($.Cell$2(5, 5)));
  board.addTile$1($.Sea$1($.Cell$2(6, 1)));
  board.addTile$1($.Sea$1($.Cell$2(6, 2)));
  board.addTile$1($.Sea$1($.Cell$2(6, 3)));
  board.addTile$1($.Sea$1($.Cell$2(6, 4)));
  this.mainIsland = $.MainIsland$1((void 0));
  $.add$1(board.territories, this.mainIsland);
  for (var col = 2; col < 5; ++col) {
    var chit = $.Chit6$0();
    var field = $.Field$1($.Cell$2(1, col));
    field.set$chit(chit);
    field.set$territory(this.mainIsland);
  }
  for (col = 1; col < 5; ++col) {
    chit = $.Chit5$0();
    var tile = $.Mountain$1($.Cell$2(2, col));
    tile.set$chit(chit);
    tile.set$territory(this.mainIsland);
  }
  for (col = 1; col < 6; ++col) {
    chit = $.Chit4$0();
    tile = $.Hill$1($.Cell$2(3, col));
    tile.set$chit(chit);
    tile.set$territory(this.mainIsland);
  }
  for (col = 1; col < 5; ++col) {
    chit = $.Chit3$0();
    tile = $.Forest$1($.Cell$2(4, col));
    tile.set$chit(chit);
    tile.set$territory(this.mainIsland);
  }
  for (col = 2; col < 5; ++col) {
    chit = $.Chit2$0();
    tile = $.Pasture$1($.Cell$2(5, col));
    tile.set$chit(chit);
    tile.set$territory(this.mainIsland);
  }
  return board;
 },
 test$0: function() {
  $.GameTester$auto$1(this);
 },
 nextId$0: function() {
  var t1 = this.currentActionId;
  this.currentActionId = $.add(t1, 1);
  return t1;
 },
 joinNewGame$0: function() {
  $.add$1(this.acts, new $.Closure41(this));
 },
 openNewGame$0: function() {
  $.add$1(this.acts, new $.Closure46(this));
 },
 chatABitMore$0: function() {
  $.add$1(this.acts, new $.Closure47(this));
 },
 chatSomething$0: function() {
  $.add$1(this.acts, new $.Closure48(this));
 },
 joinPlayer3InLobby$0: function() {
  $.add$1(this.acts, new $.Closure49(this));
 },
 joinAndLeavePlayerInLobby$0: function() {
  $.add$1(this.acts, new $.Closure50(this));
 },
 joinPlayer12InLobby$0: function() {
  $.add$1(this.acts, new $.Closure51(this));
 },
 joinSpectatorInLobby$0: function() {
  $.add$1(this.acts, new $.Closure52(this));
 },
 GameTest$0: function() {
  this.game = $.Game$0();
  this.dice = $.PredictableDice$1((void 0));
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'Function'}));
  this.acts = t1;
  t1 = this.createTestBoard$0();
  this.game.set$board(t1);
  this.server = $.LocalServer$1(this.game);
  this.gameClient = $.GameClient$0();
  this.spectator = $.User$3(0, 'Whooptidoo', 'whoop@tidoo.com');
  this.user1 = $.User$3(1, 'Piet', 'piet@example.com');
  this.user2 = $.User$3(2, 'Henk', 'henk@example.com');
  this.user3 = $.User$3(3, 'Truus', 'truus@example.com');
  this.leaverUser = $.User$3(4, 'SomeLeaver', 'leaver@example.com');
  this.player1 = $.Player$1(this.user1);
  this.player2 = $.Player$1(this.user2);
  this.player3 = $.Player$1(this.user3);
  this.leaver = $.Player$1(this.leaverUser);
  t1 = this.spectator;
  this.server.set$user(t1);
  t1 = this.server;
  this.gameClient.set$server(t1);
  t1 = this.spectator;
  this.gameClient.set$user(t1);
  t1 = this.gameClient;
  this.server.set$gameClient(t1);
  this.clientLobby = this.server.get$lobby();
  this.expectServer = $.ExpectServer$1(this.server);
  this.expectClientLobby = $.ExpectLobby$1(this.gameClient.get$lobby());
  this.expectServerLobby = $.ExpectLobby$1(this.server.get$lobby());
  this.joinSpectatorInLobby$0();
  this.joinPlayer12InLobby$0();
  this.joinAndLeavePlayerInLobby$0();
  this.joinPlayer3InLobby$0();
  this.chatSomething$0();
  this.chatABitMore$0();
  this.openNewGame$0();
  this.joinNewGame$0();
 }
});

Isolate.$defineClass("ExpectGame", "Object", ["game="], {
 hasUserAmount$1: function(amount) {
  var actualAmount = $.get$length(this.game.get$users());
  $.isTrue($.eq(actualAmount, amount), 'Expected game to have ' + $.S(amount) + ' users, but instead got ' + $.S(actualAmount));
 },
 hasUser$1: function(user) {
  $.isNotNull($.byId(user.get$id(), this.game.get$users()), 'Expected ' + $.S(user.get$name()) + ' in the game');
 }
});

Isolate.$defineClass("ExpectLobby", "Object", ["lobby?"], {
 hasAction$1: function(action) {
  $.isNotNull($.byId(action.get$id(), this.lobby.get$actions()), 'Expected ' + $.S($.toString(action)) + ' to be in the log of actions for the lobby');
 },
 hasActionAmount$1: function(amount) {
  var actualAmount = $.get$length(this.lobby.get$actions());
  $.isTrue($.eq(actualAmount, amount), 'Expected ' + $.S(amount) + ' #actions, ' + $.S(actualAmount) + ' present');
 },
 hasActions$1: function(actions) {
  for (var t1 = $.iterator(actions); t1.hasNext$0() === true; ) {
    this.hasAction$1(t1.next$0());
  }
 },
 hasUserAmount$1: function(amount) {
  var actualAmount = $.get$length(this.lobby.get$users());
  $.isTrue($.eq(actualAmount, amount), 'Expected ' + $.S(amount) + ' #users, got ' + $.S(actualAmount));
 },
 hasNotUser$1: function(user) {
  $.isNull($.byId(user.get$id(), this.lobby.get$users()), 'Not expected ' + $.S(user.get$name()) + ' in the lobby');
 },
 hasUser$1: function(user) {
  $.isNotNull($.byId(user.get$id(), this.lobby.get$users()), 'Expected ' + $.S(user.get$name()) + ' in the lobby');
 }
});

Isolate.$defineClass("ExpectServer", "Object", ["server="], {
 hasActionAmount$1: function(amount) {
  var actualAmount = $.get$length(this.server.get$lobby().get$actions());
  $.isTrue($.eq(actualAmount, amount), 'Expected ' + $.S(amount) + ' #actions, ' + $.S(actualAmount) + ' present');
 },
 hasAction$1: function(action) {
  $.isNotNull($.byId(action.get$id(), this.server.get$lobby().get$actions()), 'Expected ' + $.S($.toString(action)) + ' to be in the log of actions');
 },
 hasActions$1: function(actions) {
  for (var t1 = $.iterator(actions); t1.hasNext$0() === true; ) {
    this.hasAction$1(t1.next$0());
  }
 },
 hasUserAmount$1: function(amount) {
  var actualAmount = $.get$length(this.server.get$lobby().get$users());
  $.isTrue($.eq(actualAmount, amount), 'Expected ' + $.S(amount) + ' #users, got ' + $.S(actualAmount));
 },
 hasNotUser$1: function(user) {
  $.isNull($.byId(user.get$id(), this.server.get$lobby().get$users()), 'Not expected ' + $.S(user.get$name()) + ' in the lobby');
 },
 hasUser$1: function(user) {
  $.isNotNull($.byId(user.get$id(), this.server.get$lobby().get$users()), 'Expected ' + $.S(user.get$name()) + ' in the lobby');
 }
});

Isolate.$defineClass("TownTest", "Object", [], {
 test$0: function() {
  var testPlayer = $.Player$1($.ServerUser$0());
  var town = $.Town$0();
  $.add$1(testPlayer.stock.get$towns(), town);
  $.isTrue($.eq(testPlayer.totalPoints$0(), 0), 'Player shouldn\'t have any points');
  $.isTrue($.eq($.get$length(testPlayer.stock.get$towns()), 1), 'Player should have one stock town');
  town.addToPlayer$1(testPlayer);
  $.isTrue($.eq(testPlayer.totalPoints$0(), 1), 'Player got a town, should have 1 point');
  $.isTrue($.eq($.get$length(testPlayer.towns), 1), 'Player got a town, should have 1 town');
  $.isTrue($.eq($.get$length(testPlayer.victoryPoints), 1), 'Player should have 1 victoryPointItem');
  $.isTrue($.eq($.get$length(testPlayer.stock.get$towns()), 0), 'Player shouldn\'t have any stock towns');
  $.isTrue($.eq($.get$length(testPlayer.verticePieces), 1), 'Player should have one verticePiece in his verticePiece collection');
 }
});

Isolate.$defineClass("CityTest", "Object", [], {
 test$0: function() {
  var testPlayer = $.Player$1($.ServerUser$0());
  var city = $.City$0();
  $.add$1(testPlayer.stock.get$cities(), city);
  $.isTrue($.eq(testPlayer.totalPoints$0(), 0), 'Player shouldn\'t have any points');
  $.isTrue($.eq($.get$length(testPlayer.stock.get$cities()), 1), 'Player should have one stock city');
  city.addToPlayer$1(testPlayer);
  $.isTrue($.eq(testPlayer.totalPoints$0(), 2), 'Player got a city, should have 2 points');
  $.isTrue($.eq($.get$length(testPlayer.cities), 1), 'Player got a city, should have 1 city');
  $.isTrue($.eq($.get$length(testPlayer.victoryPoints), 1), 'Player should have 1 victoryPointItem');
  $.isTrue($.eq($.get$length(testPlayer.stock.get$cities()), 0), 'Player shouldn\'t have any stock cities');
  $.isTrue($.eq($.get$length(testPlayer.verticePieces), 1), 'Player should have one verticePiece in his verticePiece collection');
  var toCopy = $.City$0();
  toCopy.id = 1;
  toCopy.playerId = 1;
  toCopy.vertice = $.Vertice$3($.Cell$2(0, 0), $.Cell$2(1, 0), $.Cell$2(1, 1));
  $.isTrue($.copyJsonable(toCopy).equals$1(toCopy), 'Expected equal instance of city');
  $.expectEqualCopy(toCopy);
 }
});

Isolate.$defineClass("RoadTest", "Object", [], {
 test$0: function() {
  var testPlayer = $.Player$1($.ServerUser$0());
  var road = $.Road$0();
  $.add$1(testPlayer.stock.get$roads(), road);
  $.isTrue($.eq($.get$length(testPlayer.roads), 0), 'Player should have no roads');
  $.isTrue($.eq($.get$length(testPlayer.stock.get$roads()), 1), 'Player should have one road in stock');
  $.isTrue($.eq(testPlayer.totalPoints$0(), 0), 'Player should have 0 points');
  road.addToPlayer$1(testPlayer);
  $.isTrue($.eq($.get$length(testPlayer.roads), 1), 'Player should have 1 road');
  $.isTrue($.eq($.get$length(testPlayer.stock.get$roads()), 0), 'Player should have no roads in stock');
  $.isTrue($.eq($.get$length(testPlayer.edgePieces), 1), 'Player should have one edgePiece');
  var r = $.Road$0();
  r.id = 1;
  r.playerId = 1;
  r.edge = $.Edge$2($.Cell$2(0, 0), $.Cell$2(0, 1));
  $.expectEqualCopy(r);
 }
});

Isolate.$defineClass("JsonableTest", "Object", [], {
 test$0: function() {
  $.print('******* TESTING ALL IMPORTANT OBJECTS ********');
  for (var t1 = $.AllSupportedLists$0().iterator$0(); t1.hasNext$0() === true; ) {
    for (var t2 = $.iterator(t1.next$0()); t2.hasNext$0() === true; ) {
      var j = t2.next$0();
      concreteName = $.name(j);
      $.print('testing ' + $.S(concreteName));
      if (!((typeof j === 'object') && (((j.constructor === Array) || j.is$Collection())))) {
        if (!((typeof j === 'string') || ((typeof j === 'object') && !!j.is$Hashable))) {
          $.print('**** ' + $.S(concreteName) + ' is not Hashable');
        }
        if (!((typeof j === 'object') && !!j.is$Copyable)) {
          $.print('**** ' + $.S(concreteName) + ' is not Copyable');
        }
        if (!((typeof j === 'object') && !!j.is$Identifyable)) {
          $.print('**** ' + $.S(concreteName) + ' is not Identifyable');
        }
        if (!((typeof j === 'object') && !!j.is$Jsonable)) {
          $.print('**** ' + $.S(concreteName) + ' is not Jsonable');
        } else {
          try {
          } catch (exception) {
            var t3 = $.unwrapException(exception);
            if (t3 === (void 0) || typeof t3 === 'object' && !!t3.is$Exception) {
              ex = t3;
              nsmex = ex;
              $.print(nsmex.get$_lib3_functionName());
              t3 = ex;
              if (typeof t3 === 'object' && !!t3.is$NoSuchMethodException && $.eqB(nsmex.get$_lib3_functionName(), 'equals')) {
                $.fail($.S(concreteName) + ' does not have an equals() method');
              }
            } else {
              throw exception;
            }
          }
          $.expectEqualCopy(j);
        }
      }
    }
  }
  $.print('******* END TEST ********');
 }
});

Isolate.$defineClass("VerticeTest", "Object", [], {
 test$0: function() {
  var v1 = $.Vertice$3($.Cell$2(0, 0), $.Cell$2(1, 0), $.Cell$2(1, 1));
  var copy = $.copyJsonable(v1);
  $.isTrue($.eq(copy, v1), 'Expected equal instance of vertice');
  $.isTrue(copy.equals$1(v1), 'Expected equal instance of vertice');
 }
});

Isolate.$defineClass("_AbstractWorkerEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_AudioContextEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_BatteryManagerEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_BodyElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_DOMApplicationCacheEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_DedicatedWorkerContextEventsImpl", "_WorkerContextEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_DeprecatedPeerConnectionEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_DocumentEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$select: function() {
  return this._get$1('select');
 },
 select$0: function() { return this.get$select().$call$0(); },
 get$mouseOver: function() {
  return this._get$1('mouseover');
 },
 mouseOver$1: function(arg0) { return this.get$mouseOver().$call$1(arg0); },
 get$mouseOut: function() {
  return this._get$1('mouseout');
 },
 mouseOut$1: function(arg0) { return this.get$mouseOut().$call$1(arg0); },
 get$copy: function() {
  return this._get$1('copy');
 },
 copy$0: function() { return this.get$copy().$call$0(); },
 copy$1: function(arg0) { return this.get$copy().$call$1(arg0); },
 get$click: function() {
  return this._get$1('click');
 },
 click$0: function() { return this.get$click().$call$0(); },
 click$1: function(arg0) { return this.get$click().$call$1(arg0); }
});

Isolate.$defineClass("FilteredElementList", "Object", ["_childNodes", "_node"], {
 last$0: function() {
  return $.last(this.get$_filtered());
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this.get$_filtered(), element, start);
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this.get$_filtered(), start, rangeLength);
 },
 iterator$0: function() {
  return $.iterator(this.get$_filtered());
 },
 operator$index$1: function(index) {
  return $.index(this.get$_filtered(), index);
 },
 get$length: function() {
  return $.get$length(this.get$_filtered());
 },
 isEmpty$0: function() {
  return $.isEmpty(this.get$_filtered());
 },
 filter$1: function(f) {
  return $.filter(this.get$_filtered(), f);
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    result.remove$0();
  }
  return result;
 },
 clear$0: function() {
  $.clear(this._childNodes);
 },
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.Closure7());
 },
 addLast$1: function(value) {
  this.add$1(value);
 },
 addAll$1: function(collection) {
  $.forEach(collection, this.get$add());
 },
 add$1: function(value) {
  $.add$1(this._childNodes, value);
 },
 get$add: function() { return new $.Closure84(this, 'add$1'); },
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len)) {
    return;
  } else {
    if ($.ltB(newLength, 0)) {
      throw $.captureStackTrace($.CTC5);
    }
  }
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
 },
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
 },
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
 },
 get$first: function() {
  for (var t1 = $.iterator(this._childNodes); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (typeof t2 === 'object' && t2.is$Element()) {
      return t2;
    }
  }
  return;
 },
 first$0: function() { return this.get$first().$call$0(); },
 get$_filtered: function() {
  return $.List$from($.filter(this._childNodes, new $.Closure5()));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ChildrenElementList", "Object", ["_childElements", "_element?"], {
 last$0: function() {
  return this._element.get$$$dom_lastElementChild();
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._element.$dom_removeChild$1(result);
  }
  return result;
 },
 clear$0: function() {
  this._element.set$text('');
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap$1($.getRange2(this, start, rangeLength, []));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC6);
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._element; t1.hasNext$0() === true; ) {
    t2.$dom_appendChild$1(t1.next$0());
  }
 },
 iterator$0: function() {
  return $.iterator(this._toList$0());
 },
 addLast$1: function(value) {
  return this.add$1(value);
 },
 add$1: function(value) {
  this._element.$dom_appendChild$1(value);
  return value;
 },
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC4);
 },
 operator$indexSet$2: function(index, value) {
  this._element.$dom_replaceChild$2(value, $.index(this._childElements, index));
 },
 operator$index$1: function(index) {
  return $.index(this._childElements, index);
 },
 get$length: function() {
  return $.get$length(this._childElements);
 },
 isEmpty$0: function() {
  return $.eqNull(this._element.get$$$dom_firstElementChild());
 },
 filter$1: function(f) {
  var t1 = ({});
  t1.f_1 = f;
  var output = [];
  this.forEach$1(new $.Closure6(t1, output));
  return $._FrozenElementList$_wrap$1(output);
 },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this._childElements); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
 },
 get$first: function() {
  return this._element.get$$$dom_firstElementChild();
 },
 first$0: function() { return this.get$first().$call$0(); },
 _toList$0: function() {
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object'||t1.constructor !== Array)) return this._toList$0$bailout(1, t1);
  var output = $.List(t1.length);
  for (var len = t1.length, i = 0; i < len; ++i) {
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var t3 = t1[i];
    var t4 = output.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    output[i] = t3;
  }
  return output;
 },
 _toList$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._childElements;
    case 1:
      state = 0;
      var output = $.List($.get$length(t1));
      var len = $.get$length(t1);
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var t2 = $.index(t1, i);
        var t3 = output.length;
        if (i < 0 || i >= t3) throw $.ioore(i);
        output[i] = t2;
        ++i;
      }
      return output;
  }
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_FrozenElementList", "Object", ["_nodeList"], {
 last$0: function() {
  return $.last(this._nodeList);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC4);
 },
 clear$0: function() {
  throw $.captureStackTrace($.CTC4);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap$1($.getRange(this._nodeList, start, rangeLength));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC4);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC4);
 },
 iterator$0: function() {
  return $._FrozenElementListIterator$1(this);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC4);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.CTC4);
 },
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC4);
 },
 operator$index$1: function(index) {
  return $.index(this._nodeList, index);
 },
 get$length: function() {
  return $.get$length(this._nodeList);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
 },
 filter$1: function(f) {
  var out = $._ElementList$1([]);
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (f.$call$1(t2) === true) {
      out.add$1(t2);
    }
  }
  return out;
 },
 forEach$1: function(f) {
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
 },
 get$first: function() {
  return $.index(this._nodeList, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_FrozenElementListIterator", "Object", ["_lib_index", "_list"], {
 hasNext$0: function() {
  return $.lt(this._lib_index, $.get$length(this._list));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC3);
  }
  var t1 = this._list;
  var t2 = this._lib_index;
  this._lib_index = $.add(t2, 1);
  return $.index(t1, t2);
 }
});

Isolate.$defineClass("_ElementList", "_ListWrapper", ["_list"], {
 getRange$2: function(start, rangeLength) {
  return $._ElementList$1($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
 },
 filter$1: function(f) {
  return $._ElementList$1($._ListWrapper.prototype.filter$1.call(this, f));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ElementAttributeMap", "Object", ["_element?"], {
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._element.get$$$dom_attributes());
 },
 getValues$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object'||attributes.constructor !== Array)) return this.getValues$0$bailout(1, attributes);
  var values = $.List(attributes.length);
  $.setRuntimeTypeInfo(values, ({E: 'String'}));
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = attributes[i].get$value();
    var t3 = values.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    values[i] = t2;
  }
  return values;
 },
 getValues$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      attributes = env0;
      break;
  }
  switch (state) {
    case 0:
      var attributes = this._element.get$$$dom_attributes();
    case 1:
      state = 0;
      var values = $.List($.get$length(attributes));
      $.setRuntimeTypeInfo(values, ({E: 'String'}));
      var len = $.get$length(attributes);
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var t1 = $.index(attributes, i).get$value();
        var t2 = values.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        values[i] = t1;
        ++i;
      }
      return values;
  }
 },
 getKeys$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object'||attributes.constructor !== Array)) return this.getKeys$0$bailout(1, attributes);
  var keys = $.List(attributes.length);
  $.setRuntimeTypeInfo(keys, ({E: 'String'}));
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = attributes[i].get$name();
    var t3 = keys.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    keys[i] = t2;
  }
  return keys;
 },
 getKeys$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      attributes = env0;
      break;
  }
  switch (state) {
    case 0:
      var attributes = this._element.get$$$dom_attributes();
    case 1:
      state = 0;
      var keys = $.List($.get$length(attributes));
      $.setRuntimeTypeInfo(keys, ({E: 'String'}));
      var len = $.get$length(attributes);
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var t1 = $.index(attributes, i).get$name();
        var t2 = keys.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        keys[i] = t1;
        ++i;
      }
      return keys;
  }
 },
 forEach$1: function(f) {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object'||attributes.constructor !== Array)) return this.forEach$1$bailout(f, 1, attributes);
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = attributes[i];
    f.$call$2(t2.get$name(), t2.get$value());
  }
 },
 forEach$1$bailout: function(f, state, env0) {
  switch (state) {
    case 1:
      attributes = env0;
      break;
  }
  switch (state) {
    case 0:
      var attributes = this._element.get$$$dom_attributes();
    case 1:
      state = 0;
      var len = $.get$length(attributes);
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var item = $.index(attributes, i);
        f.$call$2(item.get$name(), item.get$value());
        ++i;
      }
  }
 },
 clear$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object'||attributes.constructor !== Array)) return this.clear$0$bailout(1, attributes);
  for (var i = attributes.length - 1; i >= 0; --i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    this.remove$1(attributes[i].get$name());
  }
 },
 clear$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      attributes = env0;
      break;
  }
  switch (state) {
    case 0:
      var attributes = this._element.get$$$dom_attributes();
    case 1:
      state = 0;
      var i = $.sub($.get$length(attributes), 1);
      L0: while (true) {
        if (!$.geB(i, 0)) break L0;
        this.remove$1($.index(attributes, i).get$name());
        i = $.sub(i, 1);
      }
  }
 },
 remove$1: function(key) {
  var t1 = this._element;
  var value = t1.$dom_getAttribute$1(key);
  t1.$dom_removeAttribute$1(key);
  return value;
 },
 operator$indexSet$2: function(key, value) {
  this._element.$dom_setAttribute$2(key, $.S(value));
 },
 operator$index$1: function(key) {
  return this._element.$dom_getAttribute$1(key);
 },
 containsKey$1: function(key) {
  return this._element.$dom_hasAttribute$1(key);
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("_CssClassSet", "Object", ["_element?"], {
 _formatSet$1: function(s) {
  return $.join($.List$from(s), ' ');
 },
 _write$1: function(s) {
  var t1 = this._formatSet$1(s);
  this._element.set$$$dom_className(t1);
 },
 _classname$0: function() {
  return this._element.get$$$dom_className();
 },
 _read$0: function() {
  var s = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(s, ({E: 'String'}));
  for (var t1 = $.iterator($.split(this._classname$0(), ' ')); t1.hasNext$0() === true; ) {
    var trimmed = $.trim(t1.next$0());
    if ($.isEmpty(trimmed) !== true) {
      s.add$1(trimmed);
    }
  }
  return s;
 },
 _modify$1: function(f) {
  var s = this._read$0();
  f.$call$1(s);
  this._write$1(s);
 },
 clear$0: function() {
  this._modify$1(new $.Closure80());
 },
 addAll$1: function(collection) {
  var t1 = ({});
  t1.collection_1 = collection;
  this._modify$1(new $.Closure79(t1));
 },
 remove$1: function(value) {
  var s = this._read$0();
  var result = s.remove$1(value);
  this._write$1(s);
  return result;
 },
 add$1: function(value) {
  var t1 = ({});
  t1.value_1 = value;
  this._modify$1(new $.Closure78(t1));
 },
 contains$1: function(value) {
  return $.contains$1(this._read$0(), value);
 },
 get$length: function() {
  return $.get$length(this._read$0());
 },
 isEmpty$0: function() {
  return $.isEmpty(this._read$0());
 },
 filter$1: function(f) {
  return $.filter(this._read$0(), f);
 },
 forEach$1: function(f) {
  $.forEach(this._read$0(), f);
 },
 iterator$0: function() {
  return $.iterator(this._read$0());
 },
 toString$0: function() {
  return this._formatSet$1(this._read$0());
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ElementEventsImpl", "_EventsImpl", ["_ptr"], {
 get$select: function() {
  return this._get$1('select');
 },
 select$0: function() { return this.get$select().$call$0(); },
 get$mouseOver: function() {
  return this._get$1('mouseover');
 },
 mouseOver$1: function(arg0) { return this.get$mouseOver().$call$1(arg0); },
 get$mouseOut: function() {
  return this._get$1('mouseout');
 },
 mouseOut$1: function(arg0) { return this.get$mouseOut().$call$1(arg0); },
 get$copy: function() {
  return this._get$1('copy');
 },
 copy$0: function() { return this.get$copy().$call$0(); },
 copy$1: function(arg0) { return this.get$copy().$call$1(arg0); },
 get$click: function() {
  return this._get$1('click');
 },
 click$0: function() { return this.get$click().$call$0(); },
 click$1: function(arg0) { return this.get$click().$call$1(arg0); }
});

Isolate.$defineClass("_EventSourceEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_EventsImpl", "Object", ["_ptr"], {
 _get$1: function(type) {
  return $._EventListenerListImpl$2(this._ptr, type);
 },
 operator$index$1: function(type) {
  return this._get$1($.toLowerCase(type));
 }
});

Isolate.$defineClass("_EventListenerListImpl", "Object", ["_lib_type", "_ptr"], {
 _lib_remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._lib_type, listener, useCapture);
 },
 _lib_add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._lib_type, listener, useCapture);
 },
 remove$2: function(listener, useCapture) {
  this._lib_remove$2(listener, useCapture);
  return this;
 },
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 add$2: function(listener, useCapture) {
  this._lib_add$2(listener, useCapture);
  return this;
 },
 add$1: function(listener) {
  return this.add$2(listener,false)
}
});

Isolate.$defineClass("_FileReaderEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_FileWriterEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_FrameSetElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_IDBDatabaseEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_IDBRequestEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_IDBTransactionEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_IDBVersionChangeRequestEventsImpl", "_IDBRequestEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_InputElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_JavaScriptAudioNodeEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MediaElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MediaStreamEventsImpl", "_EventsImpl", ["_ptr"], {
 get$ended: function() {
  return this._get$1('ended');
 }
});

Isolate.$defineClass("_MessagePortEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_ChildNodeListLazy", "Object", ["_this"], {
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
 },
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter3(this, [], f));
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
 },
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._this.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._this.$dom_removeChild$1(result);
  }
  return result;
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._this; t1.hasNext$0() === true; ) {
    t2.$dom_appendChild$1(t1.next$0());
  }
 },
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 last$0: function() {
  return this._this.lastChild;;
 },
 get$first: function() {
  return this._this.firstChild;;
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ListWrapper", "Object", [], {
 get$first: function() {
  return $.index(this._list, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 removeRange$2: function(start, rangeLength) {
  return $.removeRange(this._list, start, rangeLength);
 },
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._list, start, rangeLength);
 },
 last$0: function() {
  return $.last(this._list);
 },
 removeLast$0: function() {
  return $.removeLast(this._list);
 },
 clear$0: function() {
  return $.clear(this._list);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._list, element, start);
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 addAll$1: function(collection) {
  return $.addAll(this._list, collection);
 },
 addLast$1: function(value) {
  return $.addLast(this._list, value);
 },
 add$1: function(value) {
  return $.add$1(this._list, value);
 },
 set$length: function(newLength) {
  $.set$length(this._list, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._list, index, value);
 },
 operator$index$1: function(index) {
  return $.index(this._list, index);
 },
 get$length: function() {
  return $.get$length(this._list);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._list);
 },
 filter$1: function(f) {
  return $.filter(this._list, f);
 },
 forEach$1: function(f) {
  return $.forEach(this._list, f);
 },
 iterator$0: function() {
  return $.iterator(this._list);
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_NodeListWrapper", "_ListWrapper", ["_list"], {
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange(this._list, start, rangeLength));
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter(this._list, f));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_NotificationEventsImpl", "_EventsImpl", ["_ptr"], {
 get$show: function() {
  return this._get$1('show');
 },
 show$0: function() { return this.get$show().$call$0(); },
 show$1: function(arg0) { return this.get$show().$call$1(arg0); },
 get$click: function() {
  return this._get$1('click');
 },
 click$0: function() { return this.get$click().$call$0(); },
 click$1: function(arg0) { return this.get$click().$call$1(arg0); }
});

Isolate.$defineClass("_PeerConnection00EventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_AttributeClassSet", "_CssClassSet", ["_element"], {
 _write$1: function(s) {
  $.indexSet(this._element.get$attributes(), 'class', this._formatSet$1(s));
 },
 $dom_className$0: function() {
  return $.index(this._element.get$attributes(), 'class');
 },
 get$$$dom_className: function() { return new $.Closure82(this, '$dom_className$0'); }
});

Isolate.$defineClass("_SVGElementInstanceEventsImpl", "_EventsImpl", ["_ptr"], {
 get$select: function() {
  return this._get$1('select');
 },
 select$0: function() { return this.get$select().$call$0(); },
 get$mouseOver: function() {
  return this._get$1('mouseover');
 },
 mouseOver$1: function(arg0) { return this.get$mouseOver().$call$1(arg0); },
 get$mouseOut: function() {
  return this._get$1('mouseout');
 },
 mouseOut$1: function(arg0) { return this.get$mouseOut().$call$1(arg0); },
 get$copy: function() {
  return this._get$1('copy');
 },
 copy$0: function() { return this.get$copy().$call$0(); },
 copy$1: function(arg0) { return this.get$copy().$call$1(arg0); },
 get$click: function() {
  return this._get$1('click');
 },
 click$0: function() { return this.get$click().$call$0(); },
 click$1: function(arg0) { return this.get$click().$call$1(arg0); }
});

Isolate.$defineClass("_SharedWorkerContextEventsImpl", "_WorkerContextEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_SpeechRecognitionEventsImpl", "_EventsImpl", ["_ptr"], {
 get$start: function() {
  return this._get$1('start');
 },
 start$0: function() { return this.get$start().$call$0(); },
 start$1: function(arg0) { return this.get$start().$call$1(arg0); },
 get$end: function() {
  return this._get$1('end');
 },
 end$0: function() { return this.get$end().$call$0(); },
 end$1: function(arg0) { return this.get$end().$call$1(arg0); }
});

Isolate.$defineClass("_TextTrackEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_TextTrackCueEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_TextTrackListEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_WebSocketEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_WindowEventsImpl", "_EventsImpl", ["_ptr"], {
 get$select: function() {
  return this._get$1('select');
 },
 select$0: function() { return this.get$select().$call$0(); },
 get$mouseOver: function() {
  return this._get$1('mouseover');
 },
 mouseOver$1: function(arg0) { return this.get$mouseOver().$call$1(arg0); },
 get$mouseOut: function() {
  return this._get$1('mouseout');
 },
 mouseOut$1: function(arg0) { return this.get$mouseOut().$call$1(arg0); },
 get$message: function() {
  return this._get$1('message');
 },
 get$ended: function() {
  return this._get$1('ended');
 },
 get$click: function() {
  return this._get$1('click');
 },
 click$0: function() { return this.get$click().$call$0(); },
 click$1: function(arg0) { return this.get$click().$call$1(arg0); }
});

Isolate.$defineClass("_WorkerEventsImpl", "_AbstractWorkerEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_WorkerContextEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_XMLHttpRequestEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_XMLHttpRequestUploadEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_IDBOpenDBRequestEventsImpl", "_IDBRequestEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_FixedSizeListIterator", "_VariableSizeListIterator", ["_lib_length", "_pos", "_array"], {
 hasNext$0: function() {
  return $.gt(this._lib_length, this._pos);
 }
});

Isolate.$defineClass("_VariableSizeListIterator", "Object", [], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC3);
  }
  var t1 = this._array;
  var t2 = this._pos;
  this._pos = $.add(t2, 1);
  return $.index(t1, t2);
 },
 hasNext$0: function() {
  return $.gt($.get$length(this._array), this._pos);
 }
});

Isolate.$defineClass("_JsonParser", "Object", ["position", "length?", "json"], {
 _error$1: function(message) {
  throw $.captureStackTrace(message);
 },
 _token$0: function() {
  for (var t1 = this.json; true; ) {
    if ($.geB(this.position, $.get$length(this))) {
      return;
    }
    var char$ = $.charCodeAt(t1, this.position);
    var token = $.index($.tokens, char$);
    if (token === 32) {
      this.position = $.add(this.position, 1);
      continue;
    }
    if (token === (void 0)) {
      return 0;
    }
    return token;
  }
 },
 _nextChar$0: function() {
  this.position = $.add(this.position, 1);
  if ($.geB(this.position, $.get$length(this))) {
    return 0;
  }
  return $.charCodeAt(this.json, this.position);
 },
 _char$0: function() {
  if ($.geB(this.position, $.get$length(this))) {
    this._error$1('Unexpected end of JSON stream');
  }
  return $.charCodeAt(this.json, this.position);
 },
 _isToken$1: function(tokenKind) {
  return $.eq(this._token$0(), tokenKind);
 },
 _isDigit$1: function(char$) {
  return $.geB(char$, 48) && $.leB(char$, 57);
 },
 _parseNumber$0: function() {
  if (this._isToken$1(45) !== true) {
    this._error$1('Expected number literal');
  }
  var startPos = this.position;
  var char$ = this._char$0();
  if (char$ === 45) {
    char$ = this._nextChar$0();
  }
  if (char$ === 48) {
    char$ = this._nextChar$0();
  } else {
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true; ) {
        char$ = this._nextChar$0();
      }
    } else {
      this._error$1('Expected digit when parsing number');
    }
  }
  if (char$ === 46) {
    char$ = this._nextChar$0();
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true; ) {
        char$ = this._nextChar$0();
      }
      var isInt = false;
    } else {
      this._error$1('Expected digit following comma');
      isInt = true;
    }
  } else {
    isInt = true;
  }
  if (char$ === 101 || char$ === 69) {
    char$ = this._nextChar$0();
    if (char$ === 45 || char$ === 43) {
      char$ = this._nextChar$0();
    }
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true; ) {
        char$ = this._nextChar$0();
      }
      isInt = false;
    } else {
      this._error$1('Expected digit following \'e\' or \'E\'');
    }
  }
  var number = $.substring$2(this.json, startPos, this.position);
  if (isInt) {
    return $.parseInt(number);
  } else {
    return $.parseDouble(number);
  }
 },
 _parseString$0: function() {
  if (this._isToken$1(34) !== true) {
    this._error$1('Expected string literal');
  }
  this.position = $.add(this.position, 1);
  var charCodes = $.List((void 0));
  $.setRuntimeTypeInfo(charCodes, ({E: 'int'}));
  for (var t1 = this.json; true; ) {
    c = this._char$0();
    if ($.eqB(c, 34)) {
      this.position = $.add(this.position, 1);
      break;
    }
    if ($.eqB(c, 92)) {
      this.position = $.add(this.position, 1);
      if ($.eqB(this.position, $.get$length(this))) {
        this._error$1('\\ at the end of input');
      }
            switch (this._char$0()) {
        case 34:
          c = 34;
          break;
        case 92:
          c = 92;
          break;
        case 47:
          c = 47;
          break;
        case 98:
          c = 8;
          break;
        case 110:
          c = 10;
          break;
        case 114:
          c = 13;
          break;
        case 102:
          c = 12;
          break;
        case 116:
          c = 9;
          break;
        case 117:
          if ($.gtB($.add(this.position, 5), $.get$length(this))) {
            this._error$1('Invalid unicode esacape sequence');
          }
          codeString = $.substring$2(t1, $.add(this.position, 1), $.add(this.position, 5));
          try {
            c = $.parseInt('0x' + $.S(codeString));
          } catch (exception) {
            $.unwrapException(exception);
            this._error$1('Invalid unicode esacape sequence');
          }
          this.position = $.add(this.position, 4);
          break;
        default:
          this._error$1('Invalid esacape sequence in string literal');
      }
    }
    charCodes.push(c);
    this.position = $.add(this.position, 1);
  }
  return $.String$fromCharCodes(charCodes);
 },
 _parseList$0: function() {
  var list = [];
  this.position = $.add(this.position, 1);
  if (this._isToken$1(93) !== true) {
    for (; true; ) {
      $.add$1(list, this._parseValue$0());
      if (this._isToken$1(44) !== true) {
        break;
      }
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(93) !== true) {
      this._error$1('Expected \']\' at end of list');
    }
  }
  this.position = $.add(this.position, 1);
  return list;
 },
 _parseObject$0: function() {
  var object = $.makeLiteralMap([]);
  if (typeof object !== 'object'||object.constructor !== Array||!!object.immutable$list) return this._parseObject$0$bailout(1, object);
  this.position = $.add(this.position, 1);
  if (this._isToken$1(125) !== true) {
    for (; true; ) {
      var key = this._parseString$0();
      if (this._isToken$1(58) !== true) {
        this._error$1('Expected \':\' when parsing object');
      }
      this.position = $.add(this.position, 1);
      var t1 = this._parseValue$0();
      if (key !== (key | 0)) throw $.iae(key);
      var t2 = object.length;
      if (key < 0 || key >= t2) throw $.ioore(key);
      object[key] = t1;
      if (this._isToken$1(44) !== true) {
        break;
      }
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(125) !== true) {
      this._error$1('Expected \'}\' at end of object');
    }
  }
  this.position = $.add(this.position, 1);
  return object;
 },
 _parseObject$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      object = env0;
      break;
  }
  switch (state) {
    case 0:
      var object = $.makeLiteralMap([]);
    case 1:
      state = 0;
      this.position = $.add(this.position, 1);
      if (this._isToken$1(125) !== true) {
        L0: while (true) {
          if (!true) break L0;
          var key = this._parseString$0();
          if (this._isToken$1(58) !== true) {
            this._error$1('Expected \':\' when parsing object');
          }
          this.position = $.add(this.position, 1);
          $.indexSet(object, key, this._parseValue$0());
          if (this._isToken$1(44) !== true) {
            break;
          } else {
          }
          this.position = $.add(this.position, 1);
        }
        if (this._isToken$1(125) !== true) {
          this._error$1('Expected \'}\' at end of object');
        }
      }
      this.position = $.add(this.position, 1);
      return object;
  }
 },
 _expectKeyword$2: function(word, value) {
  for (var i = 0; $.ltB(i, $.get$length(word)); ++i) {
    if (!$.eqB(this._char$0(), $.charCodeAt(word, i))) {
      this._error$1('Expected keyword \'' + $.S(word) + '\'');
    }
    this.position = $.add(this.position, 1);
  }
  return value;
 },
 _parseValue$0: function() {
  var token = this._token$0();
  if (token === (void 0)) {
    this._error$1('Nothing to parse');
  }
    switch (token) {
    case 34:
      return this._parseString$0();
    case 45:
      return this._parseNumber$0();
    case 110:
      return this._expectKeyword$2('null', (void 0));
    case 102:
      return this._expectKeyword$2('false', false);
    case 116:
      return this._expectKeyword$2('true', true);
    case 123:
      return this._parseObject$0();
    case 91:
      return this._parseList$0();
    default:
      this._error$1('Unexpected token');
  }
 },
 _parseToplevel$0: function() {
  var result = this._parseValue$0();
  if (!(this._token$0() === (void 0))) {
    this._error$1('Junk at the end of JSON input');
  }
  return result;
 },
 _JsonParser$_internal$1: function(json) {
  if (!($.tokens === (void 0))) {
    return;
  }
  var t1 = $.List(126);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  $.tokens = t1;
  $.indexSet($.tokens, 9, 32);
  $.indexSet($.tokens, 10, 32);
  $.indexSet($.tokens, 13, 32);
  $.indexSet($.tokens, 32, 32);
  $.indexSet($.tokens, 48, 45);
  $.indexSet($.tokens, 49, 45);
  $.indexSet($.tokens, 50, 45);
  $.indexSet($.tokens, 51, 45);
  $.indexSet($.tokens, 52, 45);
  $.indexSet($.tokens, 53, 45);
  $.indexSet($.tokens, 54, 45);
  $.indexSet($.tokens, 55, 45);
  $.indexSet($.tokens, 56, 45);
  $.indexSet($.tokens, 57, 45);
  $.indexSet($.tokens, 45, 45);
  $.indexSet($.tokens, 123, 123);
  $.indexSet($.tokens, 125, 125);
  $.indexSet($.tokens, 91, 91);
  $.indexSet($.tokens, 93, 93);
  $.indexSet($.tokens, 34, 34);
  $.indexSet($.tokens, 58, 58);
  $.indexSet($.tokens, 44, 44);
  $.indexSet($.tokens, 110, 110);
  $.indexSet($.tokens, 116, 116);
  $.indexSet($.tokens, 102, 102);
 }
});

Isolate.$defineClass("JsonUnsupportedObjectType", "Object", [], {
});

Isolate.$defineClass("JsonStringifier", "Object", ["_seen", "_sb?"], {
 _stringify$1: function(object) {
  var t1 = ({});
  if (typeof object === 'number') {
    $.add$1(this._sb, $._numberToString(object));
    return;
  } else {
    if (object === true) {
      $.add$1(this._sb, 'true');
      return;
    } else {
      if (object === false) {
        $.add$1(this._sb, 'false');
        return;
      } else {
        if (object === (void 0)) {
          $.add$1(this._sb, 'null');
          return;
        } else {
          if (typeof object === 'string') {
            $.add$1(this._sb, '"');
            $._escape(this._sb, object);
            $.add$1(this._sb, '"');
            return;
          } else {
            if (typeof object === 'object' && (object.constructor === Array || object.is$List2())) {
              if (typeof object !== 'object'||object.constructor !== Array) return this._stringify$1$bailout(object, 1, object);
              this._checkCycle$1(object);
              $.add$1(this._sb, '[');
              if (object.length > 0) {
                t1 = object.length;
                if (0 >= t1) throw $.ioore(0);
                this._stringify$1(object[0]);
                for (var i = 1; i < object.length; ++i) {
                  $.add$1(this._sb, ',');
                  t1 = object.length;
                  if (i < 0 || i >= t1) throw $.ioore(i);
                  this._stringify$1(object[i]);
                }
              }
              $.add$1(this._sb, ']');
              $.removeLast(this._seen);
              return;
            } else {
              if (typeof object === 'object' && object.is$Map()) {
                this._checkCycle$1(object);
                $.add$1(this._sb, '{');
                t1.first_1 = true;
                object.forEach$1(new $.Closure16(this, t1));
                $.add$1(this._sb, '}');
                $.removeLast(this._seen);
                return;
              } else {
                throw $.captureStackTrace($.CTC7);
              }
            }
          }
        }
      }
    }
  }
 },
 _stringify$1$bailout: function(object, state, env0) {
  switch (state) {
    case 1:
      object = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = ({});
    case 1:
      if ((state == 0 && typeof object === 'number')) {
        $.add$1(this._sb, $._numberToString(object));
        return;
      } else {
        switch (state) {
          case 0:
          case 1:
            if ((state == 0 && object === true)) {
              $.add$1(this._sb, 'true');
              return;
            } else {
              switch (state) {
                case 0:
                case 1:
                  if ((state == 0 && object === false)) {
                    $.add$1(this._sb, 'false');
                    return;
                  } else {
                    switch (state) {
                      case 0:
                      case 1:
                        if ((state == 0 && object === (void 0))) {
                          $.add$1(this._sb, 'null');
                          return;
                        } else {
                          switch (state) {
                            case 0:
                            case 1:
                              if ((state == 0 && typeof object === 'string')) {
                                $.add$1(this._sb, '"');
                                $._escape(this._sb, object);
                                $.add$1(this._sb, '"');
                                return;
                              } else {
                                switch (state) {
                                  case 0:
                                  case 1:
                                    if (state == 1 || (state == 0 && (typeof object === 'object' && ((object.constructor === Array || object.is$List2()))))) {
                                      switch (state) {
                                        case 0:
                                        case 1:
                                          state = 0;
                                          this._checkCycle$1(object);
                                          $.add$1(this._sb, '[');
                                          if ($.gtB($.get$length(object), 0)) {
                                            this._stringify$1($.index(object, 0));
                                            var i = 1;
                                            L0: while (true) {
                                              if (!$.ltB(i, $.get$length(object))) break L0;
                                              $.add$1(this._sb, ',');
                                              this._stringify$1($.index(object, i));
                                              ++i;
                                            }
                                          }
                                          $.add$1(this._sb, ']');
                                          $.removeLast(this._seen);
                                          return;
                                      }
                                    } else {
                                      if (typeof object === 'object' && object.is$Map()) {
                                        this._checkCycle$1(object);
                                        $.add$1(this._sb, '{');
                                        t1.first_1 = true;
                                        object.forEach$1(new $.Closure16(this, t1));
                                        $.add$1(this._sb, '}');
                                        $.removeLast(this._seen);
                                        return;
                                      } else {
                                        throw $.captureStackTrace($.CTC7);
                                      }
                                    }
                                }
                              }
                          }
                        }
                    }
                  }
              }
            }
        }
      }
  }
 },
 _checkCycle$1: function(object) {
  for (var i = 0; $.ltB(i, $.get$length(this._seen)); ++i) {
    if ($.index(this._seen, i) === object) {
      throw $.captureStackTrace('Cyclic structure');
    }
  }
  $.add$1(this._seen, object);
 },
 get$_result: function() {
  return $.toString(this._sb);
 }
});

Isolate.$defineClass("Closure", "Closure83", ["this_4", "box_0"], {
 $call$1: function(e) {
  this.this_4.show$1(this.box_0.view_1);
 }
});

Isolate.$defineClass("Closure2", "Closure83", ["box_2"], {
 $call$1: function(v) {
  return $.eq(v.get$id(), this.box_2.loc_3);
 }
});

Isolate.$defineClass("Closure3", "Closure83", [], {
 $call$1: function(e) {
  $.clear(e.get$classes());
 }
});

Isolate.$defineClass("Closure4", "Closure83", ["box_0"], {
 $call$2: function(k, v) {
  if (this.box_0.first_3 !== true) {
    $.add$1(this.box_0.result_1, ', ');
  }
  this.box_0.first_3 = false;
  $._emitObject(k, this.box_0.result_1, this.box_0.visiting_2);
  $.add$1(this.box_0.result_1, ': ');
  $._emitObject(v, this.box_0.result_1, this.box_0.visiting_2);
 }
});

Isolate.$defineClass("Closure5", "Closure83", [], {
 $call$1: function(n) {
  return typeof n === 'object' && n.is$Element();
 }
});

Isolate.$defineClass("Closure6", "Closure83", ["box_0", "output_2"], {
 $call$1: function(element) {
  if (this.box_0.f_1.$call$1(element) === true) {
    $.add$1(this.output_2, element);
  }
 }
});

Isolate.$defineClass("Closure7", "Closure83", [], {
 $call$1: function(el) {
  return el.remove$0();
 }
});

Isolate.$defineClass("Closure8", "Closure83", [], {
 $call$1: function(e) {
  $.fail('Listener to add event should have been removed');
 }
});

Isolate.$defineClass("Closure9", "Closure83", ["box_0"], {
 $call$1: function(added) {
  $.equals($.index(this.box_0.list_1, 1), 'yey', 'Expected yey item in index=1');
  $.equals($.index(this.box_0.list_1, 2), 'lol', 'Expected lol item in index=2');
  var it = $.iterator(this.box_0.list_1);
  it.next$0();
  $.equals(it.next$0(), 'yey', 'Expected yey item in index=1');
  $.equals(it.next$0(), 'lol', 'Expected lol item in index=2');
  $.equals($.get$length(this.box_0.list_1), 3, 'Expected 3 items in the list');
  this.box_0.listAddedEventFired_2 = true;
 }
});

Isolate.$defineClass("Closure10", "Closure83", ["box_0"], {
 $call$1: function(removed) {
  this.box_0.removedEventFired_1 = true;
  $.equals('yo', removed, (void 0));
 }
});

Isolate.$defineClass("Closure11", "Closure83", ["box_0"], {
 $call$1: function(removed) {
  var removedEventsFired = $.add(this.box_0.removedEventsFired_2, 1);
  this.box_0.removedEventsFired_2 = removedEventsFired;
  $.equals('yo', removed, (void 0));
 }
});

Isolate.$defineClass("Closure12", "Closure83", ["box_0"], {
 $call$1: function(removed) {
  var removedEventsFired = $.add(this.box_0.removedEventsFired_2, 1);
  this.box_0.removedEventsFired_2 = removedEventsFired;
  $.equals('yo', removed, (void 0));
 }
});

Isolate.$defineClass("Closure13", "Closure83", [], {
 $call$1: function(removed) {
  $.fail('handle should be ignored');
 }
});

Isolate.$defineClass("Closure14", "Closure83", ["box_0"], {
 $call$1: function(added) {
  $.equals('woei', added, (void 0));
  $.equals(2, $.get$length(this.box_0.list_12), '2 items in the list');
  this.box_0.addedEventFired_2 = true;
 }
});

Isolate.$defineClass("Closure15", "Closure83", ["box_0"], {
 $call$0: function() {
  this.box_0.changedEventFired_3 = true;
 }
});

Isolate.$defineClass("Closure16", "Closure83", ["this_2", "box_0"], {
 $call$2: function(key, value) {
  if (this.box_0.first_1 !== true) {
    $.add$1(this.this_2.get$_sb(), ',"');
  } else {
    $.add$1(this.this_2.get$_sb(), '"');
  }
  $._escape(this.this_2.get$_sb(), key);
  $.add$1(this.this_2.get$_sb(), '":');
  this.this_2._stringify$1(value);
  this.box_0.first_1 = false;
 }
});

Isolate.$defineClass("Closure17", "Closure83", ["this_2", "box_0"], {
 $call$2: function(key, value) {
  if (typeof value === 'object' && value.is$Map()) {
    $.indexSet(this.box_0.data_1, key, $.JsonObject$fromMap$1(value));
  } else {
    if (typeof value === 'object' && (value.constructor === Array || value.is$Collection())) {
      this.this_2._extractElements$1(value);
    }
  }
 }
});

Isolate.$defineClass("Closure18", "Closure83", ["box_0"], {
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
});

Isolate.$defineClass("Closure19", "Closure83", ["box_0"], {
 $call$1: function(entry) {
  this.box_0.f_12.$call$2(entry.get$key(), entry.get$value());
 }
});

Isolate.$defineClass("Closure20", "Closure83", ["box_0"], {
 $call$2: function(key, value) {
  if (value.equals$1($.index(this.box_0.other_1, key)) !== true) {
    return false;
  }
 }
});

Isolate.$defineClass("Closure21", "Closure83", ["this_0"], {
 $call$1: function(d) {
  $.add$1(this.this_0.get$resources(), $.Jsonable$data(d));
 }
});

Isolate.$defineClass("Closure22", "Closure83", ["box_0"], {
 $call$1: function(e) {
  var firedOnRemove = $.add(this.box_0.firedOnRemove_2, 1);
  this.box_0.firedOnRemove_2 = firedOnRemove;
  $.equals(this.box_0.ore_1, e, 'Unexpected removed item in event');
 }
});

Isolate.$defineClass("Closure23", "Closure83", ["box_0"], {
 $call$1: function(r) {
  var firedOnAdd = $.add(this.box_0.firedOnAdd_3, 1);
  this.box_0.firedOnAdd_3 = firedOnAdd;
  $.equals(this.box_0.ore_1, r, 'Unexpected removed item in event');
 }
});

Isolate.$defineClass("Closure24", "Closure83", ["keys_0"], {
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
});

Isolate.$defineClass("Closure25", "Closure83", ["box_0"], {
 $call$1: function(entry) {
  var t1 = this.box_0.list_13;
  var t2 = this.box_0.index_2;
  var index = $.add(t2, 1);
  this.box_0.index_2 = index;
  $.indexSet(t1, t2, entry.get$key());
 }
});

Isolate.$defineClass("Closure26", "Closure83", ["box_0"], {
 $call$2: function(key, value) {
  var t1 = this.box_0.list_14;
  var t2 = this.box_0.i_2;
  var i = $.add(t2, 1);
  this.box_0.i_2 = i;
  $.indexSet(t1, t2, key);
 }
});

Isolate.$defineClass("Closure27", "Closure83", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$0();
 }
});

Isolate.$defineClass("Closure28", "Closure83", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$1(this.box_0.arg1_2);
 }
});

Isolate.$defineClass("Closure29", "Closure83", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$2(this.box_0.arg1_2, this.box_0.arg2_3);
 }
});

Isolate.$defineClass("Closure30", "Closure83", [], {
 $call$1: function(matched) {
  if (matched === (void 0) || $.eqB(matched, '')) {
    return 0;
  }
  return $.parseInt(matched);
 }
});

Isolate.$defineClass("Closure31", "Closure83", [], {
 $call$1: function(matched) {
  if (matched === (void 0) || $.eqB(matched, '')) {
    return 0.0;
  }
  return $.parseDouble(matched);
 }
});

Isolate.$defineClass("Closure32", "Closure83", [], {
 $call$1: function(n) {
  var absN = $.abs(n);
  if ($.ltB(n, 0)) {
    var sign = '-';
  } else {
    sign = '';
  }
  if ($.geB(absN, 1000)) {
    return $.S(n);
  }
  if ($.geB(absN, 100)) {
    return sign + '0' + $.S(absN);
  }
  if ($.geB(absN, 10)) {
    return sign + '00' + $.S(absN);
  }
  if ($.geB(absN, 1)) {
    return sign + '000' + $.S(absN);
  }
  throw $.captureStackTrace($.IllegalArgumentException$1(n));
 }
});

Isolate.$defineClass("Closure33", "Closure83", [], {
 $call$1: function(n) {
  if ($.geB(n, 100)) {
    return $.S(n);
  }
  if ($.geB(n, 10)) {
    return '0' + $.S(n);
  }
  return '00' + $.S(n);
 }
});

Isolate.$defineClass("Closure34", "Closure83", [], {
 $call$1: function(n) {
  if ($.geB(n, 10)) {
    return $.S(n);
  }
  return '0' + $.S(n);
 }
});

Isolate.$defineClass("Closure35", "Closure83", ["this_0"], {
 $call$1: function(value) {
  this.this_0.add$1(value);
 }
});

Isolate.$defineClass("Closure36", "Closure83", ["box_0"], {
 $call$2: function(key, value) {
  this.box_0.f_13.$call$1(key);
 }
});

Isolate.$defineClass("Closure37", "Closure83", ["box_0"], {
 $call$2: function(key, value) {
  if (this.box_0.f_14.$call$1(key) === true) {
    $.add$1(this.box_0.result_2, key);
  }
 }
});

Isolate.$defineClass("Closure38", "Closure83", ["values_0"], {
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
});

Isolate.$defineClass("Closure39", "Closure83", ["box_0"], {
 $call$1: function(entry) {
  var t1 = this.box_0.list_15;
  var t2 = this.box_0.index_22;
  var index = $.add(t2, 1);
  this.box_0.index_22 = index;
  $.indexSet(t1, t2, entry.get$value());
 }
});

Isolate.$defineClass("Closure40", "Closure83", ["box_0"], {
 $call$2: function(key, value) {
  var t1 = this.box_0.list_16;
  var t2 = this.box_0.i_22;
  var i = $.add(t2, 1);
  this.box_0.i_22 = i;
  $.indexSet(t1, t2, value);
 }
});

Isolate.$defineClass("Closure41", "Closure83", ["this_0"], {
 $call$0: function() {
  var joinGame1 = $.JoinGame$0();
  joinGame1.set$user(this.this_0.get$player2().get$user());
  var gameAtServer = $.index(this.this_0.get$server().get$lobby().get$games(), 0);
  var gameAtClient = $.index(this.this_0.get$gameClient().get$lobby().get$games(), 0);
  joinGame1.game = $.index(this.this_0.get$server().get$lobby().get$games(), 0);
  this.this_0.get$gameClient().send$1(joinGame1);
  joinGame1.id = this.this_0.nextId$0();
  var t1 = $.ExpectGame$1(gameAtClient);
  this.this_0.set$expectClientGame(t1);
  t1 = $.ExpectGame$1(gameAtServer);
  this.this_0.set$expectServerGame(t1);
  this.this_0.get$expectClientGame().hasUser$1(this.this_0.get$player2().get$user());
  this.this_0.get$expectClientGame().hasUserAmount$1(2);
  this.this_0.get$expectServerGame().hasUser$1(this.this_0.get$player2().get$user());
  this.this_0.get$expectServerGame().hasUserAmount$1(2);
  this.this_0.get$expectServer().hasAction$1(joinGame1);
  this.this_0.get$expectServer().hasActionAmount$1(12);
 }
});

Isolate.$defineClass("Closure42", "Closure83", ["box_0"], {
 $call$1: function(withId) {
  return $.eq(withId.get$id(), this.box_0.theid_1);
 }
});

Isolate.$defineClass("Closure43", "Closure83", [], {
 $call$1: function(t) {
  if (t.get$hasPort() === true) {
    var t1 = t.get$port();
    t1 = typeof t1 === 'object' && !!t1.is$RandomPort;
  } else {
    t1 = false;
  }
  return t1;
 }
});

Isolate.$defineClass("Closure44", "Closure83", [], {
 $call$1: function(c) {
  return c.get$isRed();
 }
});

Isolate.$defineClass("Closure45", "Closure83", ["this_0"], {
 $call$1: function(c) {
  return this.this_0.not$1(c.get$isRed());
 }
});

Isolate.$defineClass("Closure46", "Closure83", ["this_0"], {
 $call$0: function() {
  var newGame = $.NewGame$0();
  newGame.set$user(this.this_0.get$player1().get$user());
  var ng = $.Game$0();
  ng.name = 'Lol';
  ng.board = this.this_0.createTestBoard$0();
  newGame.game = ng;
  this.this_0.get$gameClient().send$1(newGame);
  var t1 = newGame.game;
  this.this_0.set$game(t1);
  $.ExpectGame$1(this.this_0.get$game());
  newGame.id = this.this_0.nextId$0();
  this.this_0.get$expectServer().hasAction$1(newGame);
  this.this_0.get$expectServer().hasActionAmount$1(11);
  $.isFalse($.isEmpty(this.this_0.get$gameClient().get$lobby().get$games()), 'empty list of games in client-lobby');
  $.isFalse($.isEmpty(this.this_0.get$server().get$lobby().get$games()), 'empty list of games in server-lobby');
  $.isFalse($.eqNull($.index(this.this_0.get$server().get$lobby().get$games(), 0)), (void 0));
 }
});

Isolate.$defineClass("Closure47", "Closure83", ["this_0"], {
 $call$0: function() {
  var say = $.Say$lobby$0();
  say.message = 'Loei. Moei, koei!';
  say.set$user(this.this_0.get$player2().get$user());
  this.this_0.get$gameClient().send$1(say);
  var say2 = $.Say$lobby$0();
  say.message = 'Gowaboei...';
  say.set$user(this.this_0.get$player2().get$user());
  this.this_0.get$gameClient().send$1(say);
  var say3 = $.Say$lobby$0();
  say.message = 'Complatoei?';
  say.set$user(this.this_0.get$player3().get$user());
  this.this_0.get$gameClient().send$1(say);
  say.id = this.this_0.nextId$0();
  say2.id = this.this_0.nextId$0();
  say3.id = this.this_0.nextId$0();
  this.this_0.get$expectServer().hasActions$1([say, say2, say3]);
  this.this_0.get$expectServer().hasActionAmount$1(10);
 }
});

Isolate.$defineClass("Closure48", "Closure83", ["this_0"], {
 $call$0: function() {
  var say = $.Say$lobby$0();
  say.message = 'Merp. gotta get another player';
  say.set$user(this.this_0.get$player1().get$user());
  this.this_0.get$gameClient().send$1(say);
  say.id = this.this_0.nextId$0();
  this.this_0.get$expectServer().hasAction$1(say);
  this.this_0.get$expectServer().hasActionAmount$1(7);
 }
});

Isolate.$defineClass("Closure49", "Closure83", ["this_0"], {
 $call$0: function() {
  var join3 = $.JoinLobby$0();
  join3.set$user(this.this_0.get$player3().get$user());
  this.this_0.get$gameClient().send$1(join3);
  join3.id = this.this_0.nextId$0();
  this.this_0.get$expectServer().hasUser$1(this.this_0.get$player3().get$user());
  this.this_0.get$expectServer().hasUserAmount$1(4);
  this.this_0.get$expectServer().hasAction$1(join3);
  this.this_0.get$expectServer().hasActionAmount$1(6);
 }
});

Isolate.$defineClass("Closure50", "Closure83", ["this_0"], {
 $call$0: function() {
  var leaverJoin = $.JoinLobby$0();
  leaverJoin.set$user(this.this_0.get$leaver().get$user());
  this.this_0.get$gameClient().send$1(leaverJoin);
  var leave = $.LeaveLobby$0();
  leave.set$user(this.this_0.get$leaver().get$user());
  this.this_0.get$gameClient().send$1(leave);
  leaverJoin.id = this.this_0.nextId$0();
  leave.id = this.this_0.nextId$0();
  this.this_0.get$expectServer().hasNotUser$1(this.this_0.get$leaverUser());
  this.this_0.get$expectServer().hasUserAmount$1(3);
  this.this_0.get$expectServer().hasAction$1(leaverJoin);
  this.this_0.get$expectServer().hasAction$1(leave);
  this.this_0.get$expectServer().hasActionAmount$1(this.this_0.get$currentActionId());
 }
});

Isolate.$defineClass("Closure51", "Closure83", ["this_0"], {
 $call$0: function() {
  var join = $.JoinLobby$0();
  join.set$user(this.this_0.get$player1().get$user());
  this.this_0.get$gameClient().send$1(join);
  var join2 = $.JoinLobby$0();
  join2.set$user(this.this_0.get$player2().get$user());
  this.this_0.get$gameClient().send$1(join2);
  join.id = this.this_0.nextId$0();
  join2.id = this.this_0.nextId$0();
  this.this_0.get$expectServer().hasUser$1(this.this_0.get$player1().get$user());
  this.this_0.get$expectServer().hasUser$1(this.this_0.get$player2().get$user());
  this.this_0.get$expectServer().hasUserAmount$1(3);
  this.this_0.get$expectServer().hasAction$1(join);
  this.this_0.get$expectServer().hasAction$1(join2);
  this.this_0.get$expectServer().hasActionAmount$1(3);
 }
});

Isolate.$defineClass("Closure52", "Closure83", ["this_0"], {
 $call$0: function() {
  var spectatorJoin = $.JoinLobby$0();
  spectatorJoin.set$user(this.this_0.get$spectator());
  this.this_0.get$gameClient().send$1(spectatorJoin);
  spectatorJoin.id = this.this_0.nextId$0();
  this.this_0.get$expectClientLobby().hasUser$1(this.this_0.get$spectator());
  this.this_0.get$expectClientLobby().hasUserAmount$1(1);
  this.this_0.get$expectClientLobby().hasAction$1(spectatorJoin);
  this.this_0.get$expectClientLobby().hasActionAmount$1(1);
  this.this_0.get$expectServerLobby().hasUser$1(this.this_0.get$spectator());
  this.this_0.get$expectServerLobby().hasUserAmount$1(1);
  this.this_0.get$expectServerLobby().hasAction$1(spectatorJoin);
  this.this_0.get$expectServerLobby().hasActionAmount$1(1);
 }
});

Isolate.$defineClass("Closure53", "Closure83", ["this_3", "box_0"], {
 $call$1: function(e) {
  this.this_3.changeBoard$2(this.box_0.board_1, this.box_0.li_2);
 }
});

Isolate.$defineClass("Closure54", "Closure83", ["this_2", "box_0"], {
 $call$1: function(key) {
  return this.box_0.f_15.$call$2(key, $.index(this.this_2, key));
 }
});

Isolate.$defineClass("Closure55", "Closure83", ["this_2", "box_0"], {
 $call$1: function(key) {
  return $.add$1(this.box_0.result_12, $.index(this.this_2, key));
 }
});

Isolate.$defineClass("Closure56", "Closure83", ["this_2", "box_0"], {
 $call$1: function(e) {
  this.this_2.get$board().make$1(this.box_0.cr_1);
 }
});

Isolate.$defineClass("Closure57", "Closure83", ["this_3"], {
 $call$1: function(e) {
  this.this_3.get$board().setStartingState$0();
 }
});

Isolate.$defineClass("Closure58", "Closure83", ["this_2"], {
 $call$1: function(e) {
  this.this_2.get$group().click$0();
 }
});

Isolate.$defineClass("Closure59", "Closure83", ["this_3", "box_0"], {
 $call$1: function(e) {
  var t1 = this.box_0.i_1;
  this.this_3.set$selectedTriangle(t1);
 }
});

Isolate.$defineClass("Closure60", "Closure83", [], {
 $call$1: function(e) {
 }
});

Isolate.$defineClass("Closure61", "Closure83", ["this_2", "box_0"], {
 $call$1: function(e) {
  this.this_2.get$_boardState().click$1(this.box_0.v_1);
 }
});

Isolate.$defineClass("Closure62", "Closure83", ["this_3", "box_0"], {
 $call$1: function(e) {
  this.this_3.get$_boardState().mouseOver$1(this.box_0.v_1);
 }
});

Isolate.$defineClass("Closure63", "Closure83", ["this_4", "box_0"], {
 $call$1: function(e) {
  this.this_4.get$_boardState().mouseOut$1(this.box_0.v_1);
 }
});

Isolate.$defineClass("Closure64", "Closure83", [], {
 $call$1: function(e) {
  return e.get$svg().remove$0();
 }
});

Isolate.$defineClass("Closure65", "Closure83", [], {
 $call$1: function(e) {
  return e.get$svg().remove$0();
 }
});

Isolate.$defineClass("Closure66", "Closure83", [], {
 $call$1: function(e) {
  return e.remove$0();
 }
});

Isolate.$defineClass("Closure67", "Closure83", ["this_0"], {
 $call$1: function(action) {
  return this.this_0.addAction$1(action);
 }
});

Isolate.$defineClass("Closure68", "Closure83", ["this_1"], {
 $call$1: function(said) {
  return this.this_1.addChat$1(said);
 }
});

Isolate.$defineClass("Closure69", "Closure83", ["this_2"], {
 $call$1: function(user) {
  return this.this_2.addUser$1(user);
 }
});

Isolate.$defineClass("Closure70", "Closure83", ["this_3"], {
 $call$1: function(removedUser) {
  return this.this_3.removeUser$1(removedUser);
 }
});

Isolate.$defineClass("Closure71", "Closure83", ["this_4"], {
 $call$1: function(newGame) {
  return this.this_4.addGame$1(newGame);
 }
});

Isolate.$defineClass("Closure72", "Closure83", ["box_0"], {
 $call$1: function(u) {
  var t1 = $.toString($.get$length(this.box_0.game_1.get$users()));
  this.box_0.amountUsersEl_2.set$innerHTML(t1);
 }
});

Isolate.$defineClass("Closure73", "Closure83", ["this_0"], {
 $call$2: function(old, newValue) {
  if (typeof newValue === 'object' && !!newValue.is$TileVisual) {
    this.this_0.get$cellNeighbours().showCell$1(newValue.tile.get$cell());
  }
 }
});

Isolate.$defineClass("Closure74", "Closure83", ["this_1"], {
 $call$1: function(e) {
  this.this_1.get$boardVisual().showAllEdges$0();
 }
});

Isolate.$defineClass("Closure75", "Closure83", ["this_2"], {
 $call$1: function(e) {
  this.this_2.get$boardVisual().hideAllEdges$0();
 }
});

Isolate.$defineClass("Closure76", "Closure83", ["this_3"], {
 $call$1: function(e) {
  this.this_3.get$boardVisual().showAllVertices$0();
 }
});

Isolate.$defineClass("Closure77", "Closure83", ["this_4"], {
 $call$1: function(e) {
  this.this_4.get$boardVisual().hideAllVertices$0();
 }
});

Isolate.$defineClass("Closure78", "Closure83", ["box_0"], {
 $call$1: function(s) {
  return $.add$1(s, this.box_0.value_1);
 }
});

Isolate.$defineClass("Closure79", "Closure83", ["box_0"], {
 $call$1: function(s) {
  return $.addAll(s, this.box_0.collection_1);
 }
});

Isolate.$defineClass("Closure80", "Closure83", [], {
 $call$1: function(s) {
  return $.clear(s);
 }
});

Isolate.$defineClass("Closure81", "Closure83", ["this_2", "box_0"], {
 $call$1: function(e) {
  this.this_2.setState$1(this.box_0.s_1);
 }
});

Isolate.$defineClass('Closure82', 'Closure83', ['self', 'target'], {
$call$0: function() { return this.self[this.target](); }
});
Isolate.$defineClass('Closure84', 'Closure83', ['self', 'target'], {
$call$1: function(p0) { return this.self[this.target](p0); }
});
Isolate.$defineClass('Closure85', 'Closure83', ['self', 'target'], {
$call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
});
$.MainIsland$1 = function(id) {
  return new $.MainIsland((void 0), (void 0));
};

$.VictoryPoint$2 = function(id, bonusName) {
  return new $.VictoryPoint(bonusName, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), id);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.floor$0();
  }
  return Math.floor(receiver);
};

$.NoneTile$1 = function(loc) {
  var t1 = new $.NoneTile((void 0), (void 0), (void 0), loc, (void 0), (void 0), (void 0));
  t1.AbstractTile$1(loc);
  return t1;
};

$.DefaultJsonable$0 = function() {
  return new $.DefaultJsonable(0);
};

$.fail = function(msg) {
  $._fail('Expect.fail(\'' + $.S(msg) + '\')');
};

$.eqB = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b) === true;
    } else {
      return a === b;
    }
  }
  return a === b;
};

$._containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true; ) {
    if (t1.next$0() === ref) {
      return true;
    }
  }
  return false;
};

$.AbstractTurnPhase$0 = function() {
  return new $.AbstractTurnPhase((void 0));
};

$.ServerUser$0 = function() {
  var t1 = new $.ServerUser((void 0), (void 0), (void 0));
  t1.ServerUser$0();
  return t1;
};

$.Say$lobby$0 = function() {
  var t1 = new $.Say((void 0), false, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.Say$lobby$0();
  return t1;
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.forEach$1(f);
  } else {
    return $.forEach2(receiver, f);
  }
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if (index < 0 || $.geB(index, $.get$length(a))) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$._nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf$bailout(a, element, startIndex, endIndex, 1, a, 0, 0);
  if (typeof endIndex !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex, 2, a, endIndex, 0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  }
  if ($.ltB(startIndex, 0)) {
    var startIndex = 0;
  }
  if (typeof startIndex !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex, 3, a, endIndex, startIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    }
  }
  return -1;
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) {
    return receiver.allMatches$1(str);
  }
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.forEach2 = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.Chit5$0 = function() {
  return new $.Chit5((void 0));
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length;
  } else {
    return receiver.get$length();
  }
};

$.nullOrDataListFrom = function(jsonables) {
  if ($.eqNullB(jsonables)) {
    return;
  }
  return $.toDataList(jsonables);
};

$.IllegalJSRegExpException$2 = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.RandomChit$0 = function() {
  return new $.RandomChit((void 0));
};

$._IDBOpenDBRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.clear$0();
  }
  $.set$length(receiver, 0);
};

$.NullPointerException$2 = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$.AbstractDevelopmentCard$1 = function(id) {
  return new $.AbstractDevelopmentCard((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), id);
};

$.Chit2$data$1 = function(json) {
  var t1 = new $.Chit2((void 0));
  t1.AbstractChit$data$1(json);
  return t1;
};

$.JSSyntaxRegExp$_globalVersionOf$1 = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$.printString = function(string) {
  if (typeof console == "object") {
    console.log(string);
  } else {
    write(string);
    write("\n");
  }
};

$.removeRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.removeRange$2(start, length$);
  }
  $.checkGrowable(receiver, 'removeRange');
  if ($.eqB(length$, 0)) {
    return;
  }
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(start));
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  if (length$ < 0) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  var receiverLength = (receiver.length);
  if (start < 0 || start >= receiverLength) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  }
  var t1 = start + length$;
  if (t1 > receiverLength) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(t1));
  }
  $.copy(receiver, $.add(start, length$), receiver, start, $.sub($.sub(receiverLength, length$), start));
  $.set$length(receiver, $.sub(receiverLength, length$));
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return $.truncate((a) / (b));
  }
  return a.operator$tdiv$1(b);
};

$.Ore$1 = function(id) {
  return new $.Ore(id);
};

$.Road$0 = function() {
  return new $.Road((void 0), (void 0), (void 0), (void 0));
};

$.DoubleLinkedQueueEntry$1 = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry((void 0), (void 0), (void 0));
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') {
    return 'DOMWindow';
  }
  if (name$ === 'CanvasPixelArray') {
    return 'Uint8ClampedArray';
  }
  return name$;
};

$.smallIcon = function(obj) {
  if (typeof obj === 'string') {
    var n = obj;
  } else {
    n = $.name(obj);
  }
  if ($.startsWith(n, 'Abstract') === true) {
    return '<img src="img/icon16/Abstract.png">';
  }
  return '<img src="img/icon16/' + $.S($.name(obj)) + '.png">';
};

$.copiesOf = function(c, amount) {
  if (typeof amount !== 'number') return $.copiesOf$bailout(c, amount, 1, amount);
  var l = $.List((void 0));
  for (var i = 0; i < amount; ++i) {
    l.push(c.copy$0());
  }
  return l;
};

$.Jsonable$type = function(type) {
  $.ensureMap();
  if ($.instancesByType.containsKey$1(type) === true) {
    return $.index($.instancesByType, type);
  } else {
    var msg = 'Oracle: Type ' + $.S(type) + ' not found';
    $.print(msg);
    throw $.captureStackTrace($.ExceptionImplementation$1(msg));
  }
};

$.AbstractChit$0 = function() {
  return new $.AbstractChit((void 0));
};

$.InitialPlacementGamePhase$data$1 = function(json) {
  var t1 = new $.InitialPlacementGamePhase((void 0), (void 0), (void 0));
  t1.InitialPlacementGamePhase$data$1(json);
  return t1;
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var a = (a);
    var b = (b);
    if (b < 0) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
    if (a > 0) {
      if (b > 31) {
        return 0;
      }
      return a >>> b;
    }
    if (b > 31) {
      b = 31;
    }
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.eqNull = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0));
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a & b) >>> 0;
  }
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$2(startIndex, endIndex);
  }
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex === (void 0)) {
    var endIndex = length$;
  }
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  }
  if ($.gtB(startIndex, endIndex)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  }
  if ($.gtB(endIndex, length$)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(endIndex));
  }
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.StringMatch$3 = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.ExceptionImplementation$1 = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.SupportedGamePhases$0 = function() {
  var t1 = [$.AbstractGamePhase$0(), $.LobbyPhase$0(), $.DetermineFirstPlayerGamePhase$0(), $.EndedGamePhase$0(), $.TurnsGamePhase$0(), $.InitialPlacementGamePhase$0(), $.AllPhases$0()];
  var t2 = new $.SupportedGamePhases((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.AbstractTile$1 = function(_cell) {
  var t1 = new $.AbstractTile((void 0), (void 0), (void 0), _cell, (void 0), (void 0), (void 0));
  t1.AbstractTile$1(_cell);
  return t1;
};

$.Edge$data$1 = function(json) {
  var t1 = new $.Edge((void 0), (void 0), (void 0), -1, (void 0), (void 0), (void 0), (void 0));
  t1.Edge$data$1(json);
  return t1;
};

$.String$fromCharCodes = function(charCodes) {
  return $.createFromCharCodes(charCodes);
};

$.WaitingForReplacingUser$0 = function() {
  var t1 = new $.WaitingForReplacingUser((void 0), (void 0));
  t1.WaitingForReplacingUser$0();
  return t1;
};

$.toDataList = function(jsonables) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'JsonObject'}));
  if (!$.eqNullB(jsonables)) {
    for (var t1 = $.iterator(jsonables); t1.hasNext$0() === true; ) {
      result.push(t1.next$0().get$data());
    }
  }
  return result;
};

$.TownCost$0 = function() {
  var t1 = [$.Wheat$1((void 0)), $.Timber$1((void 0)), $.Sheep$1((void 0)), $.Clay$1((void 0))];
  var t2 = new $.TownCost((void 0));
  t2.ResourceListIm$1(t1);
  return t2;
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object'||inputTable.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable, 1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; i < inputTable.length; ++i) {
    var t1 = inputTable.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$0();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object'||tagNames.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable, 2, result, inputTable, tag, i, tags, set, tagNames);
    for (var j = 0; j < tagNames.length; ++j) {
      t1 = tagNames.length;
      if (j < 0 || j >= t1) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$3(tag, tags, set));
  }
  return result;
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.filter$1(predicate);
  } else {
    return $.filter2(receiver, [], predicate);
  }
};

$.filter2 = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (f.$call$1(t2) === true) {
      $.add$1(destination, t2);
    }
  }
  return destination;
};

$.TurnsGamePhase$data$1 = function(json) {
  var t1 = new $.TurnsGamePhase((void 0), (void 0));
  t1.AbstractGamePhase$data$1(json);
  t1.TurnsGamePhase$data$1(json);
  return t1;
};

$.parseInt = function(str) {
  return $.parseInt2(str);
};

$._NotificationEventsImpl$1 = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.parseInt2 = function(str) {
  $.checkString(str);
  if (!(/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))) {
    throw $.captureStackTrace($.BadNumberFormatException$1(str));
  }
  var trimmed = $.trim(str);
  if ($.gtB($.get$length(trimmed), 2)) {
    var t1 = $.eqB($.index(trimmed, 1), 'x') || $.eqB($.index(trimmed, 1), 'X');
  } else {
    t1 = false;
  }
  if (!t1) {
    if ($.gtB($.get$length(trimmed), 3)) {
      t1 = $.eqB($.index(trimmed, 2), 'x') || $.eqB($.index(trimmed, 2), 'X');
    } else {
      t1 = false;
    }
  } else {
    t1 = true;
  }
  if (t1) {
    var base = 16;
  } else {
    base = 10;
  }
  var ret = (parseInt(trimmed, base));
  if ($.isNaN(ret) === true) {
    throw $.captureStackTrace($.BadNumberFormatException$1(str));
  }
  return ret;
};

$.PortListMu$0 = function() {
  var t1 = new $.PortListMu((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), true, (void 0));
  t1.ListenableList$0();
  return t1;
};

$.JsonableTest$0 = function() {
  return new $.JsonableTest();
};

$.filter3 = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (f.$call$1(t2) === true) {
      $.add$1(destination, t2);
    }
  }
  return destination;
};

$.DiceRollTurnPhase$0 = function() {
  return new $.DiceRollTurnPhase((void 0));
};

$.ListenableList$0 = function() {
  var t1 = new $.ListenableList((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), true, (void 0));
  t1.ListenableList$0();
  return t1;
};

$.forEach3 = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.AcceptOffer$data$1 = function(json) {
  var t1 = new $.AcceptOffer((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractGameAction$data$1(json);
  t1.AcceptOffer$data$1(json);
  return t1;
};

$.Board2D$1 = function(hex2d) {
  return new $.Board2D(10.0, hex2d);
};

$._emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && (c.constructor === Array || c.is$List2());
  if (isList) {
    var t1 = '[';
  } else {
    t1 = '{';
  }
  $.add$1(result, t1);
  for (t1 = $.iterator(c), first = true; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (!first) {
      $.add$1(result, ', ');
    }
    $._emitObject(t2, result, visiting);
    first = false;
  }
  if (isList) {
    t1 = ']';
  } else {
    t1 = '}';
  }
  $.add$1(result, t1);
  $.removeLast(visiting);
  var first;
};

$.Island$data$1 = function(json) {
  var t1 = new $.Island((void 0), (void 0));
  t1.AbstractTerritory$data$1(json);
  return t1;
};

$._numberToString = function(x) {
  if (typeof x === 'number' && x === (x | 0)) {
    return $.toString(x);
  } else {
    if (typeof x === 'number') {
      return $.toString(x);
    } else {
      return $.toString($.toDouble(x));
    }
  }
};

$.Point2D$2 = function(x, y) {
  return new $.Point2D(y, x);
};

$.EndedGamePhase$0 = function() {
  return new $.EndedGamePhase(false, (void 0), (void 0), (void 0));
};

$._PeerConnection00EventsImpl$1 = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$.isNull = function(actual, reason) {
  if ((void 0) === actual) {
    return;
  }
  var msg = $._getMessage(reason);
  $._fail('Expect.isNull(actual: <' + $.S(actual) + '>' + $.S(msg) + ') fails.');
};

$.RandomPort$data$1 = function(json) {
  var t1 = new $.RandomPort((void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractPort$2((void 0), (void 0));
  t1.RandomPort$data$1(json);
  return t1;
};

$._WorkerContextEventsImpl$1 = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$.Chit11$0 = function() {
  return new $.Chit11((void 0));
};

$.ViewRouter$0 = function() {
  {};
  var t1 = new $.ViewRouter((void 0), (void 0));
  t1.ViewRouter$0();
  return t1;
};

$._DocumentEventsImpl$1 = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.supName = function(obj) {
  var temp = $.substring$1($.name(obj), 9);
  temp = $.substring$2(temp, 0, $.sub($.get$length(temp), 1));
  if ($.endsWith(temp, 'ie') === true) {
    temp = $.S($.substring$2(temp, 0, $.sub($.get$length(temp), 2))) + 'y';
  }
  if ($.endsWith(temp, 'se') === true) {
    temp = $.substring$2(temp, 0, $.sub($.get$length(temp), 1));
  }
  return temp;
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.Wheat$1 = function(id) {
  return new $.Wheat(id);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') {
    return receiver.split(pattern);
  } else {
    if (typeof pattern === 'object' && !!pattern.is$JSSyntaxRegExp) {
      return receiver.split($.regExpGetNative(pattern));
    } else {
      throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
    }
  }
};

$.User$3 = function(id, name$, email) {
  return new $.User(email, name$, id);
};

$._SpeechRecognitionEventsImpl$1 = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._JsonParser$_internal$1 = function(json) {
  var t1 = new $._JsonParser(0, $.get$length(json), json);
  t1._JsonParser$_internal$1(json);
  return t1;
};

$.ExpectGame$1 = function(game) {
  return new $.ExpectGame(game);
};

$._SVGElementInstanceEventsImpl$1 = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.Forest$data$1 = function(data) {
  var t1 = new $.Forest((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractTile$1((void 0));
  t1.Forest$data$1(data);
  return t1;
};

$.Mountain$1 = function(loc) {
  var t1 = new $.Mountain((void 0), (void 0), (void 0), loc, (void 0), (void 0), (void 0));
  t1.AbstractTile$1(loc);
  return t1;
};

$.SupportedResourceLists$0 = function() {
  var t1 = [$.ResourceListIm$1((void 0)), $.ResourceListMu$0(), $.TownCost$0(), $.RoadCost$0(), $.CityCost$0(), $.DevelopmentCardCost$0()];
  var t2 = new $.SupportedResourceLists((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.RollDice$0 = function() {
  return new $.RollDice((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.SupportedRandoms$0 = function() {
  var t1 = [$.ClientRandom$0()];
  var t2 = new $.SupportedRandoms((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.getMinutes = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t1 = ($.lazyAsJsDate(receiver).getUTCMinutes());
  } else {
    t1 = ($.lazyAsJsDate(receiver).getMinutes());
  }
  return t1;
};

$.geB = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    var t1 = (a >= b);
  } else {
    t1 = $.ge$slow(a, b) === true;
  }
  return t1;
};

$.window = function() {
  return window;;
};

$.ResourceListMu$from$1 = function(other) {
  var t1 = new $.ResourceListMu((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), true, (void 0));
  t1.ListenableList$from$1(other);
  t1.ResourceListMu$from$1(other);
  return t1;
};

$.add = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    var t1 = (a + b);
  } else {
    t1 = $.add$slow(a, b);
  }
  return t1;
};

$.Jsonable$data = function(data) {
  return $.Jsonable$type($.index(data, 'type')).copy$1(data);
};

$.PlayerListMu$0 = function() {
  var t1 = new $.PlayerListMu((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), true, (void 0));
  t1.ListenableList$0();
  return t1;
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.leB = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    var t1 = (a <= b);
  } else {
    t1 = $.le$slow(a, b) === true;
  }
  return t1;
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var result = (a % b);
    if (result === 0) {
      return 0;
    }
    if (result > 0) {
      return result;
    }
    var b = (b);
    if (b < 0) {
      return result - b;
    } else {
      return result + b;
    }
  }
  return a.operator$mod$1(b);
};

$.JoinGame$data$1 = function(json) {
  var t1 = new $.JoinGame((void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractLobbyAction$data$1(json);
  t1.JoinGame$data$1(json);
  return t1;
};

$.RejectOffer$data$1 = function(json) {
  var t1 = new $.RejectOffer((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractGameAction$data$1(json);
  return t1;
};

$._FrozenElementListIterator$1 = function(_list) {
  return new $._FrozenElementListIterator(0, _list);
};

$.SupportedDices$0 = function() {
  var t1 = [$.RandomDice$1((void 0)), $.PredictableDice$1((void 0)), $.StackDice$1((void 0))];
  var t2 = new $.SupportedDices((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$._JavaScriptAudioNodeEventsImpl$1 = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$._XMLHttpRequestEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && (o.constructor === Array || o.is$Collection())) {
    if ($._containsRef(visiting, o) === true) {
      if (typeof o === 'object' && (o.constructor === Array || o.is$List2())) {
        var t1 = '[...]';
      } else {
        t1 = '{...}';
      }
      $.add$1(result, t1);
    } else {
      $._emitCollection(o, result, visiting);
    }
  } else {
    if (typeof o === 'object' && o.is$Map()) {
      if ($._containsRef(visiting, o) === true) {
        $.add$1(result, '{...}');
      } else {
        $._emitMap(o, result, visiting);
      }
    } else {
      if ($.eqNullB(o)) {
        t1 = 'null';
      } else {
        t1 = o;
      }
      $.add$1(result, t1);
    }
  }
};

$.Forest$1 = function(loc) {
  var t1 = new $.Forest((void 0), (void 0), (void 0), loc, (void 0), (void 0), (void 0));
  t1.AbstractTile$1(loc);
  return t1;
};

$._emitMap = function(m, result, visiting) {
  var t1 = ({});
  t1.visiting_2 = visiting;
  t1.result_1 = result;
  $.add$1(t1.visiting_2, m);
  $.add$1(t1.result_1, '{');
  t1.first_3 = true;
  $.forEach(m, new $.Closure4(t1));
  $.add$1(t1.result_1, '}');
  $.removeLast(t1.visiting_2);
};

$.isFirefox = function() {
  return $.contains$2($.userAgent(), 'Firefox', 0);
};

$.Road$data$1 = function(json) {
  var t1 = new $.Road((void 0), (void 0), (void 0), (void 0));
  t1.Road$data$1(json);
  return t1;
};

$.NoneTile$data$1 = function(data) {
  var t1 = new $.NoneTile((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractTile$1((void 0));
  t1.NoneTile$data$1(data);
  return t1;
};

$.AllStatuses$data$1 = function(json) {
  return new $.AllStatuses((void 0), (void 0), (void 0), (void 0), (void 0));
};

$.notEquals = function(unexpected, actual, reason) {
  if (!$.eqB(unexpected, actual)) {
    return;
  }
  var msg = $._getMessage(reason);
  $._fail('Expect.notEquals(unexpected: <' + $.S(unexpected) + '>, actual:<' + $.S(actual) + '>' + $.S(msg) + ') ' + 'fails.');
};

$.CityCost$0 = function() {
  var t1 = [$.Ore$1((void 0)), $.Ore$1((void 0)), $.Ore$1((void 0)), $.Wheat$1((void 0)), $.Wheat$1((void 0))];
  var t2 = new $.CityCost((void 0));
  t2.ResourceListIm$1(t1);
  return t2;
};

$.SupportedGameStatuses$0 = function() {
  var t1 = [$.AbstractGameStatus$0(), $.Playing$0(), $.WaitingForReplacingUser$0(), $.AllStatuses$0()];
  var t2 = new $.SupportedGameStatuses((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.Playing$0 = function() {
  return new $.Playing((void 0));
};

$.City$data$1 = function(json) {
  var t1 = new $.City((void 0), (void 0), (void 0), (void 0));
  t1.City$data$1(json);
  return t1;
};

$._FileReaderEventsImpl$1 = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.VictoryPoint$data$1 = function(json) {
  var t1 = new $.VictoryPoint((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractDevelopmentCard$data$1(json);
  t1.VictoryPoint$data$1(json);
  return t1;
};

$.TradingTurnPhase$data$1 = function(json) {
  var t1 = new $.TradingTurnPhase((void 0));
  t1.TradingTurnPhase$data$1(json);
  return t1;
};

$.JoinLobby$data$1 = function(json) {
  var t1 = new $.JoinLobby((void 0), (void 0), (void 0), (void 0));
  t1.AbstractLobbyAction$data$1(json);
  t1.JoinLobby$data$1(json);
  return t1;
};

$.getYear = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t1 = ($.lazyAsJsDate(receiver).getUTCFullYear());
  } else {
    t1 = ($.lazyAsJsDate(receiver).getFullYear());
  }
  return t1;
};

$.eqNullB = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0)) === true;
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$.Element$tag = function(tag) {
  return document.createElement(tag);
};

$._FrameSetElementEventsImpl$1 = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a + b;
  } else {
    if (typeof a === 'string') {
      var b = $.toString(b);
      if (typeof b === 'string') {
        return a + b;
      }
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
  }
  return a.operator$add$1(b);
};

$.List$from = function(other) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.main = function() {
  $.Dartan$0();
};

$.Hexagon2D$1 = function(_sideLength) {
  var t1 = new $.Hexagon2D(2.0, 0.2, 0.8, (void 0), (void 0), (void 0), (void 0), _sideLength);
  t1.Hexagon2D$1(_sideLength);
  return t1;
};

$.HashSetIterator$1 = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$.SvgBoard$0 = function() {
  var t1 = new $.SvgBoard((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.SvgBoard$0();
  return t1;
};

$.IllegalArgumentException$1 = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.TurnsGamePhase$0 = function() {
  return new $.TurnsGamePhase((void 0), (void 0));
};

$.Pasture$data$1 = function(data) {
  var t1 = new $.Pasture((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractTile$1((void 0));
  t1.Pasture$data$1(data);
  return t1;
};

$._AllMatchesIterator$2 = function(re, _str) {
  return new $._AllMatchesIterator(false, (void 0), _str, $.JSSyntaxRegExp$_globalVersionOf$1(re));
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.truncate$0();
  }
  if (receiver < 0) {
    var t1 = $.ceil(receiver);
  } else {
    t1 = $.floor(receiver);
  }
  return t1;
};

$.ExpectServer$1 = function(server) {
  return new $.ExpectServer(server);
};

$.isInfinite = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.isInfinite$0();
  }
  return (receiver == Infinity) || (receiver == -Infinity);
};

$.ResourceListMu$0 = function() {
  var t1 = new $.ResourceListMu((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), true, (void 0));
  t1.ListenableList$0();
  t1.ResourceListMu$0();
  return t1;
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(needle, haystack, 1, length$, result, patternLength);
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) {
      break;
    }
    result.push($.StringMatch$3(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) {
      break;
    } else {
      if ($.eqB(position, endIndex)) {
        startIndex = $.add(startIndex, 1);
      } else {
        startIndex = endIndex;
      }
    }
  }
  return result;
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a <= b;
  }
  return a.operator$le$1(b);
};

$._ChildrenElementList$_wrap$1 = function(element) {
  return new $._ChildrenElementList(element.get$$$dom_children(), element);
};

$.Chit3$data$1 = function(json) {
  var t1 = new $.Chit3((void 0));
  t1.AbstractChit$data$1(json);
  return t1;
};

$.ListenableList$from$1 = function(other) {
  var t1 = new $.ListenableList((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), true, (void 0));
  t1.ListenableList$from$1(other);
  return t1;
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.SVGElement$svg = function(svg) {
  var match = $.CTC15.firstMatch$1(svg);
  if (!$.eqNullB(match) && $.eqB($.toLowerCase(match.group$1(1)), 'svg')) {
    var parentTag = $.Element$tag('div');
  } else {
    parentTag = $.SVGSVGElement();
  }
  parentTag.set$innerHTML(svg);
  if ($.eqB($.get$length(parentTag.get$elements()), 1)) {
    return $.removeLast(parentTag.get$nodes());
  }
  throw $.captureStackTrace($.IllegalArgumentException$1('SVG had ' + $.S($.get$length(parentTag.get$elements())) + ' ' + 'top-level elements but 1 expected'));
};

$.SupportedLobbyActions$0 = function() {
  var t1 = [$.AbstractLobbyAction$0(), $.JoinLobby$0(), $.NewGame$0(), $.JoinLobby$0(), $.JoinGame$0(), $.LeaveLobby$0()];
  var t2 = new $.SupportedLobbyActions((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.addLast$1(value);
  }
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.endsWith$1(other);
  }
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) {
    return false;
  }
  return $.eq(other, $.substring$1(receiver, $.sub(receiverLength, otherLength)));
};

$.getMilliseconds = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t1 = ($.lazyAsJsDate(receiver).getUTCMilliseconds());
  } else {
    t1 = ($.lazyAsJsDate(receiver).getMilliseconds());
  }
  return t1;
};

$.ListIterator$1 = function(list) {
  return new $.ListIterator(list, 0);
};

$.Cell$2 = function(row, column) {
  return new $.Cell((void 0), (void 0), (void 0), column, row);
};

$.copyJsonable = function(toCopy) {
  var data = toCopy.get$data();
  $.expectJsonifiesType(data);
  return $.Jsonable$data($.JsonObject$fromJsonString($.stringify(data), (void 0)));
};

$.Edge$fromVertices$2 = function(v1, v2) {
  var t1 = new $.Edge((void 0), (void 0), (void 0), -1, v2, v1, (void 0), (void 0));
  t1.Edge$fromVertices$2(v1, v2);
  return t1;
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.SupportedTiles$0 = function() {
  var t1 = [$.AbstractTile$1((void 0)), $.Sea$1((void 0)), $.Desert$1((void 0)), $.NoneTile$1((void 0)), $.Field$1((void 0)), $.Mountain$1((void 0)), $.Forest$1((void 0)), $.Hill$1((void 0)), $.Pasture$1((void 0))];
  var t2 = new $.SupportedTiles((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.isFalse = function(actual, reason) {
  if (actual === false) {
    return;
  }
  var msg = $._getMessage(reason);
  $._fail('Expect.isFalse(' + $.S(actual) + $.S(msg) + ') fails.');
};

$.NewGame$data$1 = function(json) {
  var t1 = new $.NewGame((void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractLobbyAction$data$1(json);
  t1.NewGame$data$1(json);
  return t1;
};

$.TileVisual$svg$2 = function(board2d, tile) {
  var t1 = new $.TileVisual((void 0), (void 0), tile, (void 0), (void 0), board2d, (void 0), false, false, false, false);
  t1.AbstractVisual$svg$1(board2d);
  t1.TileVisual$svg$2(board2d, tile);
  return t1;
};

$.ltB = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    var t1 = (a < b);
  } else {
    t1 = $.lt$slow(a, b) === true;
  }
  return t1;
};

$.Cell$data$1 = function(json) {
  var t1 = new $.Cell((void 0), (void 0), (void 0), (void 0), (void 0));
  t1.Cell$data$1(json);
  return t1;
};

$.LeaveLobby$data$1 = function(data) {
  var t1 = new $.LeaveLobby((void 0), (void 0), (void 0), (void 0));
  t1.AbstractLobbyAction$data$1(data);
  return t1;
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.getRange$2(start, length$);
  }
  if (0 === length$) {
    return [];
  }
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(start));
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  if (length$ < 0) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  if (start < 0) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  }
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver))) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(length$));
  }
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  return receiver.slice(start, end);
};

$.getRange2 = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.getRange2$bailout(a, start, length$, accumulator, 1, a, 0);
  if (typeof start !== 'number') return $.getRange2$bailout(a, start, length$, accumulator, 2, a, start);
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1('length'));
  }
  if (start < 0) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  }
  var end = $.add(start, length$);
  if (end > a.length) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
  }
  for (var i = start; i < end; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    $.add$1(accumulator, a[i]);
  }
  return accumulator;
};

$.JsonStringifier$_internal$0 = function() {
  var t1 = $.StringBufferImpl$1('');
  var t2 = $.List((void 0));
  $.setRuntimeTypeInfo(t2, ({E: 'Object'}));
  return new $.JsonStringifier(t2, t1);
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) {
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return res;
};

$.EdgeVisual$svg$2 = function(board2d, edge) {
  var t1 = new $.EdgeVisual((void 0), (void 0), board2d, (void 0), false, false, false, false);
  t1.AbstractVisual$svg$1(board2d);
  t1.EdgeVisual$svg$2(board2d, edge);
  return t1;
};

$.jsPropertyAccess = function(jsObject, property) {
  return jsObject[property];
};

$.LobbyPhase$data$1 = function(json) {
  var t1 = new $.LobbyPhase((void 0), (void 0));
  t1.AbstractGamePhase$data$1(json);
  t1.LobbyPhase$data$1(json);
  return t1;
};

$._TextTrackListEventsImpl$1 = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._DeprecatedPeerConnectionEventsImpl$1 = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$.AbstractGameStatus$data$1 = function(json) {
  var t1 = new $.AbstractGameStatus((void 0));
  t1.AbstractGameStatus$data$1(json);
  return t1;
};

$.Chit12$0 = function() {
  return new $.Chit12((void 0));
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  if (r === (void 0)) {
    r = (regExp._re = $.regExpMakeNative(regExp, false));
  }
  return r;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$4(obj, name$, arguments$, (void 0)));
};

$._dynamicMetadata2 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.Clay$1 = function(id) {
  return new $.Clay(id);
};

$.Town$0 = function() {
  return new $.Town((void 0), (void 0), (void 0), (void 0));
};

$.DiceRoll$data$1 = function(json) {
  var t1 = new $.DiceRoll((void 0), (void 0));
  t1.DiceRoll$data$1(json);
  return t1;
};

$.Chit6$0 = function() {
  return new $.Chit6((void 0));
};

$.Field$data$1 = function(data) {
  var t1 = new $.Field((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractTile$1((void 0));
  t1.Field$data$1(data);
  return t1;
};

$.DefaultJsonable$data$1 = function(json) {
  var t1 = new $.DefaultJsonable(0);
  t1.DefaultJsonable$data$1(json);
  return t1;
};

$.getSeconds = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t1 = ($.lazyAsJsDate(receiver).getUTCSeconds());
  } else {
    t1 = ($.lazyAsJsDate(receiver).getSeconds());
  }
  return t1;
};

$._WindowEventsImpl$1 = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.VerticeVisual$svg$2 = function(board2d, vertice) {
  var t1 = new $.VerticeVisual(vertice, (void 0), board2d, (void 0), false, false, false, false);
  t1.AbstractVisual$svg$1(board2d);
  t1.VerticeVisual$svg$2(board2d, vertice);
  return t1;
};

$.TypeError$1 = function(msg) {
  return new $.TypeError(msg);
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return true;
    } else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
  }
  return false;
};

$.random = function() {
  return $.random2();
};

$.random2 = function() {
  return Math.random();
};

$._DoubleLinkedQueueEntrySentinel$0 = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel((void 0), (void 0), (void 0));
  t1.DoubleLinkedQueueEntry$1((void 0));
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.getHours = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t1 = ($.lazyAsJsDate(receiver).getUTCHours());
  } else {
    t1 = ($.lazyAsJsDate(receiver).getHours());
  }
  return t1;
};

$.ListViewPerType$1 = function(title) {
  var t1 = new $.ListViewPerType((void 0), (void 0), (void 0), (void 0), (void 0), title);
  t1.ListViewPerType$1(title);
  return t1;
};

$._ElementAttributeMap$1 = function(_element) {
  return new $._ElementAttributeMap(_element);
};

$.BoardsViewer$0 = function() {
  var t1 = new $.BoardsViewer((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.BoardsViewer$0();
  return t1;
};

$.Vertice$data$1 = function(json) {
  var t1 = new $.Vertice((void 0), (void 0), (void 0), -1, (void 0), (void 0), (void 0), (void 0));
  t1.Vertice$data$1(json);
  return t1;
};

$.TradeOffer$data$1 = function(json) {
  var t1 = new $.TradeOffer((void 0), false, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractGameAction$data$1(json);
  t1.TradeOffer$data$1(json);
  return t1;
};

$.PredictableDice$1 = function(rolls) {
  var t1 = new $.PredictableDice((void 0), rolls);
  t1.PredictableDice$1(rolls);
  return t1;
};

$.SupportedGames$0 = function() {
  var t1 = [$.Game$0()];
  var t2 = new $.SupportedGames((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.WaitingForReplacingUser$data$1 = function(json) {
  var t1 = new $.WaitingForReplacingUser((void 0), (void 0));
  t1.AbstractGameStatus$data$1(json);
  return t1;
};

$.Hill$data$1 = function(data) {
  var t1 = new $.Hill((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractTile$1((void 0));
  t1.Hill$data$1(data);
  return t1;
};

$.Standard4p$0 = function() {
  var t1 = new $.Standard4p($.CTC14, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.Board$2((void 0), (void 0));
  t1.Standard4p$0();
  return t1;
};

$.Island$1 = function(id) {
  return new $.Island((void 0), (void 0));
};

$.Hill$1 = function(loc) {
  var t1 = new $.Hill((void 0), (void 0), (void 0), loc, (void 0), (void 0), (void 0));
  t1.AbstractTile$1(loc);
  return t1;
};

$.CellTextEntry$2 = function(cell, textElement) {
  return new $.CellTextEntry(cell, textElement);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if (index < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    if (index >= receiver.length) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    return receiver.charCodeAt(index);
  } else {
    return receiver.charCodeAt$1(index);
  }
};

$.Sheep$data$1 = function(data) {
  var t1 = new $.Sheep((void 0));
  t1.AbstractResource$data$1(data);
  return t1;
};

$.DevelopmentCardCost$0 = function() {
  var t1 = [$.Wheat$1((void 0)), $.Ore$1((void 0)), $.Sheep$1((void 0))];
  var t2 = new $.DevelopmentCardCost((void 0));
  t2.ResourceListIm$1(t1);
  return t2;
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.toInt$0();
  }
  if ($.isNaN(receiver) === true) {
    throw $.captureStackTrace($.BadNumberFormatException$1('NaN'));
  }
  if ($.isInfinite(receiver) === true) {
    throw $.captureStackTrace($.BadNumberFormatException$1('Infinity'));
  }
  var truncated = $.truncate(receiver);
  if (truncated == -0.0) {
    var t1 = 0;
  } else {
    t1 = truncated;
  }
  return t1;
};

$.BeforeDiceRollTurnPhase$0 = function() {
  return new $.BeforeDiceRollTurnPhase((void 0));
};

$.KeyValuePair$2 = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$.SupportedPieces$0 = function() {
  var t1 = [$.Road$0(), $.Town$0(), $.City$0()];
  var t2 = new $.SupportedPieces((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.ObservableHelper$0 = function() {
  return new $.ObservableHelper($.HashMapImplementation$0());
};

$.GameTester$manual$1 = function(sgt) {
  var t1 = new $.GameTester(0, (void 0), 0, (void 0), (void 0), true, 250, true);
  t1.GameTester$manual$1(sgt);
  return t1;
};

$.print = function(obj) {
  return $.printString($.toString(obj));
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.div = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    var t1 = (a / b);
  } else {
    t1 = $.div$slow(a, b);
  }
  return t1;
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});;
};

$.RandomTile$1 = function(loc) {
  var t1 = new $.RandomTile((void 0), (void 0), (void 0), loc, (void 0), (void 0), (void 0));
  t1.AbstractTile$1(loc);
  return t1;
};

$.AbstractPort$data$1 = function(json) {
  var t1 = new $.AbstractPort((void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractPort$data$1(json);
  return t1;
};

$.Say$data$1 = function(json) {
  var t1 = new $.Say((void 0), false, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractGameAction$data$1(json);
  t1.Say$data$1(json);
  return t1;
};

$.JoinLobby$0 = function() {
  return new $.JoinLobby((void 0), (void 0), (void 0), (void 0));
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f === (void 0)) && (!!f.methods)) {
    return f.methods;
  }
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC23)[name$]);
  if (!(dartMethod === (void 0))) {
    methods['Object'] = dartMethod;
  }
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.TwoToOnePort$data$1 = function(json) {
  var t1 = new $.TwoToOnePort((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractPort$2((void 0), (void 0));
  t1.TwoToOnePort$data$1(json);
  return t1;
};

$.TradeBank$0 = function() {
  return new $.TradeBank((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
};

$.checkInt = function(value) {
  if (!((typeof value === 'number') && (value === (value | 0)))) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.addAll = function(receiver, collection) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.addAll$1(collection);
  }
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true; ) {
    $.add$1(receiver, iterator.next$0());
  }
};

$.BoardActionBar$0 = function() {
  {};
  var t1 = new $.BoardActionBar((void 0), (void 0), (void 0), (void 0));
  t1.BoardActionBar$0();
  return t1;
};

$.objectToString = function(object) {
  var name$ = $.getTypeNameOf(object);
  if ($.charCodeAt(name$, 0) === 36) {
    name$ = $.substring$1(name$, 1);
  }
  return 'Instance of \'' + $.S(name$) + '\'';
};

$.checkBool = function(value) {
  if (!(typeof value === 'boolean')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.Desert$1 = function(loc) {
  var t1 = new $.Desert((void 0), (void 0), (void 0), loc, (void 0), (void 0), (void 0));
  t1.AbstractTile$1(loc);
  return t1;
};

$.DateImplementation$fromString = function(formattedString) {
  var match = $.CTC10.firstMatch$1(formattedString);
  if (!(match === (void 0))) {
    var t1 = new $.Closure30();
    var t2 = new $.Closure31();
    var years = $.parseInt($.index(match, 1));
    var month = $.parseInt($.index(match, 2));
    var day = $.parseInt($.index(match, 3));
    var hours = t1.$call$1($.index(match, 4));
    var minutes = t1.$call$1($.index(match, 5));
    var seconds = t1.$call$1($.index(match, 6));
    var milliseconds = $.toInt($.round($.mul(t2.$call$1($.index(match, 7)), 1000)));
    if ($.eqB(milliseconds, 1000)) {
      var addOneMillisecond = true;
      milliseconds = 999;
    } else {
      addOneMillisecond = false;
    }
    var isUtc = !($.index(match, 8) === (void 0)) && !$.eqB($.index(match, 8), '');
    var epochValue = $.valueFromDecomposedDate(years, month, day, hours, minutes, seconds, milliseconds, isUtc);
    if (epochValue === (void 0)) {
      throw $.captureStackTrace($.IllegalArgumentException$1(formattedString));
    }
    if (addOneMillisecond) {
      epochValue = $.add(epochValue, 1);
    }
    return $.DateImplementation$fromEpoch$2(epochValue, isUtc);
  } else {
    throw $.captureStackTrace($.IllegalArgumentException$1(formattedString));
  }
};

$.RejectOffer$0 = function() {
  return new $.RejectOffer((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
};

$.TradingTurnPhase$0 = function() {
  return new $.TradingTurnPhase((void 0));
};

$.Chit9$0 = function() {
  return new $.Chit9((void 0));
};

$.DiceRoll$fromTotal$1 = function(total) {
  var t1 = new $.DiceRoll((void 0), (void 0));
  t1.DiceRoll$fromTotal$1(total);
  return t1;
};

$.AcceptOffer$0 = function() {
  return new $.AcceptOffer((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
};

$.AllPhases$0 = function() {
  var t1 = new $.AllPhases((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AllPhases$0();
  return t1;
};

$.ResourceListImTest$0 = function() {
  return new $.ResourceListImTest();
};

$.Edge$2 = function(c1, c2) {
  var t1 = new $.Edge((void 0), (void 0), (void 0), -1, (void 0), (void 0), c2, c1);
  t1.Edge$2(c1, c2);
  return t1;
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.trim$0();
  }
  return receiver.trim();
};

$.ThreeToOnePort$data$1 = function(json) {
  var t1 = new $.ThreeToOnePort((void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractPort$2((void 0), (void 0));
  t1.ThreeToOnePort$data$1(json);
  return t1;
};

$.Views$0 = function() {
  var t1 = new $.Views(false, (void 0));
  t1.View$0();
  t1.Views$0();
  return t1;
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  if (method === (void 0) && !($._dynamicMetadata2() === (void 0))) {
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata2())); ++i) {
      var entry = $.index($._dynamicMetadata2(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = (methods[entry.get$tag()]);
        if (!(method === (void 0))) {
          break;
        }
      }
    }
  }
  if (method === (void 0)) {
    method = (methods['Object']);
  }
  var proto = (Object.getPrototypeOf(obj));
  if (method === (void 0)) {
    method = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  }
  var nullCheckMethod = (function() {var res = method.apply(this, Array.prototype.slice.call(arguments));return res === null ? (void 0) : res;});
  if (!proto.hasOwnProperty(name$)) {
    $.defineProperty(proto, name$, nullCheckMethod);
  }
  return nullCheckMethod.apply(obj, arguments$);
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      return a[key];
    }
  }
  return $.index$slow(a, index);
};

$.Player$data$1 = function(json) {
  var t1 = new $.Player((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.Player$data$1(json);
  return t1;
};

$.generateHashCode = function(obj) {
  return $.toInt($.mul($.random(), 10000000));
};

$.expectEqualCopy = function(thing) {
  thingCopy = (void 0);
  try {
    thingCopy = $.copyJsonable(thing);
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    if (t1 === (void 0) || typeof t1 === 'object' && !!t1.is$Exception) {
      ex = t1;
      $.fail('Failed copying a ' + $.S($.name(thing)) + ' because ' + $.S($.toString(ex)));
    } else {
      throw exception;
    }
  }
  var concreteName = $.name(thing);
  $.isTrue(!$.eqNullB(thingCopy), 'Expected copied instance of ' + $.S(concreteName));
  $.isTrue(thing.equals$1(thingCopy), 'Copying a ' + $.S(concreteName) + ' failed');
};

$.toDouble = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.toDouble$0();
  }
  return receiver;
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.toLowerCase$0();
  }
  return receiver.toLowerCase();
};

$._isPowerOfTwo = function(x) {
  return $.eq($.and(x, $.sub(x, 1)), 0);
};

$._XMLHttpRequestUploadEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$._CssClassSet$1 = function(_element) {
  return new $._CssClassSet(_element);
};

$.captureStackTrace = function(ex) {
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.NewGame$0 = function() {
  return new $.NewGame((void 0), (void 0), (void 0), (void 0), (void 0));
};

$.Element$html = function(html) {
  var match = $.CTC15.firstMatch$1(html);
  if (!(match === (void 0))) {
    var tag = $.toLowerCase(match.group$1(1));
    if ($.CTC17.containsKey$1(tag) === true) {
      var parentTag = $.CTC17.operator$index$1(tag);
    } else {
      parentTag = 'div';
    }
  } else {
    tag = (void 0);
    parentTag = 'div';
  }
  var temp = $.Element$tag(parentTag);
  temp.set$innerHTML(html);
  if ($.eqB($.get$length(temp.get$elements()), 1)) {
    var element = temp.get$elements().get$first();
  } else {
    if ($.eqB(parentTag, 'html') && $.eqB($.get$length(temp.get$elements()), 2)) {
      var t1 = temp.get$elements();
      if ($.eqB(tag, 'head')) {
        var t2 = 0;
      } else {
        t2 = 1;
      }
      element = $.index(t1, t2);
    } else {
      throw $.captureStackTrace($.IllegalArgumentException$1('HTML had ' + $.S($.get$length(temp.get$elements())) + ' ' + 'top level elements but 1 expected'));
    }
  }
  element.remove$0();
  return element;
};

$.StackOverflowException$0 = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b);
    } else {
      return a === b;
    }
  }
  return a === b;
};

$.join = function(strings, separator) {
  return $.join2(strings, separator);
};

$.join2 = function(strings, separator) {
  if (typeof separator !== 'string') return $.join2$bailout(strings, separator, 1, separator);
  $.checkNull(strings);
  $.checkNull(separator);
  for (var t1 = $.iterator(strings), first = true, result = ''; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    $.checkNull(t2);
    if (!(typeof t2 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t2));
    }
    if (!first) {
      result = result + separator;
    }
    result = result + t2;
    first = false;
  }
  return result;
};

$.AbstractGameAction$0 = function() {
  return new $.AbstractGameAction((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
};

$.CounterOffer$0 = function() {
  return new $.CounterOffer((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
};

$.AbstractResource$1 = function(id) {
  return new $.AbstractResource(id);
};

$.gtB = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    var t1 = (a > b);
  } else {
    t1 = $.gt$slow(a, b) === true;
  }
  return t1;
};

$._fail = function(message) {
  throw $.captureStackTrace($.ExpectException$1(message));
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target === (void 0))) {
    target.builtin$typeInfo = typeInfo;
  }
};

$.document = function() {
  return document;;
};

$.listFrom = function(jsonObjects) {
  if ($.eqNullB(jsonObjects)) {
    return $.List((void 0));
  } else {
    var l = $.List((void 0));
    for (var t1 = $.iterator(jsonObjects); t1.hasNext$0() === true; ) {
      l.push($.Jsonable$data(t1.next$0()));
    }
    return l;
  }
};

$._FileWriterEventsImpl$1 = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.ceil$0();
  }
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf === (void 0)) {
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  }
  return $._getTypeNameOf.$call$1(obj);
};

$.ResourceListMuTest$0 = function() {
  return new $.ResourceListMuTest();
};

$.RollDice$data$1 = function(json) {
  var t1 = new $.RollDice((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractGameAction$data$1(json);
  t1.RollDice$data$1(json);
  return t1;
};

$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a * b;
  }
  return a.operator$mul$1(b);
};

$.Town$data$1 = function(json) {
  var t1 = new $.Town((void 0), (void 0), (void 0), (void 0));
  t1.Town$data$1(json);
  return t1;
};

$._ChildNodeListLazy$1 = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$._AudioContextEventsImpl$1 = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.JsonObject$fromJsonString = function(_jsonString, t) {
  if ($.eqNullB(t)) {
    var t = $.JsonObject$0();
  }
  t.set$_jsonString(_jsonString);
  t.set$_objectData($.parse(t.get$_jsonString()));
  t._extractElements$1(t.get$_objectData());
  t.set$isExtendable(false);
  return t;
};

$.HashSetImplementation$from = function(other) {
  var set = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(set, ({E: 'E'}));
  for (var t1 = $.iterator(other); t1.hasNext$0() === true; ) {
    set.add$1(t1.next$0());
  }
  return set;
};

$.RandomTest$0 = function() {
  return new $.RandomTest();
};

$._NodeListWrapper$1 = function(list) {
  return new $._NodeListWrapper(list);
};

$.DetermineFirstPlayerGamePhase$0 = function() {
  var t1 = new $.DetermineFirstPlayerGamePhase((void 0), (void 0), (void 0));
  t1.DetermineFirstPlayerGamePhase$0();
  return t1;
};

$.jsHasOwnProperty = function(jsObject, property) {
  return jsObject.hasOwnProperty(property);
};

$.GameTest$0 = function() {
  var t1 = new $.GameTest((void 0), (void 0), (void 0), (void 0), (void 0), 0, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.GameTest$0();
  return t1;
};

$.isJsArray = function(value) {
  return !(value === (void 0)) && (value.constructor === Array);
};

$.AllPhases$data$1 = function(json) {
  var t1 = new $.AllPhases((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AllPhases$data$1(json);
  return t1;
};

$.ResourceListIm$1 = function(other) {
  var t1 = new $.ResourceListIm((void 0));
  t1.ResourceListIm$1(other);
  return t1;
};

$.Sheep$1 = function(id) {
  return new $.Sheep(id);
};

$.RandomPort$2 = function(seaCell, edgeDirection) {
  var t1 = new $.RandomPort(edgeDirection, (void 0), seaCell, (void 0), (void 0), (void 0));
  t1.AbstractPort$2(seaCell, edgeDirection);
  return t1;
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.PortVisual$svg$1 = function(board2d) {
  var t1 = new $.PortVisual((void 0), (void 0), board2d, (void 0), false, false, false, false);
  t1.AbstractVisual$svg$1(board2d);
  t1.PortVisual$svg$1(board2d);
  return t1;
};

$.JoinGame$0 = function() {
  return new $.JoinGame((void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
};

$.DateImplementation$now$0 = function() {
  var t1 = new $.DateImplementation(false, $.dateNow());
  t1.DateImplementation$now$0();
  return t1;
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a >= b;
  }
  return a.operator$ge$1(b);
};

$.JsonObject$fromMap$1 = function(map) {
  var t1 = new $.JsonObject((void 0), (void 0), (void 0), (void 0), (void 0));
  t1.JsonObject$fromMap$1(map);
  return t1;
};

$.BoardViewer$0 = function() {
  var t1 = new $.BoardViewer((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.BoardViewer$0();
  return t1;
};

$.Lobby$0 = function() {
  var t1 = new $.Lobby(0, (void 0), (void 0), (void 0), (void 0));
  t1.Lobby$0();
  return t1;
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  }
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) {
      return 'Document';
    }
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) {
    return 'HTMLTableCellElement';
  }
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) {
    return 'HTMLTableCellElement';
  }
  if ($.eqB(name$, 'MSStyleCSSProperties')) {
    return 'CSSStyleDeclaration';
  }
  if ($.eqB(name$, 'CanvasPixelArray')) {
    return 'Uint8ClampedArray';
  }
  if ($.eqB(name$, 'HTMLPhraseElement')) {
    return 'HTMLElement';
  }
  return name$;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object')) {
      return name$;
    }
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.DummyDevelopmentCard$data$1 = function(json) {
  var t1 = new $.DummyDevelopmentCard((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractDevelopmentCard$data$1(json);
  return t1;
};

$.Player$1 = function(_user) {
  var t1 = new $.Player((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), _user);
  t1.Player$1(_user);
  return t1;
};

$.replaceFirst = function(receiver, from, to) {
  if (!(typeof receiver === 'string')) {
    return receiver.replaceFirst$2(from, to);
  }
  $.checkString(to);
  return $.stringReplaceFirstUnchecked(receiver, from, to);
};

$.RandomDice$data$1 = function(data) {
  return new $.RandomDice((void 0));
};

$.Chit2$0 = function() {
  return new $.Chit2((void 0));
};

$.AbstractTurnPhase$data$1 = function(json) {
  var t1 = new $.AbstractTurnPhase((void 0));
  t1.AbstractTurnPhase$data$1(json);
  return t1;
};

$.stringReplaceFirstUnchecked = function(receiver, from, to) {
  if (typeof from === 'string') {
    return $.stringReplaceJS(receiver, from, to);
  } else {
    if (typeof from === 'object' && !!from.is$JSSyntaxRegExp) {
      return $.stringReplaceJS(receiver, $.regExpGetNative(from), to);
    } else {
      $.checkNull(from);
      throw $.captureStackTrace('StringImplementation.replace(Pattern) UNIMPLEMENTED');
    }
  }
};

$.expectJsonifiesType = function(json) {
  $.isTrue(!$.eqNullB($.index(json, 'type')), (void 0));
};

$.isNotNull = function(actual, reason) {
  if (!((void 0) === actual)) {
    return;
  }
  var msg = $._getMessage(reason);
  $._fail('Expect.isNotNull(actual: <' + $.S(actual) + '>' + $.S(msg) + ') fails.');
};

$.FourToOnePort$2 = function(seaCell, edgeDirection) {
  var t1 = new $.FourToOnePort(edgeDirection, (void 0), seaCell, (void 0), (void 0), (void 0));
  t1.AbstractPort$2(seaCell, edgeDirection);
  return t1;
};

$.Objects$0 = function() {
  var t1 = new $.Objects(false, (void 0));
  t1.View$0();
  t1.Objects$0();
  return t1;
};

$.DiceRollTurnPhase$data$1 = function(json) {
  var t1 = new $.DiceRollTurnPhase((void 0));
  t1.DiceRollTurnPhase$data$1(json);
  return t1;
};

$.Playing$data$1 = function(json) {
  var t1 = new $.Playing((void 0));
  t1.AbstractGameStatus$data$1(json);
  return t1;
};

$.sqrt = function(x) {
  return $.sqrt2(x);
};

$.sqrt2 = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.AbstractChit$data$1 = function(json) {
  var t1 = new $.AbstractChit((void 0));
  t1.AbstractChit$data$1(json);
  return t1;
};

$.Board$2 = function(columns, rows) {
  var t1 = new $.Board((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), rows, columns, (void 0));
  t1.Board$2(columns, rows);
  return t1;
};

$.name = function(obj) {
  if (!$.eqNullB(obj)) {
    var temp = $.substring$1($.toString(obj), 13);
    return $.substring$2(temp, 0, $.sub($.get$length(temp), 1));
  } else {
    return 'null';
  }
};

$.TwoToOnePort$3 = function(resource, seaCell, edgeDirection) {
  var t1 = new $.TwoToOnePort(resource, edgeDirection, (void 0), seaCell, (void 0), (void 0), (void 0));
  t1.AbstractPort$2(seaCell, edgeDirection);
  t1.TwoToOnePort$3(resource, seaCell, edgeDirection);
  return t1;
};

$._DOMApplicationCacheEventsImpl$1 = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.StartGame$0 = function() {
  return new $.StartGame((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  var t1 = ({});
  t1.arg2_3 = arg2;
  t1.arg1_2 = arg1;
  t1.closure_1 = closure;
  if ($.eqB(numberOfArguments, 0)) {
    return new $.Closure27(t1).$call$0();
  } else {
    if ($.eqB(numberOfArguments, 1)) {
      return new $.Closure28(t1).$call$0();
    } else {
      if ($.eqB(numberOfArguments, 2)) {
        return new $.Closure29(t1).$call$0();
      } else {
        throw $.captureStackTrace($.ExceptionImplementation$1('Unsupported number of arguments for wrapped closure'));
      }
    }
  }
};

$.gt = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    var t1 = (a > b);
  } else {
    t1 = $.gt$slow(a, b);
  }
  return t1;
};

$.Timber$data$1 = function(data) {
  var t1 = new $.Timber((void 0));
  t1.AbstractResource$data$1(data);
  return t1;
};

$.assert = function(condition) {
};

$.Mountain$data$1 = function(data) {
  var t1 = new $.Mountain((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractTile$1((void 0));
  t1.Mountain$data$1(data);
  return t1;
};

$.AllStatuses$0 = function() {
  return new $.AllStatuses((void 0), (void 0), (void 0), (void 0), (void 0));
};

$.last = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.last$0();
  }
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$._getMessage = function(reason) {
  if (reason === (void 0)) {
    var t1 = '';
  } else {
    t1 = ', \'' + $.S(reason) + '\'';
  }
  return t1;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$1(other);
  }
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$1 = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    var t1 = (a * b);
  } else {
    t1 = $.mul$slow(a, b);
  }
  return t1;
};

$.User$data$1 = function(json) {
  var t1 = new $.User((void 0), (void 0), (void 0));
  t1.User$data$1(json);
  return t1;
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix === (void 0)) {
    if ($.isFirefox() === true) {
      $._cachedBrowserPrefix = '-moz-';
    } else {
      $._cachedBrowserPrefix = '-webkit-';
    }
  }
  return $._cachedBrowserPrefix;
};

$.isTrue = function(actual, reason) {
  if (actual === true) {
    return;
  }
  var msg = $._getMessage(reason);
  $._fail('Expect.isTrue(' + $.S(actual) + $.S(msg) + ') fails.');
};

$.StackDice$1 = function(random) {
  var t1 = new $.StackDice(random, 0, (void 0), (void 0));
  t1.StackDice$1(random);
  return t1;
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  }
};

$.SupportedTurnPhases$0 = function() {
  var t1 = [$.AbstractTurnPhase$0(), $.TradingTurnPhase$0(), $.BuildingTurnPhase$0(), $.DiceRollTurnPhase$0(), $.BeforeDiceRollTurnPhase$0()];
  var t2 = new $.SupportedTurnPhases((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.ExpectException$1 = function(message) {
  return new $.ExpectException(message);
};

$.Test$0 = function() {
  var t1 = new $.Test(false, (void 0));
  t1.View$0();
  t1.Test$0();
  return t1;
};

$.Chit8$0 = function() {
  return new $.Chit8((void 0));
};

$.fromData = function(json) {
  if ($.eqNullB(json)) {
    return;
  } else {
    return $.Jsonable$data(json);
  }
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a - b;
  }
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._ElementList$1 = function(list) {
  return new $._ElementList(list);
};

$.TileMeasurementInfo$0 = function() {
  var t1 = new $.TileMeasurementInfo((void 0), (void 0), (void 0), (void 0));
  t1.TileMeasurementInfo$0();
  return t1;
};

$.SupportedPorts$0 = function() {
  var t1 = [$.AbstractPort$2((void 0), (void 0)), $.FourToOnePort$2((void 0), (void 0)), $.ThreeToOnePort$2((void 0), (void 0)), $.TwoToOnePort$3((void 0), (void 0), (void 0))];
  var t2 = new $.SupportedPorts((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.EndedGamePhase$data$1 = function(json) {
  var t1 = new $.EndedGamePhase(false, (void 0), (void 0), (void 0));
  t1.AbstractGamePhase$data$1(json);
  t1.EndedGamePhase$data$1(json);
  return t1;
};

$.link = function(obj) {
  return '<span>' + $.S($.smallIcon(obj)) + ' <a href="' + $.S($.name(obj)) + '.html">' + $.S($.name(obj)) + '</a></span>';
};

$.getDay = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t1 = ($.lazyAsJsDate(receiver).getUTCDate());
  } else {
    t1 = ($.lazyAsJsDate(receiver).getDate());
  }
  return t1;
};

$._EventsImpl$1 = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.HashSetImplementation$0 = function() {
  var t1 = new $.HashSetImplementation((void 0));
  t1.HashSetImplementation$0();
  return t1;
};

$.DateImplementation$fromEpoch$2 = function(value, isUtc) {
  return new $.DateImplementation($.checkNull(isUtc), value);
};

$._IDBRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  }
};

$.NoState$0 = function() {
  return new $.NoState((void 0));
};

$.ChitVisual$svg$1 = function(b) {
  var t1 = new $.ChitVisual((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), b, (void 0), false, false, false, false);
  t1.AbstractVisual$svg$1(b);
  t1.ChitVisual$svg$1(b);
  return t1;
};

$.AbstractLobbyAction$data$1 = function(json) {
  var t1 = new $.AbstractLobbyAction((void 0), (void 0), (void 0), (void 0));
  t1.AbstractLobbyAction$data$1(json);
  return t1;
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) {
    return;
  }
  return result;
};

$.getMonth = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t1 = ($.lazyAsJsDate(receiver).getUTCMonth()) + 1;
  } else {
    t1 = ($.lazyAsJsDate(receiver).getMonth()) + 1;
  }
  return t1;
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    return $.ListIterator$1(receiver);
  }
  return receiver.iterator$0();
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') {
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  } else {
    if (typeof other === 'object' && !!other.is$JSSyntaxRegExp) {
      return other.hasMatch$1($.substring$1(receiver, startIndex));
    } else {
      return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
    }
  }
};

$.EdgeTest$0 = function() {
  return new $.EdgeTest();
};

$.Game$0 = function() {
  var t1 = new $.Game((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), 0, (void 0), 'UnnamedGame', (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.Game$0();
  return t1;
};

$.ObjectNotClosureException$0 = function() {
  return new $.ObjectNotClosureException();
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.abs$0();
  }
  return Math.abs(receiver);
};

$.BoardTest$0 = function() {
  return new $.BoardTest();
};

$.Intro$0 = function() {
  var t1 = new $.Intro(false, (void 0));
  t1.View$0();
  return t1;
};

$.regExpMakeNative = function(regExp, global) {
  pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  sb = $.StringBufferImpl$1('');
  if (multiLine === true) {
    $.add$1(sb, 'm');
  }
  if (ignoreCase === true) {
    $.add$1(sb, 'i');
  }
  if (global === true) {
    $.add$1(sb, 'g');
  }
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$2(pattern, (String(e))));
  }
};

$.CounterOffer$data$1 = function(json) {
  var t1 = new $.CounterOffer((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractGameAction$data$1(json);
  t1.CounterOffer$data$1(json);
  return t1;
};

$.BadNumberFormatException$1 = function(_s) {
  return new $.BadNumberFormatException(_s);
};

$.stringify = function(object) {
  return $.stringify2(object);
};

$.stringify2 = function(object) {
  var stringifier = $.JsonStringifier$_internal$0();
  stringifier._stringify$1(object);
  return stringifier.get$_result();
};

$.Desert$data$1 = function(json) {
  var t1 = new $.Desert((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractTile$1((void 0));
  t1.Desert$data$1(json);
  return t1;
};

$.FourToOnePort$data$1 = function(json) {
  var t1 = new $.FourToOnePort((void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractPort$2((void 0), (void 0));
  t1.FourToOnePort$data$1(json);
  return t1;
};

$.AbstractTerritory$1 = function(id) {
  return new $.AbstractTerritory((void 0), (void 0));
};

$.Clay$data$1 = function(data) {
  var t1 = new $.Clay((void 0));
  t1.AbstractResource$data$1(data);
  return t1;
};

$.mapToString = function(m) {
  var result = $.StringBufferImpl$1('');
  $._emitMap(m, result, $.List((void 0)));
  return result.toString$0();
};

$.lazyAsJsDate = function(receiver) {
  if (receiver.date === (void 0)) {
    receiver.date = new Date(receiver.get$value());
  }
  return receiver.date;
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length === 0;
  }
  return receiver.isEmpty$0();
};

$._IDBDatabaseEventsImpl$1 = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.VerticeTest$0 = function() {
  return new $.VerticeTest();
};

$.ge = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    var t1 = (a >= b);
  } else {
    t1 = $.ge$slow(a, b);
  }
  return t1;
};

$.InitialPlacementGamePhase$0 = function() {
  return new $.InitialPlacementGamePhase((void 0), (void 0), (void 0));
};

$._TextTrackCueEventsImpl$1 = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.TownTest$0 = function() {
  return new $.TownTest();
};

$.toHtml = function(b) {
  if (b === true) {
    var t1 = $.check;
  } else {
    t1 = $.noCheck;
  }
  return t1;
};

$.patchUpY2K = function(value, years, isUtc) {
  var date = (new Date(value));
  if (isUtc === true) {
    date.setUTCFullYear(years);
  } else {
    date.setFullYear(years);
  }
  return date.valueOf();
};

$.DummyDevelopmentCard$1 = function(id) {
  return new $.DummyDevelopmentCard((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), id);
};

$.JsonObject$0 = function() {
  var t1 = new $.JsonObject((void 0), (void 0), (void 0), (void 0), (void 0));
  t1.JsonObject$0();
  return t1;
};

$.MatchImplementation$5 = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.DiceRoll$2 = function(dice1, dice2) {
  return new $.DiceRoll(dice2, dice1);
};

$.stringReplaceJS = function(receiver, replacer, to) {
  return receiver.replace(replacer, to.replace('$', '$$$$'));
};

$.UnsupportedOperationException$1 = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.MainIsland$data$1 = function(json) {
  var t1 = new $.MainIsland((void 0), (void 0));
  t1.AbstractTerritory$data$1(json);
  return t1;
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(start));
    }
    return $.indexOf(receiver, element, start, (receiver.length));
  } else {
    if (typeof receiver === 'string') {
      $.checkNull(element);
      if (!((typeof start === 'number') && (start === (start | 0)))) {
        throw $.captureStackTrace($.IllegalArgumentException$1(start));
      }
      if (!(typeof element === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(element));
      }
      if (start < 0) {
        return -1;
      }
      return receiver.indexOf(element, start);
    }
  }
  return receiver.indexOf$2(element, start);
};

$.Field$1 = function(loc) {
  var t1 = new $.Field((void 0), (void 0), (void 0), loc, (void 0), (void 0), (void 0));
  t1.AbstractTile$1(loc);
  return t1;
};

$.TradeOffer$0 = function() {
  return new $.TradeOffer((void 0), false, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
};

$._DedicatedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.SupportedTerritories$0 = function() {
  var t1 = [$.AbstractTerritory$1((void 0)), $.MainIsland$1((void 0)), $.Island$1((void 0))];
  var t2 = new $.SupportedTerritories((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.Tldr$0 = function() {
  var t1 = new $.Tldr((void 0));
  t1.View$0();
  return t1;
};

$.ensureMap = function() {
  if ($.eqNullB($.instancesByType)) {
    $.instancesByType = $.HashMapImplementation$0();
    for (var t1 = $.AllSupportedLists$0().iterator$0(); t1.hasNext$0() === true; ) {
      for (var t2 = $.iterator(t1.next$0()); t2.hasNext$0() === true; ) {
        var c = t2.next$0();
        if (typeof c === 'object' && !!c.is$Copyable) {
          var concretename = $.name(c);
          if ($.instancesByType.containsKey$1(concretename) === true) {
            $.print('Naming collision: ' + $.S(concretename));
          }
          $.indexSet($.instancesByType, concretename, c);
        } else {
          $.print('Not copyable: ' + $.S($.name(c)));
        }
      }
    }
  }
};

$.NoMoreElementsException$0 = function() {
  return new $.NoMoreElementsException();
};

$.valueFromDecomposedDate = function(years, month, day, hours, minutes, seconds, milliseconds, isUtc) {
  $.checkInt(years);
  $.checkInt(month);
  if ($.ltB(month, 1) || $.ltB(12, month)) {
    throw $.captureStackTrace($.IllegalArgumentException$1(month));
  }
  $.checkInt(day);
  if ($.ltB(day, 1) || $.ltB(31, day)) {
    throw $.captureStackTrace($.IllegalArgumentException$1(day));
  }
  $.checkInt(hours);
  if ($.ltB(hours, 0) || $.ltB(24, hours)) {
    throw $.captureStackTrace($.IllegalArgumentException$1(hours));
  }
  $.checkInt(minutes);
  if ($.ltB(minutes, 0) || $.ltB(59, minutes)) {
    throw $.captureStackTrace($.IllegalArgumentException$1(minutes));
  }
  $.checkInt(seconds);
  if ($.ltB(seconds, 0) || $.ltB(59, seconds)) {
    throw $.captureStackTrace($.IllegalArgumentException$1(seconds));
  }
  $.checkInt(milliseconds);
  if ($.ltB(milliseconds, 0) || $.ltB(999, milliseconds)) {
    throw $.captureStackTrace($.IllegalArgumentException$1(milliseconds));
  }
  $.checkBool(isUtc);
  var jsMonth = $.sub(month, 1);
  if (isUtc === true) {
    var value = (Date.UTC(years, jsMonth, day, hours, minutes, seconds, milliseconds));
  } else {
    value = (new Date(years, jsMonth, day, hours, minutes, seconds, milliseconds).valueOf());
  }
  if ($.isNaN(value) === true) {
    throw $.captureStackTrace($.IllegalArgumentException$1(''));
  }
  if ($.leB(years, 0) || $.ltB(years, 100)) {
    return $.patchUpY2K(value, years, isUtc);
  }
  return value;
};

$.LobbyPhase$0 = function() {
  var t1 = new $.LobbyPhase((void 0), (void 0));
  t1.LobbyPhase$0();
  return t1;
};

$.BoardEditor$0 = function() {
  var t1 = new $.BoardEditor((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.View$0();
  t1.BoardEditor$0();
  return t1;
};

$.llFrom = function(jsonables) {
  if ($.eqNullB(jsonables)) {
    return $.ListenableList$0();
  } else {
    return $.ListenableList$from$1($.listFrom(jsonables));
  }
};

$.newList = function(length$) {
  if (length$ === (void 0)) {
    return new Array();
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0))) || length$ < 0) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.dateNow = function() {
  return Date.now();
};

$._AbstractWorkerEventsImpl$1 = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.RandomDice$1 = function(random) {
  var t1 = new $.RandomDice(random);
  t1.RandomDice$1(random);
  return t1;
};

$.Stock$0 = function() {
  var t1 = new $.Stock((void 0), (void 0), (void 0), (void 0));
  t1.Stock$0();
  return t1;
};

$._computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.CellNeighboursView$0 = function() {
  var t1 = new $.CellNeighboursView((void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.CellNeighboursView$0();
  return t1;
};

$._MediaElementEventsImpl$1 = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._IDBTransactionEventsImpl$1 = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._BodyElementEventsImpl$1 = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$1(argument));
};

$.equals = function(expected, actual, reason) {
  if ($.eqB(expected, actual)) {
    return;
  }
  var msg = $._getMessage(reason);
  $._fail('Expect.equals(expected: <' + $.S(expected) + '>, actual: <' + $.S(actual) + '>' + $.S(msg) + ') fails.');
};

$.StackDice$data$1 = function(json) {
  return new $.StackDice((void 0), 0, (void 0), (void 0));
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') {
    return isNaN(receiver);
  } else {
    return receiver.isNegative$0();
  }
};

$.RoadTest$0 = function() {
  return new $.RoadTest();
};

$.Chit4$0 = function() {
  return new $.Chit4((void 0));
};

$.round = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.round$0();
  }
  if (receiver < 0) {
    return -Math.round(-receiver);
  } else {
    return Math.round(receiver);
  }
};

$.Wheat$data$1 = function(data) {
  var t1 = new $.Wheat((void 0));
  t1.AbstractResource$data$1(data);
  return t1;
};

$.ClientRandom$0 = function() {
  return new $.ClientRandom();
};

$.Timber$1 = function(id) {
  return new $.Timber(id);
};

$._AllMatchesIterable$2 = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.GameListElement$1 = function(game) {
  var t1 = ({});
  t1.game_1 = game;
  var t2 = new $.GameListElement((void 0), (void 0), (void 0));
  t2.GameListElement$1(t1.game_1);
  return t2;
};

$.AbstractTerritory$data$1 = function(data) {
  var t1 = new $.AbstractTerritory((void 0), (void 0));
  t1.AbstractTerritory$data$1(data);
  return t1;
};

$.Chit3$0 = function() {
  return new $.Chit3((void 0));
};

$.Pasture$1 = function(loc) {
  var t1 = new $.Pasture((void 0), (void 0), (void 0), loc, (void 0), (void 0), (void 0));
  t1.AbstractTile$1(loc);
  return t1;
};

$.SupportedActions$0 = function() {
  var t1 = [$.AbstractGameAction$0(), $.Say$0()];
  var t2 = new $.SupportedActions((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.SVGSVGElement = function() {
  var el = $.SVGElement$tag('svg');
  $.indexSet(el.get$attributes(), 'version', '1.1');
  return el;
};

$.BuildingTurnPhase$data$1 = function(json) {
  var t1 = new $.BuildingTurnPhase((void 0));
  t1.BuildingTurnPhase$data$1(json);
  return t1;
};

$.PortListMu$from$1 = function(ports) {
  var t1 = new $.PortListMu((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), true, (void 0));
  t1.ListenableList$from$1(ports);
  return t1;
};

$.LocalServer$1 = function(game) {
  var t1 = new $.LocalServer(0, 0, (void 0), (void 0), (void 0), game, (void 0), (void 0));
  t1.LocalServer$1(game);
  return t1;
};

$._WorkerEventsImpl$1 = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ThreeToOnePort$2 = function(seaCell, edgeDirection) {
  var t1 = new $.ThreeToOnePort(edgeDirection, (void 0), seaCell, (void 0), (void 0), (void 0));
  t1.AbstractPort$2(seaCell, edgeDirection);
  return t1;
};

$.Chit10$0 = function() {
  return new $.Chit10((void 0));
};

$.CityTest$0 = function() {
  return new $.CityTest();
};

$.FilteredElementList$1 = function(node) {
  return new $.FilteredElementList(node.get$nodes(), node);
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure === (void 0)) {
    return;
  }
  var function$ = (closure.$identity);
  if (!!function$) {
    return function$;
  }
  function$ = (function() {
    return $.invokeClosure.$call$5(closure, $, arity, arguments[0], arguments[1]);
  });
  closure.$identity = function$;
  return function$;
};

$.parse = function(json) {
  return $.parse2(json);
};

$._FixedSizeListIterator$1 = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.parse2 = function(json) {
  return $._JsonParser$_internal$1(json)._parseToplevel$0();
};

$._FrozenElementList$_wrap$1 = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) {
    return receiver.split$1(pattern);
  }
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.concatAll = function(strings) {
  $.checkNull(strings);
  for (var t1 = $.iterator(strings), result = ''; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    $.checkNull(t2);
    if (!(typeof t2 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t2));
    }
    result = result + t2;
  }
  return result;
};

$.userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$.SupportedVariouss$0 = function() {
  var t1 = [$.Cell$2(0, 0), $.Edge$2($.Cell$2(0, 0), $.Cell$2(0, 1)), $.Vertice$3($.Cell$2(0, 0), $.Cell$2(1, 0), $.Cell$2(1, 1)), $.Board$2((void 0), (void 0)), $.DefaultJsonable$0(), $.User$3((void 0), (void 0), (void 0))];
  var t2 = new $.SupportedVariouss((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$._InputElementEventsImpl$1 = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.GameClient$0 = function() {
  var t1 = new $.GameClient((void 0), (void 0), (void 0), (void 0), (void 0));
  t1.GameClient$0();
  return t1;
};

$._DoubleLinkedQueueIterator$1 = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator((void 0), _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.LinkedHashMapImplementation$0 = function() {
  var t1 = new $.LinkedHashMapImplementation((void 0), (void 0));
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$.SVGElement$tag = function(tag) {
  return $._document().$dom_createElementNS$2('http://www.w3.org/2000/svg', tag);
};

$.checkNull = function(object) {
  if (object === (void 0)) {
    throw $.captureStackTrace($.NullPointerException$2((void 0), $.CTC));
  }
  return object;
};

$.AbstractPort$2 = function(_seaCell, _edgeDirection) {
  var t1 = new $.AbstractPort(_edgeDirection, (void 0), _seaCell, (void 0), (void 0), (void 0));
  t1.AbstractPort$2(_seaCell, _edgeDirection);
  return t1;
};

$.AbstractDevelopmentCard$data$1 = function(json) {
  var t1 = new $.AbstractDevelopmentCard((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractDevelopmentCard$data$1(json);
  return t1;
};

$._EventListenerListImpl$2 = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$.TradeBank$data$1 = function(json) {
  var t1 = new $.TradeBank((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractGameAction$data$1(json);
  t1.TradeBank$data$1(json);
  return t1;
};

$.SupportedResources$0 = function() {
  var t1 = [$.AbstractResource$1((void 0)), $.Wheat$1((void 0)), $.Timber$1((void 0)), $.Clay$1((void 0)), $.Ore$1((void 0)), $.Sheep$1((void 0))];
  var t2 = new $.SupportedResources((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.SupportedListenableLists$0 = function() {
  var t1 = $.ListenableList$0();
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  t1 = [t1];
  var t2 = new $.SupportedListenableLists((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.DoubleLinkedQueue$0 = function() {
  var t1 = new $.DoubleLinkedQueue((void 0));
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a < b;
  }
  return a.operator$lt$1(b);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      }
      if (!($.truncate(index) === index)) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      }
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    return a[index];
  }
  return a.operator$index$1(index);
};

$.toString = function(value) {
  if (typeof value == "object") {
    if ($.isJsArray(value) === true) {
      return $.collectionToString(value);
    } else {
      return value.toString$0();
    }
  }
  if (value === 0 && (1 / value) < 0) {
    return '-0.0';
  }
  if (value === (void 0)) {
    return 'null';
  }
  if (typeof value == "function") {
    return 'Closure';
  }
  return String(value);
};

$.BoardInfoView$1 = function(board) {
  var t1 = new $.BoardInfoView((void 0), (void 0), board, (void 0));
  t1.BoardInfoView$1(board);
  return t1;
};

$.GameTester$auto$1 = function(sgt) {
  var t1 = new $.GameTester(0, (void 0), 0, (void 0), (void 0), true, 250, true);
  t1.GameTester$auto$1(sgt);
  return t1;
};

$.AbstractGamePhase$0 = function() {
  return new $.AbstractGamePhase((void 0));
};

$.Ore$data$1 = function(data) {
  var t1 = new $.Ore((void 0));
  t1.AbstractResource$data$1(data);
  return t1;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$2(other, startIndex);
  }
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.BeforeDiceRollTurnPhase$data$1 = function(json) {
  var t1 = new $.BeforeDiceRollTurnPhase((void 0));
  t1.BeforeDiceRollTurnPhase$data$1(json);
  return t1;
};

$.Board$data$1 = function(json) {
  var t1 = new $.Board((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), -1, -1, (void 0));
  t1.Board$data$1(json);
  return t1;
};

$.ExpectLobby$1 = function(lobby) {
  return new $.ExpectLobby(lobby);
};

$._escape = function(sb, s) {
  var length$ = $.get$length(s);
  var charCodes = $.List((void 0));
  $.setRuntimeTypeInfo(charCodes, ({E: 'int'}));
  for (var needsEscape = false, i = 0; $.ltB(i, length$); ++i) {
    var charCode = $.charCodeAt(s, i);
    if ($.ltB(charCode, 32)) {
      charCodes.push(92);
            switch (charCode) {
        case 8:
          charCodes.push(98);
          break;
        case 9:
          charCodes.push(116);
          break;
        case 10:
          charCodes.push(110);
          break;
        case 12:
          charCodes.push(102);
          break;
        case 13:
          charCodes.push(114);
          break;
        default:
          charCodes.push(117);
          charCodes.push($._hexDigit($.and($.shr(charCode, 12), 15)));
          charCodes.push($._hexDigit($.and($.shr(charCode, 8), 15)));
          charCodes.push($._hexDigit($.and($.shr(charCode, 4), 15)));
          charCodes.push($._hexDigit($.and(charCode, 15)));
          break;
      }
      needsEscape = true;
    } else {
      if ($.eqB(charCode, 34) || $.eqB(charCode, 92)) {
        charCodes.push(92);
        charCodes.push(charCode);
        needsEscape = true;
      } else {
        charCodes.push(charCode);
      }
    }
  }
  if (needsEscape) {
    var t1 = $.String$fromCharCodes(charCodes);
  } else {
    t1 = s;
  }
  $.add$1(sb, t1);
};

$.IndexOutOfRangeException$1 = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$._AttributeClassSet$1 = function(element) {
  return new $._AttributeClassSet(element);
};

$.Stock$data$1 = function(json) {
  var t1 = new $.Stock((void 0), (void 0), (void 0), (void 0));
  t1.Stock$data$1(json);
  return t1;
};

$._TextTrackEventsImpl$1 = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$._BatteryManagerEventsImpl$1 = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$.copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object'||src.constructor !== Array)) return $.copy$bailout(src, srcStart, dst, dstStart, count, 1, src, 0, 0, 0, 0);
  if (typeof dst !== 'object'||dst.constructor !== Array||!!dst.immutable$list) return $.copy$bailout(src, srcStart, dst, dstStart, count, 2, src, dst, 0, 0, 0);
  if (typeof count !== 'number') return $.copy$bailout(src, srcStart, dst, dstStart, count, 3, src, dst, count, 0, 0);
  if (srcStart === (void 0)) {
    var srcStart = 0;
  }
  if (typeof srcStart !== 'number') return $.copy$bailout(src, srcStart, dst, dstStart, count, 4, count, src, dst, srcStart, 0);
  if (dstStart === (void 0)) {
    var dstStart = 0;
  }
  if (typeof dstStart !== 'number') return $.copy$bailout(src, srcStart, dst, dstStart, count, 5, srcStart, count, src, dst, dstStart);
  if (srcStart < dstStart) {
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j) {
      if (i !== (i | 0)) throw $.iae(i);
      var t1 = src.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t3 = dst.length;
      if (j < 0 || j >= t3) throw $.ioore(j);
      dst[j] = t2;
    }
  } else {
    for (t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j) {
      if (i !== (i | 0)) throw $.iae(i);
      t2 = src.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t3 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t4 = dst.length;
      if (j < 0 || j >= t4) throw $.ioore(j);
      dst[j] = t3;
    }
  }
};

$.Sea$data$1 = function(json) {
  var t1 = new $.Sea((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.AbstractTile$1((void 0));
  t1.Sea$data$1(json);
  return t1;
};

$._WebSocketEventsImpl$1 = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.collectionToString = function(c) {
  var result = $.StringBufferImpl$1('');
  $._emitCollection(c, result, $.List((void 0)));
  return result.toString$0();
};

$.MetaInfo$3 = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$._MediaStreamEventsImpl$1 = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.PortPickerVisual$1 = function(board2d) {
  var t1 = new $.PortPickerVisual((void 0), 0, (void 0), (void 0), board2d, (void 0), false, false, false, false);
  t1.AbstractVisual$svg$1(board2d);
  t1.PortPickerVisual$1(board2d);
  return t1;
};

$.byId = function(theid, withIds) {
  var t1 = ({});
  t1.theid_1 = theid;
  var filtered = $.filter(withIds, new $.Closure42(t1));
  if ($.iterator(filtered).hasNext$0() === true) {
    return $.iterator(filtered).next$0();
  } else {
    return;
  }
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(-1));
    }
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.stringFromCharCodes = function(charCodes) {
  for (var t1 = $.iterator(charCodes); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (!((typeof t2 === 'number') && (t2 === (t2 | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t2));
    }
  }
  return String.fromCharCode.apply((void 0), charCodes);
};

$.AbstractLobbyAction$0 = function() {
  return new $.AbstractLobbyAction((void 0), (void 0), (void 0), (void 0));
};

$.ListenableListTest$0 = function() {
  return new $.ListenableListTest();
};

$._firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$._hexDigit = function(x) {
  if ($.ltB(x, 10)) {
    var t1 = $.add(48, x);
  } else {
    t1 = $.add(87, x);
  }
  return t1;
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(newLength));
    }
    if (newLength < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(newLength));
    }
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else {
    receiver.set$length(newLength);
  }
  return newLength;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  }
  if ($.eqB(name$, 'Document')) {
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'XMLDocument')) {
    return 'Document';
  }
  if ($.eqB(name$, 'WorkerMessageEvent')) {
    return 'MessageEvent';
  }
  return name$;
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a > b;
  }
  return a.operator$gt$1(b);
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
};

$.test = function() {
  var c = $.Cell$2(0, 0);
  $.equals(6, $.get$length(c.get$cells()), 'A cell should have 6 neighbours');
  var copy = $.Cell$2(0, 0);
  $.equals(c.hashCode$0(), copy.hashCode$0(), 'equal hashes');
  $.isTrue(c.equals$1(copy), 'Should be equal instances');
  $.isTrue($.eq(c, copy), 'Should be equal instances');
  var c1 = $.Cell$2(1, 0);
  var c2 = $.Cell$2(0, 1);
  $.isFalse($.eq(c1, c2), 'Different cells on ==');
  $.isFalse(c1.equals$1(c2), 'Different cells on equals');
  $.notEquals(c1.hashCode$0(), c2.hashCode$0(), 'Different cells, different hashcode');
  var jsonCopy = $.copyJsonable(c1);
  $.equals(c1.hashCode$0(), $.hashCode(jsonCopy), 'equal hashes');
  $.isTrue(c1.equals$1(jsonCopy), 'Should be equal instances');
  $.isTrue($.eq(c1, jsonCopy), 'Should be equal instances');
};

$.RoadCost$0 = function() {
  var t1 = [$.Timber$1((void 0)), $.Clay$1((void 0))];
  var t2 = new $.RoadCost((void 0));
  t2.ResourceListIm$1(t1);
  return t2;
};

$.LeaveLobby$0 = function() {
  return new $.LeaveLobby((void 0), (void 0), (void 0), (void 0));
};

$.Say$0 = function() {
  return new $.Say((void 0), false, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$0();
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  }
  return result;
};

$.Game$data$1 = function(json) {
  var t1 = new $.Game((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), 0, (void 0), 'UnnamedGame', (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.Game$data$1(json);
  return t1;
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.startsWith$1(other);
  }
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) {
    return false;
  }
  return other == receiver.substring(0, length$);
};

$.le = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    var t1 = (a <= b);
  } else {
    t1 = $.le$slow(a, b);
  }
  return t1;
};

$.createFromCharCodes = function(charCodes) {
  $.checkNull(charCodes);
  if ($.isJsArray(charCodes) !== true) {
    if (!((typeof charCodes === 'object') && (((charCodes.constructor === Array) || charCodes.is$List2())))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(charCodes));
    }
    var charCodes0 = $.List$from(charCodes);
    var charCodes = charCodes0;
  }
  return $.stringFromCharCodes(charCodes);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$.AbstractGamePhase$data$1 = function(json) {
  var t1 = new $.AbstractGamePhase((void 0));
  t1.AbstractGamePhase$data$1(json);
  return t1;
};

$.Play$0 = function() {
  var t1 = new $.Play(false, (void 0));
  t1.View$0();
  return t1;
};

$._MessagePortEventsImpl$1 = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$._document = function() {
  return document;;
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) {
    return $.typeNameInChrome;
  }
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC2) === true) {
    return $.typeNameInChrome;
  } else {
    if ($.contains$1(userAgent, 'Firefox') === true) {
      return $.typeNameInFirefox;
    } else {
      if ($.contains$1(userAgent, 'MSIE') === true) {
        return $.typeNameInIE;
      } else {
        return $.constructorNameFallback;
      }
    }
  }
};

$.PickPort$0 = function() {
  return new $.PickPort((void 0));
};

$._ElementEventsImpl$1 = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.parseDouble = function(str) {
  return $.parseDouble2(str);
};

$.parseDouble2 = function(str) {
  $.checkString(str);
  var ret = (parseFloat(str));
  if (ret === 0) {
    var t1 = $.startsWith(str, '0x') === true || $.startsWith(str, '0X') === true;
  } else {
    t1 = false;
  }
  if (t1) {
    ret = (parseInt(str));
  }
  if ($.isNaN(ret) === true && !$.eqB(str, 'NaN') && !$.eqB(str, '-NaN')) {
    throw $.captureStackTrace($.BadNumberFormatException$1(str));
  }
  return ret;
};

$.List = function(length$) {
  return $.newList(length$);
};

$.sin = function(x) {
  return $.sin2(x);
};

$.sin2 = function(value) {
  return Math.sin($.checkNum(value));
};

$.City$0 = function() {
  return new $.City((void 0), (void 0), (void 0), (void 0));
};

$.Dartan$0 = function() {
  var t1 = new $.Dartan((void 0));
  t1.Dartan$0();
  return t1;
};

$.AllSupportedLists$0 = function() {
  var t1 = [$.SupportedGames$0(), $.SupportedResources$0(), $.SupportedResourceLists$0(), $.SupportedTiles$0(), $.SupportedVariouss$0(), $.SupportedPorts$0(), $.SupportedChits$0(), $.SupportedTerritories$0(), $.SupportedGamePhases$0(), $.SupportedTurnPhases$0(), $.SupportedGameStatuses$0(), $.SupportedDevelopmentCards$0(), $.SupportedRandoms$0(), $.SupportedGameActions$0(), $.SupportedLobbyActions$0(), $.SupportedActions$0(), $.SupportedDices$0(), $.SupportedPieces$0(), $.SupportedListenableLists$0()];
  var t2 = new $.AllSupportedLists((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.indexOf$1 = function(receiver, element) {
  if ($.isJsArray(receiver) === true || typeof receiver === 'string') {
    return $.indexOf$2(receiver, element, 0);
  }
  return receiver.indexOf$1(element);
};

$.AbstractGameStatus$0 = function() {
  return new $.AbstractGameStatus((void 0));
};

$.LobbyView$1 = function(lobby) {
  var t1 = new $.LobbyView((void 0), (void 0), (void 0), lobby, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.LobbyView$1(lobby);
  return t1;
};

$.StringBufferImpl$1 = function(content$) {
  var t1 = new $.StringBufferImpl((void 0), (void 0));
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.HashMapImplementation$0 = function() {
  var t1 = new $.HashMapImplementation((void 0), (void 0), (void 0), (void 0), (void 0));
  t1.HashMapImplementation$0();
  return t1;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$1(startIndex);
  }
  return $.substring$2(receiver, startIndex, (void 0));
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a / b;
  }
  return a.operator$div$1(b);
};

$.SupportedGameActions$0 = function() {
  var t1 = [$.AbstractGameAction$0(), $.RollDice$0(), $.StartGame$0(), $.TradeBank$0(), $.TradeOffer$0(), $.RejectOffer$0(), $.CounterOffer$0(), $.AcceptOffer$0()];
  var t2 = new $.SupportedGameActions((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.BuildingTurnPhase$0 = function() {
  return new $.BuildingTurnPhase((void 0));
};

$.DetermineFirstPlayerGamePhase$data$1 = function(json) {
  var t1 = new $.DetermineFirstPlayerGamePhase((void 0), (void 0), (void 0));
  t1.AbstractGamePhase$data$1(json);
  t1.DetermineFirstPlayerGamePhase$data$1(json);
  return t1;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver & 0x1FFFFFFF;
  }
  if (!(typeof receiver === 'string')) {
    return receiver.hashCode$0();
  }
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; ++i) {
    hash = (536870911 & hash + (receiver.charCodeAt(i))) >>> 0;
    hash = (536870911 & hash + ((524287 & hash) >>> 0 << 10)) >>> 0;
    hash = (hash ^ $.shr(hash, 6)) >>> 0;
  }
  hash = (536870911 & hash + ((67108863 & hash) >>> 0 << 3)) >>> 0;
  hash = (hash ^ $.shr(hash, 11)) >>> 0;
  return (536870911 & hash + ((16383 & hash) >>> 0 << 15)) >>> 0;
};

$.Sea$1 = function(loc) {
  var t1 = new $.Sea((void 0), (void 0), (void 0), loc, (void 0), (void 0), (void 0));
  t1.AbstractTile$1(loc);
  return t1;
};

$._SharedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$.nullOrDataFrom = function(json) {
  if ($.eqNullB(json)) {
    return;
  }
  return json.get$data();
};

$.MonopolyableResources$0 = function() {
  var t1 = [$.Wheat$1((void 0)), $.Ore$1((void 0)), $.Timber$1((void 0)), $.Sheep$1((void 0)), $.Clay$1((void 0))];
  var t2 = new $.MonopolyableResources((void 0));
  t2.ResourceListIm$1(t1);
  return t2;
};

$._IDBVersionChangeRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.SelectOnHover$0 = function() {
  return new $.SelectOnHover((void 0));
};

$.indexOf2 = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf2$bailout(a, element, startIndex, endIndex, 1, a, 0, 0);
  if (typeof endIndex !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex, 2, a, endIndex, 0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  }
  if ($.ltB(startIndex, 0)) {
    var startIndex = 0;
  }
  if (typeof startIndex !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex, 3, a, endIndex, startIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    }
  }
  return -1;
};

$.NoSuchMethodException$4 = function(_receiver, _functionName, _arguments, _existingArgumentNames) {
  return new $.NoSuchMethodException(_existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    var t1 = (a < b);
  } else {
    t1 = $.lt$slow(a, b);
  }
  return t1;
};

$.SupportedDevelopmentCards$0 = function() {
  var t1 = [$.AbstractDevelopmentCard$1((void 0)), $.VictoryPoint$2((void 0), (void 0)), $.DummyDevelopmentCard$1((void 0))];
  var t2 = new $.SupportedDevelopmentCards((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) {
    return ex.dartException;
  }
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) {
        return $.ObjectNotClosureException$0();
      } else {
        return $.NullPointerException$2((void 0), $.CTC);
      }
    } else {
      if ($.eqB(type, 'undefined_method')) {
        if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) {
          return $.ObjectNotClosureException$0();
        } else {
          return $.NoSuchMethodException$4('', name$, [], (void 0));
        }
      }
    }
    if (typeof message === 'string') {
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true) {
        return $.NullPointerException$2((void 0), $.CTC);
      } else {
        if ($.endsWith(message, 'is not a function') === true) {
          return $.NoSuchMethodException$4('', '<unknown>', [], (void 0));
        }
      }
    }
    if (typeof message === 'string') {
      var t1 = message;
    } else {
      t1 = '';
    }
    return $.TypeError$1(t1);
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true) {
      return $.StackOverflowException$0();
    }
    return $.IllegalArgumentException$1('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    if (typeof message === 'string' && message === 'too much recursion') {
      return $.StackOverflowException$0();
    }
  }
  return ex;
};

$.ChangeTile$0 = function() {
  return new $.ChangeTile((void 0));
};

$.cos = function(x) {
  return $.cos2(x);
};

$.test2 = function() {
  var twoCities = $.ResourceListMu$0();
  twoCities.addAll$1($.CityCost$0());
  twoCities.addAll$1($.CityCost$0());
  var fourToOne = $.FourToOnePort$2((void 0), (void 0));
  var threeToOne = $.ThreeToOnePort$2((void 0), (void 0));
  $.equals(1, fourToOne.divide$2(twoCities, 'Ore'), 'Should be able to trade ore, 6 ore present');
  $.equals(1, fourToOne.divide$2(twoCities, 'Wheat'), 'Should be able to trade ore, 4 wheat present');
  $.equals(2, threeToOne.divide$2(twoCities, 'Ore'), 'Should be able to trade 2 gold for 6 ore present');
  $.equals(1, threeToOne.divide$2(twoCities, 'Wheat'), 'Should be able to trade one gold for 4 wheat present');
  twoCities.addAll$1($.CityCost$0());
  $.equals(2, fourToOne.divide$2(twoCities, 'Ore'), 'Should be able to trade for 2 gold');
  $.equals(1, fourToOne.divide$2(twoCities, 'Wheat'), 'Should be able to trade for one gold, 6 wheat present');
};

$.cos2 = function(value) {
  return Math.cos($.checkNum(value));
};

$.SupportedChits$0 = function() {
  var t1 = [$.AbstractChit$0(), $.Chit2$0(), $.Chit3$0(), $.Chit4$0(), $.Chit5$0(), $.Chit6$0(), $.Chit8$0(), $.Chit9$0(), $.Chit10$0(), $.Chit11$0(), $.Chit12$0(), $.RandomChit$0()];
  var t2 = new $.SupportedChits((void 0));
  t2.ImmutableL$1(t1);
  return t2;
};

$.sub = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    var t1 = (a - b);
  } else {
    t1 = $.sub$slow(a, b);
  }
  return t1;
};

$.Vertice$3 = function(c1, c2, c3) {
  var t1 = new $.Vertice((void 0), (void 0), (void 0), -1, (void 0), c3, c2, c1);
  t1.Vertice$3(c1, c2, c3);
  return t1;
};

$.copy$bailout = function(src, srcStart, dst, dstStart, count, state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      src = env0;
      break;
    case 2:
      src = env0;
      dst = env1;
      break;
    case 3:
      src = env0;
      dst = env1;
      count = env2;
      break;
    case 4:
      count = env0;
      src = env1;
      dst = env2;
      srcStart = env3;
      break;
    case 5:
      srcStart = env0;
      count = env1;
      src = env2;
      dst = env3;
      dstStart = env4;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
    case 3:
      state = 0;
      if (srcStart === (void 0)) {
        var srcStart = 0;
      }
    case 4:
      state = 0;
      if (dstStart === (void 0)) {
        var dstStart = 0;
      }
    case 5:
      state = 0;
      if ($.ltB(srcStart, dstStart)) {
        var i = $.sub($.add(srcStart, count), 1);
        var j = $.sub($.add(dstStart, count), 1);
        L0: while (true) {
          if (!$.geB(i, srcStart)) break L0;
          $.indexSet(dst, j, $.index(src, i));
          i = $.sub(i, 1);
          j = $.sub(j, 1);
        }
      } else {
        i = srcStart;
        j = dstStart;
        L1: while (true) {
          if (!$.ltB(i, $.add(srcStart, count))) break L1;
          $.indexSet(dst, j, $.index(src, i));
          i = $.add(i, 1);
          j = $.add(j, 1);
        }
      }
  }
};

$.indexOf2$bailout = function(a, element, startIndex, endIndex, state, env0, env1, env2) {
  switch (state) {
    case 1:
      a = env0;
      break;
    case 2:
      a = env0;
      endIndex = env1;
      break;
    case 3:
      a = env0;
      endIndex = env1;
      startIndex = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      } else {
      }
      if ($.ltB(startIndex, 0)) {
        var startIndex = 0;
      }
    case 3:
      state = 0;
      var i = startIndex;
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        } else {
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.indexOf$bailout = function(a, element, startIndex, endIndex, state, env0, env1, env2) {
  switch (state) {
    case 1:
      a = env0;
      break;
    case 2:
      a = env0;
      endIndex = env1;
      break;
    case 3:
      a = env0;
      endIndex = env1;
      startIndex = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      } else {
      }
      if ($.ltB(startIndex, 0)) {
        var startIndex = 0;
      }
    case 3:
      state = 0;
      var i = startIndex;
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        } else {
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.join2$bailout = function(strings, separator, state, env0) {
  switch (state) {
    case 1:
      separator = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.checkNull(strings);
      $.checkNull(separator);
      var t1 = $.iterator(strings);
      var first = true;
      var result = '';
      L0: while (true) {
        if (!(t1.hasNext$0() === true)) break L0;
        var t2 = t1.next$0();
        $.checkNull(t2);
        if (!(typeof t2 === 'string')) {
          throw $.captureStackTrace($.IllegalArgumentException$1(t2));
        } else {
        }
        if (!first) {
          result = $.add(result, separator);
        }
        result = result + t2;
        first = false;
      }
      return result;
  }
};

$.buildDynamicMetadata$bailout = function(inputTable, state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      inputTable = env0;
      break;
    case 2:
      result = env0;
      inputTable = env1;
      tag = env2;
      i = env3;
      tags = env4;
      set = env5;
      tagNames = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$0();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            var j = 0;
            L1: while (true) {
              if (!$.ltB(j, $.get$length(tagNames))) break L1;
              set.add$1($.index(tagNames, j));
              ++j;
            }
            $.add$1(result, $.MetaInfo$3(tag, tags, set));
            ++i;
        }
      }
      return result;
  }
};

$.allMatchesInStringUnchecked$bailout = function(needle, haystack, state, env0, env1, env2) {
  switch (state) {
    case 1:
      length$ = env0;
      result = env1;
      patternLength = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.List((void 0));
      $.setRuntimeTypeInfo(result, ({E: 'Match'}));
      var length$ = $.get$length(haystack);
      var patternLength = $.get$length(needle);
    case 1:
      state = 0;
      var startIndex = 0;
      L0: while (true) {
        if (!true) break L0;
        var position = $.indexOf$2(haystack, needle, startIndex);
        if ($.eqB(position, -1)) {
          break;
        } else {
        }
        result.push($.StringMatch$3(position, haystack, needle));
        var endIndex = $.add(position, patternLength);
        if ($.eqB(endIndex, length$)) {
          break;
        } else {
          if ($.eqB(position, endIndex)) {
            startIndex = $.add(startIndex, 1);
          } else {
            startIndex = endIndex;
          }
        }
      }
      return result;
  }
};

$.copiesOf$bailout = function(c, amount, state, env0) {
  switch (state) {
    case 1:
      amount = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var l = $.List((void 0));
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, amount)) break L0;
        l.push(c.copy$0());
        ++i;
      }
      return l;
  }
};

$.getRange2$bailout = function(a, start, length$, accumulator, state, env0, env1) {
  switch (state) {
    case 1:
      a = env0;
      break;
    case 2:
      a = env0;
      start = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.ltB(length$, 0)) {
        throw $.captureStackTrace($.IllegalArgumentException$1('length'));
      } else {
      }
      if ($.ltB(start, 0)) {
        throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
      } else {
      }
      var end = $.add(start, length$);
      if ($.gtB(end, $.get$length(a))) {
        throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
      } else {
      }
      var i = start;
      L0: while (true) {
        if (!$.ltB(i, end)) break L0;
        $.add$1(accumulator, $.index(a, i));
        i = $.add(i, 1);
      }
      return accumulator;
  }
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.invokeClosure.$call$5 = $.invokeClosure;
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
Isolate.$finishClasses();
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC4 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC13 = Isolate.makeConstantList([1, 2, 3, 4, 5]);
$.CTC6 = new Isolate.$isolateProperties.NotImplementedException((void 0));
$.CTC12 = Isolate.makeConstantList([1, 2, 3, 4]);
$.CTC11 = Isolate.makeConstantList([2, 3, 4]);
$.CTC10 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^([+-]?\\d?\\d\\d\\d\\d)-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(.\\d{1,6})?)?)? ?([zZ])?)?$');
$.CTC14 = Isolate.makeConstantList([Isolate.$isolateProperties.CTC11, Isolate.$isolateProperties.CTC12, Isolate.$isolateProperties.CTC13, Isolate.$isolateProperties.CTC12, Isolate.$isolateProperties.CTC11]);
$.CTC16 = Isolate.makeConstantList(['body', 'head', 'caption', 'td', 'colgroup', 'col', 'tr', 'tbody', 'tfoot', 'thead', 'track']);
$.CTC9 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC7 = new Isolate.$isolateProperties.JsonUnsupportedObjectType();
$.CTC2 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC20 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^\\[name=["\'][^\'"]+[\'"]\\]$');
$.CTC23 = new Isolate.$isolateProperties.Object();
$.CTC17 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC16, {'body': 'html', 'head': 'html', 'caption': 'table', 'td': 'tr', 'colgroup': 'table', 'col': 'colgroup', 'tr': 'tbody', 'tbody': 'table', 'tfoot': 'table', 'thead': 'table', 'track': 'audio'}, 11);
$.CTC21 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^[*a-zA-Z0-9]+$');
$.CTC15 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '<(\\w+)');
$.CTC5 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC18 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC19 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC, {}, 0);
$.CTC22 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC3 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC8 = new Isolate.$isolateProperties.EmptyQueueException();
$.Vertical = 2;
$.Deg60120 = 1;
$.Deg120180 = 2;
$._getTypeNameOf = (void 0);
$.UpperRow2 = 1;
$.check = '<span class=checkOk>&#10004</span>';
$._cachedBrowserPrefix = (void 0);
$.Deg3000 = 5;
$.SlopeDown = 1;
$.tokens = (void 0);
$.Deg240300 = 4;
$.instancesByType = (void 0);
$.UpperRow1 = 0;
$.noCheck = '&#10006';
$.Deg060 = 0;
$.Deg180240 = 3;
$.SlopeUp = 0;
var $ = null;
Isolate.$finishClasses();
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$List2', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$Element', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('AbstractWorker', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', ["type?", "port=", "name=", "host!", "hash?"], {
 toString$0: function() {
  return this.toString();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimation', ["name?", "ended?", "direction?"], {
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["width?", "name=", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', ["port?", "hash?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Attr', ["value=", "name?"], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["value=", "name?"], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', ["color?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._BatteryManagerEventsImpl$1(this);
 }
});

$.$defineNativeClass('BiquadFilterNode', ["type?"], {
});

$.$defineNativeClass('Blob', ["type?"], {
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "type?", "name="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CSSFontFaceRule', ["style?"], {
});

$.$defineNativeClass('WebKitCSSKeyframeRule', ["style?"], {
});

$.$defineNativeClass('WebKitCSSKeyframesRule', ["name="], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('CSSPageRule', ["style?"], {
});

$.$defineNativeClass('CSSRule', ["type?"], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 get$width: function() {
  return this.getPropertyValue$1('width');
 },
 get$height: function() {
  return this.getPropertyValue$1('height');
 },
 set$fontWeight: function(value) {
  this.setProperty$3('font-weight', value, '');
 },
 set$fontSize: function(value) {
  this.setProperty$3('font-size', value, '');
 },
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
 },
 filter$1: function(arg0) { return this.get$filter().$call$1(arg0); },
 set$display: function(value) {
  this.setProperty$3('display', value, '');
 },
 get$direction: function() {
  return this.getPropertyValue$1('direction');
 },
 get$color: function() {
  return this.getPropertyValue$1('color');
 },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
 },
 setProperty$2: function(propertyName,value) {
  return this.setProperty(propertyName,value);
},
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSStyleRule', ["style?"], {
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CharacterData', ["length?", "data?"], {
});

$.$defineNativeClass('ClientRect', ["width?", "height?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

$.$defineNativeClass('Clipboard', [], {
 types$0: function() { return this.types.$call$0(); }
});

$.$defineNativeClass('CompositionEvent', ["data?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.group$1 = function(arg) {
  return this.group(arg);
 };
_ConsoleImpl.get$group = function() { return new $.Closure84(this, 'group$1'); };
$.$defineNativeClass('HTMLContentElement', [], {
 select$0: function() { return this.select.$call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMApplicationCache', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$1(this);
 }
});

$.$defineNativeClass('DOMError', ["name?"], {
});

$.$defineNativeClass('DOMException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMFileSystem', ["name?"], {
});

$.$defineNativeClass('DOMFileSystemSync', ["name?"], {
});

$.$defineNativeClass('DOMMimeType', ["type?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["name?", "length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', ["type?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 remove$1: function(token) {
  return this.remove(token);
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItem', ["type?"], {
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('DeprecatedPeerConnection', [], {
 send$1: function(text) {
  return this.send(text);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', [], {
 queryAll$1: function(selectors) {
  if ($.CTC20.hasMatch$1(selectors) === true) {
    var mutableMatches = this.$dom_getElementsByName$1($.substring$2(selectors, 7, $.sub($.get$length(selectors), 2)));
    if (typeof mutableMatches !== 'string' && (typeof mutableMatches !== 'object'||mutableMatches.constructor !== Array)) return this.queryAll$1$bailout(selectors, 1, mutableMatches);
    var len = mutableMatches.length;
    var copyOfMatches = $.List(len);
    $.setRuntimeTypeInfo(copyOfMatches, ({E: 'Element'}));
    for (var i = 0; i < len; ++i) {
      var t1 = mutableMatches.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = mutableMatches[i];
      var t3 = copyOfMatches.length;
      if (i < 0 || i >= t3) throw $.ioore(i);
      copyOfMatches[i] = t2;
    }
    return $._FrozenElementList$_wrap$1(copyOfMatches);
  } else {
    if ($.CTC21.hasMatch$1(selectors) === true) {
      mutableMatches = this.$dom_getElementsByTagName$1(selectors);
      if (typeof mutableMatches !== 'string' && (typeof mutableMatches !== 'object'||mutableMatches.constructor !== Array)) return this.queryAll$1$bailout(selectors, 2, mutableMatches);
      len = mutableMatches.length;
      copyOfMatches = $.List(len);
      $.setRuntimeTypeInfo(copyOfMatches, ({E: 'Element'}));
      for (i = 0; i < len; ++i) {
        t1 = mutableMatches.length;
        if (i < 0 || i >= t1) throw $.ioore(i);
        t2 = mutableMatches[i];
        t3 = copyOfMatches.length;
        if (i < 0 || i >= t3) throw $.ioore(i);
        copyOfMatches[i] = t2;
      }
      return $._FrozenElementList$_wrap$1(copyOfMatches);
    } else {
      return $._FrozenElementList$_wrap$1(this.$dom_querySelectorAll$1(selectors));
    }
  }
 },
 queryAll$1$bailout: function(selectors, state, env0) {
  switch (state) {
    case 1:
      mutableMatches = env0;
      break;
    case 2:
      mutableMatches = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
    case 2:
      if (state == 1 || (state == 0 && $.CTC20.hasMatch$1(selectors) === true)) {
        switch (state) {
          case 0:
            var mutableMatches = this.$dom_getElementsByName$1($.substring$2(selectors, 7, $.sub($.get$length(selectors), 2)));
          case 1:
            state = 0;
            var len = $.get$length(mutableMatches);
            var copyOfMatches = $.List(len);
            $.setRuntimeTypeInfo(copyOfMatches, ({E: 'Element'}));
            var i = 0;
            L0: while (true) {
              if (!$.ltB(i, len)) break L0;
              var t1 = $.index(mutableMatches, i);
              var t2 = copyOfMatches.length;
              if (i < 0 || i >= t2) throw $.ioore(i);
              copyOfMatches[i] = t1;
              ++i;
            }
            return $._FrozenElementList$_wrap$1(copyOfMatches);
        }
      } else {
        switch (state) {
          case 0:
          case 2:
            if (state == 2 || (state == 0 && $.CTC21.hasMatch$1(selectors) === true)) {
              switch (state) {
                case 0:
                  mutableMatches = this.$dom_getElementsByTagName$1(selectors);
                case 2:
                  state = 0;
                  len = $.get$length(mutableMatches);
                  copyOfMatches = $.List(len);
                  $.setRuntimeTypeInfo(copyOfMatches, ({E: 'Element'}));
                  i = 0;
                  L1: while (true) {
                    if (!$.ltB(i, len)) break L1;
                    t1 = $.index(mutableMatches, i);
                    t2 = copyOfMatches.length;
                    if (i < 0 || i >= t2) throw $.ioore(i);
                    copyOfMatches[i] = t1;
                    ++i;
                  }
                  return $._FrozenElementList$_wrap$1(copyOfMatches);
              }
            } else {
              return $._FrozenElementList$_wrap$1(this.$dom_querySelectorAll$1(selectors));
            }
        }
      }
  }
 },
 query$1: function(selectors) {
  if ($.CTC22.hasMatch$1(selectors) === true) {
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  }
  return this.$dom_querySelector$1(selectors);
 },
 $dom_querySelectorAll$1: function(selectors) {
  return this.querySelectorAll(selectors);
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_getElementsByTagName$1: function(tagname) {
  return this.getElementsByTagName(tagname);
 },
 $dom_getElementsByName$1: function(elementName) {
  return this.getElementsByName(elementName);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 $dom_createElementNS$2: function(namespaceURI, qualifiedName) {
  return this.createElementNS(namespaceURI,qualifiedName);
 },
 get$on: function() {
  return $._DocumentEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelectorAll$1: function(selectors) {
  return this.querySelectorAll(selectors);
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$1(this);
 },
 set$id: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('ID can\'t be set for document fragments.'));
 },
 set$attributes: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Attributes can\'t be set for document fragments.'));
 },
 click$0: function() {
 },
 get$click: function() { return new $.Closure82(this, 'click$0'); },
 get$style: function() {
  return $.Element$tag('div').get$style();
 },
 get$classes: function() {
  var t1 = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  return t1;
 },
 get$attributes: function() {
  return $.CTC19;
 },
 get$parent: function() {
  return;
 },
 get$$$dom_lastElementChild: function() {
  return $.last(this.get$elements());
 },
 get$$$dom_firstElementChild: function() {
  return this.get$elements().first$0();
 },
 get$id: function() {
  return '';
 },
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
    $.clear(this.get$nodes());
  var e = $.Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }
 },
 queryAll$1: function(selectors) {
  return $._FrozenElementList$_wrap$1(this.$dom_querySelectorAll$1(selectors));
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 },
 get$elements: function() {
  if ($.eqNullB(this._elements)) {
    this._elements = $.FilteredElementList$1(this);
  }
  return this._elements;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentType', ["name?"], {
});

$.$defineNativeClass('Element', ["style?", "innerHTML!", "id="], {
 $dom_setAttribute$2: function(name, value) {
  return this.setAttribute(name,value);
 },
 $dom_removeAttribute$1: function(name) {
  return this.removeAttribute(name);
 },
 $dom_querySelectorAll$1: function(selectors) {
  return this.querySelectorAll(selectors);
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_hasAttribute$1: function(name) {
  return this.hasAttribute(name);
 },
 $dom_getAttribute$1: function(name) {
  return this.getAttribute(name);
 },
 click$0: function() {
  return this.click();
 },
 get$click: function() { return new $.Closure82(this, 'click$0'); },
 get$$$dom_lastElementChild: function() {
  return this.lastElementChild;;
 },
 get$$$dom_firstElementChild: function() {
  return this.firstElementChild;;
 },
 set$$$dom_className: function(value) {
  this.className = value;;
 },
 get$$$dom_className: function() {
  return this.className;;
 },
 get$$$dom_children: function() {
  return this.children;;
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 },
 get$classes: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$classes')) {
    return $._CssClassSet$1(this);
  } else {
    return Object.prototype.get$classes.call(this);
  }
 },
 queryAll$1: function(selectors) {
  return $._FrozenElementList$_wrap$1(this.$dom_querySelectorAll$1(selectors));
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 },
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
    return $._ChildrenElementList$_wrap$1(this);
  } else {
    return Object.prototype.get$elements.call(this);
  }
 },
 set$elements: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
    var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
  } else {
    return Object.prototype.set$elements.call(this, value);
  }
 },
 set$attributes: function(value) {
  if (typeof value !== 'string' && (typeof value !== 'object'||value.constructor !== Array)) return this.set$attributes$bailout(value, 1, value);
  var attributes = this.get$attributes();
  $.clear(attributes);
  for (var t1 = $.iterator(value.getKeys$0()); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    var t3 = value.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    $.indexSet(attributes, t2, value[t2]);
  }
 },
 set$attributes$bailout: function(value, state, env0) {
  switch (state) {
    case 1:
      value = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var attributes = this.get$attributes();
      $.clear(attributes);
      var t1 = $.iterator(value.getKeys$0());
      L0: while (true) {
        if (!(t1.hasNext$0() === true)) break L0;
        var t2 = t1.next$0();
        $.indexSet(attributes, t2, $.index(value, t2));
      }
  }
 },
 get$attributes: function() {
  return $._ElementAttributeMap$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', ["width?", "type?", "name=", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Entry', ["name?"], {
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1));
 },
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  errorCallback = $.convertDartClosureToJS(errorCallback, 1);
  return this.remove(successCallback);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 remove$0: function() {
  return this.remove();
 }
});

$.$defineNativeClass('ErrorEvent', ["message?"], {
});

$.$defineNativeClass('Event', ["type?"], {
});

$.$defineNativeClass('EventException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._EventSourceEventsImpl$1(this);
 }
});

$.$defineNativeClass('EventTarget', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._EventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["type?", "name=", "lib$_FieldSetElementImpl$elements?"], {
 get$elements: function() {
  return this.lib$_FieldSetElementImpl$elements;
 },
 set$elements: function(x) {
  this.lib$_FieldSetElementImpl$elements = x;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('File', ["name?"], {
});

$.$defineNativeClass('FileException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'File'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileReaderEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriter', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileWriterEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', ["color?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["name=", "length?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', ["width?", "name=", "location?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHRElement', ["width?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 remove$1: function(index) {
  return this.remove(index);
 },
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('IDBCursor', ["key?", "direction?"], {
 update$1: function(value) {
  return this.update(value);
 }
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBDatabaseEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBDatabaseException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._IDBRequestEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('IDBTransaction', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBTransactionEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLIFrameElement', ["width?", "name=", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ImageData', ["width?", "height?", "data?"], {
});

$.$defineNativeClass('HTMLImageElement', ["y?", "x?", "width?", "name=", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["width?", "value=", "type?", "pattern?", "name=", "height?"], {
 select$0: function() {
  return this.select();
 },
 get$on: function() {
  return $._InputElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$1(this);
 }
});

$.$defineNativeClass('JavaScriptCallFrame', ["type?", "column?"], {
});

$.$defineNativeClass('HTMLKeygenElement', ["type?", "name="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value=", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('Location', ["port=", "host!", "hash?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMapElement', ["name="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', ["width?", "height?", "direction?"], {
 start$0: function() {
  return this.start();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaController', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', ["ended?"], {
 get$on: function() {
  return $._MediaElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaKeyEvent', ["message?"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  return $._MediaStreamEventsImpl$1(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MessageEvent', ["ports?", "data?"], {
});

$.$defineNativeClass('MessagePort', [], {
 start$0: function() {
  return this.start();
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLMetaElement', ["name="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MouseEvent', ["y?", "x?"], {
});

$.$defineNativeClass('MutationRecord', ["type?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 get$$$dom_childNodes: function() {
  return this.childNodes;;
 },
 get$$$dom_attributes: function() {
  return this.attributes;;
 },
 replaceWith$1: function(otherNode) {
  try {
    parent$ = this.get$parent();
    parent$.$dom_replaceChild$2(otherNode, this);
  } catch (exception) {
    $.unwrapException(exception);
  }
  return this;
 },
 remove$0: function() {
  if (!$.eqNullB(this.get$parent())) {
    this.get$parent().$dom_removeChild$1(this);
  }
  return this;
 },
 get$nodes: function() {
  return $._ChildNodeListLazy$1(this);
 }
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 get$first: function() {
  return this.operator$index$1(0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter3(this, [], f));
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._parent.$dom_removeChild$1(result);
  }
  return result;
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    this._parent.$dom_appendChild$1(t2);
  }
 },
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 show$0: function() {
  return this.show();
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._NotificationEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLOListElement', ["type?"], {
 start$0: function() { return this.start.$call$0(); },
 start$1: function(arg0) { return this.start.$call$1(arg0); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["width?", "type?", "name=", "height?", "data?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('OperationNotAllowedException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Oscillator', ["type?"], {
});

$.$defineNativeClass('HTMLOutputElement', ["value=", "type?", "name="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParagraphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["value=", "type?", "name="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('PeerConnection00', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._PeerConnection00EventsImpl$1(this);
 }
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('WebKitPoint', ["y?", "x?"], {
});

$.$defineNativeClass('PositionError', ["message?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ProcessingInstruction', ["data?"], {
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ProgressEvent', [], {
 total$0: function() { return this.total.$call$0(); }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLError', ["message?"], {
});

$.$defineNativeClass('SQLException', ["message?"], {
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', [], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', [], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 set$id: function(value) {
  this.id = value;;
 },
 get$id: function() {
  return this.id;;
 },
 set$innerHTML: function(svg) {
  var container = $.Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.S(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
 },
 set$elements: function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
 },
 get$elements: function() {
  return $.FilteredElementList$1(this);
 },
 get$classes: function() {
  if (this.get$_cssClassSet() === (void 0)) {
    this.set$_cssClassSet($._AttributeClassSet$1(this.get$_ptr()));
  }
  return this.get$_cssClassSet();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$1(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', [], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["y?", "x?", "width?", "height?", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', ["y?", "x?", "width?", "height?", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', ["y?", "x?", "width?", "height?"], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', ["y?", "x?", "width?", "height?"], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGLineElement', [], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathElement', [], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPathSegArcAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y?"], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y?"], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPatternElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPoint', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPolygonElement', ["points?"], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', ["points?"], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRect', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGRectElement', ["y?", "x?", "width?", "height?"], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', ["y?", "x?", "width?", "height?"], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGStyleElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', [], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTransform', ["type?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', ["y?", "x?", "width?", "height?"], {
 getBBox$0: function() {
  return this.getBBox();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Screen', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLScriptElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "type?", "name=", "length="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', ["lib$_ShadowRootImpl$innerHTML!"], {
 get$innerHTML: function() {
  return this.lib$_ShadowRootImpl$innerHTML;
 },
 set$innerHTML: function(x) {
  this.lib$_ShadowRootImpl$innerHTML = x;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SharedWorker', ["port?"], {
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLSourceElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 start$0: function() {
  return this.start();
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$1(this);
 }
});

$.$defineNativeClass('SpeechRecognitionError', ["message?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return $.eqNull(this.$dom_key$1(0));
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $.Closure38(values));
  return values;
 },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $.Closure24(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if ($.eqNullB(key)) {
      return;
    }
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !$.eqNullB(this.$dom_getItem$1(key));
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('HTMLStyleElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('StyleMedia', ["type?"], {
});

$.$defineNativeClass('StyleSheet', ["type?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'StyleSheet'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', ["width?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', ["width?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', ["cells?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value=", "type?", "name="], {
 select$0: function() {
  return this.select();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextEvent', ["data?"], {
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text!", "id="], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackCueEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackListEventsImpl$1(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
 start$1: function(index) {
  return this.start(index);
 },
 end$1: function(index) {
  return this.end(index);
 }
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TouchList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Touch'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('HTMLUListElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["type?", "name?"], {
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
});

$.$defineNativeClass('WebSocket', [], {
 send$1: function(data) {
  return this.send(data);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WebSocketEventsImpl$1(this);
 }
});

$.$defineNativeClass('WheelEvent', ["y?", "x?"], {
});

$.$defineNativeClass('DOMWindow', ["navigator?", "name=", "location?", "length?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 clearTimeout$1: function(handle) {
  return this.clearTimeout(handle);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WindowEventsImpl$1(this);
 }
});

$.$defineNativeClass('Worker', [], {
 get$on: function() {
  return $._WorkerEventsImpl$1(this);
 }
});

$.$defineNativeClass('WorkerContext', ["navigator?", "location?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 clearTimeout$1: function(handle) {
  return this.clearTimeout(handle);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('WorkerLocation', ["port?", "hash?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequest', [], {
 send$1: function(data) {
  return this.send(data);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('XMLHttpRequestException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$1(this);
 }
});

$.$defineNativeClass('XPathException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$1(this);
 }
});

// 344 dynamic classes.
// 388 classes
// 33 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement'].join('|');
  var v2/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v3/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v4/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v5/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v6/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement';
  var v7/*class(_ProgressEventImpl)*/ = 'ProgressEvent|XMLHttpRequestProgressEvent';
  var v8/*class(_ElementImpl)*/ = [v5/*class(_SVGElementImpl)*/,v6/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v9/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot';
  var v10/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument';
  var v11/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|Comment';
  var v12/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v13/*class(_NodeImpl)*/ = [v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v14/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream';
  var v15/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBOpenDBRequest|IDBVersionChangeRequest';
  var v16/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v10/*class(_DocumentImpl)*/],
    ['DocumentFragment', v9/*class(_DocumentFragmentImpl)*/],
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v1/*class(_SVGTextContentElementImpl)*/],
    ['SVGGradientElement', v2/*class(_SVGGradientElementImpl)*/],
    ['SVGComponentTransferFunctionElement', v3/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v4/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v5/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v6/*class(_MediaElementImpl)*/],
    ['Element', v8/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync'],
    ['ProgressEvent', v7/*class(_ProgressEventImpl)*/],
    ['Event', [v7/*class(_ProgressEventImpl)*/,'Event|WebGLContextEvent|UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechInputEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['WorkerContext', v12/*class(_WorkerContextImpl)*/],
    ['CharacterData', v11/*class(_CharacterDataImpl)*/],
    ['Node', v13/*class(_NodeImpl)*/],
    ['MediaStream', v14/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v15/*class(_IDBRequestImpl)*/],
    ['AbstractWorker', v16/*class(_AbstractWorkerImpl)*/],
    ['EventTarget', [v12/*class(_WorkerContextImpl)*/,v13/*class(_NodeImpl)*/,v14/*class(_MediaStreamImpl)*/,v15/*class(_IDBRequestImpl)*/,v16/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|PeerConnection00|Notification|MessagePort|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList'],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet'],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain'],
    ['Blob', 'Blob|File'],
    ['CSSRule', 'CSSRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue']];
$.dynamicSetMetadata(table);
})();

if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.main();
  });
} else {
  $.main();
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function() {
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (prototype.__proto__) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
