import React from "react";
import { StackScreenProps } from "@react-navigation/stack";

import CardModal from "../../components/home/CardModal";
import { CardUid, HomeStackParamList } from "../../navigation/types";
import { useSelector } from "react-redux";
import { selectCardByUID } from "../../redux/selectors/cards";

type ScreenProps = StackScreenProps<HomeStackParamList, "ViewCardModal">;

const ViewCardModal: React.FC<ScreenProps> = ({
  route,
  navigation,
}: ScreenProps) => {
  const cardUid: CardUid = route.params;

  const cardInfo = useSelector(selectCardByUID(cardUid.uid));

  return (
    <CardModal formType="view" cardInfo={cardInfo} navigation={navigation} />
  );
};

export default ViewCardModal;
