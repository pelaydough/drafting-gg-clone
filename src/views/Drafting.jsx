import champions from "../champs";
import helmetIcon from "../assets/helmet-icon.svg";
import { useState } from "react";

const Drafting = ({
  draftState,
  handleBanClick,
  handleBanRightClick,
  handlePickClick,
  handlePickRightClick,
  handleChampClick,
  handleChampionDrop,
  activeBan,
  activePick,
  activeChamp,
  setActiveBan,
  setActivePick,
  setActiveChamp,
}) => {
  const [draggedChamp, setDraggedChamp] = useState(null);

  const isChampionDisabled = (champ) => {
    const allPicks = [
      ...draftState.picks.filter((pick) => pick.spot.startsWith("B")),
      ...draftState.picks.filter((pick) => pick.spot.startsWith("R")),
    ];
    const allBans = [
      ...draftState.bans.filter((ban) => ban.spot.startsWith("B")),
      ...draftState.bans.filter((ban) => ban.spot.startsWith("R")),
    ];
    return (
      allPicks.some((pick) => pick.champion?.name === champ.name) ||
      allBans.some((ban) => ban.champion?.name === champ.name)
    );
  };

  const onDragStart = (e, champ) => {
    if (!isChampionDisabled(champ)) {
      setDraggedChamp(champ);
    } else {
      e.preventDefault();
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, ban) => {
    e.preventDefault();
    if (draggedChamp) {
      handleChampionDrop(draggedChamp, ban);
      setDraggedChamp(null);
    }
  };

  return (
    <div className="w-full bg-[#101110] h-[calc(100vh-44px)] flex flex-col items-center justify-center">
      <div className="flex w-full justify-center mb-2">
        <div className="w-[36%] bg-[#3E7AFB] py-2 px-4">
          <h1 className="text-white text-2xl righteous-regular tracking-widest">
            BLUE SIDE
          </h1>
        </div>
        <div className="w-[36%] bg-[#FF5C5C] py-2 px-4">
          <h1 className="text-white text-2xl righteous-regular tracking-widest text-right">
            RED SIDE
          </h1>
        </div>
      </div>
      <div className="flex w-full justify-center mb-6">
        <div className="flex gap-2 w-[36%]">
          {draftState.bans
            .filter((ban) => ban.spot.startsWith("B"))
            .map((ban) => (
              <div
                key={ban.spot}
                onClick={() => handleBanClick(ban)}
                onContextMenu={(e) => handleBanRightClick(e, ban)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, ban)}
                className={`w-20 h-20 cursor-pointer border-2 ${
                  activeBan == ban.spot
                    ? "border-yellow-500"
                    : "border-[#090809]"
                } bg-[#090809] ${ban.spot == "BBan3" && "mr-5"} rounded-lg`}
              >
                {ban.champion && (
                  <img
                    src={ban.champion.imgUrl}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
            ))}
        </div>
        <div className="flex justify-end gap-2 w-[36%]">
          {draftState.bans
            .filter((ban) => ban.spot.startsWith("R"))
            .map((ban) => (
              <div
                key={ban.spot}
                onClick={() => handleBanClick(ban)}
                onContextMenu={(e) => handleBanRightClick(e, ban)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, ban)}
                className={`w-20 h-20 cursor-pointer border-2 ${
                  activeBan == ban.spot
                    ? "border-yellow-500"
                    : "border-[#090809]"
                } bg-[#090809] ${ban.spot == "RBan2" && "mr-5"} rounded-lg`}
              >
                {ban.champion && (
                  <img
                    src={ban.champion.imgUrl}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-12 w-[72%]">
        <div className="flex flex-col gap-2 col-span-2">
          {draftState.picks
            .filter((pick) => pick.spot.startsWith("B"))
            .map((pick) => (
              <div
                key={pick.spot}
                onClick={() => handlePickClick(pick)}
                onContextMenu={(e) => handlePickRightClick(e, pick)}
                className={`flex items-center cursor-pointer ${
                  pick.spot == "B3" && "mb-12"
                }`}
              >
                <h2 className="righteous-regular mr-3 w-9 text-[#6699FE] text-2xl tracking-widest">
                  {pick.spot}
                </h2>
                <div
                  className={`${
                    !pick.champion ? "p-4" : "p-0"
                  } bg-[#090809] border-2 ${
                    activePick == pick.spot
                      ? "border-yellow-500"
                      : "border-[#090809]"
                  } rounded-lg overflow-hidden h-[110px]`}
                >
                  <img
                    src={!pick.champion ? helmetIcon : pick.champion.imgUrl}
                    className={`${!pick.champion ? "h-[70px]" : "h-[106px]"}`}
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="col-span-8 bg-[#090809] rounded-md max-h-[590px]">
          <div className="px-2 pt-2">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#090809] outline-none text-white p-2"
            />
          </div>
          <div className="col-span-8 bg-[#090809] grid grid-cols-6 p-4 pb-6 max-h-[540px] gap-2 overflow-y-scroll overflow-x-hidden custom-scrollbar">
            {champions.map((champ) => {
              const isDisabled = isChampionDisabled(champ);
              return (
                <div
                  key={champ.name}
                  onClick={() => !isDisabled && handleChampClick(champ)}
                  draggable={!isDisabled}
                  onDragStart={(e) => onDragStart(e, champ)}
                  className={`flex flex-col justify-center items-center ${
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <img
                    src={champ.imgUrl}
                    className={`h-20 rounded-md border-2 ${
                      activeChamp == champ && !isDisabled
                        ? "border-yellow-500"
                        : "border-[#090809]"
                    }`}
                  />
                  <p className="text-white text-center">{champ.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          {draftState.picks
            .filter((pick) => pick.spot.startsWith("R"))
            .map((pick) => (
              <div
                key={pick.spot}
                onClick={() => handlePickClick(pick)}
                onContextMenu={(e) => handlePickRightClick(e, pick)}
                className={`flex cursor-pointer flex-row-reverse items-center ${
                  pick.spot == "R3" && "mb-12"
                }`}
              >
                <h2 className="righteous-regular ml-5 w-9 text-[#FE8180] text-2xl tracking-widest">
                  {pick.spot}
                </h2>
                <div
                  className={`p-4 bg-[#090809] border-2 ${
                    activePick == pick.spot
                      ? "border-yellow-500"
                      : "border-[#090809]"
                  } rounded-lg overflow-hidden h-[110px]`}
                >
                  <img src={helmetIcon} className="h-[70px]" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Drafting;
