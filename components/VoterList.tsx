import React, { ReactElement } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "@/firebase/clientApp";
import Image from "next/image";

interface Props {
  // id is the id of the vote document
  // (which is also the uid of the user, and the name of the user doucment for that user)
  id: string;
  vote: string;
}

export default function VoterList({ id, vote }: Props) {
  const [value, loading, error] = useDocument(
    firebase.firestore().collection("users").doc(id) as any
  );

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }

  return (
    <div
      style={{
        maxWidth: "320px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        width="48"
        height="48"
        alt="profile picture"
        style={{
          borderRadius: "50%",
          marginTop: "8px",
          marginRight: "8px",
        }}
        src={value?.data()?.photoURL}
      />
      <div>
        <h4 style={{ marginBottom: 0 }}>{
          value?.data()?.displayName
        }</h4>
        <h4 style={{ marginTop: 0 }}>
          Voted: {vote === "yes" ? "✔️🍍" : "❌🍍"}
        </h4>
      </div>
    </div>
  );
}

