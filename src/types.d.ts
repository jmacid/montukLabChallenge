type SelectBarProps = {
  title: string;
  asyncFunc: Function;
  loadingComponent: JSX.Element;
  setSelectedItems: Function;
}

type NutrientBox = {
  nutrient: nutrientItem;
  onDelete: Function;
}

type nutrientItem = {
  nutrientId: string;
  name: string;
  rank?: string;
}

type Food = {
  fdcId: number
  ndbNumber: number
  foodCategory: string
  dataType: string
  description: string
  publicationDate: string
}
