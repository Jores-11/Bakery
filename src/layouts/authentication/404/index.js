import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Import images from src/assets/img/
import ajaxLoader from "assets/img/ajax-loader.gif";
import btnImage from "assets/img/btn.png";
import bgBtnImage from "assets/img/bg_btn.png";
import dark404 from "assets/img/404-dark.png";
import light404 from "assets/img/404-light.gif";

function NotFound() {
  const [isLight, setIsLight] = useState(false);

  const handleToggleLight = () => {
    setIsLight((prev) => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = document.querySelector(".loader");
      const animationLoad = document.querySelector(".animationload");
      if (loader) loader.style.opacity = "0";
      if (animationLoad) animationLoad.style.opacity = "0";
      setTimeout(() => {
        if (loader) loader.style.display = "none";
        if (animationLoad) animationLoad.style.display = "none";
      }, 400);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: isLight ? "#eaff6f" : "#000c2f",
        margin: 0,
        padding: 0,
        fontFamily: "Raleway, Helvetica, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Loader */}
      <div
        className="animationload"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#fff",
          zIndex: 999999,
          transition: "opacity 0.4s ease-in-out",
        }}
      >
        <div
          className="loader"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            margin: "-100px 0 0 -100px",
            width: "200px",
            height: "200px",
            backgroundImage: `url(${ajaxLoader})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "opacity 0.4s ease-in-out",
          }}
        />
      </div>

      {/* Wrapper */}
      <div id="wrapper" style={{ minHeight: "100%", width: "100%" }}>
        <div className="container" style={{ position: "relative", height: "100vh" }}>
          {/* Switcher */}
          <div
            className="switcher"
            style={{
              width: "185px",
              height: "84px",
              position: "absolute",
              top: "100px",
              left: "65px",
              zIndex: 9999,
            }}
          >
            <input
              id="sw"
              type="checkbox"
              checked={isLight}
              onChange={handleToggleLight}
              style={{ display: "none" }}
            />
            <label
              htmlFor="sw"
              style={{
                background: `url(${btnImage}) no-repeat`,
                width: "42px",
                height: "45px",
                display: "block",
                cursor: "pointer",
                zIndex: 1,
                position: "absolute",
                top: "22px",
                left: isLight ? "120px" : "65px",
                transition: "left 0.2s",
              }}
            />
            <div
              style={{
                background: `url(${bgBtnImage}) no-repeat`,
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 0,
              }}
            />
            <div
              style={{
                color: isLight ? "#343f69" : "#fff",
                fontSize: "14px",
                position: "absolute",
                left: "-24px",
                top: "21px",
              }}
            >
              Turn{" "}
              <span style={{ display: isLight ? "inline-block" : "none" }}>off</span>
              <span style={{ display: isLight ? "none" : "inline-block" }}>on</span>
              <br />
              the light
            </div>
          </div>

          {/* Dark Version */}
          <div
            style={{
              display: isLight ? "none" : "block",
              visibility: isLight ? "hidden" : "visible",
              textAlign: "center",
            }}
          >
            <div
              style={{
                zIndex: 999,
                marginTop: "200px",
                marginBottom: "60px",
              }}
            >
              <img src={dark404} alt="404 error" style={{ maxWidth: "100%" }} />
            </div>
          </div>

          {/* Light Version */}
          <div
            style={{
              display: isLight ? "block" : "none",
              visibility: isLight ? "visible" : "hidden",
              textAlign: "center",
            }}
          >
            <div
              style={{
                zIndex: 999,
                marginTop: "94px",
              }}
            >
              <img
                src={light404}
                alt="404 error"
                style={{ maxWidth: "100%", marginLeft: "-54px" }}
              />
              <br />
              <Link
                to="/authentication/sign-in"
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  border: "0 solid #ec9228",
                  borderBottom: "2px solid #ec9228",
                  padding: "10px 41px",
                  borderRadius: "5px",
                  background: "#ffad32",
                  color: "#fff",
                  textTransform: "uppercase",
                  display: "inline-block",
                  margin: "10px 20px 10px 0",
                  textDecoration: "none",
                  transition: "all 0.5s ease-in-out",
                }}
                onMouseOver={(e) => (e.target.style.background = "#ec9228")}
                onMouseOut={(e) => (e.target.style.background = "#ffad32")}
              >
                Go to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;