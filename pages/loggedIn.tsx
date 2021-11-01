import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { Button, Container, Spinner } from "reactstrap";
import Firebase, { db } from "../Firebase";
import styles from "../styles/Home.module.css";

const LoggedIn = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(Firebase.auth());
  const [value, collectionLoading, error] = useCollection(
    db.collection("spending"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (value) {
      value.docs.forEach((i) => console.log(i.data()));
    }
  }, [value]);

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading]);

  const signOut = () => {
    Firebase.auth().signOut();
  };

  if (loading || collectionLoading) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <Spinner>Loading...</Spinner>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Container className="text-center custom-container">
          <Button onClick={signOut}>Sign out</Button>
        </Container>
      </main>
    </div>
  );
};

export default LoggedIn;
