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

export const dataContainerStyles = {
  fontSize: 15,
  display: "flex",
  flexDirection: "column",
  gap: "15px",
}

export const cardStyles = {
  "@media(min-width:700px)": {
    "&:hover": {
      boxShadow: "5px 5px 10px #888888",
    },
  },
}

export const postsListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  padding: "30px",
}

export const titleTrimStyles = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "50ch",
  marginRight: "auto",
}
