/** I'd like to be able to declare immutable collection types, not
necesarily instances with const. */
class ImmutableL<T> implements Iterable<T> {
  List<T> wrapped;
  ImmutableL(Iterable<T> list) {
    wrapped = new List<T>();
    for (T t in list) {
      wrapped.add(t);
    }
  }
  Iterator<T> iterator() {
    return wrapped.iterator();
  }
}