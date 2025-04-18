function Calculator() {
  const [display, setDisplay] = React.useState("");

  const handleClick = (value) => {
    if (value === "=") {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay("Hiba");
      }
    } else if (value === "C") {
      setDisplay("");
    } else {
      setDisplay(display + value);
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", "C", "=", "+"
  ];

  return React.createElement("div", { style: { maxWidth: "300px", margin: "auto" } },
    React.createElement("h2", null, "Számológép"),
    React.createElement("input", {
      type: "text",
      value: display,
      readOnly: true,
      style: { width: "100%", fontSize: "24px", textAlign: "right", marginBottom: "10px" }
    }),
    React.createElement("div", {
      style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }
    },
      buttons.map((btn, idx) =>
        React.createElement("button", {
          key: idx,
          onClick: () => handleClick(btn),
          style: {
            padding: "15px",
            fontSize: "18px",
            backgroundColor: ["/", "*", "-", "+"].includes(btn) ? "#f9a825" :
                             btn === "=" ? "#43a047" :
                             btn === "C" ? "#e53935" : "#e0e0e0",
            color: ["/", "*", "-", "+", "=", "C"].includes(btn) ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }
        }, btn)
      )
    )
  );
}
