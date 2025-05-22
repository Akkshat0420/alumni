import { Container, Card } from "react-bootstrap";

const AlumniTestimonials = ({ data }) => {
  const fontFamily = "'Poppins', sans-serif";

  const defaultTestimonials = [
    { text: "This college gave me lifelong friends!", author: "Amit Verma" },
    { text: "Amazing faculty and support system.", author: "Ritika Shah" },
    { text: "Loved the campus life and events!", author: "Vikram Nair" },
    { text: "Great exposure to tech and innovation.", author: "Neha Kapoor" },
    { text: "Career support was truly helpful.", author: "Rohan Mehta" },
    { text: "Diverse and inclusive environment.", author: "Priya Sen" },
  ];

  const testimonialsToShow =
    Array.isArray(data?.testimonials) && data.testimonials.length > 0
      ? data.testimonials
      : defaultTestimonials;

  return (
    <div style={{ backgroundColor: "#00aef0", padding: "50px 0" }}>
      <Container fluid>
        <h3
          className="mb-5 text-center"
          style={{
            fontSize: 32,
            fontWeight: "bold",
            fontFamily,
            color: "#ffffff",
          }}
        >
          Alumni Testimonials
        </h3>

        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            padding: "10px 20px",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
          }}
          className="hide-scrollbar"
        >
          {testimonialsToShow.map((t, i) => (
            <div
              key={i}
              style={{
                flex: "0 0 300px",
                scrollSnapAlign: "start",
              }}
            >
              <Card
                className="h-100"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "30px 20px",
                  border: "none",
                  fontFamily,
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <Card.Body>
                  <Card.Text
                    style={{
                      fontSize: "1.05rem",
                      color: "#444",
                      fontWeight: 400,
                      fontStyle: "italic",
                      lineHeight: 1.7,
                    }}
                  >
                    “{t.text}”
                  </Card.Text>
                  <div
                    style={{
                      marginTop: "20px",
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      color: "#222",
                    }}
                  >
                    — {t.author}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>

      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default AlumniTestimonials;
