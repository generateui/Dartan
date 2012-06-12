interface PortList extends Collection<Port>, Testable  {
  int amountGold(ResourceList resources);
  Port bestPortForResource(Resource resource);
  int amountNeededToTrade(Resource resource);
}

class PortListIm extends ListenableList<Port> {

}
class PortListMu extends ListenableList<Port> implements PortList {
  PortListMu();
  PortListMu.from(List<Port> ports) : super.from(ports);
  int amountGold(ResourceList resources) {
    return 0;
  }
  Port bestPortForResource(Resource resource){
    return null;
  }
  int amountNeededToTrade(Resource resource) {
    return 0;
  }
}