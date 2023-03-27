import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from '@/firebase/clientApp';
import {useCollection} from 'react-firebase-hooks/firestore';

export default function Home() {
  const [user, loading, error] = useAuthState(firebase.auth() as any);
  console.log("Loading: ", loading, "|", "Current User: ", user, "|");
  const db = firebase.firestore();

  const [votes, votesLoading, votesError] = useCollection(
    firebase.firestore().collection('votes') as any,
    {}
  );
  
  if(!votesLoading && votes) {
    votes.docs.map((doc)=>console.log(doc.data()));
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <button style={{fontSize: 32, marginRight: 8}} onClick={() => addVoteDocument("yes")}>YES</button>
        <button style={{fontSize: 32, marginRight: 8}} onClick={() => addVoteDocument("no")}>NO</button>
      </div>
    </>
  )
}
