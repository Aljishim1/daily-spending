import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import Firebase from "../Firebase";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(Firebase.auth());

  useEffect(() => {
    if (!loading && user?.user) {
      router.replace("loggedIn");
    }
  }, [user, loading]);

  const onSubmit = (event: any) => {
    signInWithEmailAndPassword(email, password);
    event.preventDefault();
  };

  if (loading) {
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
      <Container className="text-center" style={{ padding: "20px 0px" }}>
        <main className={styles.main}>
          <Row>
            <Col>
              <h2>My Daily Spending</h2>
            </Col>
          </Row>
          <Row style={{ maxWidth: "400px", margin: "auto" }}>
            <Col>
              <Form onSubmit={onSubmit}>
                {error && <Alert color="danger">{error.message}</Alert>}
                <FormGroup row>
                  <Label for="loginEmail" sm={4}>
                    Email
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      name="email"
                      id="loginEmail"
                      placeholder="Email"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="loginPassword" sm={4}>
                    Password
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      id="loginPassword"
                      placeholder="Password"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Button>Login</Button>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    No account? <Link href="/signUp">Create one</Link>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </main>
      </Container>
    </div>
  );
};

export default Home;
