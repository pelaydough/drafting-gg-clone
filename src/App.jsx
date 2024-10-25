import { useState } from "react";

import Drafting from "./views/Drafting";
import TierList from "./views/TierList";

import "./App.css";

function App() {
  const [tabSelected, setTabSelected] = useState("drafting");
  const [activeBan, setActiveBan] = useState("");
  const [activePick, setActivePick] = useState("");
  const [activeChamp, setActiveChamp] = useState(null);
  const [blueBans, setBlueBans] = useState([
    {
      spot: "BBan1",
      champion: null,
    },
    {
      spot: "BBan2",
      champion: null,
    },
    {
      spot: "BBan3",
      champion: null,
    },
    {
      spot: "BBan4",
      champion: null,
    },
    {
      spot: "BBan5",
      champion: null,
    },
  ]);
  const [redBans, setRedBans] = useState([
    {
      spot: "RBan1",
      champion: null,
    },
    {
      spot: "RBan2",
      champion: null,
    },
    {
      spot: "RBan3",
      champion: null,
    },
    {
      spot: "RBan4",
      champion: null,
    },
    {
      spot: "RBan5",
      champion: null,
    },
  ]);
  const [bluePicks, setBluePicks] = useState([
    {
      spot: "B1",
      champion: null,
    },
    {
      spot: "B2",
      champion: null,
    },
    {
      spot: "B3",
      champion: null,
    },
    {
      spot: "B4",
      champion: null,
    },
    {
      spot: "B5",
      champion: null,
    },
  ]);
  const [redPicks, setRedPicks] = useState([
    {
      spot: "R1",
      champion: null,
    },
    {
      spot: "R2",
      champion: null,
    },
    {
      spot: "R3",
      champion: null,
    },
    {
      spot: "R4",
      champion: null,
    },
    {
      spot: "R5",
      champion: null,
    },
  ]);

  const handleBanClick = (ban) => {
    if (!activeBan && !activePick && !activeChamp) {
      setActiveBan(ban.spot);
    }

    if (activeBan == ban.spot) {
      setActiveBan("");
    }

    if (activeBan && activeBan != ban.spot) {
      setActiveBan(ban.spot);
    }

    if (activePick) {
      setActivePick("");
      setActiveBan(ban.spot);
    }
  };

  const handleBanRightClick = (e, ban) => {
    e.preventDefault();

    if (ban.champion) {
      if (ban.spot[0] === "B") {
        setBlueBans((prevBans) =>
          prevBans.map((_ban) =>
            _ban.spot === ban.spot ? { ..._ban, champion: null } : _ban
          )
        );
      } else if (ban.spot[0] === "R") {
        setRedBans((prevBans) =>
          prevBans.map((_ban) =>
            _ban.spot === ban.spot ? { ..._ban, champion: null } : _ban
          )
        );
      }
    }
  };

  const handlePickClick = (pick) => {
    if (!activeBan && !activePick && !activeChamp) {
      setActivePick(pick.spot);
    }

    if (activePick == pick.spot) {
      setActivePick("");
    }

    if (activePick && activePick != pick.spot) {
      setActivePick(pick.spot);
    }

    if (activeBan) {
      setActiveBan("");
      setActivePick(pick.spot);
    }
  };

  const handleChampClick = (champ) => {
    if (!activeBan && !activePick && !activeChamp) {
      setActiveChamp(champ);
    }

    if (activeChamp == champ) {
      setActiveChamp(null);
    }

    if (activeChamp && activeChamp != champ) {
      setActiveChamp(champ);
    }

    if (activeBan) {
      if (activeBan[0] === "B") {
        setBlueBans((prevBans) =>
          prevBans.map((ban) =>
            ban.spot === activeBan ? { ...ban, champion: champ } : ban
          )
        );
      } else if (activeBan[0] === "R") {
        setRedBans((prevBans) =>
          prevBans.map((ban) =>
            ban.spot === activeBan ? { ...ban, champion: champ } : ban
          )
        );
      }
      setActiveBan("");
    }
  };

  const handleChampionDrop = (champ, ban) => {
    if (ban.spot[0] === "B") {
      setBlueBans((prevBans) =>
        prevBans.map((_ban) =>
          _ban.spot === ban.spot ? { ..._ban, champion: champ } : _ban
        )
      );
    } else if (ban.spot[0] === "R") {
      setRedBans((prevBans) =>
        prevBans.map((_ban) =>
          _ban.spot === ban.spot ? { ..._ban, champion: champ } : _ban
        )
      );
    }
  };

  return (
    <div className="h-screen flex">
      <div className="h-screen bg-[#090809] flex flex-col">
        <h1 className="righteous-regular text-3xl text-white p-8">
          Pelaydough
        </h1>
        <div
          className={`w-full py-2 px-8 cursor-pointer ${
            tabSelected != "drafting" && "hover:bg-[#A66B08]"
          } ${tabSelected == "drafting" ? "bg-[#DCA74E]" : "bg-none"}`}
          onClick={() => setTabSelected("drafting")}
        >
          <span className="text-white roboto-regular tracking-wider text-xl">
            Drafting
          </span>
        </div>
        <div
          className={`w-full py-2 px-8 cursor-pointer ${
            tabSelected != "tier-list" && "hover:bg-[#A66B08]"
          } ${tabSelected == "tier-list" ? "bg-[#DCA74E]" : "bg-none"}`}
          onClick={() => setTabSelected("tier-list")}
        >
          <span className="text-white roboto-regular tracking-wider text-xl">
            Tier List
          </span>
        </div>
      </div>
      <div className="h-screen w-full flex flex-col">
        <div className="w-full bg-[#1C1D1D] py-2 px-8">
          <h2 className="roboto-regular text-white text-xl tracking-widest text-right">
            SIGN IN
          </h2>
        </div>
        {tabSelected == "drafting" ? (
          <Drafting
            bluePicks={bluePicks}
            redPicks={redPicks}
            blueBans={blueBans}
            redBans={redBans}
            handleBanClick={handleBanClick}
            handleBanRightClick={handleBanRightClick}
            handlePickClick={handlePickClick}
            handleChampClick={handleChampClick}
            activeBan={activeBan}
            activePick={activePick}
            activeChamp={activeChamp}
            setActiveBan={setActiveBan}
            setActivePick={setActivePick}
            setActiveChamp={setActiveChamp}
            handleChampionDrop={handleChampionDrop}
          />
        ) : (
          <TierList />
        )}
      </div>
    </div>
  );
}

export default App;
