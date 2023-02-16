export const topContainerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "30px",
}

export const containerStyles = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "30px",
  flexDirection: "column",
  padding: "30px 0",
  alignItems: "center",
  minHeight: "100vh",

  "@media(min-width: 700px)": {
    gridTemplateColumns: "1fr 1fr",
  },

  "@media(min-width: 1300px)": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}
