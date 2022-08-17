import {Column} from "../models/column.model";

export const COLUMNS_SCHEMA: Column[] = [
  {
    key: "Code",
    type: "text",
    label: "Code"
  },
  {
    key: "Name",
    type: "text",
    label: "Name"
  },
  {
    key: "Price (EUR)",
    type: "number",
    label: "Price (EUR)"
  },
  {
    key: "Price + Tax (EUR)",
    type: "number",
    label: "Price + Tax (EUR)"
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: "Edit"
  }
]
