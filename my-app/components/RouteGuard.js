import { useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { searchHistoryAtom } from "@/store";
import { getFavourites } from "@/lib/userData";
import { getHistory } from "@/lib/userData";

export default function RouteGuard(props) {

    const PUBLIC_PATHS = ['/login', '/register'];

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  
    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
      }

      useEffect(() => {
        updateAtoms();
      }, []);
      

    function authCheck(url) {
  const path = url.split('?')[0];
  if (!PUBLIC_PATHS.includes(path)) {
    console.log(`trying to request a secure path: ${path}`);
  }
}


    return <>{props.children}</>
  }