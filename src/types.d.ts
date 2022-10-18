type SelectBarProps = {
  title: string;
  asyncFunc: Function;
  loadingComponent: JSX.Element;
  setSelectedItems: Function;
}

type nutrientItem = {
  nutrientId: string;
  name: string;
  rank?: string;
}
