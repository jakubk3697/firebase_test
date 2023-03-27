import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '@/firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import Auth from '@/components/auth';
import VoterList from '@/components/VoterList';

export default function Home() {
  const [user, loading, error] = useAuthState(firebase.auth() as any);
  console.log("Loading: ", loading, "|", "Current User: ", user, "|");
  const db = firebase.firestore();

  const [votes, votesLoading, votesError] = useCollection(
    firebase.firestore().collection('votes') as any,
    {}
  );

  if (!votesLoading && votes) {
    votes.docs.map((doc) => console.log(doc.data()));
  }

  const addVoteDocument = async (vote: string) => {
    await db.collection("votes").doc(user?.uid).set({
      vote: vote,
    })
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gridGap: 8,
          background:
            "linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        }}
      >
        {loading && <h4>Loading...</h4>}
        {!user && <Auth />}
        {user && (
          <>
            <h1>Pineapple on Pizza?</h1>

            <div style={{ flexDirection: "row", display: "flex" }}>
              <button
                style={{ fontSize: 32, marginRight: 8 }}
                onClick={() => addVoteDocument("yes")}
              >
                ✔️🍍🍕
              </button>
              <h3>
                Pineapple Lovers:{" "}
                {
                  votes?.docs?.filter(
                    (doc) => (doc.data()).vote === "yes"
                  ).length
                }
              </h3>
            </div>
            <div style={{ flexDirection: "row", display: "flex" }}>
              <button
                style={{ fontSize: 32, marginRight: 8 }}
                onClick={() => addVoteDocument("no")}
              >
                ❌🍍🍕
              </button>
              <h3>
                Pineapple Haters:{" "}
                {
                  votes?.docs?.filter(
                    (doc) => (doc.data()).vote === "no"
                  ).length
                }
              </h3>
            </div>

            <div style={{ marginTop: "64px" }}>
            <h3>Voters:</h3>
            <div
              style={{
                maxHeight: "320px",
                overflowY: "auto",
                width: "240px",
              }}
            >
              {votes?.docs?.map((doc) => (
                <>
                  <VoterList id={doc.id} key={doc.id} vote={doc.data().vote} />
                </>
              ))}
            </div>
          </div>
          </>
        )}

      </div>
    </>
  )
}
