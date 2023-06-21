import { useCallback, useEffect, useState } from "react";
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
import { Pagination } from "common/components/Pagination/Pagination";

export const Packs = () => {
  const { fetchPacks, removePack, createPack } = useActions(packsThunks);
  const { packsSearch,changePagintationAC } = useActions(packsActions)

  const cardPacks = useAppSelector((state) => state.packs.cardPacks);
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const searchValue = useAppSelector((state) => state.packs.packsSearch);
  const page = useAppSelector((state) => state.packs.page);
  const pageCount = useAppSelector((state) => state.packs.pageCount);
  const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount);
  const status = useAppSelector((state) => state.app.isLoading);


  const sliderChangeHandler = (event: any, value: number | number[]) => {
    setSliderValue(value as number[]);
  };

  const [sliderValue, setSliderValue] = useState<number[]>([20, 37]);
  const [myPacksStatus, setMyPacksStatus] = useState(false)
  
  const debouncedValue = useDebounce<string>(searchValue, 500)

  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  useEffect(() => {
    debugger
    fetchPacks({
        max:sliderValue[1],
        min:sliderValue[0],
        packName: searchValue,
        page:page,
        pageCount:pageCount,
        user_id: myPacksStatus? userId : undefined,
      });
  }, [debouncedValue,myPacksStatus,sliderValue,page]);

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

  const changePagination = useCallback(
    (page: number, pageCount: number) => {
      debugger
      changePagintationAC(page)
    },
    [dispatch],
  )

  if (!userId) {
    navigate(`/signin`);
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
        status = {status}
      ></PacksTable>
      <Pagination
        page={page}
        pageCount={pageCount}
        totalCount={cardPacksTotalCount}
        changePagination={changePagination}
        />
    </div>
  );
};

