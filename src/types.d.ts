type SelectBarProps = {
  title: string;
  asyncFunc: Function;
  loadingComponent: JSX.Element;
  setSelectedItems: Function;
}

type FoodInfoModalProps = {
  openModal: boolean;
  handleCloseModal: () => void;
  foodInfo: FoodInfo[];
}

type TableFoodInfoProps = {
  foodInfo: FoodInfo[];
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

type FoodCard = {
  food: Food;
  onLearnMore: Function;
}

type FoodInfo = {
  foodNutrientId: number;
  fdcId: number;
  nutrientId: number;
  dataPoints: number;
  type: string;
  min: number;
  max: number;
  median: number;
  amount: number;
  foodNutrientDerivation: string;
  nutrientName: string;
  unit_name: string;
}
