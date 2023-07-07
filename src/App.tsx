import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { MOJANG_API_ENDPOINTS } from "./constants/constants";
import { mojangApi } from "./utils/APIs";
import { AiFillDelete } from "react-icons/ai";
import { GrAdd, GrUserAdmin } from "react-icons/gr";

interface PlayerType {
  id: string,
  name: string,
  avatar: string,
  isAdmin: boolean
}

function App() {

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [friends, setFriends] = useState<PlayerType[]>([]);

  const handleAddPlayer = async () => {
    try {
      const res: any = await mojangApi.get(
        MOJANG_API_ENDPOINTS.GET.PROFILE(search)
      );

      if (res.data?.id) {
        setFriends((prevFriends) => [...prevFriends, {...res.data, avatar: `https://minotar.net/helm/${res.data.id}/30.png`, isAdmin: false}] as PlayerType[]);
        if (!error) setError("");
      } else {
        setError("User not found!");
      }
    } catch (e) {
      setError("User not found!");
    }
  };

  const handleToggleAdmin=(i: number)=>{
    
  }

  return (
    <div className="App">
      <div className="container">
        <header style={{ padding: 20 }}>
          <div style={{ marginBottom: 50 }}>
            <div style={{ display: "flex", gap: 3 }}>
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                  setError("");
                }}
              />

              <GrAdd onClick={handleAddPlayer} />
            </div>
            {error && <h6 style={{ color: "red" }}>{error}</h6>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, maxWidth: 250, backgroundColor: "green", padding: 10, borderRadius: 10}}>
            {friends.map(({name, avatar}, i) => (
              <div style={{ display: "flex", gap: 5, alignItems: "center", justifyContent:"space-between", borderBottom: "1px solid black", padding: "5px 0px"}}>

                <div style={{display: "flex", gap:20}}>
                <img src={avatar} />{" "}
                <h3>{name}</h3>
                </div>

                <div style={{display: "flex", gap:10}}>
                  <GrUserAdmin onClick={()=> {
handleToggleAdmin(i)
                  }}/>
                <AiFillDelete
                  onClick={() =>
                    setFriends((prev) => {
                      const copy = prev.slice();
                      copy.splice(i, 1);
                      return copy;
                    })
                  }
                  />{" "}
                  </div>
              </div>
            ))}
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
