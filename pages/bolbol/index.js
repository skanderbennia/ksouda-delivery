import React, { useEffect, useState } from "react";

export default function Bolbol() {
  const [total, setTotal] = useState(0);
  useEffect(() => {}, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTotal(
            (parseInt(e.target.longeur.value) +
              parseInt(e.target.largeur.value)) *
              2
          );
        }}
      >
        <input name="longeur" />
        <input name="largeur" />
        <input type="submit" />
      </form>
      {total}
    </div>
  );
}
