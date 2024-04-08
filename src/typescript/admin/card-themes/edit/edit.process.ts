import { loadEditTable } from "./edit.load-table.js";
import { handleTabAction } from "../tab.select.js";
import { loadEditData } from "./edit.load-edit-data.js";
import { handleSubmitData } from "./edit.submit-data.js";

loadEditTable();
handleTabAction();
loadEditData();
handleSubmitData();
