import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
  const [link, setLink] = useState("");
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${token}` }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };

  return (
    <div className={"row"}>
      <div className={"col s8 offset-s2"} style={{ paddingTop: "2rem" }}>
        <div className="input-field ">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Вставьте ссылку</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
