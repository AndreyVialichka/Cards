import { useEffect, useState } from "react";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../common/hooks/useAppSelector";
import { packsActions, packsThunks } from "features/packs/packs.slice";
import s from "./styles.module.css";
import { PackType } from "features/packs/packs.api";
import { filteredByNamePacksSelector } from "./packs.selectors";
import { useActions } from "../../common/hooks/useActions";
import { useNavigate } from "react-router-dom";
import PacksTable from './PacksTable/PacksTable'
import { PacksSetting } from "./PacksSettings/PacksSetting";
import { useDebounce } from "common/hooks/useDebounse";

export const Packs = () => {
  const { fetchPacks, removePack, createPack } = useActions(packsThunks);
  const { packsSearch } = useActions(packsActions)

  const cardPacks = useAppSelector((state) => state.packs.cardPacks);
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const searchValue = useAppSelector((state) => state.packs.packsSearch);

  const sliderChangeHandler = (event: any, value: number | number[]) => {
    setSliderValue(value as number[]);
  };

  const [sliderValue, setSliderValue] = useState<number[]>([20, 37]);
  const [myPacksStatus, setMyPacksStatus] = useState(false)
  
  const debouncedValue = useDebounce<string>(searchValue, 500)

  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchPacks({
        searchName:searchValue,
        userID: myPacksStatus ? userId : '',
        minCards: sliderValue[0],
        maxCards: sliderValue[1]
      });
  }, [debouncedValue,myPacksStatus,sliderValue]);

  const searchPacksHander = (e:any) => {
    packsSearch(e.currentTarget.value)
  }

  const addPackHandler = () => {
    const newPack = {
      name: "🦁" + Math.random(),
    };
   createPack(newPack);
  };

  const removePackHandler = (id: string) => {
    removePack(id);
  };

  const updatePackHandler = (pack: PackType) => {
    const newName = "🦖" + Math.random();
    dispatch(packsThunks.updatePack({ ...pack, name: newName }));
  };

  const navigateToCardsPageHandler = (packId: string) => {
		navigate(`/cards/${packId}`);
	};
  const changeMyPacksStatus = (e:any) => {
    setMyPacksStatus(e.currentTarget.checked)
  }
  return (
    <div>
      <h1>Packs</h1>
      <button onClick={addPackHandler}>add pack</button>
      <PacksSetting
        searchValue = {searchValue}
        searchPacksHander = {searchPacksHander}
        changeMyPacksStatus = {changeMyPacksStatus}
        myPacksStatus = {myPacksStatus}
        sliderChangeHandler = {sliderChangeHandler}
        sliderValue= {sliderValue}
      />
      <PacksTable 
        cards= {cardPacks}
        removePackHandler = {removePackHandler}  
        updatePackHandler = {updatePackHandler }
        navigateToCardsPageHandler = {navigateToCardsPageHandler}
      ></PacksTable>
    </div>
  );
};

