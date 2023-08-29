import React from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../CartContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../../index.css";


export default function CartCheckout() {

  const { cart, dispatch } = useCart();
  const [totalPrice, setTotalPrice] = useState(0); //Total price state
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cvv, setCVV] = useState("");
  const [cvvError, setCVVError] = useState("");
  const [expiration, setExpiration] = useState("");
  const [expirationError, setExpirationError] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [nameOnCardError, setNameOnCardError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); //manage the visibility of the success alert

  useEffect(() => {
    let total = 0;
    for (const item of cart) {
      total += item.price * item.quantity;
    }
    setTotalPrice(parseFloat(total.toFixed(3)));
  }, [cart]);

  const handleQuantityChange = (itemId, newQuantity) => {
    dispatch({
      type: "UPDATE_CART_ITEM_QUANTITY",
      payload: { id: itemId, quantity: newQuantity },
    });
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: itemId,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      setCardNumberError("Card number must be 16 numerical characters");
      isValid = false;
    } else {
      setCardNumberError(""); // Clear error
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      setCVVError("CVV must be 3 numerical characters");
      isValid = false;
    } else {
      setCVVError(""); // Clear error
    }

    if (!/^((0[1-9])|(1[0-2]))\/\d{2}$/.test(expiration)) {
      setExpirationError("Invalid expiration format (MM/YY)");
      isValid = false;
    } else {
      setExpirationError(""); // Clear error
    }
    if (nameOnCard.trim() === "") {
      setNameOnCardError("Name on card cannot be empty");
      isValid = false;
    } else {
      setNameOnCardError(""); // Clear error
    }
    // If inputs are valid, proceed with submission
    if (isValid) {
      // Create the data object to be sent as JSON
      let formData = {
        cardNumber: cardNumber,
        Expiration: expiration,
        name: nameOnCard,
        cvv: cvv,
      };
      setShowSuccessAlert(true);
      console.log("form Data:", formData);
      // Clear the form here
      setCardNumber("");
      setCVV("");
      setExpiration("");
      setNameOnCard("");
    }
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <Container className="h-100 py-5 mt-5">
        <Row className="justify-content-center align-items-center h-100">
          <Col >
            {/*display the success alert */}
            {showSuccessAlert && (
              <Alert
                variant="success"
                onClose={() => setShowSuccessAlert(false)}
                dismissible
              >
                <Alert.Heading>Success!</Alert.Heading>
                <p>Your payment was successful.</p>
              </Alert>
            )}
            <Card className="shopping-cart" style={{ borderRadius: "15px" }}>
              <Card.Body className="text-black">
                <Row>
                  <Col lg="7" className="px-5 py-4">
                    <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                      Your products
                    </h3>

                    {cart.map((item) => (
                      <div className="d-flex align-items-center mb-5">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            fluid
                            style={{ width: "90px" }}
                            alt=""
                          />
                        </div>

                        <div className="flex-grow-1 ms-3">
                          <Button
                            className="float-end "
                            variant="danger"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <FontAwesomeIcon icon={faTimes} size="2xs" />
                          </Button>

                          <h5 className="text-primary">{item.title}</h5>
                          <h6 style={{ color: "#9e9e9e" }}>
                            Category: {item.category}
                          </h6>
                          

                          <div className="d-flex align-items-center">
                            <p className="fw-bold mb-0 me-5 pe-3">
                              {item.price}RM
                            </p>

                            <input
                              className="quantity fw-bold text-black"
                              min={1}
                              defaultValue={item.quantity}
                              type="number"
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  parseInt(e.target.value, 10)
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {cart.length === 0 ? (
                      // Display this if the cart is empty
                      <div
                        className="d-flex justify-content-center align-items-center "
                        style={{ height: "50vh" }}
                      >
                        <h5 className="text-muted">
                          No items in your cart.{" "}
                          <a href="/">Time to fill it up!</a>
                        </h5>
                      </div>
                    ) : (
                      // Display the usual content if the cart is not empty
                      <div>
                        <hr
                          className="mb-4"
                          style={{
                            height: "2px",
                            backgroundColor: "#1266f1",
                            opacity: 1,
                          }}
                        />

                        <div className="d-flex justify-content-between px-x ">
                          <p className="fw-bold">Discount:</p>
                          <p className="fw-bold">10RM</p>
                        </div>
                        <div
                          className="d-flex justify-content-between p-2 mb-2"
                          style={{ backgroundColor: "#e1f5fe" }}
                        >
                          <h5 className="fw-bold mb-0">Total:</h5>
                          <h5 className="fw-bold mb-0">{totalPrice} RM</h5>
                        </div>
                      </div>
                    )}
                  </Col>

                  <Col lg="5" className="px-5 py-4">
                    <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                      Payment
                    </h3>

                    <Form className="mb-5" onSubmit={handleFormSubmit}>
                      <InputGroup className="mb-5">
                        <InputGroup.Text>Card number</InputGroup.Text>
                        <Form.Control
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          isInvalid={cardNumberError}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {cardNumberError}
                        </Form.Control.Feedback>
                      </InputGroup>
                      <InputGroup className="mb-5">
                        <InputGroup.Text>Name on card</InputGroup.Text>
                        <Form.Control
                          className="form-control"
                          type="text"
                          value={nameOnCard}
                          onChange={(e) => setNameOnCard(e.target.value)}
                          defaultValue=""
                          placeholder="Name on card"
                          isInvalid={nameOnCardError}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {nameOnCard}
                        </Form.Control.Feedback>
                      </InputGroup>

                      <InputGroup className="mb-5">
                        <InputGroup.Text>Cvv</InputGroup.Text>
                        <div className="mr-3">
                          <Form.Control
                            className="form-control mr-3"
                            type="text"
                            defaultValue=""
                            maxLength="3"
                            minLength="3"
                            placeholder="&#9679;&#9679;&#9679;"
                            value={cvv}
                            onChange={(e) => setCVV(e.target.value)}
                            isInvalid={cvvError}
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            required
                            style={{ width: "100px" }}
                          />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {cvvError}
                        </Form.Control.Feedback>

                        <InputGroup.Text className="ml-3">
                          Expiration
                        </InputGroup.Text>

                        <Form.Control
                          className="form-control"
                          type="text"
                          defaultValue=""
                          maxLength="5"
                          minLength="5"
                          placeholder="MM/YY"
                          value={expiration}
                          onChange={(e) => setExpiration(e.target.value)}
                          isInvalid={expirationError}
                          required
                          style={{ width: "90px" }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {expirationError}
                        </Form.Control.Feedback>
                      </InputGroup>

                      <div className="d-flex justify-content-center mt-5 mp-5">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={cart.length === 0}
                          block
                          style={{ width: "430px" }}
                        >
                          Buy now
                        </Button>
                      </div>

                      <h5 className="fw-bold mb-5 mt-5">
                        <Link to="/">
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="me-2"
                          />
                          Back to shopping
                        </Link>
                      </h5>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
