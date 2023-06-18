import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const packsSelector = (state: RootState) => state.packs.cardPacks;

export const filteredByNamePacksSelector = createSelector(
    // 1 - массив селекторов
    [packsSelector],
    // 2 - функция, которая принимает данные от селекторов и возвращает новое значение
    (packs) => {
      console.log("filteredByNamePacksSelector");
      return packs.filter((p) => p.name.includes("f"));
    }
  );
  
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes