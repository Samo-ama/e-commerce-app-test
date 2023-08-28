import React from "react";
import { Card, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../CartContext";
import { useState, useEffect } from "react";

export default function CartCheckout() {
  const { cart, dispatch } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    for (const item of cart) {
      total += item.price * item.quantity;
    }
    setTotalPrice(total);
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

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <Container className="h-100 py-5 mt-5">
        <Row className="justify-content-center align-items-center h-100">
          <Col>
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
                            style={{ width: "150px" }}
                            alt="Generic placeholder"
                          />
                        </div>

                        <div className="flex-grow-1 ms-3">
                          <Button
                            className="float-end "
                            variant="danger"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </Button>

                          <h5 className="text-primary">{item.title}</h5>
                          <h6 style={{ color: "#9e9e9e" }}>
                            Category: {item.category}
                          </h6>
                          <h6 style={{ color: "#9e9e9e" }}>
                            quantity: {item.quantity}
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
                  </Col>

                  <Col lg="5" className="px-5 py-4">
                    <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                      Payment
                    </h3>

                    <form className="mb-5">
                      <InputGroup className="mb-5">
                        <InputGroup.Text>Card number</InputGroup.Text>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue=""
                          placeholder=""
                        />
                      </InputGroup>
                      <InputGroup className="mb-5">
                        <InputGroup.Text>Name on card</InputGroup.Text>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue=""
                          placeholder="Name on card"
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text>Cvv</InputGroup.Text>
                        <div className="mr-3">
                          <input
                            className="form-control mr-3"
                            type="text"
                            defaultValue=""
                            maxLength="3"
                            minLength="3"
                            placeholder="&#9679;&#9679;&#9679;"
                            style={{ width: "100px" }}
                          />
                        </div>

                        <InputGroup.Text className="ml-3">
                          Expiration
                        </InputGroup.Text>

                        <input
                          className="form-control"
                          type="text"
                          defaultValue=""
                          maxLength="7"
                          minLength="7"
                          placeholder="MM/YYYY"
                          style={{ width: "90px" }}
                        />
                      </InputGroup>

                      <div className="d-flex justify-content-center mt-5 mp-5">
                        <Button
                          variant="primary"
                          size="lg"
                          block
                          style={{ width: "430px" }}
                        >
                          Buy now
                        </Button>
                      </div>

                      <h5
                        className="fw-bold mb-5 mt-5" /* style={{ position: "absolute", bottom: "0" }} */
                      >
                        <a href="/">
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="me-2"
                          />
                          Back to shopping
                        </a>
                      </h5>
                    </form>
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
