import { loadEditTable } from "../edit/edit.load-table.js";
import { handleTabAction } from "../tab.select.js";
import { handleSubmitData } from "./add.submit-data.js";
handleTabAction();
loadEditTable();
handleSubmitData();
