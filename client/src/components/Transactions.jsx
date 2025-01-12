import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
}) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div
      className=" m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-8 rounded-md black-glassmorphism hover:scale-105 hover:rotate-1 transition-all delay-100 ease-in"
    >
      <div className="flex flex-col items-center w-full ">
        <div className="flex flex-col gap-3 justify-start w-full  p-2 ">
          <a
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-md tracking-widest hover:bg-white hover:text-black">
              FROM : {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://ropsten.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-md tracking-widest hover:bg-white hover:text-black">
              TO : {shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-lg tracking-widest hover:bg-white hover:text-black ">
            AMOUNT : {amount} ETH
          </p>
          {message && (
            <>
              <br />
              <p className="text-white text-base ">Message: {message}</p>
            </>
          )}
        </div>
        <div className="w-full  py-2 blue-glassmorphism mt-4">
          <p className="text-black text-center font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 ">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...dummyData, ...transactions].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
