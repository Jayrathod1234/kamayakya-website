import { StyleSheet } from "@react-pdf/renderer";

export const PDF_STYLES = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    padding: 30,
    lineHeight: 1.5,
  },
  header: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 700,
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 500,
  },
  semibold: {
    fontWeight: 600,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  // row: {
  //   flexDirection: "row",
  //   marginBottom: 5,
  // },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  listItem: {
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 5,
  },
  subListItem: {
    marginLeft: 20,
    marginBottom: 3,
  },
  contactInfo: {
    marginTop: 10,
    fontSize: 9,
    textAlign: "center",
  },
  disclaimer: {
    fontSize: 8,
    marginTop: 10,
    textAlign: "center",
    color: "#666",
  },
  table: {
    // display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    padding: 5,
  },
  labelCell: {
    width: "40%",
    fontWeight: "bold",
    padding: 5,
    backgroundColor: "#f2f2f2",
  },
  valueCell: {
    width: "60%",
    padding: 5,
  },
  // subListItem:{
  //   textAlign:'center'
  // }
});