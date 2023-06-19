import { useEffect } from "react";
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

export const Packs = () => {
  const { fetchPacks, removePack, createPack } = useActions(packsThunks);
  const { packsSearch } = useActions(packsActions)
  const cardPacks = useAppSelector((state) => state.packs.cardPacks);
  const searchValue = useAppSelector((state) => state.packs.packsSearch);
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchPacks({searchName:searchValue});
  }, [searchValue]);

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

  return (
    <div>
      <h1>Packs</h1>
      <button onClick={addPackHandler}>add pack</button>
      <PacksSetting
        searchValue = {searchValue}
        searchPacksHander = {searchPacksHander}
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

// {cardPacks.map((p) => {
//   return (
//     <div key={p._id} className={s.container}>
//       <p>
//         <b>pack name</b>: {p.name}
//       </p>
//       <p>
//         <b>cardsCount</b>: {p.cardsCount}
//       </p>
//       <p>
//         <b>user name</b>: {p.user_name}
//       </p>
//       <button onClick={() => removePackHandler(p._id)}>remove</button>
//       <button onClick={() => updatePackHandler(p)}>update</button>
//       <button onClick={() => navigateToCardsPageHandler(p._id)}>на страницу карточек</button>
//     </div>
//   );
// })}