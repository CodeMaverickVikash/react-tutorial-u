import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CustomModal from "./CustomModal";
import CartContext from "../stores/Cart-context";
import { useFetch } from "../custom-hooks/useFetch";
import CounterComponent1 from "./Counter1";
import CounterComponent2 from "./Counter2";

export default function Home() {
  const cartCtx = useContext(CartContext);

  const { isFetching, error, fetchedData, setFetchedData } = useFetch({
    url: "https://jsonplaceholder.typicode.com/todos",
  });

  console.log(cartCtx);

  return (
    <div className="container my-5 text-center">
      {/* <CounterComponent1/> */}
      <CounterComponent2 />
      <hr />

      <div className="todos">
        {isFetching && fetchedData.length === 0 ? (
          <p>Fetching....</p>
        ) : (
          fetchedData
            .slice(0, 5)
            .map((value) => <p key={value.id}>{value.title}</p>)
        )}
      </div>

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Open modal
      </button>
      {ReactDOM.createPortal(
        <CustomModal />,
        document.getElementById("backdrop-root")
      )}
    </div>
  );
}
