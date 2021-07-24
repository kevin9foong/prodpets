import CalendarCard from "../CalendarCard";
import { CardModelWithUid } from "../../../database/models/cards";
import { render } from "@testing-library/react-native";
import React from "react";

test("Calendar Card single day event", () => {
  const info = {
    item: {
      title: "dummy Event",
      description: "dummy description",
      startdate: new Date("July 4, 2021 15:24:00"),
      duedate: new Date("July 4, 2021 16:00:00"),
      uid: "",
    },
  };
  const clickHandler = (card: CardModelWithUid) => {};
  const { getByText } = render(
    <CalendarCard cardInfo={info.item} clickHandler={clickHandler} />
  );
  expect(getByText("dummy Event")).toBeTruthy();
  expect(getByText("4 Jul 21, 15:24 - 16:00")).toBeTruthy();
});

test("Calendar Card multi day event display", () => {
  const info = {
    item: {
      title: "long dummy Event",
      description: "dummy description",
      startdate: new Date("July 4, 2021 15:24:00"),
      duedate: new Date("July 7, 2021 16:00:00"),
      uid: "",
    },
  };
  const clickHandler = (card: CardModelWithUid) => {};
  const { getByText } = render(
    <CalendarCard cardInfo={info.item} clickHandler={clickHandler} />
  );
  expect(getByText("long dummy Event")).toBeTruthy;
  expect(getByText("4 Jul 21, 15:24 - 7 Jul 21, 16:00")).toBeTruthy;
});
