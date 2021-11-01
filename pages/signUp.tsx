import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
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

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(Firebase.auth());

  useEffect(() => {
    if (!loading && user?.user) {
      router.push("/loggedIn");
    }
  }, [loading, user]);

  const onSubmit = (event: any) => {
    if (passwordOne === passwordTwo)
      createUserWithEmailAndPassword(email, passwordOne);
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
      <main className={styles.main}>
        <Container className="text-center custom-container">
          <Row>
            <Col>
              <Form className="custom-form" onSubmit={onSubmit}>
                {error && <Alert color="danger">{error.message}</Alert>}
                <FormGroup row>
                  <Label for="signUpEmail" sm={4}>
                    Email
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      name="email"
                      id="signUpEmail"
                      placeholder="Email"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="signUpPassword" sm={4}>
                    Password
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="password"
                      name="passwordOne"
                      value={passwordOne}
                      onChange={(event) => setPasswordOne(event.target.value)}
                      id="signUpPassword"
                      placeholder="Password"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="signUpPassword2" sm={4}>
                    Confirm Password
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="password"
                      name="password"
                      value={passwordTwo}
                      onChange={(event) => setPasswordTwo(event.target.value)}
                      id="signUpPassword2"
                      placeholder="Password"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Button>Sign Up</Button>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    Already registered? <Link href="/">Sign In</Link>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default SignUp;
